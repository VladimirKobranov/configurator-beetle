import { useStore } from "@/store";
import React from "react";
import { Button } from "./ui/button";

const Parts = () => {
  const parts = useStore((state) => state.parts);
  const setParts = useStore((state) => state.setParts);

  const bodyOptions = [0, 1, 2]; // Define all possible body types here

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800">Parts</h1>

      <div>
        <h3 className="mb-2 text-md">Body</h3>
        <div className="flex flex-row gap-2">
          {bodyOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setParts({ body: option })}
              variant={parts.body === option ? "default" : "ghost"}
            >
              Type {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parts;
