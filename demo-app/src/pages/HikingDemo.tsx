import React from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import { zugspitzeTour, rheinRadweg } from '../data/trackData'
import { PageLayout } from '../components/PageLayout'

export const HikingDemo: React.FC = () => {
  return (
    <PageLayout
      title="Bergwanderung und Radtour"
      description="Zwei verschiedene Outdoor-Aktivitäten: Eine anspruchsvolle Bergwanderung auf die Zugspitze und eine entspannte Radtour am Rhein entlang."
    >
      <Map3D
        width="100%"
        height="calc(100vh - 200px)"
        initialViewState={{
          longitude: 10.0,
          latitude: 48.5,
          zoom: 6,
          pitch: 45,
          bearing: 0
        }}
        useOpenTopoMap
        terrain={{
          enabled: true,
          exaggeration: 1.8
        }}
        tracks={[zugspitzeTour, rheinRadweg]}
        onMapLoad={(map) => {
          console.log('Hiking map loaded', map)
        }}
      />

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderTop: '1px solid #ddd',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <h3 style={{ color: zugspitzeTour.color }}>🏔️ Zugspitze Aufstieg</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Startpunkt: {zugspitzeTour.positions[0].altitude}m</li>
            <li>Gipfel: {zugspitzeTour.positions[zugspitzeTour.positions.length - 1].altitude}m</li>
            <li>Höhenmeter: {zugspitzeTour.positions[zugspitzeTour.positions.length - 1].altitude! - zugspitzeTour.positions[0].altitude!}m</li>
            <li>Wegpunkte: {zugspitzeTour.positions.length}</li>
            <li>Schwierigkeit: Sehr anspruchsvoll</li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: rheinRadweg.color }}>🚴 Rhein-Radweg</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Höhe: {rheinRadweg.positions[0].altitude}m (flach)</li>
            <li>Höhendifferenz: {Math.max(...rheinRadweg.positions.map(p => p.altitude!)) - Math.min(...rheinRadweg.positions.map(p => p.altitude!))}m</li>
            <li>Wegpunkte: {rheinRadweg.positions.length}</li>
            <li>Schwierigkeit: Leicht</li>
            <li>Geeignet für: Familien, E-Bikes</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
