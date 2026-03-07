//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_RENDER_H
#define _MSFS_RENDER_H

#include "MSFS_Core.h"

#ifdef __cplusplus
extern "C" {
#endif

#pragma pack(push, 4)

	struct FsPaint
	{
		float xform[6];
		float extent[2];
		float radius;
		float feather;
		FsColor innerColor;
		FsColor outerColor;
		int image;
	};
	typedef struct FsPaint FsPaint;

	typedef enum
	{
		FS_ZERO = 1 << 0,
		FS_ONE = 1 << 1,
		FS_SRC_COLOR = 1 << 2,
		FS_ONE_MINUS_SRC_COLOR = 1 << 3,
		FS_DST_COLOR = 1 << 4,
		FS_ONE_MINUS_DST_COLOR = 1 << 5,
		FS_SRC_ALPHA = 1 << 6,
		FS_ONE_MINUS_SRC_ALPHA = 1 << 7,
		FS_DST_ALPHA = 1 << 8,
		FS_ONE_MINUS_DST_ALPHA = 1 << 9,
		FS_SRC_ALPHA_SATURATE = 1 << 10,
	} FsBlendFactor;

	struct FsCompositeOperationState {
		int srcRGB;
		int dstRGB;
		int srcAlpha;
		int dstAlpha;
	};
	typedef struct FsCompositeOperationState FsCompositeOperationState;

	typedef enum FsClipMode {
		FS_CLIP_MODE_REPLACE = 0,		// Specifies that the existing region is replaced by the new region.
		FS_CLIP_MODE_INTERSECT = 1,		// Specifies that the existing region is replaced by the intersection of itselfand the new region.
		FS_CLIP_MODE_UNION = 2,			// Specifies that the existing region is replaced by the union of itselfand the new region.
		FS_CLIP_MODE_XOR = 3,			// Specifies that the existing region is replaced by the result of performing an XOR on the two regions. A point is in the XOR of two regions if it is in one region or the other but not in both regions.
		FS_CLIP_MODE_EXCLUDE = 4,		// Specifies that the existing region is replaced by the portion of itself that is outside of the new region.
		FS_CLIP_MODE_COMPLEMENT = 5,	// Specifies that the existing region is replaced by the portion of the new region that is outside of the existing region.
		FS_CLIP_MODE_IGNORE = 8,
		FS_CLIP_MODE_USE = 16
	} FsClipMode;

	struct FsScissor {
		float xform[6];
		float extent[2];
		bool use;
		bool set;
		FsClipMode mode;
	};
	typedef struct FsScissor FsScissor;

	struct FsVertex {
		float x, y, u, v;
	};
	typedef struct FsVertex FsVertex;

	struct FsPath {
		int first;
		int count;
		unsigned char closed;
		int nbevel;
		FsVertex* fill;
		int nfill;
		FsVertex* stroke;
		int nstroke;
		int winding;
		int convex;
	};
	typedef struct FsPath FsPath;

	/*#define FS_RENDER_IMAGE_GENERATE_MIPMAPS	(1 << 0)*/
	#define FS_RENDER_IMAGE_REPEATX				((FsRenderImageFlags)(1 << 1))
	#define FS_RENDER_IMAGE_REPEATY				((FsRenderImageFlags)(1 << 2))
	#define FS_RENDER_IMAGE_FLIPY				((FsRenderImageFlags)(1 << 3))
	#define FS_RENDER_IMAGE_PREMULTIPLIED		((FsRenderImageFlags)(1 << 4))
	#define FS_RENDER_IMAGE_NEAREST				((FsRenderImageFlags)(1 << 5))

	extern FsTextureId fsRenderCreate(FsContext ctx);
	extern FsTextureId fsRenderCreateTexture(FsContext ctx, int type, int w, int h, FsRenderImageFlags imageFlags, const unsigned char* data, const char* debugName);
	extern FsTextureId fsRenderDeleteTexture(FsContext ctx, int image);
	extern FsTextureId fsRenderUpdateTexture(FsContext ctx, int image, int x, int y, int w, int h, const unsigned char* data);
	extern int fsRenderGetTextureSize(FsContext ctx, int image, int* w, int* h);
	extern void fsRenderViewport(FsContext ctx, float width, float height, float devicePixelRatio);
	extern void fsRenderCancel(FsContext ctx);
	extern void fsRenderFlush(FsContext ctx);
	extern void fsRenderFill(FsContext ctx, FsPaint* paint, FsCompositeOperationState compositeOperation, FsScissor* scissor, float fringe, const float* bounds, const FsPath* paths, int npaths);
	extern void fsRenderStroke(FsContext ctx, FsPaint* paint, FsCompositeOperationState compositeOperation, FsScissor* scissor, float fringe, float strokeWidth, const FsPath* paths, int npaths);
	extern void fsRenderTriangles(FsContext ctx, FsPaint* paint, FsCompositeOperationState compositeOperation, FsScissor* scissor, const FsVertex* verts, int nverts);
	extern void fsRenderClearStencil(FsContext ctx);
	extern void fsRenderDelete(FsContext ctx);

#pragma pack(pop)

#ifdef __cplusplus
}
#endif

#endif // _MSFS_RENDER_H