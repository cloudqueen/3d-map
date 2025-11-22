import type { WindLayer } from '@cloudqueen/3d-map-component'

export const northSeaWind: WindLayer = {
  data: [
    { id: 'w1', position: { longitude: 7.0, latitude: 54.0 }, speed: 25, direction: 270, altitude: 100 },
    { id: 'w2', position: { longitude: 7.2, latitude: 54.0 }, speed: 28, direction: 275, altitude: 100 },
    { id: 'w3', position: { longitude: 7.4, latitude: 54.0 }, speed: 30, direction: 280, altitude: 100 },
    { id: 'w4', position: { longitude: 7.6, latitude: 54.0 }, speed: 27, direction: 272, altitude: 100 },
    { id: 'w5', position: { longitude: 7.8, latitude: 54.0 }, speed: 26, direction: 268, altitude: 100 },
    { id: 'w6', position: { longitude: 7.0, latitude: 54.2 }, speed: 24, direction: 265, altitude: 100 },
    { id: 'w7', position: { longitude: 7.2, latitude: 54.2 }, speed: 26, direction: 270, altitude: 100 },
    { id: 'w8', position: { longitude: 7.4, latitude: 54.2 }, speed: 29, direction: 275, altitude: 100 },
    { id: 'w9', position: { longitude: 7.6, latitude: 54.2 }, speed: 31, direction: 278, altitude: 100 },
    { id: 'w10', position: { longitude: 7.8, latitude: 54.2 }, speed: 28, direction: 273, altitude: 100 },
    { id: 'w11', position: { longitude: 7.0, latitude: 54.4 }, speed: 23, direction: 260, altitude: 100 },
    { id: 'w12', position: { longitude: 7.2, latitude: 54.4 }, speed: 25, direction: 265, altitude: 100 },
    { id: 'w13', position: { longitude: 7.4, latitude: 54.4 }, speed: 27, direction: 270, altitude: 100 },
    { id: 'w14', position: { longitude: 7.6, latitude: 54.4 }, speed: 29, direction: 275, altitude: 100 },
    { id: 'w15', position: { longitude: 7.8, latitude: 54.4 }, speed: 26, direction: 268, altitude: 100 }
  ],
  showArrows: true,
  color: '#00AA00',
  scale: 2
}

export const alpineWind: WindLayer = {
  data: [
    { id: 'aw1', position: { longitude: 10.5, latitude: 47.5 }, speed: 15, direction: 180, altitude: 2000 },
    { id: 'aw2', position: { longitude: 10.7, latitude: 47.5 }, speed: 18, direction: 185, altitude: 2000 },
    { id: 'aw3', position: { longitude: 10.9, latitude: 47.5 }, speed: 22, direction: 190, altitude: 2000 },
    { id: 'aw4', position: { longitude: 11.1, latitude: 47.5 }, speed: 20, direction: 188, altitude: 2000 },
    { id: 'aw5', position: { longitude: 10.5, latitude: 47.7 }, speed: 12, direction: 175, altitude: 2000 },
    { id: 'aw6', position: { longitude: 10.7, latitude: 47.7 }, speed: 16, direction: 180, altitude: 2000 },
    { id: 'aw7', position: { longitude: 10.9, latitude: 47.7 }, speed: 19, direction: 185, altitude: 2000 },
    { id: 'aw8', position: { longitude: 11.1, latitude: 47.7 }, speed: 17, direction: 182, altitude: 2000 },
    { id: 'aw9', position: { longitude: 10.5, latitude: 47.9 }, speed: 14, direction: 170, altitude: 2000 },
    { id: 'aw10', position: { longitude: 10.7, latitude: 47.9 }, speed: 17, direction: 175, altitude: 2000 },
    { id: 'aw11', position: { longitude: 10.9, latitude: 47.9 }, speed: 21, direction: 180, altitude: 2000 },
    { id: 'aw12', position: { longitude: 11.1, latitude: 47.9 }, speed: 19, direction: 178, altitude: 2000 }
  ],
  showArrows: true,
  color: '#0088FF',
  scale: 1.5
}

export const calmWind: WindLayer = {
  data: [
    { id: 'cw1', position: { longitude: 10.0, latitude: 51.0 }, speed: 5, direction: 90, altitude: 500 },
    { id: 'cw2', position: { longitude: 10.3, latitude: 51.0 }, speed: 6, direction: 95, altitude: 500 },
    { id: 'cw3', position: { longitude: 10.6, latitude: 51.0 }, speed: 4, direction: 85, altitude: 500 },
    { id: 'cw4', position: { longitude: 10.0, latitude: 51.2 }, speed: 7, direction: 100, altitude: 500 },
    { id: 'cw5', position: { longitude: 10.3, latitude: 51.2 }, speed: 5, direction: 90, altitude: 500 },
    { id: 'cw6', position: { longitude: 10.6, latitude: 51.2 }, speed: 6, direction: 95, altitude: 500 }
  ],
  showArrows: true,
  color: '#88CC00',
  scale: 1.0
}
