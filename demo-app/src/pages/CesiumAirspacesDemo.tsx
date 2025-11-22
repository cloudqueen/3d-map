import React, { useState } from 'react'
import { CesiumMap3D } from '@cloudqueen/3d-map-component'
import type { CesiumAirspace } from '@cloudqueen/3d-map-component'
import { germanyAirspaces, alpineAirspaces } from '../data/airspaceData'
import { PageLayout } from '../components/PageLayout'

export const CesiumAirspacesDemo: React.FC = () => {
  const [showGermany, setShowGermany] = useState(true)
  const [showAlpine, setShowAlpine] = useState(true)
  const [extruded, setExtruded] = useState(true)
  const [showTerrain, setShowTerrain] = useState(true)

  // Convert to Cesium airspaces with 3D extrusion
  const cesiumAirspaces: CesiumAirspace[] = [
    ...(showGermany ? germanyAirspaces.map(a => ({ ...a, extruded, outline: true })) : []),
    ...(showAlpine ? alpineAirspaces.map(a => ({ ...a, extruded, outline: true })) : [])
  ]

  return (
    <PageLayout
      title="Cesium: 3D-Lufträume"
      description="Luftraumbeschränkungen als echte 3D-Volumes mit Höhenangaben. In Cesium werden Lufträume volumetrisch dargestellt."
    >
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
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
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={extruded}
            onChange={(e) => setExtruded(e.target.checked)}
          />
          <span>📦 3D-Extrusion</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showTerrain}
            onChange={(e) => setShowTerrain(e.target.checked)}
          />
          <span>🏔️ Terrain</span>
        </label>
      </div>

      <CesiumMap3D
        width="100%"
        height="calc(100vh - 300px)"
        initialViewState={{
          longitude: 10.5,
          latitude: 49.5,
          zoom: 6,
          pitch: 45,
          heading: 0
        }}
        airspaces={cesiumAirspaces}
        terrain={showTerrain ? {
          enabled: true,
          exaggeration: 1.5
        } : { enabled: false }}
        mapStyle={{
          imageryProvider: 'osm',
          enableLighting: true
        }}
        depthTestAgainstTerrain={true}
        onViewerReady={(viewer) => {
          console.log('Cesium Airspaces ready')
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>3D-Lufträume</h3>
        <p>
          In Cesium werden Lufträume als echte 3D-Volumes dargestellt. Die Höhenangaben (Lower/Upper Altitude)
          werden als 3D-Extrusion visualisiert. So können Sie genau sehen, in welchem Höhenbereich ein
          Luftraum gilt.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#FF0000', opacity: 0.3, border: '1px solid #FF0000' }} />
            <span><strong>Restricted (ED-R)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#FF6600', opacity: 0.3, border: '1px solid #FF6600' }} />
            <span><strong>Danger (ED-D)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#990000', opacity: 0.3, border: '1px solid #990000' }} />
            <span><strong>Prohibited (ED-P)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '20px', backgroundColor: '#0066FF', opacity: 0.3, border: '1px solid #0066FF' }} />
            <span><strong>Controlled (CTR)</strong></span>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#FFF3CD',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>💡 Kamera-Steuerung:</strong>
          <ul style={{ marginTop: '10px', lineHeight: '1.6' }}>
            <li>Linke Maustaste: Drehen</li>
            <li>Rechte Maustaste: Zoom</li>
            <li>Mittlere Maustaste: Pan</li>
            <li>Mausrad: Zoom in/out</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
