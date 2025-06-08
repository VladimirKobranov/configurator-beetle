import { create } from "zustand";
import { presetColors } from "@/configs/config"; // Adjust path if needed

// Pick a random material object from the presetColors array
const randomMaterial =
  presetColors[Math.floor(Math.random() * presetColors.length)].material;

const useStore = create((set) => ({
  // Model state
  transform: {
    scale: { x: 1, y: 1, z: 1 },
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },

  parts: {
    body: 0,
    wheels: 0,
    lights: 0,
  },

  // Material state — initialized from randomMaterial
  material: {
    color: randomMaterial.paintColor,
    roughness: randomMaterial.roughness,
    metalness: randomMaterial.metalness,
    clearCoat: randomMaterial.clearCoat,
    clearCoatRoughness: randomMaterial.clearCoatRoughness,
  },

  // Other values
  rotateSpeed: 0.5,
  isWireframe: false,
  isGrid: false,

  // Theme
  theme: "light",

  // Methods
  updateRotateSpeed: (next) => set({ rotateSpeed: next }),

  setParts: (next) =>
    set((state) => ({
      parts: { ...state.parts, ...next },
    })),

  setMaterial: (next) => {
    set((state) => ({
      material: { ...state.material, ...next },
    }));
  },

  handleGridVisibility: () => set((state) => ({ isGrid: !state.isGrid })),

  setTheme: (next) => set({ theme: next }),
}));

export { useStore };
