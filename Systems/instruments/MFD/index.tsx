import React from 'react'
import './index.scss'
import { render } from '../Hooks'
import { PFD } from './Pages/PFD/PFD'

const MFD = () => {
  return (
    <div className="MFD">
      <PFD />
    </div>
  )
}

render(<MFD />)
