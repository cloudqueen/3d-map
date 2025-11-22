import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Map3DProps, ViewState } from '../types'
import { useFlightPaths } from '../hooks/useFlightPaths'
import { useTracks } from '../hooks/useTracks'
import { useAirspaces } from '../hooks/useAirspaces'
import { useWindLayer } from '../hooks/useWindLayer'
import { useTerrain } from '../hooks/useTerrain'

const DEFAULT_STYLE = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19
    }
  ]
}

const OPENTOPO_STYLE = {
  version: 8,
  sources: {
    'opentopo-tiles': {
      type: 'raster',
      tiles: ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
    }
  },
  layers: [
    {
      id: 'opentopo-tiles-layer',
      type: 'raster',
      source: 'opentopo-tiles',
      minzoom: 0,
      maxzoom: 17
    }
  ]
}

export const Map3D: React.FC<Map3DProps> = ({
  width = '100%',
  height = '600px',
  className,
  style,
  initialViewState = {
    longitude: 10.0,
    latitude: 51.0,
    zoom: 6,
    pitch: 0,
    bearing: 0
  },
  mapStyle,
  terrain,
  flightPaths = [],
  tracks = [],
  airspaces = [],
  windLayer,
  onMapLoad,
  onClick,
  onViewStateChange,
  useOpenStreetMap = true,
  useOpenTopoMap = false,
  terrainSource
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    let selectedStyle
    if (mapStyle?.url) {
      selectedStyle = mapStyle.url
    } else if (mapStyle?.custom) {
      selectedStyle = mapStyle.custom
    } else if (useOpenTopoMap) {
      selectedStyle = OPENTOPO_STYLE
    } else if (useOpenStreetMap) {
      selectedStyle = DEFAULT_STYLE
    } else {
      selectedStyle = DEFAULT_STYLE
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: selectedStyle,
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      pitch: initialViewState.pitch || 0,
      bearing: initialViewState.bearing || 0,
      attributionControl: true
    })

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-left')

    map.current.on('load', () => {
      setIsMapLoaded(true)
      if (onMapLoad && map.current) {
        onMapLoad(map.current)
      }
    })

    if (onClick) {
      map.current.on('click', onClick)
    }

    if (onViewStateChange) {
      map.current.on('moveend', () => {
        if (!map.current) return
        const center = map.current.getCenter()
        const viewState: ViewState = {
          longitude: center.lng,
          latitude: center.lat,
          zoom: map.current.getZoom(),
          pitch: map.current.getPitch(),
          bearing: map.current.getBearing()
        }
        onViewStateChange(viewState)
      })
    }

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Use custom hooks for layer management
  useFlightPaths(map.current, isMapLoaded, flightPaths)
  useTracks(map.current, isMapLoaded, tracks)
  useAirspaces(map.current, isMapLoaded, airspaces)
  useWindLayer(map.current, isMapLoaded, windLayer)
  useTerrain(map.current, isMapLoaded, terrain, terrainSource)

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{
        width,
        height,
        ...style
      }}
    />
  )
}

export default Map3D
