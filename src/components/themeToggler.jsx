import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const changeTheme = (nextTheme) => {
    document.documentElement.dataset.themeSwitching = "true";
    setTheme(nextTheme);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        delete document.documentElement.dataset.themeSwitching;
      });
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card/95 p-1 shadow-lg backdrop-blur-md">
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="icon"
        aria-label="Use system theme"
        onClick={() => changeTheme("system")}
      >
        <Monitor className="size-4" />
      </Button>
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        aria-label="Use light theme"
        onClick={() => changeTheme("light")}
      >
        <Sun className="size-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        aria-label="Use dark theme"
        onClick={() => changeTheme("dark")}
      >
        <Moon className="size-4" />
      </Button>
    </div>
  );
}
