import React from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import type { FlightPath } from '@cloudqueen/3d-map-component'

export const BasicUsage: React.FC = () => {
  const flightPath: FlightPath = {
    id: 'basic-flight',
    name: 'Basic Flight Example',
    positions: [
      { longitude: 8.5, latitude: 50.0, altitude: 0 },
      { longitude: 9.0, latitude: 50.5, altitude: 1000 },
      { longitude: 9.5, latitude: 51.0, altitude: 500 },
    ],
    color: '#FF0000',
    width: 3,
    showMarkers: true
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Map3D
        flightPaths={[flightPath]}
        initialViewState={{
          longitude: 9.0,
          latitude: 50.5,
          zoom: 8
        }}
        useOpenTopoMap
      />
    </div>
  )
}
