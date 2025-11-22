# 3D Map Component

Eine wiederverwendbare React-Komponente für interaktive 2D/3D-Karten mit MapLibre GL JS. Perfekt für die Visualisierung von Flugwegen, Tracks, Lufträumen und Windrichtungen.

## ✨ Features

- 🗺️ **MapLibre GL JS basiert** - Freie und Open-Source-Kartenbibliothek
- 🏔️ **3D-Terrain** - Unterstützung für Höhenmodelle und 3D-Darstellung
- ✈️ **Flugweg-Visualisierung** - Zeige Flugpfade mit Höheninformationen
- 🥾 **Track-Darstellung** - Gelaufene oder gefahrene Strecken
- 🚫 **Lufträume** - Visualisierung von Luftraumbeschränkungen
- 💨 **Wind-Layer** - Windrichtung und -geschwindigkeit mit Pfeilen
- 🌍 **Freie Karten** - OpenStreetMap, OpenTopoMap oder eigene Tile-Server
- 📦 **TypeScript** - Vollständig typisiert
- ⚡ **Vite** - Schneller Build und HMR

## 📦 Installation

```bash
npm install @cloudqueen/3d-map-component
```

Oder mit yarn:

```bash
yarn add @cloudqueen/3d-map-component
```

## 🚀 Schnellstart

```tsx
import { Map3D } from '@cloudqueen/3d-map-component'
import type { FlightPath } from '@cloudqueen/3d-map-component'

const flightPath: FlightPath = {
  id: 'flight-1',
  name: 'Mein Flug',
  positions: [
    { longitude: 8.5, latitude: 50.0, altitude: 0 },
    { longitude: 9.0, latitude: 50.5, altitude: 1000 },
    { longitude: 9.5, latitude: 51.0, altitude: 500 },
  ],
  color: '#FF0000',
  width: 3,
  showMarkers: true
}

function App() {
  return (
    <Map3D
      width="100%"
      height="600px"
      initialViewState={{
        longitude: 9.0,
        latitude: 50.5,
        zoom: 8
      }}
      flightPaths={[flightPath]}
      useOpenTopoMap={true}
    />
  )
}
```

## 📖 API Dokumentation

### Map3D Props

| Prop | Type | Default | Beschreibung |
|------|------|---------|--------------|
| `width` | `string \| number` | `'100%'` | Breite der Karte |
| `height` | `string \| number` | `'600px'` | Höhe der Karte |
| `className` | `string` | - | CSS-Klasse |
| `style` | `React.CSSProperties` | - | Inline-Styles |
| `initialViewState` | `ViewState` | - | Initiale Kartenansicht |
| `mapStyle` | `MapStyle` | - | Kartenstil (URL oder Objekt) |
| `terrain` | `TerrainConfig` | - | 3D-Terrain-Konfiguration |
| `flightPaths` | `FlightPath[]` | `[]` | Array von Flugwegen |
| `tracks` | `Track[]` | `[]` | Array von Tracks |
| `airspaces` | `Airspace[]` | `[]` | Array von Lufträumen |
| `windLayer` | `WindLayer` | - | Wind-Visualisierung |
| `useOpenStreetMap` | `boolean` | `true` | OpenStreetMap verwenden |
| `useOpenTopoMap` | `boolean` | `false` | OpenTopoMap verwenden |
| `terrainSource` | `string` | - | Custom Terrain-Quelle |
| `onMapLoad` | `(map: Map) => void` | - | Callback wenn Karte geladen |
| `onClick` | `(event: MapMouseEvent) => void` | - | Callback bei Klick |
| `onViewStateChange` | `(viewState: ViewState) => void` | - | Callback bei Ansichtsänderung |

### FlightPath

```typescript
interface FlightPath {
  id: string
  name?: string
  positions: Position[]
  color?: string          // Hex-Farbe, z.B. '#FF0000'
  width?: number          // Linienbreite in Pixeln
  showMarkers?: boolean   // Marker an Wegpunkten anzeigen
}
```

### Track

```typescript
interface Track {
  id: string
  name?: string
  positions: Position[]
  color?: string
  width?: number
  showElevationProfile?: boolean
}
```

### Airspace

```typescript
interface Airspace {
  id: string
  name: string
  type: 'restricted' | 'danger' | 'prohibited' | 'controlled' | 'uncontrolled'
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon
  lowerAltitude?: number  // in Fuß
  upperAltitude?: number  // in Fuß
  color?: string
  opacity?: number        // 0-1
}
```

### WindLayer

```typescript
interface WindLayer {
  data: WindData[]
  showArrows?: boolean
  showBarbs?: boolean
  color?: string
  scale?: number
}

interface WindData {
  id: string
  position: Position
  speed: number      // m/s oder Knoten
  direction: number  // Grad, 0 = Nord
  altitude?: number
  timestamp?: number
}
```

### TerrainConfig

```typescript
interface TerrainConfig {
  enabled: boolean
  exaggeration?: number  // Höhen-Übertreibung, Standard: 1.5
  source?: string        // URL zur Terrain-Quelle
}
```

## 🌍 Freie Karten und Höhendaten

### Kartenstile

Die Komponente unterstützt verschiedene freie Kartenquellen:

1. **OpenStreetMap** (Standard)
   - `useOpenStreetMap={true}`
   - Kostenlos, weltweite Abdeckung

2. **OpenTopoMap**
   - `useOpenTopoMap={true}`
   - Topografische Karten mit Höhenlinien

3. **Custom Style**
   ```tsx
   <Map3D
     mapStyle={{
       url: 'https://your-tile-server.com/style.json'
     }}
   />
   ```

### Terrain-Quellen

Freie Höhendaten können von verschiedenen Quellen bezogen werden:

- **MapLibre Demo Tiles** (Standard)
- **Terrain RGB von Mapbox** (kostenlos bis 200k Anfragen/Monat)
- **Eigener Tile-Server** mit [terrarium](https://github.com/tilezen/joerd) Format

Beispiel:
```tsx
<Map3D
  terrain={{
    enabled: true,
    exaggeration: 2.0,
    source: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json'
  }}
/>
```

## 🛠️ Eigener Tile-Server

Für produktive Anwendungen empfiehlt sich ein eigener Tile-Server:

### Option 1: Tileserver-GL

```bash
docker run -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl
```

### Option 2: Martin

```bash
docker run -p 3000:3000 -v $(pwd):/data ghcr.io/maplibre/martin
```

### Terrain Tiles generieren

Mit `rio-rgbify` können eigene Terrain-Tiles erstellt werden:

```bash
pip install rio-rgbify
rio rgbify -b -10000 -i 0.1 input.tif output_folder/
```

## 💡 Beispiele

### Flugweg mit Höheninformationen

```tsx
const flight: FlightPath = {
  id: 'alpine-flight',
  name: 'Alpenflug',
  positions: [
    { longitude: 10.5, latitude: 47.5, altitude: 800, timestamp: 1699000000 },
    { longitude: 10.7, latitude: 47.6, altitude: 1500, timestamp: 1699000300 },
    { longitude: 10.9, latitude: 47.7, altitude: 2200, timestamp: 1699000600 },
  ],
  color: '#0066FF',
  width: 4,
  showMarkers: true
}

<Map3D
  flightPaths={[flight]}
  terrain={{ enabled: true, exaggeration: 2 }}
  initialViewState={{
    longitude: 10.7,
    latitude: 47.6,
    zoom: 10,
    pitch: 60,
    bearing: 0
  }}
/>
```

### Luftraum mit Einschränkungen

```tsx
const airspace: Airspace = {
  id: 'ed-r123',
  name: 'ED-R 123',
  type: 'restricted',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [9.0, 50.0],
      [9.5, 50.0],
      [9.5, 50.5],
      [9.0, 50.5],
      [9.0, 50.0]
    ]]
  },
  lowerAltitude: 0,
  upperAltitude: 15000,
  color: '#FF0000',
  opacity: 0.3
}

<Map3D airspaces={[airspace]} />
```

### Wind-Visualisierung

```tsx
const wind: WindLayer = {
  data: [
    {
      id: 'w1',
      position: { longitude: 10.0, latitude: 51.0 },
      speed: 25,
      direction: 270,
      altitude: 1000
    },
    {
      id: 'w2',
      position: { longitude: 10.5, latitude: 51.0 },
      speed: 30,
      direction: 280,
      altitude: 1000
    }
  ],
  showArrows: true,
  color: '#00AA00',
  scale: 2
}

<Map3D windLayer={wind} />
```

## 🔧 Entwicklung

```bash
# Dependencies installieren
npm install

# Demo-App starten
npm run dev

# Build für Produktion
npm run build

# Type-Check
npm run type-check
```

## 📄 Lizenz

MIT

## 🤝 Beitragen

Pull Requests sind willkommen! Für größere Änderungen bitte zuerst ein Issue öffnen.

## 🐛 Bug Reports

Bei Problemen bitte ein Issue auf GitHub erstellen mit:
- Beschreibung des Problems
- Erwartetes Verhalten
- Aktuelles Verhalten
- Schritte zur Reproduktion
- Browser/Version

## 📚 Weiterführende Links

- [MapLibre GL JS Dokumentation](https://maplibre.org/maplibre-gl-js-docs/api/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [OpenTopoMap](https://opentopomap.org/)
- [GeoJSON Spezifikation](https://geojson.org/)
