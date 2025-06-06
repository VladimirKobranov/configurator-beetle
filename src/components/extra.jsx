import React from "react";

import { ThemeToggle } from "./themeToggler";
import { useStore } from "@/store";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Extra = () => {
  const isGrid = useStore((state) => state.isGrid);
  const handleGridVisibility = useStore((state) => state.handleGridVisibility);

  return (
    <div className="space-y-4">
      <h2> Extra Options...</h2>
      <div className="flex items-center space-x-2">
        <Switch onClick={handleGridVisibility} checked={isGrid} />
        <Label htmlFor="airplane-mode">Grid {isGrid ? "On" : "Off"}</Label>
      </div>
      <ThemeToggle />

      <p className="text-xs text-gray-600">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
  );
};

export default Extra;
