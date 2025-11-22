import { useEffect } from 'react'
import type { Viewer } from 'cesium'
import { Cartesian3, Color } from 'cesium'
import type { CesiumAirspace } from '../../types/cesium'

const AIRSPACE_COLORS = {
  restricted: '#FF0000',
  danger: '#FF6600',
  prohibited: '#990000',
  controlled: '#0066FF',
  uncontrolled: '#00CC66'
}

export const useCesiumAirspaces = (
  viewer: Viewer | null,
  isViewerReady: boolean,
  airspaces: CesiumAirspace[]
) => {
  useEffect(() => {
    if (!viewer || !isViewerReady) return

    const entities: any[] = []

    airspaces.forEach((airspace) => {
      // Extract coordinates from GeoJSON geometry
      let coordinates: number[][] = []
      if (airspace.geometry.type === 'Polygon') {
        coordinates = airspace.geometry.coordinates[0] as number[][]
      } else if (airspace.geometry.type === 'MultiPolygon') {
        // Take first polygon for simplicity
        coordinates = (airspace.geometry.coordinates[0] as number[][][])[0] as number[][]
      }

      // Convert to Cartesian3 array
      const positions = coordinates.map((coord) =>
        Cartesian3.fromDegrees(coord[0], coord[1])
      )

      const cesiumColor = Color.fromCssColorString(
        airspace.color || AIRSPACE_COLORS[airspace.type]
      ).withAlpha(airspace.opacity || 0.3)

      const outlineColor = Color.fromCssColorString(
        airspace.outlineColor || airspace.color || AIRSPACE_COLORS[airspace.type]
      )

      // Create 3D extruded polygon if altitude is specified
      const entity = viewer.entities.add({
        id: `airspace-${airspace.id}`,
        name: airspace.name,
        polygon: {
          hierarchy: positions,
          material: cesiumColor,
          outline: airspace.outline !== false,
          outlineColor: outlineColor,
          outlineWidth: 2,
          // 3D extrusion if altitudes are specified
          extrudedHeight: airspace.extruded !== false && airspace.upperAltitude
            ? airspace.upperAltitude * 0.3048  // Convert feet to meters
            : undefined,
          height: airspace.lowerAltitude
            ? airspace.lowerAltitude * 0.3048  // Convert feet to meters
            : 0,
          shadows: airspace.shadows ? 1 : 0  // Cast shadows
        },
        description: `
          <div style="padding: 10px;">
            <h3>${airspace.name}</h3>
            <p><strong>Type:</strong> ${airspace.type}</p>
            ${airspace.lowerAltitude ? `<p><strong>Lower:</strong> ${airspace.lowerAltitude} ft</p>` : ''}
            ${airspace.upperAltitude ? `<p><strong>Upper:</strong> ${airspace.upperAltitude} ft</p>` : ''}
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
  }, [viewer, isViewerReady, airspaces])
}
