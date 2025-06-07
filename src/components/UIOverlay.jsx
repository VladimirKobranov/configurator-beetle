import { useStore } from "@/store";
import React, { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";
import Parts from "@/components/parts";
import Materials from "./materials";
import Extra from "./extra";

export default function UIOverlay() {
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const updateRotateSpeed = useStore((state) => state.updateRotateSpeed);

  const [tab, setTab] = useState("default");

  const handleTab = (val) => {
    setTab((prev) => (prev === val ? "default" : val));
  };

  return (
    <div className="absolute top-0 left-0 z-10 m-4 columns-md ">
      <div className="text-left space-y-4 backdrop-blur p-6 rounded-xl shadow-lg mb-2 bg-white dark:bg-black">
        <h1 className="text-xl font-bold text-center">Car configurator</h1>

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
        <div className="text-left space-y-4  backdrop-blur p-6 rounded-xl shadow-lg bg-white dark:bg-black">
          {tab === "material" && <Materials />}
          {tab === "parts" && <Parts />}
          {tab === "extra" && <Extra />}
        </div>
      )}
    </div>
  );
}
