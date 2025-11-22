import type { FlightPath } from '@cloudqueen/3d-map-component'

export const gleitschirmflug: FlightPath = {
  id: 'paragliding-alps',
  name: 'Gleitschirmflug Chiemgau',
  positions: [
    { longitude: 12.4520, latitude: 47.7850, altitude: 650, timestamp: 1699358400000 },
    { longitude: 12.4580, latitude: 47.7920, altitude: 850, timestamp: 1699358520000 },
    { longitude: 12.4650, latitude: 47.7990, altitude: 1100, timestamp: 1699358640000 },
    { longitude: 12.4720, latitude: 47.8060, altitude: 1350, timestamp: 1699358760000 },
    { longitude: 12.4800, latitude: 47.8130, altitude: 1580, timestamp: 1699358880000 },
    { longitude: 12.4880, latitude: 47.8200, altitude: 1820, timestamp: 1699359000000 },
    { longitude: 12.4960, latitude: 47.8250, altitude: 2050, timestamp: 1699359120000 },
    { longitude: 12.5040, latitude: 47.8290, altitude: 2180, timestamp: 1699359240000 },
    { longitude: 12.5120, latitude: 47.8320, altitude: 2280, timestamp: 1699359360000 },
    { longitude: 12.5200, latitude: 47.8340, altitude: 2320, timestamp: 1699359480000 },
    { longitude: 12.5280, latitude: 47.8350, altitude: 2280, timestamp: 1699359600000 },
    { longitude: 12.5360, latitude: 47.8340, altitude: 2150, timestamp: 1699359720000 },
    { longitude: 12.5440, latitude: 47.8320, altitude: 1980, timestamp: 1699359840000 },
    { longitude: 12.5520, latitude: 47.8290, altitude: 1780, timestamp: 1699359960000 },
    { longitude: 12.5600, latitude: 47.8250, altitude: 1550, timestamp: 1699360080000 },
    { longitude: 12.5680, latitude: 47.8200, altitude: 1300, timestamp: 1699360200000 },
    { longitude: 12.5760, latitude: 47.8150, altitude: 1050, timestamp: 1699360320000 },
    { longitude: 12.5840, latitude: 47.8100, altitude: 820, timestamp: 1699360440000 },
    { longitude: 12.5900, latitude: 47.8050, altitude: 650, timestamp: 1699360560000 }
  ],
  color: '#FF6600',
  width: 3,
  showMarkers: true
}

export const ballonfahrt: FlightPath = {
  id: 'balloon-flight',
  name: 'Ballonfahrt über Franken',
  positions: [
    { longitude: 10.8900, latitude: 49.8900, altitude: 500, timestamp: 1699344000000 },
    { longitude: 10.8950, latitude: 49.8950, altitude: 520, timestamp: 1699344300000 },
    { longitude: 10.9020, latitude: 49.9020, altitude: 550, timestamp: 1699344600000 },
    { longitude: 10.9100, latitude: 49.9100, altitude: 580, timestamp: 1699344900000 },
    { longitude: 10.9180, latitude: 49.9170, altitude: 620, timestamp: 1699345200000 },
    { longitude: 10.9250, latitude: 49.9230, altitude: 650, timestamp: 1699345500000 },
    { longitude: 10.9320, latitude: 49.9280, altitude: 680, timestamp: 1699345800000 },
    { longitude: 10.9400, latitude: 49.9320, altitude: 700, timestamp: 1699346100000 },
    { longitude: 10.9480, latitude: 49.9350, altitude: 720, timestamp: 1699346400000 },
    { longitude: 10.9560, latitude: 49.9370, altitude: 700, timestamp: 1699346700000 },
    { longitude: 10.9640, latitude: 49.9380, altitude: 650, timestamp: 1699347000000 },
    { longitude: 10.9720, latitude: 49.9370, altitude: 580, timestamp: 1699347300000 },
    { longitude: 10.9800, latitude: 49.9350, altitude: 500, timestamp: 1699347600000 }
  ],
  color: '#9933FF',
  width: 3,
  showMarkers: false
}

export const drohnenflug: FlightPath = {
  id: 'drone-inspection',
  name: 'Drohneninspektion Windpark',
  positions: [
    { longitude: 8.2000, latitude: 53.1000, altitude: 50, timestamp: 1699369200000 },
    { longitude: 8.2020, latitude: 53.1010, altitude: 80, timestamp: 1699369220000 },
    { longitude: 8.2040, latitude: 53.1020, altitude: 100, timestamp: 1699369240000 },
    { longitude: 8.2060, latitude: 53.1030, altitude: 120, timestamp: 1699369260000 },
    { longitude: 8.2080, latitude: 53.1040, altitude: 140, timestamp: 1699369280000 },
    { longitude: 8.2100, latitude: 53.1050, altitude: 150, timestamp: 1699369300000 },
    { longitude: 8.2100, latitude: 53.1050, altitude: 150, timestamp: 1699369320000 },
    { longitude: 8.2080, latitude: 53.1050, altitude: 150, timestamp: 1699369340000 },
    { longitude: 8.2060, latitude: 53.1050, altitude: 150, timestamp: 1699369360000 },
    { longitude: 8.2060, latitude: 53.1040, altitude: 120, timestamp: 1699369380000 },
    { longitude: 8.2060, latitude: 53.1030, altitude: 80, timestamp: 1699369400000 },
    { longitude: 8.2060, latitude: 53.1020, altitude: 50, timestamp: 1699369420000 }
  ],
  color: '#00CCFF',
  width: 2,
  showMarkers: true
}
