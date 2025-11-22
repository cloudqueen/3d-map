import React, { useState } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { germanyAirspaces, alpineAirspaces } from '../data/airspaceData'
import { PageLayout } from '../components/PageLayout'

export const AirspacesDemo: React.FC = () => {
  const [showGermany, setShowGermany] = useState(true)
  const [showAlpine, setShowAlpine] = useState(true)

  const airspaces = [
    ...(showGermany ? germanyAirspaces : []),
    ...(showAlpine ? alpineAirspaces : [])
  ]

  return (
    <PageLayout
      title="Lufträume in Deutschland"
      description="Visualisierung verschiedener Luftraumbeschränkungen. Klicken Sie auf einen Luftraum für Details zu Typ, Name und Höhenbeschränkungen."
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
            checked={showGermany}
            onChange={(e) => setShowGermany(e.target.checked)}
          />
          <span>Deutschland Lufträume</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showAlpine}
            onChange={(e) => setShowAlpine(e.target.checked)}
          />
          <span>Alpen Lufträume</span>
        </label>
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#666' }}>
          💡 Klicken Sie auf einen Luftraum für Details
        </div>
      </div>

      <Map3D
        width="100%"
        height="calc(100vh - 350px)"
        initialViewState={{
          longitude: 10.5,
          latitude: 49.5,
          zoom: 6,
          pitch: 0,
          bearing: 0
        }}
        useOpenStreetMap
        airspaces={airspaces}
        onMapLoad={(map) => {
          console.log('Airspaces map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Luftraum-Typen</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#FF0000', opacity: 0.3, border: '1px solid #FF0000' }} />
            <span><strong>Restricted (ED-R)</strong> - Beschränkt</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#FF6600', opacity: 0.3, border: '1px solid #FF6600' }} />
            <span><strong>Danger (ED-D)</strong> - Gefahr</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#990000', opacity: 0.3, border: '1px solid #990000' }} />
            <span><strong>Prohibited (ED-P)</strong> - Verboten</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#0066FF', opacity: 0.3, border: '1px solid #0066FF' }} />
            <span><strong>Controlled (CTR)</strong> - Kontrolliert</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#00CC66', opacity: 0.3, border: '1px solid #00CC66' }} />
            <span><strong>Uncontrolled</strong> - Unkontrolliert</span>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
