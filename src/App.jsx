import React, { lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import UIOverlay from "./components/UIOverlay";
import { ThemeToggle } from "./components/themeToggler";
import Footer from "./components/Footer";
import packageJson from "../package.json";

const Scene = lazy(() => import("./components/scene"));

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas className="absolute inset-0 z-0" shadows dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
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
