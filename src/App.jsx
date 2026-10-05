import React, { Component, lazy, Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import UIOverlay from "./components/UIOverlay";
import { ThemeToggle } from "./components/themeToggler";
import Footer from "./components/Footer";
import packageJson from "../package.json";

const Scene = lazy(() => import("./components/scene"));

class SceneErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneError, setSceneError] = useState(false);
  const markSceneReady = useCallback(() => setSceneReady(true), []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas
        className="absolute inset-0 z-0"
        shadows
        dpr={[1, 1.5]}
        fallback={
          <div className="grid h-full place-items-center bg-background p-6 text-sm text-muted-foreground">
            3D preview is unavailable in this browser.
          </div>
        }
      >
        <SceneErrorBoundary
          onError={() => setSceneError(true)}
          fallback={
            <div className="grid h-full place-items-center bg-background p-6 text-sm text-muted-foreground">
              3D preview could not be loaded.
            </div>
          }
        >
          <Suspense fallback={null}>
            <Scene onReady={markSceneReady} />
          </Suspense>
        </SceneErrorBoundary>
      </Canvas>
      {!sceneReady && !sceneError && (
        <div className="pointer-events-none absolute inset-0 z-[1] grid place-items-center text-sm text-muted-foreground">
          Loading 3D preview…
        </div>
      )}
      <UIOverlay />
      <div className="absolute bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <Footer />
      </div>
      <span className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50">
        v{packageJson.version}
      </span>
    </div>
  );
}

export default App;
