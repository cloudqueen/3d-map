# Integration Guide

Dieser Guide zeigt, wie Sie die 3D Map Component in verschiedene React-Projekte integrieren können.

## React mit TypeScript

### Create React App

```bash
npx create-react-app my-map-app --template typescript
cd my-map-app
npm install @cloudqueen/3d-map-component
```

```tsx
// src/App.tsx
import React from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import type { FlightPath } from '@cloudqueen/3d-map-component'

function App() {
  const flight: FlightPath = {
    id: 'flight-1',
    positions: [
      { longitude: 8.5, latitude: 50.0 },
      { longitude: 9.0, latitude: 50.5 },
    ],
    color: '#FF0000'
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map3D
        flightPaths={[flight]}
        initialViewState={{
          longitude: 8.75,
          latitude: 50.25,
          zoom: 8
        }}
      />
    </div>
  )
}

export default App
```

## Next.js

### Installation

```bash
npx create-next-app@latest my-map-app --typescript
cd my-map-app
npm install @cloudqueen/3d-map-component
```

### Verwendung mit Dynamic Import

MapLibre GL benötigt Browser-APIs, daher muss die Komponente mit `dynamic` geladen werden:

```tsx
// app/page.tsx
'use client'

import dynamic from 'next/dynamic'
import type { Map3DProps } from '@cloudqueen/3d-map-component'

const Map3D = dynamic(
  () => import('@cloudqueen/3d-map-component').then(mod => mod.Map3D),
  { ssr: false }
)

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Map3D
        initialViewState={{
          longitude: 10.0,
          latitude: 51.0,
          zoom: 6
        }}
        useOpenTopoMap
      />
    </main>
  )
}
```

## Vite

```bash
npm create vite@latest my-map-app -- --template react-ts
cd my-map-app
npm install @cloudqueen/3d-map-component
```

```tsx
// src/App.tsx
import { Map3D } from '@cloudqueen/3d-map-component'

function App() {
  return (
    <Map3D
      width="100vw"
      height="100vh"
      initialViewState={{
        longitude: 10,
        latitude: 51,
        zoom: 8
      }}
    />
  )
}

export default App
```

## Erweiterte Integration

### Mit State Management (Redux/Zustand)

```tsx
import { create } from 'zustand'
import type { FlightPath, ViewState } from '@cloudqueen/3d-map-component'

interface MapStore {
  flightPaths: FlightPath[]
  viewState: ViewState
  addFlightPath: (path: FlightPath) => void
  updateViewState: (state: ViewState) => void
}

const useMapStore = create<MapStore>((set) => ({
  flightPaths: [],
  viewState: { longitude: 10, latitude: 51, zoom: 6 },
  addFlightPath: (path) =>
    set((state) => ({ flightPaths: [...state.flightPaths, path] })),
  updateViewState: (viewState) => set({ viewState })
}))

function MapContainer() {
  const { flightPaths, viewState, updateViewState } = useMapStore()

  return (
    <Map3D
      flightPaths={flightPaths}
      initialViewState={viewState}
      onViewStateChange={updateViewState}
    />
  )
}
```

### Real-time Updates (WebSocket)

```tsx
import { useState, useEffect } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import type { FlightPath, Position } from '@cloudqueen/3d-map-component'

function LiveFlightTracker() {
  const [flightPath, setFlightPath] = useState<FlightPath>({
    id: 'live-flight',
    positions: [],
    color: '#00FF00',
    showMarkers: true
  })

  useEffect(() => {
    const ws = new WebSocket('wss://your-server.com/flight-data')

    ws.onmessage = (event) => {
      const position: Position = JSON.parse(event.data)

      setFlightPath(prev => ({
        ...prev,
        positions: [...prev.positions, position]
      }))
    }

    return () => ws.close()
  }, [])

  return <Map3D flightPaths={[flightPath]} />
}
```

### Custom Tile Server

```tsx
<Map3D
  mapStyle={{
    custom: {
      version: 8,
      sources: {
        'custom-tiles': {
          type: 'raster',
          tiles: ['https://your-tileserver.com/tiles/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: 'Your Attribution'
        }
      },
      layers: [
        {
          id: 'custom-layer',
          type: 'raster',
          source: 'custom-tiles'
        }
      ]
    }
  }}
  terrain={{
    enabled: true,
    source: 'https://your-tileserver.com/terrain/tiles.json',
    exaggeration: 1.5
  }}
/>
```

## Performance-Optimierung

### Memo für häufige Updates

```tsx
import { memo } from 'react'
import { Map3D } from '@cloudqueen/3d-map-component'
import type { Map3DProps } from '@cloudqueen/3d-map-component'

const MemoizedMap = memo(Map3D, (prevProps, nextProps) => {
  return (
    prevProps.flightPaths?.length === nextProps.flightPaths?.length &&
    prevProps.terrain?.enabled === nextProps.terrain?.enabled
  )
})
```

### Lazy Loading von Daten

```tsx
function MapWithLazyData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/flight-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return <Map3D flightPaths={data.flightPaths} />
}
```

## CSS Styling

```css
/* Karte responsive machen */
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

@media (max-width: 768px) {
  .map-container {
    height: 50vh;
  }
}

/* MapLibre Controls anpassen */
.maplibregl-ctrl-group {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
}

.maplibregl-ctrl-group button {
  width: 40px !important;
  height: 40px !important;
}
```

## TypeScript Typen

Alle Typen sind exportiert und können importiert werden:

```tsx
import type {
  Position,
  FlightPath,
  Track,
  Airspace,
  WindData,
  WindLayer,
  TerrainConfig,
  ViewState,
  Map3DProps
} from '@cloudqueen/3d-map-component'

// Custom Type Guards
function isValidFlightPath(obj: any): obj is FlightPath {
  return (
    typeof obj.id === 'string' &&
    Array.isArray(obj.positions) &&
    obj.positions.every(
      (p: any) =>
        typeof p.longitude === 'number' &&
        typeof p.latitude === 'number'
    )
  )
}
```

## Troubleshooting

### Module not found: maplibre-gl

```bash
npm install maplibre-gl
```

### TypeScript Errors

Stellen Sie sicher, dass `@types/geojson` installiert ist:

```bash
npm install --save-dev @types/geojson
```

### CSS nicht geladen

Importieren Sie die CSS-Datei in Ihrer Hauptdatei:

```tsx
import 'maplibre-gl/dist/maplibre-gl.css'
```

### Next.js SSR Probleme

Verwenden Sie immer `dynamic` mit `{ ssr: false }` für die Map-Komponente.
