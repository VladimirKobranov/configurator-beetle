import { useStore } from "@/store";
import React from "react";
import { Button } from "./ui/button";

const Parts = () => {
  const parts = useStore((state) => state.parts);
  const setParts = useStore((state) => state.setParts);

  const bodyOptions = [0, 1, 2];
  const wheelOptions = [0, 1, 2];
  const lightOptions = [0, 1, 2, 3, 4, 5]; // 2 is empty

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center">Parts</h1>

      {/* Body */}
      <div className="mb-2">
        <h3 className="mb-2 text-md font-medium">Body</h3>
        <div className="flex flex-row gap-2">
          {bodyOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setParts({ body: option })}
              variant={parts.body === option ? "default" : "secondary"}
            >
              Type {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Wheels */}
      <div className="mb-2">
        <h3 className="mb-2 text-md font-medium">Wheels</h3>
        <div className="flex flex-row gap-2">
          {wheelOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setParts({ wheels: option })}
              variant={parts.wheels === option ? "default" : "secondary"}
            >
              Type {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Lights */}
      <div className="mb-2">
        <h3 className="mb-2 text-md font-medium">Lights</h3>

        {/*<div className="grid grid-cols-3 gap-2"> */}
        <div className="flex flex-row flex-wrap gap-2">
          {lightOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setParts({ lights: option })}
              variant={parts.lights === option ? "default" : "secondary"}
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
