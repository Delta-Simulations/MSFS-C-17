#include <MSFS/MSFS_Core.h>

typedef long long FsNetworkRequestId;

typedef void (*HttpRequestCallback)(FsNetworkRequestId requestId, int errorCode, void* userData);

#pragma pack(push, 1)

struct FsNetworkHttpRequestParam
{
	char* postField;
	char** headerOptions;
	unsigned int headerOptionsSize;
	unsigned char* data;
	unsigned int dataSize;
};

enum FsNetworkHttpRequestState : unsigned char
{
	FS_NETWORK_HTTP_REQUEST_STATE_INVALID,			// invalid handle
	FS_NETWORK_HTTP_REQUEST_STATE_NEW,				// request has not yet been asked to the web service
	FS_NETWORK_HTTP_REQUEST_STATE_WAITING_FOR_DATA,	// waiting for an answer from the web service
	FS_NETWORK_HTTP_REQUEST_STATE_DATA_READY,		// data ready (will be available only during this frame)
	FS_NETWORK_HTTP_REQUEST_STATE_FAILED,			// failed to retrieve data, slot will be freed upon next update
};

#pragma pack(pop)

#ifdef __cplusplus
extern "C" {
#endif

	FsNetworkRequestId fsNetworkHttpRequestGet(const char* url, FsNetworkHttpRequestParam* param, HttpRequestCallback callback, void* userData);
	FsNetworkRequestId fsNetworkHttpRequestPost(const char* url, FsNetworkHttpRequestParam* param, HttpRequestCallback callback, void* userData);
	FsNetworkRequestId fsNetworkHttpRequestPut(const char* url, FsNetworkHttpRequestParam* param, HttpRequestCallback callback, void* userData);

	FsNetworkHttpRequestState fsNetworkHttpRequestGetState(FsNetworkRequestId requestId);
	int fsNetworkHttpRequestGetErrorCode(FsNetworkRequestId requestId);
 char* fsNetworkHttpRequestGetHeaderSection(FsNetworkRequestId requestId, const char* section);
	unsigned char* fsNetworkHttpRequestGetData(FsNetworkRequestId requestId);
 unsigned long fsNetworkHttpRequestGetDataSize(FsNetworkRequestId requestId);
 bool fsNetworkHttpCancelRequest(FsNetworkRequestId requestId);

#ifdef __cplusplus
}
#endif