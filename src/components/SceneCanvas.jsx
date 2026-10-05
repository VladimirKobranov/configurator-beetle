import React, { lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const Scene = lazy(() => import("./Scene"));

export default function SceneCanvas({ onReady }) {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      shadows
      dpr={[1, 1.5]}
      fallback={null}
    >
      <Suspense fallback={null}>
        <Scene onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
