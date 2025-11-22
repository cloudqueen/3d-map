import React, { useState } from 'react'
import { CesiumMap3D } from '@cloudqueen/3d-map-component'
import type { CesiumFlightPath } from '@cloudqueen/3d-map-component'
import { gleitschirmflug } from '../data/flightData'
import { PageLayout } from '../components/PageLayout'

export const CesiumParaglidingDemo: React.FC = () => {
  const [animate, setAnimate] = useState(false)
  const [showModel, setShowModel] = useState(true)
  const [show3DTerrain, setShow3DTerrain] = useState(true)
  const [showPath, setShowPath] = useState(true)

  // Convert to Cesium flight path
  const cesiumFlightPath: CesiumFlightPath = {
    ...gleitschirmflug,
    animate,
    showModel,
    showPath,
    pathWidth: 5,
    leadTime: 0,
    trailTime: 200 // Show 200 seconds of trail
  }

  return (
    <PageLayout
      title="Cesium: Gleitschirmflug 3D"
      description="Gleitschirmflug mit echter 3D-Engine, Globe-View und optionaler Animation. Cesium bietet volumetrische Lufträume und 3D-Flugzeug-Modelle."
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
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
          />
          <span>🎬 Animierte Wiedergabe</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showModel}
            onChange={(e) => setShowModel(e.target.checked)}
          />
          <span>✈️ 3D-Modell anzeigen</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showPath}
            onChange={(e) => setShowPath(e.target.checked)}
          />
          <span>〰️ Flugpfad anzeigen</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={show3DTerrain}
            onChange={(e) => setShow3DTerrain(e.target.checked)}
          />
          <span>🏔️ 3D-Terrain</span>
        </label>
      </div>

      <CesiumMap3D
        width="100%"
        height="calc(100vh - 250px)"
        initialViewState={{
          longitude: 12.52,
          latitude: 47.815,
          zoom: 12,
          pitch: 60,
          heading: 0,
          bearing: 0
        }}
        terrain={show3DTerrain ? {
          enabled: true,
          exaggeration: 2.0,
          enableLighting: true
        } : { enabled: false }}
        flightPaths={[cesiumFlightPath]}
        enableAnimation={animate}
        clockMultiplier={5}  // 5x speed
        mapStyle={{
          imageryProvider: 'osm',
          enableLighting: true,
          enableFog: true,
          skyAtmosphere: true
        }}
        depthTestAgainstTerrain={true}
        onViewerReady={(viewer) => {
          console.log('Cesium Viewer ready', viewer)
          // Zoom to flight path
          if (viewer.entities.values.length > 0) {
            viewer.zoomTo(viewer.entities)
          }
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>🚀 Cesium Features</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '15px'
        }}>
          <div>
            <h4>Was Cesium besser macht:</h4>
            <ul style={{ lineHeight: '1.8' }}>
              <li>✅ Echtes 3D (nicht nur 2.5D)</li>
              <li>✅ Globe-View (Weltkugel)</li>
              <li>✅ Animierte Flugwiedergabe</li>
              <li>✅ 3D-Modelle (Flugzeuge, etc.)</li>
              <li>✅ Zeitbasierte Daten</li>
              <li>✅ Volumetrische Lufträume</li>
            </ul>
          </div>
          <div>
            <h4>Flugdetails:</h4>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Wegpunkte: {gleitschirmflug.positions.length}</li>
              <li>Start: {gleitschirmflug.positions[0].altitude}m</li>
              <li>Max: {Math.max(...gleitschirmflug.positions.map(p => p.altitude || 0))}m</li>
              <li>Ende: {gleitschirmflug.positions[gleitschirmflug.positions.length - 1].altitude}m</li>
              <li>Dauer: ~{Math.round((gleitschirmflug.positions[gleitschirmflug.positions.length - 1].timestamp! - gleitschirmflug.positions[0].timestamp!) / 60000)} Min</li>
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
          <strong>💡 Tipp:</strong> Aktivieren Sie die Animation und beobachten Sie den Flug in Echtzeit!
          Mit der Maus können Sie die Kamera frei bewegen. Rechte Maustaste + Ziehen rotiert die Kamera.
        </div>
      </div>
    </PageLayout>
  )
}
