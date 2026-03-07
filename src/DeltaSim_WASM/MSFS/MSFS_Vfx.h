//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_VFX_H
#define _MSFS_VFX_H

#include "MSFS_Core.h"

typedef long long FsVfxId;
#define FSVFXID_NULL 0xFFFFFFFF00000000

#pragma pack(push, 4)

typedef struct {
	const char* paramName;
	const char* RPNExpression;
} FsVfxGraphParam;

#pragma pack(pop)

#ifdef __cplusplus
extern "C" {
#endif

	FsVfxId fsVfxSpawnInWorld(const char* strGuid, FsVec3d lla, FsVec3d pbh = { 0, 0, 0 }, float minEmissionTime = -1.f, FsVfxGraphParam* graphParams = nullptr, int graphParamsSize = 0);
	FsVfxId fsVfxSpawnOnSimObject(const char* strGuid, FsSimObjId simObjId = 0, const char* nodeName = nullptr, FsVec3d offset = { 0, 0, 0 }, FsVec3d pbhOffset = { 0, 0, 0 }, float minEmissionTime = -1.f, FsVfxGraphParam* graphParams = nullptr, int graphParamsSize = 0);

	bool fsVfxPlayInstance(FsVfxId id);
	bool fsVfxStopInstance(FsVfxId id);
	bool fsVfxDestroyInstance(FsVfxId id);

	bool fsVfxIsInstancePlaying(FsVfxId id);
	bool fsVfxIsMinTimePassed(FsVfxId id);
	bool fsVfxIsValid(FsVfxId id);

	bool fsVfxSetOffset(FsVfxId id, FsVec3d newOffset);
	bool fsVfxSetWorldPosition(FsVfxId id, FsVec3d newLla);
	bool fsVfxSetRotation(FsVfxId id, FsVec3d newPbh);

#ifdef __cplusplus
}
#endif

#endif