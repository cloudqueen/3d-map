import React, { useState } from 'react'
import { Map3D } from '../components/Map3D'
import type { FlightPath, Track, Airspace, WindLayer, TerrainConfig } from '../types'

const exampleFlightPath: FlightPath = {
  id: 'flight-1',
  name: 'Example Flight Path',
  positions: [
    { longitude: 8.5, latitude: 50.0, altitude: 0 },
    { longitude: 8.7, latitude: 50.2, altitude: 500 },
    { longitude: 9.0, latitude: 50.4, altitude: 1000 },
    { longitude: 9.3, latitude: 50.5, altitude: 1200 },
    { longitude: 9.6, latitude: 50.3, altitude: 800 },
    { longitude: 9.9, latitude: 50.1, altitude: 200 },
  ],
  color: '#FF0000',
  width: 3,
  showMarkers: true
}

const exampleTrack: Track = {
  id: 'track-1',
  name: 'Hiking Trail',
  positions: [
    { longitude: 10.0, latitude: 51.0, altitude: 300 },
    { longitude: 10.1, latitude: 51.05, altitude: 350 },
    { longitude: 10.15, latitude: 51.1, altitude: 400 },
    { longitude: 10.2, latitude: 51.15, altitude: 450 },
    { longitude: 10.25, latitude: 51.2, altitude: 500 },
  ],
  color: '#0066FF',
  width: 3
}

const exampleAirspace: Airspace = {
  id: 'airspace-1',
  name: 'Restricted Zone Alpha',
  type: 'restricted',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [9.5, 50.8],
      [9.8, 50.8],
      [9.8, 51.0],
      [9.5, 51.0],
      [9.5, 50.8]
    ]]
  },
  lowerAltitude: 0,
  upperAltitude: 5000,
  opacity: 0.3
}

const exampleWindLayer: WindLayer = {
  data: [
    { id: 'w1', position: { longitude: 10.0, latitude: 51.0 }, speed: 15, direction: 45 },
    { id: 'w2', position: { longitude: 10.2, latitude: 51.1 }, speed: 20, direction: 90 },
    { id: 'w3', position: { longitude: 10.4, latitude: 51.2 }, speed: 12, direction: 135 },
    { id: 'w4', position: { longitude: 9.8, latitude: 50.9 }, speed: 18, direction: 180 },
    { id: 'w5', position: { longitude: 9.6, latitude: 50.8 }, speed: 25, direction: 225 },
  ],
  showArrows: true,
  color: '#00AA00',
  scale: 1.5
}

export const App: React.FC = () => {
  const [showFlightPath, setShowFlightPath] = useState(true)
  const [showTrack, setShowTrack] = useState(true)
  const [showAirspace, setShowAirspace] = useState(true)
  const [showWind, setShowWind] = useState(true)
  const [terrainEnabled, setTerrainEnabled] = useState(false)

  const terrainConfig: TerrainConfig = {
    enabled: terrainEnabled,
    exaggeration: 1.5
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '15px',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>3D Map Component Demo</h1>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={showFlightPath}
            onChange={(e) => setShowFlightPath(e.target.checked)}
          />
          Flight Path
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={showTrack}
            onChange={(e) => setShowTrack(e.target.checked)}
          />
          Track
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={showAirspace}
            onChange={(e) => setShowAirspace(e.target.checked)}
          />
          Airspace
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={showWind}
            onChange={(e) => setShowWind(e.target.checked)}
          />
          Wind
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={terrainEnabled}
            onChange={(e) => setTerrainEnabled(e.target.checked)}
          />
          3D Terrain
        </label>
      </div>

      <Map3D
        width="100%"
        height="100%"
        initialViewState={{
          longitude: 9.5,
          latitude: 50.8,
          zoom: 8,
          pitch: 45,
          bearing: 0
        }}
        useOpenTopoMap={true}
        terrain={terrainConfig}
        flightPaths={showFlightPath ? [exampleFlightPath] : []}
        tracks={showTrack ? [exampleTrack] : []}
        airspaces={showAirspace ? [exampleAirspace] : []}
        windLayer={showWind ? exampleWindLayer : undefined}
        onMapLoad={(map) => {
          console.log('Map loaded!', map)
        }}
        onViewStateChange={(viewState) => {
          console.log('View state changed:', viewState)
        }}
      />
    </div>
  )
}

export default App
