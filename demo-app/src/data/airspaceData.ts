import type { Airspace } from '@cloudqueen/3d-map-component'

export const germanyAirspaces: Airspace[] = [
  {
    id: 'ed-r-73',
    name: 'ED-R 73 Hohenfels',
    type: 'restricted',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [11.7500, 49.3500],
        [11.9000, 49.3500],
        [11.9000, 49.4500],
        [11.7500, 49.4500],
        [11.7500, 49.3500]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 15000,
    color: '#FF0000',
    opacity: 0.3
  },
  {
    id: 'ed-d-48',
    name: 'ED-D 48 Altenstadt',
    type: 'danger',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [10.8000, 47.8000],
        [10.9500, 47.8000],
        [10.9500, 47.9000],
        [10.8000, 47.9000],
        [10.8000, 47.8000]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 10000,
    color: '#FF6600',
    opacity: 0.3
  },
  {
    id: 'ed-p-example',
    name: 'Prohibited Area Example',
    type: 'prohibited',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [13.3500, 52.5000],
        [13.4000, 52.5000],
        [13.4000, 52.5300],
        [13.3500, 52.5300],
        [13.3500, 52.5000]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 20000,
    color: '#990000',
    opacity: 0.35
  },
  {
    id: 'ctr-munich',
    name: 'München CTR',
    type: 'controlled',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [11.6000, 48.2500],
        [11.8500, 48.2500],
        [11.8500, 48.4000],
        [11.6000, 48.4000],
        [11.6000, 48.2500]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 5000,
    color: '#0066FF',
    opacity: 0.25
  },
  {
    id: 'glider-area',
    name: 'Segelfluggebiet Wasserkuppe',
    type: 'uncontrolled',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [9.9000, 50.4500],
        [10.0500, 50.4500],
        [10.0500, 50.5500],
        [9.9000, 50.5500],
        [9.9000, 50.4500]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 8000,
    color: '#00CC66',
    opacity: 0.2
  }
]

export const alpineAirspaces: Airspace[] = [
  {
    id: 'alpine-restricted-1',
    name: 'Alpenflugbeschränkung Nord',
    type: 'restricted',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [10.5000, 47.5000],
        [11.0000, 47.5000],
        [11.0000, 47.8000],
        [10.5000, 47.8000],
        [10.5000, 47.5000]
      ]]
    },
    lowerAltitude: 8000,
    upperAltitude: 20000,
    color: '#FF3300',
    opacity: 0.25
  },
  {
    id: 'alpine-danger-2',
    name: 'Gefahrengebiet Alpen Süd',
    type: 'danger',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [11.5000, 47.2000],
        [12.0000, 47.2000],
        [12.0000, 47.5000],
        [11.5000, 47.5000],
        [11.5000, 47.2000]
      ]]
    },
    lowerAltitude: 0,
    upperAltitude: 12000,
    color: '#FF9900',
    opacity: 0.3
  }
]
