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
import { gridConfig, cameraConfig } from "@/configs/config";

function Scene() {
  const beetleRef = useRef();
  const isGrid = useStore((state) => state.isGrid);
  const rotateSpeed = useStore((state) => state.rotateSpeed);

  return (
    <>
      <PerspectiveCamera makeDefault {...cameraConfig} />
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
      <Canvas className="absolute inset-0 z-0">
        <Scene />
      </Canvas>

      <UIOverlay />
    </div>
  );
}

export default App;
