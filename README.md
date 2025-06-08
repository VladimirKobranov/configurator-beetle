# Car Configurator

A 3D car configurator built with React, Vite, Zustand, Tailwind CSS, and Radix UI.  
Users can customize a classic Beetle car model in real-time, changing its parts, materials, and appearance.

## Features

- **3D Car Model:** Interactive visualization using [three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [@react-three/drei](https://github.com/pmndrs/drei).
- **Customizable Parts:** Change body style, wheels, and lights.
- **Material Presets & Customization:** Choose from preset colors or fine-tune paint, metalness, roughness, and clear coat.
- **Theme Toggle:** Switch between light and dark mode.
- **UI Components:** Modern UI with [Radix UI](https://www.radix-ui.com/) and [Lucide icons](https://lucide.dev/).
- **State Management:** Powered by [Zustand](https://zustand-demo.pmnd.rs/).

## Project Structure

```
src/
  App.jsx                # Main app entry
  main.jsx               # React root
  index.css              # Tailwind & theme styles
  components/            # UI and 3D components
  configs/config.js      # Configurations for parts, colors, grid, camera
  hooks/                 # Custom React hooks
  lib/                   # Utility functions
  store/                 # Zustand store
public/                  # Static assets (GLB model, icons)
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## License

MIT

---

**About:**  
This project demonstrates a modern, interactive 3D product configurator using the latest React ecosystem tools. It is suitable as a template or starting point for similar visualization/configuration apps.