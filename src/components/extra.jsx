import React from "react";
import { ThemeToggle } from "./themeToggler";
import { useStore } from "@/store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RotateCw, Grid3X3, Palette, Monitor } from "lucide-react";

const Extra = ({ rotateSpeed, updateRotateSpeed }) => {
  const isGrid = useStore((state) => state.isGrid);
  const handleGridVisibility = useStore((state) => state.handleGridVisibility);

  // Get current theme from store
  const theme = useStore((state) => state.theme);

  return (
    <div className="space-y-6">
      {/* Auto Rotation Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Auto Rotation</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {rotateSpeed > 0 ? `${rotateSpeed.toFixed(1)}x` : "Off"}
          </Badge>
        </div>
        <Slider
          value={[rotateSpeed]}
          max={5}
          step={0.1}
          onValueChange={([val]) => updateRotateSpeed(val)}
          className="w-full"
        />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Off</span>
          <span className="font-medium">
            {rotateSpeed > 0 ? "Active" : "Disabled"}
          </span>
          <span>Fast</span>
        </div>
      </div>
      <Separator />

      {/* Grid Visibility */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Grid Helper</span>
          </div>
          <Badge variant={isGrid ? "default" : "secondary"} className="text-xs">
            {isGrid ? "Visible" : "Hidden"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <Label
            htmlFor="grid-toggle"
            className="text-sm text-muted-foreground"
          >
            Show grid lines for reference
          </Label>
          <Switch
            id="grid-toggle"
            checked={isGrid}
            onCheckedChange={handleGridVisibility}
          />
        </div>
      </div>
      <Separator />

      {/* Theme Toggle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Appearance</span>
          </div>
          <Badge
            variant={theme === "dark" ? "default" : "secondary"}
            className="text-xs"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">
            Toggle light/dark theme
          </Label>
          <ThemeToggle />
        </div>
      </div>
      <Separator />

      {/* Additional Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Tips</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Use auto rotation to view your car from all angles. Enable grid helper
          for precise positioning reference.
        </p>
      </div>
    </div>
  );
};

export default Extra;
