import { useEffect } from 'react'
import type { Map } from 'maplibre-gl'
import type { TerrainConfig } from '../types'

const DEFAULT_TERRAIN_SOURCE = 'https://demotiles.maplibre.org/terrain-tiles/tiles.json'

export const useTerrain = (
  map: Map | null,
  isMapLoaded: boolean,
  terrain?: TerrainConfig,
  customTerrainSource?: string
) => {
  useEffect(() => {
    if (!map || !isMapLoaded) return

    if (terrain?.enabled) {
      const terrainSourceUrl = customTerrainSource || terrain.source || DEFAULT_TERRAIN_SOURCE

      if (!map.getSource('terrainSource')) {
        map.addSource('terrainSource', {
          type: 'raster-dem',
          url: terrainSourceUrl,
          tileSize: 256
        })
      }

      map.setTerrain({
        source: 'terrainSource',
        exaggeration: terrain.exaggeration || 1.5
      })

      if (!map.getLayer('sky')) {
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        })
      }
    } else {
      map.setTerrain(null)
      if (map.getLayer('sky')) {
        map.removeLayer('sky')
      }
    }

    return () => {
      if (map.getTerrain()) {
        map.setTerrain(null)
      }
      if (map.getLayer('sky')) {
        map.removeLayer('sky')
      }
    }
  }, [map, isMapLoaded, terrain, customTerrainSource])
}
