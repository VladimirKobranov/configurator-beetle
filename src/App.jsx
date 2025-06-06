import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  PerspectiveCamera,
} from "@react-three/drei";

import Beetle from "./components/Beetle";

import UIOverlay from "./components/UIOverlay"; // The separated UI component
import { useStore } from "@/store";

function Scene() {
  const beetleRef = useRef();
  const isGrid = useStore((state) => state.isGrid);
  const rotateSpeed = useStore((state) => state.rotateSpeed);

  const gridConfig = {
    gridSize: [50, 50], //overall size
    cellSize: 1, // small size
    cellThickness: 1,
    cellColor: "#6f6f6f",
    sectionSize: 3, // big cell size
    sectionThickness: 1.5,
    sectionColor: "#9d4b4b",
    fadeDistance: 15,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

  const cameraConfig = {
    fov: 25,
    position: [-5.917858671640488, 2.4298701393576208, 5.549396055104174],
    rotation: [-0.3184537412476864, -0.7571109077519735, -0.22267351496020926],
  };

  return (
    <>
      <PerspectiveCamera makeDefault {...cameraConfig}/>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Beetle ref={beetleRef} />
      {/* <color attach="background" args={["skyblue"]} /> */}
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[-0.02, 0.55, -0.28]}
        minDistance={3}
        maxDistance={10}
        enableDamping
        makeDefault
        passive
        autoRotate
        autoRotateSpeed={rotateSpeed}
      />
      <Environment preset="city" />
      {isGrid && <Grid {...gridConfig} />}
    </>
  );
}

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D background */}
      <Canvas className="absolute inset-0 z-0">
        <Scene />
      </Canvas>

      {/* UI Layer loaded via a separate component */}
      <UIOverlay />
    </div>
  );
}

export default App;
