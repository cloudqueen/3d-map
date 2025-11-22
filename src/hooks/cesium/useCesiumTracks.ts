import { useEffect } from 'react'
import type { Viewer } from 'cesium'
import { Cartesian3, Color, PolylineGlowMaterialProperty } from 'cesium'
import type { Track } from '../../types'

export const useCesiumTracks = (
  viewer: Viewer | null,
  isViewerReady: boolean,
  tracks: Track[]
) => {
  useEffect(() => {
    if (!viewer || !isViewerReady) return

    const entities: any[] = []

    tracks.forEach((track) => {
      const positions = track.positions.map((pos) =>
        Cartesian3.fromDegrees(pos.longitude, pos.latitude, pos.altitude || 0)
      )

      const cesiumColor = Color.fromCssColorString(track.color || '#0066FF')

      const entity = viewer.entities.add({
        id: `track-${track.id}`,
        name: track.name || track.id,
        polyline: {
          positions,
          width: track.width || 3,
          material: new PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: cesiumColor
          }),
          clampToGround: false
        },
        description: `
          <div style="padding: 10px;">
            <h3>${track.name || track.id}</h3>
            <p><strong>Waypoints:</strong> ${track.positions.length}</p>
            ${track.positions[0].altitude ? `<p><strong>Start:</strong> ${track.positions[0].altitude}m</p>` : ''}
            ${track.positions[track.positions.length - 1].altitude ? `<p><strong>End:</strong> ${track.positions[track.positions.length - 1].altitude}m</p>` : ''}
          </div>
        `
      })

      entities.push(entity)
    })

    return () => {
      entities.forEach((entity) => {
        viewer.entities.remove(entity)
      })
    }
  }, [viewer, isViewerReady, tracks])
}
