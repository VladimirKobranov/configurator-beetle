import { create } from "zustand";

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

  // Material state
  material: {
    color: "",
    roughness: 0,
    metalness: 0,
    clearCoat: 0,
    clearCoatRoughness: 0,
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
  setMaterials: (next) =>
    set((state) => ({
      materials: { ...state.materials, ...next },
    })),
  // Booleans
  handleGridVisibility: () => set((state) => ({ isGrid: !state.isGrid })),
  //Theme
  setTheme: (next) => set({ theme: next }),
}));

export { useStore };
