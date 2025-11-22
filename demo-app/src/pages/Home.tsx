import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  const examples = [
    {
      path: '/paragliding',
      title: 'Gleitschirmflug',
      description: 'Visualisierung eines Gleitschirmflugs in den Alpen mit 3D-Terrain',
      icon: '🪂'
    },
    {
      path: '/hiking',
      title: 'Bergwanderung',
      description: 'Zugspitz-Aufstieg mit Höhenprofil und topografischer Karte',
      icon: '🥾'
    },
    {
      path: '/airspaces',
      title: 'Lufträume',
      description: 'Verschiedene Luftraumbeschränkungen in Deutschland',
      icon: '🚫'
    },
    {
      path: '/wind',
      title: 'Windvisualisierung',
      description: 'Windrichtungen und -geschwindigkeiten über der Nordsee',
      icon: '💨'
    },
    {
      path: '/drone',
      title: 'Drohnenflug',
      description: 'Inspektionsflug mit Drohne an einem Windpark',
      icon: '🚁'
    },
    {
      path: '/combined',
      title: 'Kombiniert',
      description: 'Alle Features zusammen: Flüge, Tracks, Lufträume und Wind',
      icon: '🎯'
    }
  ]

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
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Interaktive Beispiele für die wiederverwendbare React-Kartenkomponente
          mit MapLibre GL JS
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {examples.map((example) => (
          <Link
            key={example.path}
            to={example.path}
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
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                {example.icon}
              </div>
              <h2 style={{
                fontSize: '24px',
                marginBottom: '10px',
                color: '#333'
              }}>
                {example.title}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {example.description}
              </p>
            </div>
          </Link>
        ))}
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
          {' '}und{' '}
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
