import React from 'react'
import { Link } from 'react-router-dom'

interface ExampleCardProps {
  path: string
  title: string
  description: string
  icon: string
  engine: string
}

const ExampleCard: React.FC<ExampleCardProps> = ({ path, title, description, icon, engine }) => (
  <Link
    to={path}
    style={{
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '30px',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
    }}
    >
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '11px',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: engine === 'Cesium' ? '#0066FF' : '#00AA66',
        color: '#fff',
        fontWeight: 'bold'
      }}>
        {engine}
      </div>
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333'
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
    </div>
  </Link>
)

export const Home: React.FC = () => {
  const maplibreExamples = [
    {
      path: '/paragliding',
      title: 'Gleitschirmflug',
      description: 'Visualisierung eines Gleitschirmflugs in den Alpen mit 3D-Terrain',
      icon: '🪂',
      engine: 'MapLibre'
    },
    {
      path: '/hiking',
      title: 'Bergwanderung',
      description: 'Zugspitz-Aufstieg mit Höhenprofil und topografischer Karte',
      icon: '🥾',
      engine: 'MapLibre'
    },
    {
      path: '/airspaces',
      title: 'Lufträume',
      description: 'Verschiedene Luftraumbeschränkungen in Deutschland',
      icon: '🚫',
      engine: 'MapLibre'
    },
    {
      path: '/wind',
      title: 'Windvisualisierung',
      description: 'Windrichtungen und -geschwindigkeiten über der Nordsee',
      icon: '💨',
      engine: 'MapLibre'
    },
    {
      path: '/drone',
      title: 'Drohnenflug',
      description: 'Inspektionsflug mit Drohne an einem Windpark',
      icon: '🚁',
      engine: 'MapLibre'
    },
    {
      path: '/combined',
      title: 'Kombiniert',
      description: 'Alle Features zusammen: Flüge, Tracks, Lufträume und Wind',
      icon: '🎯',
      engine: 'MapLibre'
    }
  ]

  const cesiumExamples = [
    {
      path: '/cesium-paragliding',
      title: 'Gleitschirmflug 3D',
      description: 'Animierter Flug mit echtem 3D-Modell und Globe-View',
      icon: '🌍',
      engine: 'Cesium'
    },
    {
      path: '/cesium-airspaces',
      title: '3D-Lufträume',
      description: 'Volumetrische Lufträume mit Höhenextrusion',
      icon: '📦',
      engine: 'Cesium'
    }
  ]

  const examples = [...maplibreExamples, ...cesiumExamples]

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          3D Map Component Demo
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Interaktive Beispiele für die wiederverwendbare React-Kartenkomponente
          mit <strong>MapLibre GL JS</strong> und <strong>Cesium</strong>
        </p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
          MapLibre GL JS (2.5D)
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Leichtgewichtige 2D/2.5D-Karten mit Terrain, perfekt für schnelle Visualisierungen
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {maplibreExamples.map((example) => (
            <ExampleCard key={example.path} {...example} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
          🚀 Cesium (Echtes 3D)
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Volle 3D-Engine mit Globe-View, animierten Flugpfaden und volumetrischen Daten
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {cesiumExamples.map((example) => (
            <ExampleCard key={example.path} {...example} />
          ))}
        </div>
      </section>

      <div style={{ display: 'none' }}>

      </div>

      <footer style={{
        marginTop: '80px',
        padding: '40px 0',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>
          Entwickelt mit{' '}
          <a
            href="https://maplibre.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0066FF' }}
          >
            MapLibre GL JS
          </a>
          {', '}
          <a
            href="https://cesium.com/platform/cesiumjs/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0066FF' }}
          >
            Cesium
          </a>
          {' und '}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0066FF' }}
          >
            React
          </a>
        </p>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Kartendaten © OpenStreetMap | Höhendaten © verschiedene Quellen
        </p>
      </footer>
    </div>
  )
}
