import type { GeoJSONSource } from 'maplibre-gl'

export interface Position {
  longitude: number
  latitude: number
  altitude?: number
  timestamp?: number
}

export interface FlightPath {
  id: string
  name?: string
  positions: Position[]
  color?: string
  width?: number
  showMarkers?: boolean
}

export interface Track {
  id: string
  name?: string
  positions: Position[]
  color?: string
  width?: number
  showElevationProfile?: boolean
}

export interface Airspace {
  id: string
  name: string
  type: 'restricted' | 'danger' | 'prohibited' | 'controlled' | 'uncontrolled'
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon
  lowerAltitude?: number
  upperAltitude?: number
  color?: string
  opacity?: number
}

export interface WindData {
  id: string
  position: Position
  speed: number // in m/s or knots
  direction: number // in degrees, 0 = North
  altitude?: number
  timestamp?: number
}

export interface WindLayer {
  data: WindData[]
  showArrows?: boolean
  showBarbs?: boolean
  color?: string
  scale?: number
}

export interface TerrainConfig {
  enabled: boolean
  exaggeration?: number
  source?: string
}

export interface MapStyle {
  url?: string
  custom?: any
}

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
  pitch?: number
  bearing?: number
}

export interface Map3DProps {
  // Container props
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties

  // Map configuration
  initialViewState?: ViewState
  mapStyle?: MapStyle
  terrain?: TerrainConfig

  // Data layers
  flightPaths?: FlightPath[]
  tracks?: Track[]
  airspaces?: Airspace[]
  windLayer?: WindLayer

  // Interaction callbacks
  onMapLoad?: (map: maplibregl.Map) => void
  onClick?: (event: maplibregl.MapMouseEvent) => void
  onViewStateChange?: (viewState: ViewState) => void

  // Free tile sources
  useOpenStreetMap?: boolean
  useOpenTopoMap?: boolean
  terrainSource?: string
}

export interface LayerManager {
  addFlightPath: (path: FlightPath) => void
  removeFlightPath: (id: string) => void
  updateFlightPath: (id: string, path: Partial<FlightPath>) => void

  addTrack: (track: Track) => void
  removeTrack: (id: string) => void

  addAirspace: (airspace: Airspace) => void
  removeAirspace: (id: string) => void

  updateWindLayer: (windLayer: WindLayer) => void
  removeWindLayer: () => void

  setTerrain: (config: TerrainConfig) => void
}
