import type { Viewer, Entity } from 'cesium'
import type { Position, FlightPath, Track, Airspace, WindLayer, TerrainConfig, ViewState } from './index'

export interface CesiumViewState extends ViewState {
  heading?: number  // Rotation um vertikale Achse (Grad)
  roll?: number     // Rotation um Sichtachse (Grad)
}

export interface CesiumFlightPath extends FlightPath {
  animate?: boolean           // Animierte Wiedergabe
  showModel?: boolean         // 3D-Modell anzeigen
  modelUri?: string          // Pfad zum GLB/GLTF-Modell
  modelScale?: number        // Skalierung des Modells
  speed?: number             // Geschwindigkeit für Animation (m/s)
  showPath?: boolean         // Pfad anzeigen
  pathWidth?: number         // Pfadbreite
  leadTime?: number          // Vorlaufzeit des Pfades (Sekunden)
  trailTime?: number         // Nachlaufzeit des Pfades (Sekunden)
}

export interface CesiumAirspace extends Airspace {
  extruded?: boolean         // 3D-Extrusion
  outline?: boolean          // Umriss anzeigen
  outlineColor?: string      // Farbe des Umrisses
  shadows?: boolean          // Schatten werfen
}

export interface CesiumWindLayer extends WindLayer {
  use3DArrows?: boolean      // 3D-Pfeile statt 2D
  arrowLength?: number       // Länge der Pfeile in Metern
  particleSystem?: boolean   // Partikelsystem verwenden
  particleCount?: number     // Anzahl der Partikel
}

export interface CesiumTerrainConfig extends TerrainConfig {
  requestVertexNormals?: boolean   // Vertex-Normalen anfordern
  requestWaterMask?: boolean       // Wasser-Maske anfordern
  enableLighting?: boolean         // Beleuchtung aktivieren
}

export interface CesiumMapStyle {
  imageryProvider?: 'osm' | 'custom'
  url?: string
  enableLighting?: boolean
  enableFog?: boolean
  skyBox?: boolean
  skyAtmosphere?: boolean
  globe?: boolean
}

export interface CesiumMap3DProps {
  // Container props
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties

  // Viewer configuration
  initialViewState?: CesiumViewState
  mapStyle?: CesiumMapStyle
  terrain?: CesiumTerrainConfig

  // Data layers
  flightPaths?: CesiumFlightPath[]
  tracks?: Track[]
  airspaces?: CesiumAirspace[]
  windLayer?: CesiumWindLayer

  // Animation & Time
  enableAnimation?: boolean
  startTime?: Date
  endTime?: Date
  clockMultiplier?: number      // Zeitgeschwindigkeit

  // Interaction callbacks
  onViewerReady?: (viewer: Viewer) => void
  onClick?: (entity?: Entity) => void
  onViewStateChange?: (viewState: CesiumViewState) => void

  // Cesium-specific options
  terrainProvider?: any
  imageryProvider?: any
  enableCameraUnderground?: boolean  // Kamera unter Terrain erlauben
  showGroundPrimitive?: boolean
  depthTestAgainstTerrain?: boolean  // Tiefentest gegen Terrain
}

export interface CesiumLayerManager {
  viewer: Viewer | null

  addFlightPath: (path: CesiumFlightPath) => Entity | null
  removeFlightPath: (id: string) => void
  updateFlightPath: (id: string, path: Partial<CesiumFlightPath>) => void
  playFlightAnimation: (id: string) => void
  pauseFlightAnimation: () => void

  addTrack: (track: Track) => Entity | null
  removeTrack: (id: string) => void

  addAirspace: (airspace: CesiumAirspace) => Entity | null
  removeAirspace: (id: string) => void

  updateWindLayer: (windLayer: CesiumWindLayer) => void
  removeWindLayer: () => void

  setTerrain: (config: CesiumTerrainConfig) => void

  flyTo: (entity: Entity) => void
  zoomToAll: () => void
}
