import React, { useState } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { gleitschirmflug } from '../data/flightData'
import { PageLayout } from '../components/PageLayout'

export const ParaglidingDemo: React.FC = () => {
  const [show3D, setShow3D] = useState(true)
  const [showMarkers, setShowMarkers] = useState(true)

  const flightPath = {
    ...gleitschirmflug,
    showMarkers
  }

  return (
    <PageLayout
      title="Gleitschirmflug in den Alpen"
      description="Ein Gleitschirmflug im Chiemgau mit vollständiger 3D-Terrain-Darstellung. Die Route zeigt den typischen Verlauf eines Thermikflugs mit Steigphasen und Gleitflug."
    >
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={show3D}
            onChange={(e) => setShow3D(e.target.checked)}
          />
          <span>3D-Terrain</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showMarkers}
            onChange={(e) => setShowMarkers(e.target.checked)}
          />
          <span>Wegpunkte anzeigen</span>
        </label>
        <div style={{ marginLeft: 'auto', color: '#666' }}>
          <strong>Höhe:</strong> {gleitschirmflug.positions[0].altitude}m - {Math.max(...gleitschirmflug.positions.map(p => p.altitude || 0))}m
        </div>
        <div style={{ color: '#666' }}>
          <strong>Dauer:</strong> ~{Math.round((gleitschirmflug.positions[gleitschirmflug.positions.length - 1].timestamp! - gleitschirmflug.positions[0].timestamp!) / 60000)} Min.
        </div>
      </div>

      <Map3D
        width="100%"
        height="calc(100vh - 200px)"
        initialViewState={{
          longitude: 12.52,
          latitude: 47.815,
          zoom: 12,
          pitch: 60,
          bearing: -20
        }}
        useOpenTopoMap
        terrain={show3D ? {
          enabled: true,
          exaggeration: 2.0
        } : undefined}
        flightPaths={[flightPath]}
        onMapLoad={(map) => {
          console.log('Paragliding map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Flugdetails</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Start: {gleitschirmflug.positions[0].altitude}m über NN</li>
          <li>Maximale Höhe: {Math.max(...gleitschirmflug.positions.map(p => p.altitude || 0))}m</li>
          <li>Landung: {gleitschirmflug.positions[gleitschirmflug.positions.length - 1].altitude}m</li>
          <li>Gesamtstrecke: ~{(gleitschirmflug.positions.length * 0.5).toFixed(1)} km (geschätzt)</li>
        </ul>
      </div>
    </PageLayout>
  )
}
