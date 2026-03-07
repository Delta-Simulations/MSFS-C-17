//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_WEATHER_H
#define _MSFS_WEATHER_H

#include "MSFS_Core.h"

#ifdef __cplusplus
extern "C" {
#endif

#pragma pack(push, 4)

	typedef struct 
	{
		FsVec3f	ACLocalPos;
		FsVec3d	WorldPos;
		float	GroundAltitude;
		float	AGLFeet;
		FsVec3f	GroundNormal;			// Use normals to determine altitude gradients...
		FsVec3f	GroundNormalLow;
		FsVec3f	GroundNormalVeryLow;
		FsVec3f	GroundNormalAverage;
		float	AirDensity;
		float	AirTemperature;
		float	DewPointTemperature;
		float	PctHumidity;
		float	AirPressure;
		float	CloudDensity;
		float	ColumnCloudDensity;
		float	ColumnCloudDensityBlur;
		FsVec2f	ColumnCloudGradient;
		float	AverageCloudDensity;
		float	AverageCloudCoverage;
		float	RainDensity;
		float	GroundIsWater;
		FsVec2f	GroundIsWaterGradient;
		float	GroundIsForest;
		FsVec3f	GroundAlbedo;
		FsVec2f	GroundAlbedoGradientR;
		FsVec2f	GroundAlbedoGradientG;
		FsVec2f	GroundAlbedoGradientB;
		FsVec3f	WindSpeed;
		FsVec3f	WindTurbulencesSpeed;
		FsVec3f	WakeTurbulenceSpeed;
		double	WorldTime;
		float	TemperatureAltitudeGradient;
		float	GroundSunLight, GroundSunLightWClouds;
		float	CloudBottom;
		float	CloudTop;
		float	SeaLevelSunLight, SeaLevelSunLightWClouds;
		float	SeaLevelTemperature;
		float	GroundAirTemperature;
		float	GroundVoxelSurfaceTemperature;
		float	GroundVoxelSurfaceDraftEquilibriumTemperature;
		float	GroundCFDSurfaceTemperature;
		FsVec3f	AverageGroundAlbedo;
		float	AverageGroundRadianceAbsorbtion;
		float	AverageGroundisVegetation;

	} FsAtmospherePoint;

#pragma pack(pop)

#ifdef __cplusplus
}
#endif

#endif // _MSFS_WEATHER_H