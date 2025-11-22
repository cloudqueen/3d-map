import { useEffect } from 'react'
import type { Map } from 'maplibre-gl'
import type { Track } from '../types'

export const useTracks = (
  map: Map | null,
  isMapLoaded: boolean,
  tracks: Track[]
) => {
  useEffect(() => {
    if (!map || !isMapLoaded) return

    tracks.forEach((track) => {
      const sourceId = `track-${track.id}`
      const lineLayerId = `track-line-${track.id}`

      const coordinates = track.positions.map(p => [p.longitude, p.latitude])

      const geojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: track.name || track.id
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
            'line-color': track.color || '#0066FF',
            'line-width': track.width || 3,
            'line-opacity': 0.8
          }
        })
      } else {
        const source = map.getSource(sourceId)
        if (source && source.type === 'geojson') {
          source.setData(geojson)
        }
      }
    })

    return () => {
      tracks.forEach((track) => {
        const sourceId = `track-${track.id}`
        const lineLayerId = `track-line-${track.id}`

        if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId)
        if (map.getSource(sourceId)) map.removeSource(sourceId)
      })
    }
  }, [map, isMapLoaded, tracks])
}
