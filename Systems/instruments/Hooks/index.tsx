import React from 'react'
import * as Defaults from './defaults'
import { SimVarProvider } from './simVars'
import { createRoot } from 'react-dom/client'

export const render = (Slot: React.ReactElement): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(Defaults.getRenderTarget()!)
  root.render(<SimVarProvider>{Slot}</SimVarProvider>)
}
