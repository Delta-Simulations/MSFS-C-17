//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_CORE_H
#define _MSFS_CORE_H

// id of the user's sim object
#define SIM_OBJECT_ID_USER 0ul

#ifdef __cplusplus
extern "C" {
#endif

#pragma pack(push, 4)

	typedef struct
	{
		union
		{
			float rgba[4];
			struct {
				float r, g, b, a;
			};
		};
	} FsColor;

	typedef struct
	{ 
		float x, y; 
	} FsVec2f;

	typedef struct
	{ 
		double x, y; 
	} FsVec2d;

	typedef struct
	{ 
		float x, y, z;
	} FsVec3f;

	typedef struct
	{
		double x, y, z;
	} FsVec3d;

	typedef int FsTextureId;
	typedef unsigned long long FsContext;
	typedef int FsRenderImageFlags;
	typedef unsigned long FsSimObjId;

#pragma pack(pop)

#ifdef __cplusplus
}
#endif

#endif