import React, { useRef } from "react";

import {
  OrbitControls,
  Stage,
  PerspectiveCamera,
  Grid,
} from "@react-three/drei";
import Beetle from "@/components/beetle";
import { useStore } from "@/store";
import { gridConfig, cameraConfig } from "@/configs/config";

const Scene = () => {
  const beetleRef = useRef();
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const theme = useStore((state) => state.theme);
  const isGrid = useStore((state) => state.isGrid);

  return (
    <>
      {isGrid && <Grid {...gridConfig} />}
      <PerspectiveCamera makeDefault {...cameraConfig} />
      <color
        attach="background"
        args={[theme === "dark" ? "#202020" : "skyblue"]}
      />
      <Stage intensity={0.5} shadows="contact" environment="city">
        <Beetle ref={beetleRef} />
      </Stage>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[-0.02, 0.55, -0.28]}
        minDistance={3}
        maxDistance={10}
        enableDamping
        makeDefault
        passive
        autoRotate
        autoRotateSpeed={rotateSpeed}
      />
    </>
  );
};

export default Scene;
