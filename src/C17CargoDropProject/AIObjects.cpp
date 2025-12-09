#include <windows.h>
#include <tchar.h>
#include <stdio.h>
#include <vector>
#include "SimConnect.h"

int quit = 0;
HANDLE hSimConnect = NULL;
std::vector<DWORD> cargoIDs;

// Define event IDs
enum EVENT_ID {
    EVENT_SIM_START = 0,
    EVENT_Z = 1,
    EVENT_X = 2,
    EVENT_C = 3
};

enum DATA_REQUEST_ID {
    REQUEST_USER_POSITION = 0,
    REQUEST_CARGO_POSITION = 1
};

enum DEFINITION_ID {
    DEFINITION_USER_POSITION = 0,
    DEFINITION_WAYPOINT
};

// Structure to hold user position data
struct UserPosition {
    double Latitude;
    double Longitude;
    double Altitude;
    double Heading;
};

// Spawn Spawning_Cargo at user-defined location
void setUpCargo(double latitude, double longitude, double altitude, double heading)
{
    SIMCONNECT_DATA_INITPOSITION Init;
    HRESULT hr;

    Init.Altitude = altitude;      // Altitude above sea level
    Init.Latitude = latitude;      // Latitude
    Init.Longitude = longitude;    // Longitude
    Init.Pitch = 0.0;
    Init.Bank = 0.0;
    Init.Heading = heading;        // Heading
    Init.OnGround = 0;             // Ensure it is not on the ground
    Init.Airspeed = 0;

    printf("Spawning Cargo at Lat: %f, Lon: %f, Alt: %f, Heading: %f\n", latitude, longitude, altitude, heading);
    hr = SimConnect_AICreateSimulatedObject(hSimConnect, "AfricanGiraffe", Init, REQUEST_CARGO_POSITION);
    if (FAILED(hr))
    {
        printf("Failed to spawn Cargo. HRESULT: %d\n", hr);
    }
}

// Set waypoints for the Cargo
void setCargoWaypoints(double latitude, double longitude, double altitude, DWORD cargoID)
{
    HRESULT hr;

    // Calculate waypoints
    SIMCONNECT_DATA_WAYPOINT waypoints[3] = {};

    // First waypoint: 1 second after spawning, 30 feet lower, 60% of the aircraft speed
    waypoints[0].Latitude = latitude;
    waypoints[0].Longitude = longitude;
    waypoints[0].Altitude = altitude - 30.0;
    waypoints[0].ktsSpeed = 3.0; // Example speed
    waypoints[0].Flags = SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    // Second waypoint: 100 feet below the user aircraft, 10% of the aircraft speed
    waypoints[1].Latitude = latitude;
    waypoints[1].Longitude = longitude;
    waypoints[1].Altitude = altitude - 100.0;
    waypoints[1].ktsSpeed = 0.5; // Example speed
    waypoints[1].Flags = SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    // Third waypoint: Travel straight down at 15 mph to the ground
    waypoints[2].Latitude = latitude;
    waypoints[2].Longitude = longitude;
    waypoints[2].Altitude = 0.0;
    waypoints[2].ktsSpeed = 15.0;
    waypoints[2].Flags = SIMCONNECT_WAYPOINT_WRAP_TO_FIRST | SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    // Send waypoints to the cargo
    hr = SimConnect_SetDataOnSimObject(hSimConnect, DEFINITION_WAYPOINT, cargoID, 0, ARRAYSIZE(waypoints), sizeof(SIMCONNECT_DATA_WAYPOINT), waypoints);
    if (FAILED(hr)) {
        printf("Failed to set waypoints for Cargo. HRESULT: %ld\n", hr);
    }
    else {
        printf("Waypoints set successfully for Cargo.\n");
    }
}

// Remove all spawned Cargo
void removeAllCargo()
{
    HRESULT hr;

    for (DWORD cargoID : cargoIDs) {
        if (cargoID != SIMCONNECT_OBJECT_ID_USER) {
            hr = SimConnect_AIRemoveObject(hSimConnect, cargoID, 0);
            if (SUCCEEDED(hr)) {
                printf("Cargo removed successfully. ID: %d\n", cargoID);
            }
            else {
                printf("Failed to remove Cargo. HRESULT: %d\n", hr);
            }
        }
    }
    cargoIDs.clear();
}

// Handle SimConnect events
void CALLBACK MyDispatchProcSO(SIMCONNECT_RECV* pData, DWORD cbData, void* pContext)
{
    HRESULT hr;

    switch (pData->dwID)
    {
    case SIMCONNECT_RECV_ID_EVENT:
    {
        SIMCONNECT_RECV_EVENT* evt = (SIMCONNECT_RECV_EVENT*)pData;

        switch (evt->uEventID)
        {
        case EVENT_Z:
            // Request the user's current position
            hr = SimConnect_RequestDataOnSimObject(hSimConnect, REQUEST_USER_POSITION, SIMCONNECT_OBJECT_ID_USER, DEFINITION_USER_POSITION, SIMCONNECT_PERIOD_ONCE, 0, 0, 0, 0);
            if (FAILED(hr))
            {
                printf("Failed to request user position. HRESULT: %d\n", hr);
            }
            break;

        case EVENT_X:
            // Set waypoints for all Cargo
            for (DWORD cargoID : cargoIDs) {
                hr = SimConnect_RequestDataOnSimObject(hSimConnect, REQUEST_USER_POSITION, SIMCONNECT_OBJECT_ID_USER, DEFINITION_USER_POSITION, SIMCONNECT_PERIOD_ONCE, 0, 0, 0, 0);
                if (FAILED(hr))
                {
                    printf("Failed to request user position for waypoints. HRESULT: %d\n", hr);
                }
            }
            break;

        case EVENT_C:
            removeAllCargo();
            break;

        default:
            printf("Unhandled Event ID: %d\n", evt->uEventID);
            break;
        }
        break;
    }

    case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
    {
        SIMCONNECT_RECV_SIMOBJECT_DATA* pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;
        if (pObjData->dwRequestID == REQUEST_USER_POSITION)
        {
            UserPosition* pUserPos = (UserPosition*)&pObjData->dwData;
            double latitude = pUserPos->Latitude;
            double longitude = pUserPos->Longitude;
            double altitude = pUserPos->Altitude;
            double heading = pUserPos->Heading;

            printf("User Position - Lat: %f, Lon: %f, Alt: %f, Heading: %f\n", latitude, longitude, altitude, heading);

            // Add a parked "Spawning_Cargo" at the user's location
            setUpCargo(latitude, longitude, altitude, heading);
        }
        break;
    }

    case SIMCONNECT_RECV_ID_ASSIGNED_OBJECT_ID:
    {
        SIMCONNECT_RECV_ASSIGNED_OBJECT_ID* pObjData = (SIMCONNECT_RECV_ASSIGNED_OBJECT_ID*)pData;
        if (pObjData->dwRequestID == REQUEST_CARGO_POSITION) {
            DWORD cargoID = pObjData->dwObjectID;
            cargoIDs.push_back(cargoID);
            printf("Cargo assigned object ID: %d\n", cargoID);
        }
        break;
    }

    case SIMCONNECT_RECV_ID_QUIT:
        quit = 1;
        break;

    default:
        printf("Unhandled Data ID: %d\n", pData->dwID);
        break;
    }
}

void testCargoSpawn()
{
    HRESULT hr;

    if (SUCCEEDED(SimConnect_Open(&hSimConnect, "Cargo Debug Spawn", NULL, 0, 0, 0)))
    {
        printf("Connected to Flight Simulator!\n");

        // Map events
        hr = SimConnect_MapClientEventToSimEvent(hSimConnect, EVENT_Z);
        hr = SimConnect_MapClientEventToSimEvent(hSimConnect, EVENT_X);
        hr = SimConnect_MapClientEventToSimEvent(hSimConnect, EVENT_C);

        // Add client events
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_Z);
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_X);
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_C);

        // Enable input for Z, X, and C keys
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "Z", EVENT_Z);
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "X", EVENT_X);
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "C", EVENT_C);
        hr = SimConnect_SetInputGroupState(hSimConnect, 0, SIMCONNECT_STATE_ON);

        // Set up a definition for the user's position
        hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_USER_POSITION, "Plane Latitude", "degrees");
        hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_USER_POSITION, "Plane Longitude", "degrees");
        hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_USER_POSITION, "Plane Altitude", "feet");
        hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_USER_POSITION, "Plane Heading Degrees True", "degrees");

        // Set up a definition for waypoints
        hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_WAYPOINT, "AI Waypoint List", "number", SIMCONNECT_DATATYPE_WAYPOINT);

        printf("Press 'Z' to spawn Cargo.\n");
        printf("Press 'X' to set waypoints for Cargo.\n");
        printf("Press 'C' to remove all Cargo.\n");

        while (0 == quit)
        {
            SimConnect_CallDispatch(hSimConnect, MyDispatchProcSO, NULL);
            Sleep(1);
        }

        hr = SimConnect_Close(hSimConnect);
    }
    else
    {
        printf("Failed to connect to Flight Simulator.\n");
    }
}

int __cdecl _tmain(int argc, _TCHAR* argv[])
{
    testCargoSpawn();
    return 0;
}