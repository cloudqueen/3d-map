import { useEffect } from 'react'
import type { Viewer } from 'cesium'
import { createWorldTerrainAsync, CesiumTerrainProvider } from 'cesium'
import type { CesiumTerrainConfig } from '../../types/cesium'

export const useCesiumTerrain = (
  viewer: Viewer | null,
  isViewerReady: boolean,
  terrain?: CesiumTerrainConfig,
  customTerrainProvider?: any
) => {
  useEffect(() => {
    if (!viewer || !isViewerReady) return

    const loadTerrain = async () => {
      if (!viewer) return

      if (terrain?.enabled) {
        try {
          let terrainProvider

          if (customTerrainProvider) {
            terrainProvider = customTerrainProvider
          } else if (terrain.source) {
            // Use custom terrain source
            terrainProvider = await CesiumTerrainProvider.fromUrl(terrain.source, {
              requestVertexNormals: terrain.requestVertexNormals,
              requestWaterMask: terrain.requestWaterMask
            })
          } else {
            // Use Cesium World Terrain (free, no token required for basic use)
            // Note: This might have rate limits without token
            terrainProvider = await createWorldTerrainAsync({
              requestVertexNormals: terrain.requestVertexNormals,
              requestWaterMask: terrain.requestWaterMask
            })
          }

          viewer.terrainProvider = terrainProvider

          // Enable lighting if requested
          if (terrain.enableLighting) {
            viewer.scene.globe.enableLighting = true
          }

          // Terrain exaggeration
          if (terrain.exaggeration) {
            viewer.scene.verticalExaggeration = terrain.exaggeration
          }
        } catch (error) {
          console.warn('Failed to load terrain:', error)
          console.warn('Continuing without terrain')
        }
      } else {
        // Disable terrain
        viewer.scene.globe.show = terrain?.enabled !== false
      }
    }

    loadTerrain()
  }, [viewer, isViewerReady, terrain, customTerrainProvider])
}
