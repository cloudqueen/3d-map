import type { Track } from '@cloudqueen/3d-map-component'

export const zugspitzeTour: Track = {
  id: 'zugspitze-hike',
  name: 'Zugspitze Aufstieg',
  positions: [
    { longitude: 10.9850, latitude: 47.4210, altitude: 740 },
    { longitude: 10.9860, latitude: 47.4230, altitude: 780 },
    { longitude: 10.9870, latitude: 47.4250, altitude: 850 },
    { longitude: 10.9880, latitude: 47.4270, altitude: 920 },
    { longitude: 10.9890, latitude: 47.4290, altitude: 1000 },
    { longitude: 10.9900, latitude: 47.4310, altitude: 1120 },
    { longitude: 10.9910, latitude: 47.4330, altitude: 1250 },
    { longitude: 10.9920, latitude: 47.4350, altitude: 1400 },
    { longitude: 10.9930, latitude: 47.4370, altitude: 1580 },
    { longitude: 10.9940, latitude: 47.4390, altitude: 1780 },
    { longitude: 10.9950, latitude: 47.4410, altitude: 2000 },
    { longitude: 10.9960, latitude: 47.4420, altitude: 2250 },
    { longitude: 10.9970, latitude: 47.4430, altitude: 2500 },
    { longitude: 10.9980, latitude: 47.4440, altitude: 2750 },
    { longitude: 10.9990, latitude: 47.4450, altitude: 2900 },
    { longitude: 11.0000, latitude: 47.4460, altitude: 2962 }
  ],
  color: '#0066FF',
  width: 4
}

export const rheinRadweg: Track = {
  id: 'rhine-cycle',
  name: 'Rhein-Radweg Etappe',
  positions: [
    { longitude: 7.0900, latitude: 50.7300, altitude: 60 },
    { longitude: 7.0950, latitude: 50.7350, altitude: 58 },
    { longitude: 7.1000, latitude: 50.7400, altitude: 56 },
    { longitude: 7.1050, latitude: 50.7450, altitude: 55 },
    { longitude: 7.1100, latitude: 50.7500, altitude: 54 },
    { longitude: 7.1150, latitude: 50.7550, altitude: 53 },
    { longitude: 7.1200, latitude: 50.7600, altitude: 52 },
    { longitude: 7.1250, latitude: 50.7650, altitude: 51 },
    { longitude: 7.1300, latitude: 50.7700, altitude: 50 },
    { longitude: 7.1350, latitude: 50.7750, altitude: 49 },
    { longitude: 7.1400, latitude: 50.7800, altitude: 48 },
    { longitude: 7.1450, latitude: 50.7850, altitude: 47 },
    { longitude: 7.1500, latitude: 50.7900, altitude: 46 }
  ],
  color: '#00AA00',
  width: 3
}

export const stadtspaziergang: Track = {
  id: 'berlin-walk',
  name: 'Spaziergang Berlin Mitte',
  positions: [
    { longitude: 13.3770, latitude: 52.5160, altitude: 35 },
    { longitude: 13.3800, latitude: 52.5170, altitude: 35 },
    { longitude: 13.3850, latitude: 52.5180, altitude: 36 },
    { longitude: 13.3900, latitude: 52.5190, altitude: 36 },
    { longitude: 13.3950, latitude: 52.5200, altitude: 37 },
    { longitude: 13.4000, latitude: 52.5210, altitude: 37 },
    { longitude: 13.4050, latitude: 52.5200, altitude: 38 },
    { longitude: 13.4100, latitude: 52.5190, altitude: 38 }
  ],
  color: '#FF0066',
  width: 3
}
