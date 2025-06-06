import React from "react";
import { Canvas } from "@react-three/fiber";
import UIOverlay from "./components/UIOverlay";

import Scene from "./components/scene";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas className="absolute inset-0 z-0" shadows>
        <Scene />
      </Canvas>
      <UIOverlay />
    </div>
  );
}

export default App;
