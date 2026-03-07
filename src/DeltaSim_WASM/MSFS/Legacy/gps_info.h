#ifndef GPS_INFO_H__
#define GPS_INFO_H__


typedef struct GPS_WP_INFO
{
	UINT32				dwSize;				// sizeof
	UINT32				lReserved1;			
	LATLONALT			vPosition;			
	FLOAT64				dHeading;			// magnetic heading in radians
	FLOAT64				dSpeed;				// ground speeed in m/s
	FLOAT64				dAltitude;			// altitude in meters
	char				szName[8];			// id
} GPS_WP_INFO;

typedef struct GPS_INFO
{
	UINT32				dwSize;				// sizeof of this structure; 0 means data is not available yet
	UINT32				dwUpdateRequest;	// 0 - no update; 1 - update next waypoint; 2 - update flight plan
	LATLONALT			vPosition;          // position as calculated by GPS
	FLOAT64				dMagvar;            // magnetic deviation in radians
	FLOAT64				dGroundSpeed;       // in meters/second
	FLOAT64				dGroundHeading;     // true heading in radians
	FLOAT64				dGroundTrack;       // magnetic heading in radians
	BOOL32				bIsFlightPlanAvailable;
	BOOL32				bIsActiveWaypoint;	// is there an active waypoint
	UINT32				bIsDirectTo;		// is the flight plan "DirectTo" plan
	UINT32				lNextWp;			// index of the next waypoint
	LATLONALT			vWpNext;			// coords of the next waypoint
	LATLONALT			vWpPrevious;		// coords of the previous waypoint
	FLOAT64				dWpDistance;        // distance (in meters) to the next waypoint
	FLOAT64				dWpBearing;         // magnetic heading (in radians) to the next waypoint
	FLOAT64				dWpCrossTrk;        // meters from planned track
	FLOAT64				dWpReqHeading;      // magnetic heading (in radians) of planned track
	FLOAT64				dAPHeading;         // magnetic heading to get on planned track
	UINT32				lWpCounts;			// number of waypoint in the flight plan
	GPS_WP_INFO*		pWpData;			// pointer may be NULL if no data available
} GPS_INFO;

#define MAX_GPS_WAYPOINTS	32

#define GPS_INFO_PANEL_VARIABLE_NAME			"FS2002 GPS DATA"			// Panel variable for reading GPS info

#define GPS_REQUEST_PANEL_VARIABLE_NAME			"FS2002 GPS DATA REQUEST"	// Panel variable for requesting update of GPS info

#endif