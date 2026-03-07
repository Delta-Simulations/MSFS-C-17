//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_MAPVIEW_H
#define _MSFS_MAPVIEW_H

#include "MSFS_Core.h"

#ifdef __cplusplus
extern "C" {
#endif

#pragma pack(push, 4)

	typedef enum
	{
		FS_MAP_VIEW_MODE_AERIAL = 0, 
		FS_MAP_VIEW_MODE_ALTITUDE,
	} FsMapViewMode;

	typedef enum
	{
		FS_MAP_VIEW_ALTITUDE_REFERENCE_GEOID = 0,
		FS_MAP_VIEW_ALTITUDE_REFERENCE_PLANE
	} FsMapViewAltitudeReference;

	typedef enum
	{
		FS_MAP_VIEW_WEATHER_RADAR_MODE_TOPVIEW = 0,
		FS_MAP_VIEW_WEATHER_RADAR_MODE_HORIZONTAL,
		FS_MAP_VIEW_WEATHER_RADAR_MODE_VERTICAL
	} FsMapViewWeatherRadarMode;

	typedef enum
	{
		FS_MAP_VIEW_3D_ORIENTATION_FRONTVIEW = 0,
		FS_MAP_VIEW_3D_ORIENTATION_TOPVIEW,
		FS_MAP_VIEW_3D_ORIENTATION_CUSTOM
	} FsMapView3DOrientation;

	typedef struct
	{
		FsColor color;
		float rainRate;
	} FsRainRateColor;

	FsTextureId fsMapViewCreate(FsContext ctx, unsigned uSizeX, unsigned uSizeY, FsRenderImageFlags iRenderImageFlags);
	bool fsMapViewDelete(FsContext ctx, FsTextureId id);
	bool fsMapViewSetVisibility(FsContext ctx, FsTextureId id, bool bVisibility);
	bool fsMapViewSetViewMode(FsContext ctx, FsTextureId id, FsMapViewMode eMode);
	bool fsMapViewSetSize(FsContext ctx, FsTextureId id, unsigned uSizeX, unsigned uSizeY);
	bool fsMapViewSetBackgroundColor(FsContext ctx, FsTextureId id, FsColor color);
	bool fsMapViewSetAltitudeColorList(FsContext ctx, FsTextureId id, FsColor* colors, unsigned nColors);
	bool fsMapViewSetAltitudeReference(FsContext ctx, FsTextureId id, FsMapViewAltitudeReference eRef);
	bool fsMapViewSetAltitudeRangeInFeet(FsContext ctx, FsTextureId id, double dMin, double dMax);
	bool fsMapViewSetWeatherRadarVisibility(FsContext ctx, FsTextureId id, bool bVisibility);
	bool fsMapViewSetWeatherRadarRainColors(FsContext ctx, FsTextureId id, FsRainRateColor* colors, unsigned nColors);
	bool fsMapViewSetWeatherRadarMode(FsContext ctx, FsTextureId id, FsMapViewWeatherRadarMode eMode);
	bool fsMapViewSetWeatherRadarConeAngleInRadians(FsContext ctx, FsTextureId id, float fConeAngle);
	bool fsMapViewSetMapIsolinesVisibility(FsContext ctx, FsTextureId id, bool bVisibility);
	bool fsMapViewSet3D(FsContext ctx, FsTextureId id, bool bEnable);
	bool fsMapViewSet2DViewLatLong(FsContext ctx, FsTextureId id, double dLatitude, double dLongitude);
	bool fsMapViewSet2DViewRadiusInMeters(FsContext ctx, FsTextureId id, float fRadius);
	bool fsMapViewSet2DViewFollowMode(FsContext ctx, FsTextureId id, bool bFollow);
	bool fsMapViewSet3DViewOrientation(FsContext ctx, FsTextureId id, FsMapView3DOrientation eOrientation);
	bool fsMapViewSet3DCustomViewOrientationInRadians(FsContext ctx, FsTextureId id, double dPitch, double dBank, double dHeading);

#pragma pack(pop)

#ifdef __cplusplus
}
#endif

#endif