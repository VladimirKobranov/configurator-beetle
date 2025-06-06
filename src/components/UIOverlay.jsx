import { useStore } from "@/store";
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "./themeToggler";

export default function UIOverlay() {
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const updateRotateSpeed = useStore((state) => state.updateRotateSpeed);
  const isGrid = useStore((state) => state.isGrid);
  const handleGridVisibility = useStore((state) => state.handleGridVisibility);

  return (
    <div className="absolute top-0 left-0 z-10 m-4">
      <div className="text-left space-y-4 bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg">
        <h1 className="text-xl font-bold text-gray-800">Vite + React</h1>

        <div className="space-y-4">
          <Button onClick={handleGridVisibility}>
            Grid {isGrid ? "On" : "Off"}
          </Button>
          <Slider
            value={[rotateSpeed]} // make it controlled
            max={5}
            step={0.1}
            onValueChange={([val]) => updateRotateSpeed(val)}
          />
          {rotateSpeed ? (
            <p>Rotate speed: {rotateSpeed}</p>
          ) : (
            <p>Autorotate disabled</p>
          )}
        </div>

        <p className="text-xs text-gray-600">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

        <ThemeToggle />
      </div>
    </div>
  );
}
