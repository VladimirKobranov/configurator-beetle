import { useStore } from "@/store";
import React, { useState } from "react";

import { ThemeToggle } from "./themeToggler";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function UIOverlay() {
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const updateRotateSpeed = useStore((state) => state.updateRotateSpeed);
  const isGrid = useStore((state) => state.isGrid);
  const handleGridVisibility = useStore((state) => state.handleGridVisibility);

  const [tab, setTab] = useState("default");

  const handleTab = (val) => {
    setTab((prev) => (prev === val ? "default" : val));
  };

  return (
    <div className="absolute top-0 left-0 z-10 m-4">
      <div className="text-left space-y-4 bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg mb-2">
        <h1 className="text-xl font-bold text-gray-800">Car configurator</h1>

        <div className="space-y-4">
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

        <div className="flex flex-col gap-2">
          <Button onClick={() => handleTab("material")}>Materials</Button>
          <Button onClick={() => handleTab("parts")}>Parts</Button>
          <Button onClick={() => handleTab("extra")}>Extra</Button>
        </div>
      </div>

      {tab !== "default" && (
        <div className="text-left space-y-4 bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg">
          {tab === "material" && (
            <div>
              <h2>Material Options...</h2>
            </div>
          )}
          {tab === "parts" && (
            <div>
              <h2>Parts Options...</h2>
            </div>
          )}
          {tab === "extra" && (
            <div className="space-y-4">
              <h2> Extra Options...</h2>
              <div className="flex items-center space-x-2">
                <Switch onClick={handleGridVisibility} />
                <Label htmlFor="airplane-mode">
                  Grid {isGrid ? "On" : "Off"}
                </Label>
              </div>
              <ThemeToggle />

              <p className="text-xs text-gray-600">
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
