
import React from "react";
import { Button } from "./ui/button";

const Materials = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center">Materials</h1>

      {/* Presets */}
      <div className="mb-2">
        <h3 className="mb-2 text-md font-medium">Body</h3>
        <div className="flex flex-row gap-2">
          <Button>White</Button>
        </div>
      </div>


    </div>
  );
};

export default Materials;
