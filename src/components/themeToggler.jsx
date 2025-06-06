import { useTheme } from "@/hooks/UseTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      .{theme === "dark" ? "dark" : "light"}
    </Button>
  );
}
