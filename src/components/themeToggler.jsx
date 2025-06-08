import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Switch onClick={toggleTheme} checked={isDark} />
    </div>
  );
}
