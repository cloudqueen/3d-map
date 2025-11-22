import React, { useState } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { gleitschirmflug, ballonfahrt } from '../data/flightData'
import { zugspitzeTour } from '../data/trackData'
import { germanyAirspaces } from '../data/airspaceData'
import { alpineWind } from '../data/windData'
import { PageLayout } from '../components/PageLayout'

export const CombinedDemo: React.FC = () => {
  const [showFlights, setShowFlights] = useState(true)
  const [showTracks, setShowTracks] = useState(true)
  const [showAirspaces, setShowAirspaces] = useState(true)
  const [showWind, setShowWind] = useState(true)
  const [show3D, setShow3D] = useState(true)

  return (
    <PageLayout
      title="Kombinierte Ansicht"
      description="Alle Features zusammen: Flugwege, Wanderrouten, Lufträume und Windvisualisierung in einer Karte mit 3D-Terrain."
    >
      <div style={{
        padding: '15px 20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center'
      }}>
        <strong>Layer:</strong>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showFlights}
            onChange={(e) => setShowFlights(e.target.checked)}
          />
          <span>✈️ Flüge</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showTracks}
            onChange={(e) => setShowTracks(e.target.checked)}
          />
          <span>🥾 Tracks</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showAirspaces}
            onChange={(e) => setShowAirspaces(e.target.checked)}
          />
          <span>🚫 Lufträume</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showWind}
            onChange={(e) => setShowWind(e.target.checked)}
          />
          <span>💨 Wind</span>
        </label>
        <div style={{ width: '1px', height: '20px', background: '#ccc' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={show3D}
            onChange={(e) => setShow3D(e.target.checked)}
          />
          <span>🏔️ 3D-Terrain</span>
        </label>
      </div>

      <Map3D
        width="100%"
        height="calc(100vh - 300px)"
        initialViewState={{
          longitude: 11.0,
          latitude: 48.5,
          zoom: 6,
          pitch: 45,
          bearing: 0
        }}
        useOpenTopoMap
        terrain={show3D ? {
          enabled: true,
          exaggeration: 1.5
        } : undefined}
        flightPaths={showFlights ? [gleitschirmflug, ballonfahrt] : []}
        tracks={showTracks ? [zugspitzeTour] : []}
        airspaces={showAirspaces ? germanyAirspaces : []}
        windLayer={showWind ? alpineWind : undefined}
        onMapLoad={(map) => {
          console.log('Combined map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Übersicht aller Layer</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '15px'
        }}>
          <div>
            <h4 style={{ color: '#FF6600' }}>✈️ Flüge ({showFlights ? '2' : '0'})</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Gleitschirmflug (orange)</li>
              <li>Ballonfahrt (lila)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#0066FF' }}>🥾 Tracks ({showTracks ? '1' : '0'})</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Zugspitze Aufstieg (blau)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#FF0000' }}>🚫 Lufträume ({showAirspaces ? germanyAirspaces.length : '0'})</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Restricted, Danger, Prohibited</li>
              <li>Controlled & Uncontrolled</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#0088FF' }}>💨 Wind ({showWind ? alpineWind.data.length : '0'} Punkte)</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Alpenregion</li>
              <li>2000m Höhe</li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#FFF3CD',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>💡 Tipp:</strong> Nutzen Sie die Maus oder Touch-Gesten um die Karte zu drehen und zu neigen.
          Mit gedrückter Strg-Taste können Sie die Karte rotieren.
        </div>
      </div>
    </PageLayout>
  )
}
