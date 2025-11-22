import { useEffect } from 'react'
import type { Viewer } from 'cesium'
import { Cartesian3, Color, Math as CesiumMath, HeadingPitchRoll, Transforms } from 'cesium'
import type { CesiumWindLayer } from '../../types/cesium'

export const useCesiumWindLayer = (
  viewer: Viewer | null,
  isViewerReady: boolean,
  windLayer?: CesiumWindLayer
) => {
  useEffect(() => {
    if (!viewer || !isViewerReady || !windLayer) return

    const entities: any[] = []
    const cesiumColor = Color.fromCssColorString(windLayer.color || '#00AA00')

    windLayer.data.forEach((wind) => {
      const position = Cartesian3.fromDegrees(
        wind.position.longitude,
        wind.position.latitude,
        wind.altitude || 0
      )

      // Calculate arrow endpoint based on wind direction and speed
      const arrowLength = windLayer.arrowLength || (wind.speed * (windLayer.scale || 1) * 100)

      // Wind direction is where the wind is GOING TO (meteorological convention)
      // Convert to radians
      const heading = CesiumMath.toRadians(wind.direction)
      const pitch = 0
      const roll = 0

      // Create arrow as polyline
      const endPosition = Cartesian3.fromDegrees(
        wind.position.longitude + (arrowLength / 111320) * Math.sin(heading),
        wind.position.latitude + (arrowLength / 110540) * Math.cos(heading),
        wind.altitude || 0
      )

      // Wind arrow as polyline
      const arrowEntity = viewer.entities.add({
        id: `wind-arrow-${wind.id}`,
        name: `Wind ${wind.speed} m/s`,
        polyline: {
          positions: [position, endPosition],
          width: 3,
          material: cesiumColor,
          arcType: 0 // None - straight line
        },
        description: `
          <div style="padding: 10px;">
            <h4>Wind</h4>
            <p><strong>Speed:</strong> ${wind.speed} m/s</p>
            <p><strong>Direction:</strong> ${wind.direction}°</p>
            ${wind.altitude ? `<p><strong>Altitude:</strong> ${wind.altitude}m</p>` : ''}
          </div>
        `
      })

      entities.push(arrowEntity)

      // Add point at wind location
      if (windLayer.showArrows !== false) {
        const pointEntity = viewer.entities.add({
          id: `wind-point-${wind.id}`,
          position: position,
          point: {
            pixelSize: 6,
            color: cesiumColor,
            outlineColor: Color.WHITE,
            outlineWidth: 1
          }
        })
        entities.push(pointEntity)
      }

      // Optional: Add 3D model for wind direction
      if (windLayer.use3DArrows) {
        const modelEntity = viewer.entities.add({
          id: `wind-model-${wind.id}`,
          position: position,
          orientation: Transforms.headingPitchRollQuaternion(
            position,
            new HeadingPitchRoll(heading, pitch, roll)
          ),
          model: {
            uri: '/models/arrow.glb', // Would need to provide a 3D arrow model
            minimumPixelSize: 32,
            scale: wind.speed / 10
          }
        })
        entities.push(modelEntity)
      }
    })

    return () => {
      entities.forEach((entity) => {
        viewer.entities.remove(entity)
      })
    }
  }, [viewer, isViewerReady, windLayer])
}
