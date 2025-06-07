export const gridConfig = {
  gridSize: [50, 50], //overall size
  cellSize: 0.5, // small size
  cellThickness: 1,
  cellColor: "#6f6f6f",
  sectionSize: 2, // big cell size
  sectionThickness: 1.5,
  sectionColor: "#9d4b4b",
  fadeDistance: 50,
  fadeStrength: 5,
  followCamera: false,
  infiniteGrid: true,
  position: [0, -1, 0],
};

export const cameraConfig = {
  fov: 25,
  position: [-5.917858671640488, 2.4298701393576208, 5.549396055104174],
  rotation: [-0.3184537412476864, -0.7571109077519735, -0.22267351496020926],
};

export const partOptions = {
  body: [
    { id: 0, name: "Coupé", description: "Classic 2-door coupé" },
    { id: 1, name: "Travel bug", description: "write your trip diaries" },
    { id: 2, name: "Rat", description: "Sport utility vehicle" },
  ],
  wheels: [
    { id: 0, name: "Stock", description: "classic wheels" },
    { id: 1, name: "Sport", description: "performance wheels" },
    { id: 2, name: "Vintage", description: "baby moon hubcap" },
  ],
  lights: [
    { id: 0, name: "None", description: "No headlights" },
    { id: 1, name: "Halogen", description: "Standard halogen headlights" },
    { id: 2, name: "LED", description: "LED headlight system" },
    { id: 3, name: "Xenon", description: "High-intensity xenon lights" },
    { id: 4, name: "Matrix LED", description: "Adaptive matrix LED system" },
    { id: 5, name: "Laser", description: "Premium laser headlights" },
  ],
};

export const presetColors = [
  { name: "Black", hex: "#1f1f1f", description: "Classic deep black" },
  {
    name: "Yukon Yellow",
    hex: "#ffd700",
    description: "Bright sunshine yellow",
  },
  { name: "Clementine", hex: "#ff8c00", description: "Vibrant orange" },
  { name: "Royal Red", hex: "#dc143c", description: "Deep royal red" },
  {
    name: "Diamond Blue",
    hex: "#4682b4",
    description: "Sparkling blue metallic",
  },
  { name: "Poppy Red", hex: "#ff6347", description: "Bright poppy red" },
  { name: "Elm Green", hex: "#228b22", description: "Natural elm green" },
  { name: "Savannah Beige", hex: "#f5deb3", description: "Warm desert beige" },
  { name: "Cobalt Blue", hex: "#0047ab", description: "Deep cobalt blue" },
  { name: "Deep Sea Green", hex: "#2e8b57", description: "Ocean depth green" },
  { name: "Chinchilla", hex: "#a0a0a4", description: "Soft gray metallic" },
  { name: "Pastel White", hex: "#f8f8ff", description: "Pure pastel white" },
];
