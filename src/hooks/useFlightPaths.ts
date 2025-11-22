import { useEffect } from 'react'
import type { Map } from 'maplibre-gl'
import type { FlightPath } from '../types'

export const useFlightPaths = (
  map: Map | null,
  isMapLoaded: boolean,
  flightPaths: FlightPath[]
) => {
  useEffect(() => {
    if (!map || !isMapLoaded) return

    flightPaths.forEach((path) => {
      const sourceId = `flight-path-${path.id}`
      const lineLayerId = `flight-path-line-${path.id}`
      const pointsLayerId = `flight-path-points-${path.id}`

      const coordinates = path.positions.map(p => [p.longitude, p.latitude])

      const geojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: path.name || path.id
            },
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        ]
      }

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'geojson',
          data: geojson
        })

        map.addLayer({
          id: lineLayerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': path.color || '#FF0000',
            'line-width': path.width || 3,
            'line-opacity': 0.8
          }
        })

        if (path.showMarkers) {
          const pointsGeojson: GeoJSON.FeatureCollection = {
            type: 'FeatureCollection',
            features: path.positions.map((pos, idx) => ({
              type: 'Feature',
              properties: {
                index: idx,
                altitude: pos.altitude,
                timestamp: pos.timestamp
              },
              geometry: {
                type: 'Point',
                coordinates: [pos.longitude, pos.latitude]
              }
            }))
          }

          map.addSource(`${sourceId}-points`, {
            type: 'geojson',
            data: pointsGeojson
          })

          map.addLayer({
            id: pointsLayerId,
            type: 'circle',
            source: `${sourceId}-points`,
            paint: {
              'circle-radius': 4,
              'circle-color': path.color || '#FF0000',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff'
            }
          })
        }
      } else {
        const source = map.getSource(sourceId)
        if (source && source.type === 'geojson') {
          source.setData(geojson)
        }
      }
    })

    return () => {
      flightPaths.forEach((path) => {
        const sourceId = `flight-path-${path.id}`
        const lineLayerId = `flight-path-line-${path.id}`
        const pointsLayerId = `flight-path-points-${path.id}`

        if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId)
        if (map.getLayer(pointsLayerId)) map.removeLayer(pointsLayerId)
        if (map.getSource(sourceId)) map.removeSource(sourceId)
        if (map.getSource(`${sourceId}-points`)) map.removeSource(`${sourceId}-points`)
      })
    }
  }, [map, isMapLoaded, flightPaths])
}
