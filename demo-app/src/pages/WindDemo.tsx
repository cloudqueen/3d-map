import React, { useState } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { northSeaWind, alpineWind, calmWind } from '../data/windData'
import { PageLayout } from '../components/PageLayout'

export const WindDemo: React.FC = () => {
  const [selectedWind, setSelectedWind] = useState<'northsea' | 'alpine' | 'calm'>('northsea')

  const windLayers = {
    northsea: northSeaWind,
    alpine: alpineWind,
    calm: calmWind
  }

  const viewStates = {
    northsea: { longitude: 7.4, latitude: 54.2, zoom: 8 },
    alpine: { longitude: 10.8, latitude: 47.7, zoom: 8 },
    calm: { longitude: 10.3, latitude: 51.1, zoom: 8 }
  }

  return (
    <PageLayout
      title="Wind-Visualisierung"
      description="Windrichtungen und -geschwindigkeiten an verschiedenen Standorten. Pfeile zeigen die Windrichtung, die Länge repräsentiert die Geschwindigkeit."
    >
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <span><strong>Standort:</strong></span>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="radio"
            name="wind"
            checked={selectedWind === 'northsea'}
            onChange={() => setSelectedWind('northsea')}
          />
          <span>Nordsee (stark)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="radio"
            name="wind"
            checked={selectedWind === 'alpine'}
            onChange={() => setSelectedWind('alpine')}
          />
          <span>Alpen (mittel)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="radio"
            name="wind"
            checked={selectedWind === 'calm'}
            onChange={() => setSelectedWind('calm')}
          />
          <span>Inland (schwach)</span>
        </label>
      </div>

      <Map3D
        key={selectedWind}
        width="100%"
        height="calc(100vh - 300px)"
        initialViewState={{
          ...viewStates[selectedWind],
          pitch: 0,
          bearing: 0
        }}
        useOpenStreetMap
        windLayer={windLayers[selectedWind]}
        onMapLoad={(map) => {
          console.log('Wind map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Windstatistik für {
          selectedWind === 'northsea' ? 'Nordsee' :
          selectedWind === 'alpine' ? 'Alpen' : 'Inland'
        }</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
          <div>
            <strong>Durchschnitt:</strong> {
              (windLayers[selectedWind].data.reduce((sum, w) => sum + w.speed, 0) / windLayers[selectedWind].data.length).toFixed(1)
            } m/s
          </div>
          <div>
            <strong>Maximum:</strong> {
              Math.max(...windLayers[selectedWind].data.map(w => w.speed))
            } m/s
          </div>
          <div>
            <strong>Minimum:</strong> {
              Math.min(...windLayers[selectedWind].data.map(w => w.speed))
            } m/s
          </div>
        </div>
        <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
          💡 Klicken Sie auf einen Windpunkt für detaillierte Informationen zu Geschwindigkeit und Richtung.
        </p>
      </div>
    </PageLayout>
  )
}
