import { useEffect } from 'react'
import type { Viewer } from 'cesium'
import {
  Cartesian3,
  Color,
  JulianDate,
  SampledPositionProperty,
  VelocityOrientationProperty,
  PathGraphics,
  PolylineGlowMaterialProperty,
  TimeIntervalCollection,
  TimeInterval
} from 'cesium'
import type { CesiumFlightPath } from '../../types/cesium'

export const useCesiumFlightPaths = (
  viewer: Viewer | null,
  isViewerReady: boolean,
  flightPaths: CesiumFlightPath[]
) => {
  useEffect(() => {
    if (!viewer || !isViewerReady) return

    const entities: any[] = []

    flightPaths.forEach((path) => {
      const positions: Cartesian3[] = []
      const times: JulianDate[] = []

      // Create position samples
      path.positions.forEach((pos, index) => {
        positions.push(
          Cartesian3.fromDegrees(
            pos.longitude,
            pos.latitude,
            pos.altitude || 0
          )
        )

        // Use timestamp if available, otherwise create equidistant times
        if (pos.timestamp) {
          times.push(JulianDate.fromDate(new Date(pos.timestamp)))
        } else {
          times.push(JulianDate.addSeconds(JulianDate.now(), index * 10, new JulianDate()))
        }
      })

      // Create sampled position property for animation
      const positionProperty = new SampledPositionProperty()
      for (let i = 0; i < positions.length; i++) {
        positionProperty.addSample(times[i], positions[i])
      }

      // Parse color
      const cesiumColor = Color.fromCssColorString(path.color || '#FF0000')

      // Create entity
      const entity = viewer.entities.add({
        id: `flight-path-${path.id}`,
        name: path.name || path.id,
        availability: new TimeIntervalCollection([
          new TimeInterval({
            start: times[0],
            stop: times[times.length - 1]
          })
        ]),
        position: positionProperty,
        orientation: path.animate ? new VelocityOrientationProperty(positionProperty) : undefined,

        // Model (if requested)
        model: path.showModel ? {
          uri: path.modelUri || 'https://raw.githubusercontent.com/CesiumGS/cesium/main/Apps/SampleData/models/CesiumAir/Cesium_Air.glb',
          minimumPixelSize: 64,
          maximumScale: path.modelScale || 20000
        } : undefined,

        // Path/Trail
        path: path.showPath !== false ? {
          resolution: 1,
          material: new PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: cesiumColor
          }),
          width: path.pathWidth || path.width || 3,
          leadTime: path.leadTime,
          trailTime: path.trailTime || (times[times.length - 1].secondsOfDay - times[0].secondsOfDay)
        } as PathGraphics : undefined,

        // Point markers (if requested)
        point: path.showMarkers ? {
          pixelSize: 8,
          color: cesiumColor,
          outlineColor: Color.WHITE,
          outlineWidth: 2
        } : undefined,

        // Description for info box
        description: `
          <div style="padding: 10px;">
            <h3>${path.name || path.id}</h3>
            <p><strong>Waypoints:</strong> ${path.positions.length}</p>
            ${path.positions[0].altitude ? `<p><strong>Start Altitude:</strong> ${path.positions[0].altitude}m</p>` : ''}
            ${path.positions[path.positions.length - 1].altitude ? `<p><strong>End Altitude:</strong> ${path.positions[path.positions.length - 1].altitude}m</p>` : ''}
          </div>
        `
      })

      entities.push(entity)

      // If animation is enabled, set up the clock
      if (path.animate && viewer.clock) {
        viewer.clock.startTime = times[0].clone()
        viewer.clock.stopTime = times[times.length - 1].clone()
        viewer.clock.currentTime = times[0].clone()
        viewer.clock.clockRange = (window as any).Cesium.ClockRange.LOOP_STOP
        viewer.clock.multiplier = path.speed || 1
        viewer.clock.shouldAnimate = true
      }
    })

    // Cleanup
    return () => {
      entities.forEach((entity) => {
        viewer.entities.remove(entity)
      })
    }
  }, [viewer, isViewerReady, flightPaths])
}
