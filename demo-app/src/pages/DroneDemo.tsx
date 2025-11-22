import React, { useState } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { drohnenflug } from '../data/flightData'
import { PageLayout } from '../components/PageLayout'

export const DroneDemo: React.FC = () => {
  const [showPath, setShowPath] = useState(true)
  const [showMarkers, setShowMarkers] = useState(true)

  return (
    <PageLayout
      title="Drohnen-Inspektionsflug"
      description="Automatisierter Inspektionsflug einer Drohne zur Überprüfung von Windkraftanlagen. Die Route zeigt typische Flugmuster für Inspektionsaufgaben."
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
            checked={showPath}
            onChange={(e) => setShowPath(e.target.checked)}
          />
          <span>Flugpfad anzeigen</span>
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
          <strong>Flughöhe:</strong> 50-150m
        </div>
        <div style={{ color: '#666' }}>
          <strong>Dauer:</strong> ~4 Minuten
        </div>
      </div>

      <Map3D
        width="100%"
        height="calc(100vh - 300px)"
        initialViewState={{
          longitude: 8.206,
          latitude: 53.103,
          zoom: 14,
          pitch: 55,
          bearing: 30
        }}
        useOpenStreetMap
        flightPaths={showPath ? [{
          ...drohnenflug,
          showMarkers
        }] : []}
        onMapLoad={(map) => {
          console.log('Drone map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Inspektionsdetails</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginTop: '15px'
        }}>
          <div>
            <h4>Flugparameter</h4>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Drohnentyp: DJI Matrice 300 RTK</li>
              <li>Startgewicht: ~6.3 kg</li>
              <li>Max. Flughöhe: 150m AGL</li>
              <li>Kamera: Zenmuse H20T</li>
              <li>Wegpunkte: {drohnenflug.positions.length}</li>
            </ul>
          </div>
          <div>
            <h4>Inspektionsziele</h4>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Sichtprüfung der Rotorblätter</li>
              <li>Thermografie-Aufnahmen</li>
              <li>Strukturelle Integrität</li>
              <li>Oberflächenschäden erkennen</li>
              <li>Automatische Bildauswertung</li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#E3F2FD',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>ℹ️ Hinweis:</strong> Drohnenflüge müssen in Deutschland bei der zuständigen Luftfahrtbehörde angemeldet werden.
          Für gewerbliche Inspektionsflüge ist zusätzlich eine Aufstiegsgenehmigung erforderlich.
        </div>
      </div>
    </PageLayout>
  )
}
