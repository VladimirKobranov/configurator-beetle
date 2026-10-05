import React, { Component, lazy, useCallback, useState } from "react";
import UIOverlay from "./components/UIOverlay";
import { ThemeToggle } from "./components/themeToggler";
import Footer from "./components/Footer";
import packageJson from "../package.json";
import AppLoader from "./components/AppLoader";

const SceneCanvas = lazy(() => import("./components/SceneCanvas"));

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
      <SceneErrorBoundary
        onError={() => setSceneError(true)}
        fallback={<AppLoader error />}
      >
        <SceneCanvas onReady={markSceneReady} />
      </SceneErrorBoundary>
      {sceneReady && !sceneError ? (
        <>
          <UIOverlay />
          <div className="absolute right-2 bottom-2 z-10 sm:right-4 sm:bottom-4">
            <ThemeToggle />
          </div>
          <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 sm:bottom-4">
            <Footer />
          </div>
          <span className="absolute bottom-2 left-2 z-10 text-[10px] text-muted-foreground/50 sm:bottom-4 sm:left-4">
            v{packageJson.version}
          </span>
        </>
      ) : (
        <div className="absolute inset-0 z-10">
          <AppLoader error={sceneError} />
        </div>
      )}
    </div>
  );
}

export default App;
