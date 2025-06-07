// components/Beetle.jsx
import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useStore } from "@/store";

const Beetle = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/Beetle_-transformed.glb");

  const parts = useStore((state) => state.parts);
  const mat       = useStore((s) => s.materials);

  const overridePaint = (baseMaterial) => {
    const m = baseMaterial.clone();
    m.color.set(mat.color);
    m.metalness         = mat.metalness;
    m.roughness         = mat.roughness;
    m.clearcoat         = mat.clearCoat;
    m.clearcoatRoughness= mat.clearCoatRoughness;
    return m;
  };

  const getCustomBodyMeshes = (type) => {
    const validType = Math.max(0, Math.min(2, type));
    switch (validType) {
      case 0:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_0_1.geometry}
              material={overridePaint(materials.Paint)}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_0_2.geometry}
              material={materials.Shared}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_0_3.geometry}
              material={materials.Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_0_4.geometry}
              material={materials.TiresNumbers}
            />
          </>
        );
      case 1:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_1_1.geometry}
              material={materials.Shared}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_1_2.geometry}
              material={overridePaint(materials.Paint)}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_1_3.geometry}
              material={materials.Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_1_4.geometry}
              material={materials.TiresNumbers}
            />
          </>
        );
      case 2:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_2_1.geometry}
              material={materials.Shared}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_2_2.geometry}
              material={overridePaint(materials.Paint)}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_2_3.geometry}
              material={materials.TiresNumbers}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getWheelsMeshes = (type) => {
    const validType = Math.max(0, Math.min(2, type));
    switch (validType) {
      case 0:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_0_1.geometry}
              material={materials.TiresNumbers}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_0_2.geometry}
              material={materials.Shared}
            />
          </>
        );
      case 1:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_1_1.geometry}
              material={materials.TiresNumbers}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_1_2.geometry}
              material={materials.Shared}
            />
          </>
        );
      case 2:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_2_1.geometry}
              material={materials.TiresNumbers}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_2_2.geometry}
              material={materials.Shared}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wheels_2_3.geometry}
              material={overridePaint(materials.Paint)}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getLightsMeshes = (type) => {
    switch (type) {
      case 0:
        return;
      case 1:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_1_1.geometry}
              material={materials.DirtDrags_Lights}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_1_2.geometry}
              material={materials.Shared}
            />
          </>
        );
      case 2:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_0_1.geometry}
              material={materials.DirtDrags_Lights}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_0_2.geometry}
              material={materials.Shared}
            />
          </>
        );
      case 3:
        return (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lights_3.geometry}
            material={materials.DirtDrags_Lights}
          />
        );
      case 4:
        return (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lights_4.geometry}
            material={materials.DirtDrags_Lights}
          />
        );
      case 5:
        return (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_5_1.geometry}
              material={materials.DirtDrags_Lights}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lights_5_2.geometry}
              material={materials.Shared}
            />
          </>
        );
      default:
        return null;
    }
  };

  // Destructure any “type” props you might pass from parent:
  // e.g. <Beetle bodyType={1} wheelType={2} lightType={0} />
  const { bodyType = 0, wheelType = 0, lightType = 0, ...rest } = props;

  return (
    <group ref={ref} {...rest} dispose={null}>
      {/* Base “stock” meshes */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body_stock_1.geometry}
        material={overridePaint(materials.Paint)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body_stock_2.geometry}
        material={materials.Shared}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body_stock_3.geometry}
        material={materials.AMCGremlin_Lights}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body_stock_4.geometry}
        material={materials.Glass}
      />

      {/* Conditionally render your “custom” parts underneath */}
      {getCustomBodyMeshes(parts.body)}
      {getWheelsMeshes(parts.wheels)}
      {getLightsMeshes(parts.lights)}
    </group>
  );
});

// Preload the GLTF outside
useGLTF.preload("/Beetle_-transformed.glb");

export default Beetle;
