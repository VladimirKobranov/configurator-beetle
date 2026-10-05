import { create } from "zustand";
import { presetColors } from "@/configs/config"; // Adjust path if needed

const storedTheme = localStorage.getItem("beetle-theme");
const initialTheme = ["system", "light", "dark"].includes(storedTheme)
  ? storedTheme
  : "system";

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
  theme: initialTheme,

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

  setTheme: (next) => {
    localStorage.setItem("beetle-theme", next);
    set({ theme: next });
  },
}));

export { useStore };
