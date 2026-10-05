import { useCallback, useLayoutEffect, useMemo } from "react";
import { useStore } from "@/store/index";

export function useTheme() {
  const setTheme = useStore((state) => state.setTheme);
  const theme = useStore((state) => state.theme);
  const mediaQuery = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    [],
  );

  const applyTheme = useCallback(() => {
    const resolvedTheme =
      theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [mediaQuery, theme]);

  useLayoutEffect(() => {
    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);
    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [applyTheme, mediaQuery]);

  return { theme, setTheme };
}
