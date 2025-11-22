# Quick Start Guide

## Demo-App starten

Die schnellste Möglichkeit, die 3D Map Component in Aktion zu sehen:

```bash
# In das Demo-Verzeichnis wechseln
cd demo-app

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die Demo-App öffnet sich automatisch unter **http://localhost:3000**

## Was Sie in der Demo sehen

Die Demo-App zeigt 6 verschiedene Szenarien:

1. **🪂 Gleitschirmflug** - Thermikflug in den Alpen mit 3D-Terrain
2. **🥾 Bergwanderung** - Zugspitze-Aufstieg und Rhein-Radweg
3. **🚫 Lufträume** - Deutsche Luftraumbeschränkungen
4. **💨 Wind** - Windvisualisierung an verschiedenen Standorten
5. **🚁 Drohnenflug** - Automatisierter Inspektionsflug
6. **🎯 Kombiniert** - Alle Features in einer Ansicht

## Komponente in eigenen Projekten verwenden

### Installation

```bash
npm install @cloudqueen/3d-map-component
```

### Einfaches Beispiel

```tsx
import { Map3D } from '@cloudqueen/3d-map-component'
import 'maplibre-gl/dist/maplibre-gl.css'

function App() {
  return (
    <Map3D
      width="100%"
      height="600px"
      initialViewState={{
        longitude: 10.0,
        latitude: 51.0,
        zoom: 6
      }}
      useOpenStreetMap
    />
  )
}
```

### Mit Flugweg

```tsx
import { Map3D } from '@cloudqueen/3d-map-component'
import type { FlightPath } from '@cloudqueen/3d-map-component'

const myFlight: FlightPath = {
  id: 'flight-1',
  name: 'Mein Flug',
  positions: [
    { longitude: 8.5, latitude: 50.0, altitude: 500 },
    { longitude: 9.0, latitude: 50.5, altitude: 1000 },
    { longitude: 9.5, latitude: 51.0, altitude: 800 },
  ],
  color: '#FF0000',
  width: 3,
  showMarkers: true
}

function App() {
  return (
    <Map3D
      initialViewState={{
        longitude: 9.0,
        latitude: 50.5,
        zoom: 8
      }}
      flightPaths={[myFlight]}
      useOpenTopoMap
      terrain={{
        enabled: true,
        exaggeration: 1.5
      }}
    />
  )
}
```

## Entwicklung

### Komponente bauen

```bash
# Im Root-Verzeichnis
npm install
npm run build
```

Dies erstellt die Komponente im `dist/` Verzeichnis.

### Komponente lokal testen

Die Demo-App importiert die Komponente direkt aus den Source-Dateien, daher ist kein Build erforderlich. Änderungen an der Komponente werden automatisch in der Demo-App übernommen (Hot Module Replacement).

## Nächste Schritte

- Schauen Sie sich die Beispiele in `demo-app/src/pages/` an
- Passen Sie die Beispieldaten in `demo-app/src/data/` an
- Lesen Sie die vollständige API-Dokumentation in [README.md](README.md)
- Schauen Sie sich den Integrations-Guide in [INTEGRATION.md](INTEGRATION.md) an

## Häufige Probleme

### "Failed to resolve entry for package"

Stellen Sie sicher, dass Sie im `demo-app` Verzeichnis sind und `npm install` ausgeführt haben.

### Karte wird nicht angezeigt

Vergessen Sie nicht, die MapLibre CSS zu importieren:
```tsx
import 'maplibre-gl/dist/maplibre-gl.css'
```

### TypeScript-Fehler

Stellen Sie sicher, dass alle Type-Definitionen installiert sind:
```bash
npm install --save-dev @types/geojson
```

## Support

Bei Fragen oder Problemen:
- Schauen Sie in die vollständige Dokumentation
- Prüfen Sie die Beispiele in der Demo-App
- Öffnen Sie ein Issue auf GitHub
