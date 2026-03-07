//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_VECTOR_H
#define _MSFS_VECTOR_H

#include "MSFS_Core.h"
#include <cmath>

#ifdef __cplusplus
extern "C" {
#endif

#pragma pack(push, 4)
	
	static inline FsVec2f vec2f_add(FsVec2f a, FsVec2f b) { return (FsVec2f) { a.x + b.x, a.y + b.y }; }
	static inline FsVec2f vec2f_sub(FsVec2f a, FsVec2f b) { return (FsVec2f) { a.x - b.x, a.y - b.y }; }
	static inline FsVec2f vec2f_mul(FsVec2f a, FsVec2f b) { return (FsVec2f) { a.x * b.x, a.y * b.y }; }
	static inline FsVec2f vec2f_muls(FsVec2f a, float b) { return (FsVec2f) { a.x * b, a.y * b }; }

	static inline FsVec2d vec2d_add(FsVec2d a, FsVec2d b) { return (FsVec2d) { a.x + b.x, a.y + b.y }; }
	static inline FsVec2d vec2d_sub(FsVec2d a, FsVec2d b) { return (FsVec2d) { a.x - b.x, a.y - b.y }; }
	static inline FsVec2d vec2d_mul(FsVec2d a, FsVec2d b) { return (FsVec2d) { a.x * b.x, a.y * b.y }; }
	static inline FsVec2d vec2d_muls(FsVec2d a, double b) { return (FsVec2d) { a.x * b, a.y * b }; }

	static inline FsVec3f vec3f_add(FsVec3f a, FsVec3f b) { return (FsVec3f) { a.x + b.x, a.y + b.y, a.z + b.z }; }
	static inline FsVec3f vec3f_sub(FsVec3f a, FsVec3f b) { return (FsVec3f) { a.x - b.x, a.y - b.y, a.z - b.z }; }
	static inline FsVec3f vec3f_mul(FsVec3f a, FsVec3f b) { return (FsVec3f) { a.x * b.x, a.y* b.y, a.z* b.z }; }
	static inline FsVec3f vec3f_muls(FsVec3f a, float b) { return (FsVec3f) { a.x * b, a.y * b, a.z * b }; }
	static inline FsVec3f vec3f_divs(FsVec3f a, float b) { return (FsVec3f) { a.x / b, a.y / b, a.z / b }; }
	static inline float vec3f_dot(FsVec3f a, FsVec3f b) { return a.x * b.x + a.y * b.y + a.z * b.z; }
	static inline float vec3f_norm2(FsVec3f a) { return vec3f_dot(a, a); }
	static inline float vec3f_norm(FsVec3f a) { return std::sqrt(vec3f_norm2(a)); }
	static inline FsVec3f vec3f_normalize(FsVec3f a) {
		float na = vec3f_norm(a);
		if (na > 0)
			return vec3f_divs(a, na);
		return (FsVec3f) { 0, 0, 0 };
	};

	static inline FsVec3d vec3d_add(FsVec3d a, FsVec3d b) { return (FsVec3d) { a.x + b.x, a.y + b.y, a.z + b.z }; }
	static inline FsVec3d vec3d_sub(FsVec3d a, FsVec3d b) { return (FsVec3d) { a.x - b.x, a.y - b.y, a.z - b.z }; }
	static inline FsVec3d vec3d_mul(FsVec3d a, FsVec3d b) { return (FsVec3d) { a.x * b.x, a.y * b.y, a.z * b.z }; }
	static inline FsVec3d vec3d_muls(FsVec3d a, double b) { return (FsVec3d) { a.x * b, a.y * b, a.z * b }; }
	static inline FsVec3d vec3d_divs(FsVec3d a, double b) { return (FsVec3d) { a.x / b, a.y / b, a.z / b }; }
	static inline double vec3d_dot(FsVec3d a, FsVec3d b) { return a.x * b.x + a.y * b.y + a.z * b.z; }
	static inline double vec3d_norm2(FsVec3d a) { return vec3d_dot(a, a); }
	static inline double vec3d_norm(FsVec3d a) { return std::sqrt(vec3d_norm2(a)); }
	static inline FsVec3d vec3f_normalize(FsVec3d a) {
		double na = vec3d_norm(a);
		if (na > 0)
			return vec3d_divs(a, na);
		return (FsVec3d) { 0, 0, 0 };
	};

#pragma pack(pop)

#ifdef __cplusplus
}
#endif

#endif // _MSFS_VECTOR_H