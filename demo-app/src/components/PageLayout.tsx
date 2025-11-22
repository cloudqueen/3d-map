import React from 'react'
import { Link } from 'react-router-dom'

interface PageLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, description, children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        padding: '15px 20px',
        background: '#fff',
        borderBottom: '2px solid #0066FF',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#0066FF',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Zurück
        </Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>{title}</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>{description}</p>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}
