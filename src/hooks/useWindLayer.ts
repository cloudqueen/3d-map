import { useEffect } from 'react'
import type { Map } from 'maplibre-gl'
import type { WindLayer } from '../types'

export const useWindLayer = (
  map: Map | null,
  isMapLoaded: boolean,
  windLayer?: WindLayer
) => {
  useEffect(() => {
    if (!map || !isMapLoaded || !windLayer) return

    const sourceId = 'wind-layer'
    const arrowsLayerId = 'wind-arrows'

    const features: GeoJSON.Feature[] = windLayer.data.map((wind, idx) => {
      const arrowLength = (wind.speed / 50) * (windLayer.scale || 1)
      const rotation = wind.direction

      const radians = (rotation * Math.PI) / 180
      const endLng = wind.position.longitude + arrowLength * Math.sin(radians) * 0.01
      const endLat = wind.position.latitude + arrowLength * Math.cos(radians) * 0.01

      return {
        type: 'Feature',
        properties: {
          speed: wind.speed,
          direction: wind.direction,
          rotation: rotation
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [wind.position.longitude, wind.position.latitude],
            [endLng, endLat]
          ]
        }
      }
    })

    const geojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features
    }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: 'geojson',
        data: geojson
      })

      if (windLayer.showArrows !== false) {
        map.addLayer({
          id: arrowsLayerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-cap': 'round'
          },
          paint: {
            'line-color': windLayer.color || '#00AA00',
            'line-width': 2,
            'line-opacity': 0.7
          }
        })
      }

      const pointsLayerId = 'wind-points'
      const pointsGeojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: windLayer.data.map(wind => ({
          type: 'Feature',
          properties: {
            speed: wind.speed,
            direction: wind.direction
          },
          geometry: {
            type: 'Point',
            coordinates: [wind.position.longitude, wind.position.latitude]
          }
        }))
      }

      map.addSource('wind-points', {
        type: 'geojson',
        data: pointsGeojson
      })

      map.addLayer({
        id: pointsLayerId,
        type: 'circle',
        source: 'wind-points',
        paint: {
          'circle-radius': 3,
          'circle-color': windLayer.color || '#00AA00',
          'circle-opacity': 0.6
        }
      })

      map.on('click', pointsLayerId, (e) => {
        if (e.features && e.features[0]) {
          const props = e.features[0].properties
          new (map as any).Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 10px;">
                <h4 style="margin: 0 0 8px 0;">Wind</h4>
                <p style="margin: 4px 0;"><strong>Speed:</strong> ${props.speed} m/s</p>
                <p style="margin: 4px 0;"><strong>Direction:</strong> ${props.direction}°</p>
              </div>
            `)
            .addTo(map)
        }
      })
    } else {
      const source = map.getSource(sourceId)
      if (source && source.type === 'geojson') {
        source.setData(geojson)
      }
    }

    return () => {
      if (map.getLayer(arrowsLayerId)) map.removeLayer(arrowsLayerId)
      if (map.getLayer('wind-points')) map.removeLayer('wind-points')
      if (map.getSource(sourceId)) map.removeSource(sourceId)
      if (map.getSource('wind-points')) map.removeSource('wind-points')
    }
  }, [map, isMapLoaded, windLayer])
}
