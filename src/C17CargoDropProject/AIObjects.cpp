#include <windows.h>
#include <tchar.h>
#include <stdio.h>
#include <vector>
#include "SimConnect.h"

int quit = 0;
HANDLE hSimConnect = NULL;
std::vector<DWORD> cargoIDs;

// Track L:C17_AD_RedLT last value
double g_lastDrop = 0.0;
bool   g_lastDropValid = false;
DWORD  g_lastDropPollTick = 0;

// Define event IDs
enum EVENT_ID {
    EVENT_Z = 1,   // Spawn cargo by key
    EVENT_X = 2,   // Set waypoints
    EVENT_C = 3    // Remove all cargo
};

enum DATA_REQUEST_ID {
    REQUEST_USER_POSITION = 0,
    REQUEST_CARGO_POSITION = 1,
    REQUEST_LVAR_DROP = 2
};

enum DEFINITION_ID {
    DEFINITION_USER_POSITION = 0,
    DEFINITION_WAYPOINT,
    DEFINITION_LVAR_DROP
};

// Structure to hold user position data
struct UserPosition {
    double Latitude;
    double Longitude;
    double Altitude;
    double Heading;
};

// Spawn cargo at user-defined location
void setUpCargo(double latitude, double longitude, double altitude, double heading)
{
    SIMCONNECT_DATA_INITPOSITION Init;
    HRESULT hr;

    Init.Altitude = altitude;      // Altitude above sea level
    Init.Latitude = latitude;      // Latitude
    Init.Longitude = longitude;     // Longitude
    Init.Pitch = 0.0;
    Init.Bank = 0.0;
    Init.Heading = heading;       // Heading
    Init.OnGround = 0;             // Not on ground
    Init.Airspeed = 0;

    printf("Spawning Cargo at Lat: %f, Lon: %f, Alt: %f, Heading: %f\n",
        latitude, longitude, altitude, heading);

    hr = SimConnect_AICreateSimulatedObject(
        hSimConnect,
        "ISU_Animal",                    // Model title in sim
        Init,
        REQUEST_CARGO_POSITION
    );

    if (FAILED(hr)) {
        printf("Failed to spawn Cargo. HRESULT: %d\n", hr);
    }
}

// Set waypoints for the cargo
void setCargoWaypoints(double latitude, double longitude, double altitude, DWORD cargoID)
{
    HRESULT hr;

    SIMCONNECT_DATA_WAYPOINT waypoints[3] = {};

    // First waypoint: slightly below, slow descent
    waypoints[0].Latitude = latitude;
    waypoints[0].Longitude = longitude;
    waypoints[0].Altitude = altitude - 30.0;
    waypoints[0].ktsSpeed = 3.0;
    waypoints[0].Flags = SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    // Second waypoint: lower
    waypoints[1].Latitude = latitude;
    waypoints[1].Longitude = longitude;
    waypoints[1].Altitude = altitude - 100.0;
    waypoints[1].ktsSpeed = 0.5;
    waypoints[1].Flags = SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    // Third waypoint: down to ground
    waypoints[2].Latitude = latitude;
    waypoints[2].Longitude = longitude;
    waypoints[2].Altitude = 0.0;
    waypoints[2].ktsSpeed = 15.0;
    waypoints[2].Flags = SIMCONNECT_WAYPOINT_WRAP_TO_FIRST |
        SIMCONNECT_WAYPOINT_SPEED_REQUESTED;

    hr = SimConnect_SetDataOnSimObject(
        hSimConnect,
        DEFINITION_WAYPOINT,
        cargoID,
        0,
        ARRAYSIZE(waypoints),
        sizeof(SIMCONNECT_DATA_WAYPOINT),
        waypoints
    );

    if (FAILED(hr)) {
        printf("Failed to set waypoints for Cargo. HRESULT: %ld\n", hr);
    }
    else {
        printf("Waypoints set successfully for Cargo ID %lu.\n", cargoID);
    }
}

// Remove all spawned cargo
void removeAllCargo()
{
    HRESULT hr;

    for (DWORD cargoID : cargoIDs) {
        if (cargoID != SIMCONNECT_OBJECT_ID_USER) {
            hr = SimConnect_AIRemoveObject(hSimConnect, cargoID, 0);
            if (SUCCEEDED(hr)) {
                printf("Cargo removed successfully. ID: %lu\n", cargoID);
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
            // Request the user's current position to spawn cargo
            hr = SimConnect_RequestDataOnSimObject(
                hSimConnect,
                REQUEST_USER_POSITION,
                SIMCONNECT_OBJECT_ID_USER,
                DEFINITION_USER_POSITION,
                SIMCONNECT_PERIOD_ONCE,
                0, 0, 0, 0
            );
            if (FAILED(hr)) {
                printf("Failed to request user position (Z). HRESULT: %d\n", hr);
            }
            break;

        case EVENT_X:
            // Set waypoints for all cargo using current user position
            hr = SimConnect_RequestDataOnSimObject(
                hSimConnect,
                REQUEST_USER_POSITION,
                SIMCONNECT_OBJECT_ID_USER,
                DEFINITION_USER_POSITION,
                SIMCONNECT_PERIOD_ONCE,
                0, 0, 0, 0
            );
            if (FAILED(hr)) {
                printf("Failed to request user position for waypoints. HRESULT: %d\n", hr);
            }
            break;

        case EVENT_C:
            removeAllCargo();
            break;

        default:
            printf("Unhandled Event ID: %lu\n", evt->uEventID);
            break;
        }
        break;
    }

    case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
    {
        SIMCONNECT_RECV_SIMOBJECT_DATA* pObjData =
            (SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;

        if (pObjData->dwRequestID == REQUEST_USER_POSITION)
        {
            UserPosition* pUserPos = (UserPosition*)&pObjData->dwData;
            double latitude = pUserPos->Latitude;
            double longitude = pUserPos->Longitude;
            double altitude = pUserPos->Altitude;
            double heading = pUserPos->Heading;

            printf("User Position - Lat: %f, Lon: %f, Alt: %f, Heading: %f\n",
                latitude, longitude, altitude, heading);

            // Spawn cargo at this position
            setUpCargo(latitude, longitude, altitude, heading);

            // Optionally assign waypoints to all cargo
            for (DWORD cargoID : cargoIDs) {
                setCargoWaypoints(latitude, longitude, altitude, cargoID);
            }
        }
        else if (pObjData->dwRequestID == REQUEST_LVAR_DROP)
        {
            // L:C17_AD_RedLT value (FLOAT64)
            double currentDrop = *(double*)&pObjData->dwData;

            bool changed = false;
            if (!g_lastDropValid || currentDrop != g_lastDrop)
                changed = true;

            g_lastDrop = currentDrop;
            g_lastDropValid = true;

            if (changed) {
                printf("L:C17_AD_RedLT changed to %f, requesting user position to drop cargo.\n",
                    currentDrop);

                hr = SimConnect_RequestDataOnSimObject(
                    hSimConnect,
                    REQUEST_USER_POSITION,
                    SIMCONNECT_OBJECT_ID_USER,
                    DEFINITION_USER_POSITION,
                    SIMCONNECT_PERIOD_ONCE,
                    0, 0, 0, 0
                );
                if (FAILED(hr)) {
                    printf("Failed to request user position for L:C17_AD_RedLT change. HRESULT: %d\n",
                        hr);
                }
            }
        }
        break;
    }

    case SIMCONNECT_RECV_ID_ASSIGNED_OBJECT_ID:
    {
        SIMCONNECT_RECV_ASSIGNED_OBJECT_ID* pObjData =
            (SIMCONNECT_RECV_ASSIGNED_OBJECT_ID*)pData;

        if (pObjData->dwRequestID == REQUEST_CARGO_POSITION) {
            DWORD cargoID = pObjData->dwObjectID;
            cargoIDs.push_back(cargoID);
            printf("Cargo assigned object ID: %lu\n", cargoID);
        }
        break;
    }

    case SIMCONNECT_RECV_ID_QUIT:
        quit = 1;
        break;

    default:
        printf("Unhandled Data ID: %lu\n", pData->dwID);
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

        // Add client events to group 0
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_Z);
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_X);
        hr = SimConnect_AddClientEventToNotificationGroup(hSimConnect, 0, EVENT_C);

        // Enable input for Z, X, and C keys
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "Z", EVENT_Z);
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "X", EVENT_X);
        hr = SimConnect_MapInputEventToClientEvent(hSimConnect, 0, "C", EVENT_C);
        hr = SimConnect_SetInputGroupState(hSimConnect, 0, SIMCONNECT_STATE_ON);

        // Set up a definition for the user's position
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_USER_POSITION,
            "Plane Latitude",
            "degrees"
        );
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_USER_POSITION,
            "Plane Longitude",
            "degrees"
        );
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_USER_POSITION,
            "Plane Altitude",
            "feet"
        );
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_USER_POSITION,
            "Plane Heading Degrees True",
            "degrees"
        );

        // Set up a definition for waypoints
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_WAYPOINT,
            "AI Waypoint List",
            "number",
            SIMCONNECT_DATATYPE_WAYPOINT
        );

        // Set up L:C17_AD_RedLT L:Var definition (MSFS/SimConnect L:Var pattern)
        hr = SimConnect_AddToDataDefinition(
            hSimConnect,
            DEFINITION_LVAR_DROP,
            "L:C17_AD_RedLT",
            "number",
            SIMCONNECT_DATATYPE_FLOAT64
        ); // L vars are always FLOAT64 and use "number" as unit.[web:12][web:8]

        printf("Press 'Z' to spawn Cargo.\n");
        printf("Press 'X' to set waypoints for Cargo.\n");
        printf("Press 'C' to remove all Cargo.\n");
        printf("Changing L:C17_AD_RedLT will also drop cargo at your aircraft position.\n");

        g_lastDropValid = false;
        g_lastDropPollTick = GetTickCount();

        while (0 == quit)
        {
            SimConnect_CallDispatch(hSimConnect, MyDispatchProcSO, NULL);

            // Poll L:C17_AD_RedLT every 200 ms
            DWORD now = GetTickCount();
            if (now - g_lastDropPollTick >= 200) {
                g_lastDropPollTick = now;

                hr = SimConnect_RequestDataOnSimObject(
                    hSimConnect,
                    REQUEST_LVAR_DROP,
                    SIMCONNECT_OBJECT_ID_USER,
                    DEFINITION_LVAR_DROP,
                    SIMCONNECT_PERIOD_ONCE,
                    0, 0, 0, 0
                );
            }

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
