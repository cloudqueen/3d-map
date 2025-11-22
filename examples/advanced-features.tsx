import React, { useState, useCallback } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import type {
  FlightPath,
  Track,
  Airspace,
  WindLayer,
  ViewState
} from '@cloudqueen/3d-map-component'

export const AdvancedFeatures: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 10.0,
    latitude: 51.0,
    zoom: 8,
    pitch: 45,
    bearing: 0
  })

  const flightPath: FlightPath = {
    id: 'paragliding-flight',
    name: 'Gleitschirmflug Alpen',
    positions: [
      { longitude: 10.2, latitude: 47.5, altitude: 1200, timestamp: Date.now() - 3600000 },
      { longitude: 10.3, latitude: 47.52, altitude: 1500, timestamp: Date.now() - 3000000 },
      { longitude: 10.4, latitude: 47.55, altitude: 1800, timestamp: Date.now() - 2400000 },
      { longitude: 10.5, latitude: 47.58, altitude: 2100, timestamp: Date.now() - 1800000 },
      { longitude: 10.6, latitude: 47.60, altitude: 1900, timestamp: Date.now() - 1200000 },
      { longitude: 10.7, latitude: 47.62, altitude: 1500, timestamp: Date.now() - 600000 },
      { longitude: 10.8, latitude: 47.65, altitude: 1100, timestamp: Date.now() }
    ],
    color: '#FF6600',
    width: 3,
    showMarkers: true
  }

  const hikingTrack: Track = {
    id: 'alpine-trail',
    name: 'Alpenüberquerung',
    positions: [
      { longitude: 10.0, latitude: 47.3, altitude: 600 },
      { longitude: 10.1, latitude: 47.35, altitude: 850 },
      { longitude: 10.2, latitude: 47.4, altitude: 1200 },
      { longitude: 10.3, latitude: 47.45, altitude: 1600 },
      { longitude: 10.4, latitude: 47.5, altitude: 2100 },
      { longitude: 10.5, latitude: 47.55, altitude: 2400 },
      { longitude: 10.6, latitude: 47.6, altitude: 1900 },
    ],
    color: '#0066FF',
    width: 4
  }

  const airspaces: Airspace[] = [
    {
      id: 'ed-r-example',
      name: 'ED-R Testgebiet',
      type: 'restricted',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [10.3, 47.4],
          [10.6, 47.4],
          [10.6, 47.6],
          [10.3, 47.6],
          [10.3, 47.4]
        ]]
      },
      lowerAltitude: 0,
      upperAltitude: 10000,
      color: '#FF0000',
      opacity: 0.25
    },
    {
      id: 'controlled-zone',
      name: 'Kontrollzone',
      type: 'controlled',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [10.7, 47.5],
          [10.9, 47.5],
          [10.9, 47.7],
          [10.7, 47.7],
          [10.7, 47.5]
        ]]
      },
      lowerAltitude: 0,
      upperAltitude: 15000,
      color: '#0066FF',
      opacity: 0.2
    }
  ]

  const windLayer: WindLayer = {
    data: [
      { id: 'w1', position: { longitude: 10.2, latitude: 47.5 }, speed: 15, direction: 270 },
      { id: 'w2', position: { longitude: 10.4, latitude: 47.5 }, speed: 20, direction: 280 },
      { id: 'w3', position: { longitude: 10.6, latitude: 47.5 }, speed: 18, direction: 290 },
      { id: 'w4', position: { longitude: 10.8, latitude: 47.5 }, speed: 22, direction: 275 },
      { id: 'w5', position: { longitude: 10.2, latitude: 47.6 }, speed: 25, direction: 265 },
      { id: 'w6', position: { longitude: 10.4, latitude: 47.6 }, speed: 28, direction: 270 },
      { id: 'w7', position: { longitude: 10.6, latitude: 47.6 }, speed: 24, direction: 280 },
      { id: 'w8', position: { longitude: 10.8, latitude: 47.6 }, speed: 20, direction: 285 },
    ],
    showArrows: true,
    color: '#00AA00',
    scale: 2
  }

  const handleMapLoad = useCallback((map: any) => {
    console.log('Map loaded successfully!', map)
  }, [])

  const handleViewStateChange = useCallback((newViewState: ViewState) => {
    setViewState(newViewState)
    console.log('View state:', newViewState)
  }, [])

  const handleMapClick = useCallback((event: any) => {
    console.log('Clicked at:', event.lngLat)
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '15px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Advanced Features Demo</h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <div>
            <strong>Lon:</strong> {viewState.longitude.toFixed(4)}
          </div>
          <div>
            <strong>Lat:</strong> {viewState.latitude.toFixed(4)}
          </div>
          <div>
            <strong>Zoom:</strong> {viewState.zoom.toFixed(2)}
          </div>
          <div>
            <strong>Pitch:</strong> {viewState.pitch?.toFixed(0) || 0}°
          </div>
          <div>
            <strong>Bearing:</strong> {viewState.bearing?.toFixed(0) || 0}°
          </div>
        </div>
      </div>

      <Map3D
        width="100%"
        height="100%"
        initialViewState={viewState}
        useOpenTopoMap
        terrain={{
          enabled: true,
          exaggeration: 2.0
        }}
        flightPaths={[flightPath]}
        tracks={[hikingTrack]}
        airspaces={airspaces}
        windLayer={windLayer}
        onMapLoad={handleMapLoad}
        onViewStateChange={handleViewStateChange}
        onClick={handleMapClick}
      />
    </div>
  )
}
