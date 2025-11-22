# 3D Map Component - Demo App

Interaktive Demo-Anwendung für die 3D Map Component mit verschiedenen Beispielszenarien.

## 🚀 Start

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Preview des Production Builds
npm run preview
```

Die App öffnet sich automatisch im Browser unter http://localhost:3000

## 📱 Beispiele

### 1. Gleitschirmflug 🪂
Visualisierung eines Gleitschirmflugs in den Alpen mit:
- 3D-Terrain
- Höhenprofil
- Wegpunkte mit Zeitstempel

### 2. Bergwanderung 🥾
Zwei Outdoor-Routen:
- Zugspitz-Aufstieg (2962m)
- Rhein-Radweg (flach)

### 3. Lufträume 🚫
Verschiedene Luftraumbeschränkungen:
- ED-R (Restricted)
- ED-D (Danger)
- ED-P (Prohibited)
- CTR (Controlled)
- Uncontrolled

### 4. Wind-Visualisierung 💨
Windrichtungen an verschiedenen Standorten:
- Nordsee (starker Wind)
- Alpen (mittlerer Wind)
- Inland (schwacher Wind)

### 5. Drohnenflug 🚁
Inspektionsflug einer Drohne:
- Automatische Wegpunkte
- Niedrige Flughöhe
- Inspektionsmuster

### 6. Kombiniert 🎯
Alle Features zusammen in einer Karte

## 🛠️ Technologie

- React 18
- TypeScript
- Vite
- React Router
- @cloudqueen/3d-map-component (lokal)
- MapLibre GL JS

## 📁 Projektstruktur

```
demo-app/
├── src/
│   ├── components/      # Wiederverwendbare Komponenten
│   ├── data/           # Beispieldaten
│   ├── pages/          # Demo-Seiten
│   ├── App.tsx         # Hauptkomponente mit Routing
│   ├── main.tsx        # Entry Point
│   └── index.css       # Globale Styles
├── index.html
├── package.json
└── vite.config.ts
```

## 💡 Verwendung der Komponente

Die Demo-App importiert die Map-Komponente direkt aus dem Parent-Verzeichnis:

```tsx
import { Map3D } from '@cloudqueen/3d-map-component'

<Map3D
  initialViewState={{
    longitude: 10.0,
    latitude: 51.0,
    zoom: 6
  }}
  flightPaths={[...]}
  terrain={{ enabled: true }}
/>
```

## 🎨 Anpassung

Alle Beispieldaten befinden sich in `src/data/`:
- `flightData.ts` - Flugwege
- `trackData.ts` - Wanderrouten & Radwege
- `airspaceData.ts` - Lufträume
- `windData.ts` - Winddaten

Passen Sie diese Daten an oder erstellen Sie neue Beispiele!

## 📄 Lizenz

MIT
