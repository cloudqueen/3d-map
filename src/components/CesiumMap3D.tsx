import React, { useEffect, useRef, useState } from 'react'
import {
  Viewer,
  createWorldTerrainAsync,
  OpenStreetMapImageryProvider,
  Cartesian3,
  Math as CesiumMath,
  Color,
  defined
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import type { CesiumMap3DProps, CesiumViewState } from '../types/cesium'
import { useCesiumFlightPaths } from '../hooks/cesium/useCesiumFlightPaths'
import { useCesiumTracks } from '../hooks/cesium/useCesiumTracks'
import { useCesiumAirspaces } from '../hooks/cesium/useCesiumAirspaces'
import { useCesiumWindLayer } from '../hooks/cesium/useCesiumWindLayer'
import { useCesiumTerrain } from '../hooks/cesium/useCesiumTerrain'

// Cesium Ion Token ist optional - ohne funktioniert es mit eigenen Tiles
// Cesium.Ion.defaultAccessToken = 'your_token_here'; // Nur wenn Ion verwendet wird

export const CesiumMap3D: React.FC<CesiumMap3DProps> = ({
  width = '100%',
  height = '600px',
  className,
  style,
  initialViewState = {
    longitude: 10.0,
    latitude: 51.0,
    zoom: 6,
    pitch: 0,
    bearing: 0,
    heading: 0,
    roll: 0
  },
  mapStyle,
  terrain,
  flightPaths = [],
  tracks = [],
  airspaces = [],
  windLayer,
  enableAnimation = false,
  startTime,
  endTime,
  clockMultiplier = 1,
  onViewerReady,
  onClick,
  onViewStateChange,
  terrainProvider,
  imageryProvider,
  enableCameraUnderground = false,
  depthTestAgainstTerrain = true
}) => {
  const cesiumContainer = useRef<HTMLDivElement>(null)
  const viewer = useRef<Viewer | null>(null)
  const [isViewerReady, setIsViewerReady] = useState(false)

  // Initialize Cesium Viewer
  useEffect(() => {
    if (!cesiumContainer.current || viewer.current) return

    // Create imagery provider
    let imagery = imageryProvider
    if (!imagery) {
      if (mapStyle?.imageryProvider === 'osm' || !mapStyle?.imageryProvider) {
        imagery = new OpenStreetMapImageryProvider({
          url: mapStyle?.url || 'https://tile.openstreetmap.org/'
        })
      }
    }

    // Create viewer
    viewer.current = new Viewer(cesiumContainer.current, {
      imageryProvider: imagery,
      terrainProvider: undefined, // Set later via hook
      animation: enableAnimation,
      timeline: enableAnimation,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: true,
      sceneModePicker: true,
      navigationHelpButton: true,
      fullscreenButton: true,
      vrButton: false,
      shouldAnimate: enableAnimation,
      requestRenderMode: false,
      maximumRenderTimeChange: Infinity
    })

    const scene = viewer.current.scene

    // Enable camera underground
    if (enableCameraUnderground) {
      scene.screenSpaceCameraController.enableCollisionDetection = false
    }

    // Depth test against terrain
    scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain

    // Enable lighting if requested
    if (mapStyle?.enableLighting) {
      scene.globe.enableLighting = true
    }

    // Enable fog if requested
    if (mapStyle?.enableFog !== false) {
      scene.fog.enabled = true
    }

    // Sky atmosphere
    if (mapStyle?.skyAtmosphere !== false) {
      scene.skyAtmosphere.show = true
    }

    // Set initial camera position
    const camera = viewer.current.camera
    const { longitude, latitude, zoom = 6, pitch = 0, heading = 0, roll = 0 } = initialViewState

    // Convert zoom to height (approximation)
    const height = Math.pow(2, 20 - zoom) * 156543.03392

    camera.setView({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: {
        heading: CesiumMath.toRadians(heading),
        pitch: CesiumMath.toRadians(pitch - 90), // Cesium pitch is different
        roll: CesiumMath.toRadians(roll)
      }
    })

    // Set clock if time range is provided
    if (viewer.current.clock && startTime && endTime) {
      viewer.current.clock.startTime = (startTime as any)
      viewer.current.clock.stopTime = (endTime as any)
      viewer.current.clock.currentTime = (startTime as any).clone()
      viewer.current.clock.multiplier = clockMultiplier
      viewer.current.clock.shouldAnimate = enableAnimation
    }

    // Click handler
    if (onClick) {
      viewer.current.screenSpaceEventHandler.setInputAction((movement: any) => {
        const pickedObject = viewer.current?.scene.pick(movement.position)
        if (defined(pickedObject) && defined(pickedObject.id)) {
          onClick(pickedObject.id)
        } else {
          onClick(undefined)
        }
      }, (window as any).Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    // Camera move handler for view state changes
    if (onViewStateChange) {
      viewer.current.camera.moveEnd.addEventListener(() => {
        if (!viewer.current) return
        const camera = viewer.current.camera
        const cartographic = camera.positionCartographic

        const viewState: CesiumViewState = {
          longitude: CesiumMath.toDegrees(cartographic.longitude),
          latitude: CesiumMath.toDegrees(cartographic.latitude),
          zoom: Math.log2(156543.03392 / (cartographic.height / Math.pow(2, 20))),
          pitch: CesiumMath.toDegrees(camera.pitch) + 90,
          bearing: CesiumMath.toDegrees(camera.heading),
          heading: CesiumMath.toDegrees(camera.heading),
          roll: CesiumMath.toDegrees(camera.roll)
        }

        onViewStateChange(viewState)
      })
    }

    setIsViewerReady(true)
    if (onViewerReady) {
      onViewerReady(viewer.current)
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy()
        viewer.current = null
      }
    }
  }, [])

  // Use custom hooks for layer management
  useCesiumFlightPaths(viewer.current, isViewerReady, flightPaths)
  useCesiumTracks(viewer.current, isViewerReady, tracks)
  useCesiumAirspaces(viewer.current, isViewerReady, airspaces)
  useCesiumWindLayer(viewer.current, isViewerReady, windLayer)
  useCesiumTerrain(viewer.current, isViewerReady, terrain, terrainProvider)

  return (
    <div
      ref={cesiumContainer}
      className={className}
      style={{
        width,
        height,
        ...style
      }}
    />
  )
}

export default CesiumMap3D
