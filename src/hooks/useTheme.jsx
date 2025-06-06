import { useEffect } from "react";
import { useStore } from "@/store/index";

export function useTheme() {
  const setTheme = useStore((state) => state.setTheme);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}
