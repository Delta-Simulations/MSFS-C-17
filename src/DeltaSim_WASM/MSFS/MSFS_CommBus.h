//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_COMM_BUS_H
#define _MSFS_COMM_BUS_H

typedef void (*fsCommBusWasmCallback)(const char* buf, unsigned int bufSize, void* ctx);

enum FsCommBusBroadcastFlags : unsigned char
{
	FsCommBusBroadcast_JS = 1 << 0,
	FsCommBusBroadcast_Wasm = 1 << 1,
	FsCommBusBroadcast_WasmSelfCall = 1 << 2, // need FsCommBusBroadcast_Wasm, allow the module to search the Broadcastback in the same module

	FsCommBusBroadcast_Default = FsCommBusBroadcast_JS | FsCommBusBroadcast_Wasm,
	FsCommBusBroadcast_AllWasm = FsCommBusBroadcast_Wasm | FsCommBusBroadcast_WasmSelfCall,
	FsCommBusBroadcast_All = FsCommBusBroadcast_JS | FsCommBusBroadcast_Wasm | FsCommBusBroadcast_WasmSelfCall
};

#ifdef __cplusplus
extern "C" {
#endif
    bool fsCommBusCall(const char* eventName, const char* buf, unsigned int bufSize, FsCommBusBroadcastFlags broadcastTo = FsCommBusBroadcast_Default);
    
    bool fsCommBusRegister(const char* eventName, fsCommBusWasmCallback callback, void* context = nullptr);

	int fsCommBusUnregister(const char* eventName, fsCommBusWasmCallback callback = nullptr);
	bool fsCommBusUnregisterOneEvent(const char* eventName, fsCommBusWasmCallback callback, void* ctx);

	bool fsCommBusUnregisterAll();
#ifdef __cplusplus
}
#endif


#endif //!_MSFS_COMM_BUS_H