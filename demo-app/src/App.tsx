import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ParaglidingDemo } from './pages/ParaglidingDemo'
import { HikingDemo } from './pages/HikingDemo'
import { AirspacesDemo } from './pages/AirspacesDemo'
import { WindDemo } from './pages/WindDemo'
import { DroneDemo } from './pages/DroneDemo'
import { CombinedDemo } from './pages/CombinedDemo'
import { CesiumParaglidingDemo } from './pages/CesiumParaglidingDemo'
import { CesiumAirspacesDemo } from './pages/CesiumAirspacesDemo'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* MapLibre demos */}
        <Route path="/paragliding" element={<ParaglidingDemo />} />
        <Route path="/hiking" element={<HikingDemo />} />
        <Route path="/airspaces" element={<AirspacesDemo />} />
        <Route path="/wind" element={<WindDemo />} />
        <Route path="/drone" element={<DroneDemo />} />
        <Route path="/combined" element={<CombinedDemo />} />
        {/* Cesium demos */}
        <Route path="/cesium-paragliding" element={<CesiumParaglidingDemo />} />
        <Route path="/cesium-airspaces" element={<CesiumAirspacesDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
