import { useTheme } from "@/hooks/UseTheme";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Switch onClick={toggleTheme} checked={isDark} />
      <Label htmlFor="airplane-mode">
        {theme === "dark" ? "Dark" : "Light"}
      </Label>
    </div>
  );
}
