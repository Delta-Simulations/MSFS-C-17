//-----------------------------------------------------------------------------
//
// Copyright (c) Microsoft Corporation. All Rights Reserved.
//
//-----------------------------------------------------------------------------

#ifndef _MSFS_H
#define _MSFS_H

#ifdef __INTELLISENSE__
#define MSFS_CALLBACK
#else
#define MSFS_CALLBACK __attribute__((visibility("default")))
#endif

#ifdef _DEBUG
inline void __Force__Debug__(void) {}
#define WASM_FORCE_DEBUG __Force__Debug__()
#else
#define WASM_FORCE_DEBUG
#endif

#define PANEL_SERVICE_PRE_QUERY                         0
#define PANEL_SERVICE_POST_QUERY                        1
#define PANEL_SERVICE_PRE_INSTALL                       2       // extra_data = resource_handle
#define PANEL_SERVICE_POST_INSTALL                      3       // extra_data = resource_handle
#define PANEL_SERVICE_PRE_INITIALIZE                    4
#define PANEL_SERVICE_POST_INITIALIZE                   5
#define PANEL_SERVICE_PRE_UPDATE                        6
#define PANEL_SERVICE_POST_UPDATE                       7
#define PANEL_SERVICE_PRE_GENERATE                      8       // extra_data = phase
#define PANEL_SERVICE_POST_GENERATE                     9       // extra_data = phase
#define PANEL_SERVICE_PRE_DRAW                          10
#define PANEL_SERVICE_POST_DRAW                         11
#define PANEL_SERVICE_PRE_KILL                          12
#define PANEL_SERVICE_POST_KILL                         13
#define PANEL_SERVICE_CONNECT_TO_WINDOW                 14      // extra_data = PANEL_WND
#define PANEL_SERVICE_DISCONNECT                        15      // extra_data = PANEL_WND
#define PANEL_SERVICE_PANEL_OPEN                        16
#define PANEL_SERVICE_PANEL_CLOSE                       17

#endif // _MSFS_H