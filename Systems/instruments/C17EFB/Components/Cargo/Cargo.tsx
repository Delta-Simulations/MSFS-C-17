import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'
import { Button, Slider, ThemeProvider } from '@mui/material'

import MuiInput from '@mui/material/Input'
import Container from '@mui/material/Container'
import { useSimVar } from '../../../Hooks/simVars'
import { ButtonColour } from '../ThemesEFB'
import ButtonGroup from '@mui/material/ButtonGroup'
import { ImagesCargo } from './CargoImages'

import './cargo.scss'

export const Cargo = () => {
  let [GPU] = useSimVar('L:C17_GPU_Vis', 'bool')

  let [removeTags, setremoveTags] = useSimVar('L:C17_RBF_TAGS', 'bool')
  let [rearDoorL, setRearDoorL] = useSimVar('L:C17_PARA_L', 'bool')
  let [rearDoorR, setRearDoorR] = useSimVar('L:C17_PARA_R', 'bool')
  let [CargoDoor, setCargoDoor] = useSimVar('L:C17_CargoDoor_POS', 'enum')
  let [ARSlipway, setARSlipway] = useSimVar('L:C17_UARRSI_Slipway', 'bool')
  let [EnteranceDoor, setEnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool')
  let [WXDome, setWXDome] = useSimVar('L:C17_Radome_Open', 'bool')
  const [CargoHoldFlood, setCargoHoldFlood] = useSimVar('A:LIGHT POTENTIOMETER:18', 'percent')
  const handleChange = (event: Event, newValue: number | number[]) => {
    setCargoHoldFlood(newValue as number)
  }
  return (
    <div className="aircraftContainer">
      <Box
        sx={{
          position: 'absolute',
          width: 1040,
          height: 810,
          borderRadius: 4,
          left: 0,
          justifyContent: 'Left',
          display: 'flex',
          textAlign: 'center',
          fontSize: 14
        }}
      >
        <ImagesCargo />
        <Box
          sx={{
            position: 'absolute',
            width: 240,
            height: 180,
            backgroundColor: '#343a40',
            borderRadius: 1,
            left: 15,
            top: 20,
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
            justifyContent: 'start',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: 14,
            padding: 1
          }}
        >
          <h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Cargo Bay Flood</h2>
          <Stack direction="column" spacing={1}>
            <ThemeProvider theme={ButtonColour}>
              <Slider
                aria-labelledby="CargoHoldFlood"
                value={CargoHoldFlood}
                onChange={handleChange}
                sx={{
                  color: 'orange', // Set the color to orange
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#ffaa00' // Set the color of the slider thumb to orange
                  }
                }}
              />
              <Button onClick={() => setWXDome(!WXDome)} size="large" variant={WXDome ? 'contained' : 'outlined'}>
                WX Dome
              </Button>
              <Button
                onClick={() => setremoveTags(!removeTags)}
                size="large"
                variant={removeTags ? 'contained' : 'outlined'}
              >
                Cones & Covers
              </Button>
            </ThemeProvider>
          </Stack>
        </Box>
        <ThemeProvider theme={ButtonColour}>
          <Button
            onClick={() => setRearDoorL(!rearDoorL)}
            size="large"
            variant={rearDoorL ? 'contained' : 'outlined'}
            style={{
              position: 'absolute',
              top: '640px',
              left: '620px',
              margin: '10px',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
              backgroundColor: rearDoorL ? ButtonColour.palette.primary.main : '#22262a'
            }}
          >
            Para Door L
          </Button>
        </ThemeProvider>
      </Box>
    </div>
  )
}
