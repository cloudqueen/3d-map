import { useEffect } from 'react'
import type { Map } from 'maplibre-gl'
import type { Airspace } from '../types'

const AIRSPACE_COLORS = {
  restricted: '#FF0000',
  danger: '#FF6600',
  prohibited: '#990000',
  controlled: '#0066FF',
  uncontrolled: '#00CC66'
}

export const useAirspaces = (
  map: Map | null,
  isMapLoaded: boolean,
  airspaces: Airspace[]
) => {
  useEffect(() => {
    if (!map || !isMapLoaded) return

    airspaces.forEach((airspace) => {
      const sourceId = `airspace-${airspace.id}`
      const fillLayerId = `airspace-fill-${airspace.id}`
      const outlineLayerId = `airspace-outline-${airspace.id}`

      const geojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: airspace.name,
              type: airspace.type,
              lowerAltitude: airspace.lowerAltitude,
              upperAltitude: airspace.upperAltitude
            },
            geometry: airspace.geometry
          }
        ]
      }

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'geojson',
          data: geojson
        })

        map.addLayer({
          id: fillLayerId,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': airspace.color || AIRSPACE_COLORS[airspace.type],
            'fill-opacity': airspace.opacity || 0.3
          }
        })

        map.addLayer({
          id: outlineLayerId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': airspace.color || AIRSPACE_COLORS[airspace.type],
            'line-width': 2,
            'line-opacity': 0.8,
            'line-dasharray': [2, 2]
          }
        })

        // Add click handler for airspace info
        map.on('click', fillLayerId, (e) => {
          if (e.features && e.features[0]) {
            const props = e.features[0].properties
            new (map as any).Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 10px 0;">${props.name}</h3>
                  <p style="margin: 5px 0;"><strong>Type:</strong> ${props.type}</p>
                  ${props.lowerAltitude ? `<p style="margin: 5px 0;"><strong>Lower:</strong> ${props.lowerAltitude} ft</p>` : ''}
                  ${props.upperAltitude ? `<p style="margin: 5px 0;"><strong>Upper:</strong> ${props.upperAltitude} ft</p>` : ''}
                </div>
              `)
              .addTo(map)
          }
        })

        map.on('mouseenter', fillLayerId, () => {
          map.getCanvas().style.cursor = 'pointer'
        })

        map.on('mouseleave', fillLayerId, () => {
          map.getCanvas().style.cursor = ''
        })
      } else {
        const source = map.getSource(sourceId)
        if (source && source.type === 'geojson') {
          source.setData(geojson)
        }
      }
    })

    return () => {
      airspaces.forEach((airspace) => {
        const sourceId = `airspace-${airspace.id}`
        const fillLayerId = `airspace-fill-${airspace.id}`
        const outlineLayerId = `airspace-outline-${airspace.id}`

        if (map.getLayer(fillLayerId)) map.removeLayer(fillLayerId)
        if (map.getLayer(outlineLayerId)) map.removeLayer(outlineLayerId)
        if (map.getSource(sourceId)) map.removeSource(sourceId)
      })
    }
  }, [map, isMapLoaded, airspaces])
}
