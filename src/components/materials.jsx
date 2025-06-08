import React, { useEffect, useState } from "react";
import { Check, Palette, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useStore } from "../store"; // adjust as needed
import { presetColors } from "@/configs/config";

// Color picker component (simplified version)
const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="space-y-3">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-lg border border-border cursor-pointer"
      />
      <div className="text-xs font-mono text-muted-foreground text-center">
        {color.toUpperCase()}
      </div>
    </div>
  );
};

// Slider component with label and value display
const CustomSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label className="text-sm font-medium">{label}</Label>
      <span className="text-sm text-muted-foreground font-mono">
        {value.toFixed(2)}
      </span>
    </div>
    <Slider
      value={[value]}
      onValueChange={(values) => onChange(values[0])}
      min={min}
      max={max}
      step={step}
      className="w-full"
    />
  </div>
);

const ColorCard = ({ color, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
      hover:bg-accent hover:border-accent-foreground/20
      ${isSelected ? "border-primary bg-primary/5" : "border-border"}`}
  >
    <Avatar className="w-8 h-8">
      <AvatarFallback
        style={{ backgroundColor: color.hex }}
        className="border-2 border-background"
      />
    </Avatar>
    <div className="flex-grow">
      <span className="font-medium">{color.name}</span>
      <div className="text-xs text-muted-foreground">{color.description}</div>
      <div className="text-xs text-muted-foreground font-mono">{color.hex}</div>
    </div>
    {isSelected && <Check className="w-4 h-4 text-primary" />}
  </div>
);

const Materials = () => {
  const currentMaterial = useStore((state) => state.material);
  const setMaterials = useStore((state) => state.setMaterial);
  const [selectedColor, setSelectedColor] = useState(null);

  // Custom material state
  const [customMaterial, setCustomMaterial] = useState({
    paintColor: "#ff0000",
    metalness: 0.5,
    roughness: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.1,
  });

  // Preselect material based on store
  useEffect(() => {
    if (!currentMaterial) return;

    const match = presetColors.find((p) => {
      const m = p.material;
      return (
        m.paintColor === currentMaterial.color &&
        m.metalness === currentMaterial.metalness &&
        m.roughness === currentMaterial.roughness &&
        m.clearCoat === currentMaterial.clearCoat &&
        m.clearCoatRoughness === currentMaterial.clearCoatRoughness
      );
    });

    if (match) {
      setSelectedColor(match.name);
    }
  }, [currentMaterial]);

  // Update custom material when current material changes
  useEffect(() => {
    if (currentMaterial) {
      setCustomMaterial({
        paintColor: currentMaterial.color || "#ff0000",
        metalness: currentMaterial.metalness || 0.5,
        roughness: currentMaterial.roughness || 0.5,
        clearCoat: currentMaterial.clearCoat || 0.5,
        clearCoatRoughness: currentMaterial.clearCoatRoughness || 0.1,
      });
    }
  }, [currentMaterial]);

  const handleColorSelection = (colorName) => {
    setSelectedColor(colorName);
    const c = presetColors.find((p) => p.name === colorName);
    if (c?.material) {
      const {
        paintColor,
        metalness,
        roughness,
        clearCoat,
        clearCoatRoughness,
      } = c.material;
      setMaterials({
        color: paintColor,
        metalness,
        roughness,
        clearCoat,
        clearCoatRoughness,
      });
    }
  };

  const updateCustomMaterial = (property, value) => {
    const newMaterial = { ...customMaterial, [property]: value };
    setCustomMaterial(newMaterial);

    // Update the store
    setMaterials({
      color: newMaterial.paintColor,
      metalness: newMaterial.metalness,
      roughness: newMaterial.roughness,
      clearCoat: newMaterial.clearCoat,
      clearCoatRoughness: newMaterial.clearCoatRoughness,
    });

    // Clear preset selection when using custom
    setSelectedColor(null);
  };

  const selected = presetColors.find((p) => p.name === selectedColor);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">Materials</h1>

      <Tabs defaultValue="presets">
        <TabsList className="flex w-full">
          <TabsTrigger
            value="presets"
            className="flex-1 flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            Presets
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="flex-1 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presets">
          <ScrollArea className="h-[400px] w-full">
            <div className="flex flex-col gap-2 pr-4">
              {presetColors.map((color) => (
                <ColorCard
                  key={color.name}
                  color={color}
                  isSelected={selectedColor === color.name}
                  onSelect={() => handleColorSelection(color.name)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="custom">
          <div className="space-y-6">
            {/* Color Picker */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Paint Color</Label>
              <ColorPicker
                color={customMaterial.paintColor}
                onChange={(color) => updateCustomMaterial("paintColor", color)}
              />
            </div>

            {/* Material Properties */}
            <div className="space-y-4">
              <CustomSlider
                label="Metalness"
                value={customMaterial.metalness}
                onChange={(value) => updateCustomMaterial("metalness", value)}
                min={0}
                max={1}
                step={0.01}
              />

              <CustomSlider
                label="Roughness"
                value={customMaterial.roughness}
                onChange={(value) => updateCustomMaterial("roughness", value)}
                min={0}
                max={1}
                step={0.01}
              />

              <CustomSlider
                label="Clear Coat"
                value={customMaterial.clearCoat}
                onChange={(value) => updateCustomMaterial("clearCoat", value)}
                min={0}
                max={1}
                step={0.01}
              />

              <CustomSlider
                label="Clear Coat Roughness"
                value={customMaterial.clearCoatRoughness}
                onChange={(value) =>
                  updateCustomMaterial("clearCoatRoughness", value)
                }
                min={0}
                max={1}
                step={0.01}
              />
            </div>

            {/* Preview */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback
                    style={{ backgroundColor: customMaterial.paintColor }}
                    className="border-2 border-background"
                  />
                </Avatar>
                <div>
                  <p className="font-medium">Custom Material</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {customMaterial.paintColor.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 rounded-lg p-3 mt-2">
        <h4 className="font-semibold mb-2 text-sm">Selected</h4>
        {selected ? (
          <p className="text-sm font-medium">{selected.name}</p>
        ) : selectedColor === null && customMaterial ? (
          <div className="space-y-1">
            <p className="text-sm font-medium">Custom Material</p>
            <p className="text-xs text-muted-foreground">
              M: {customMaterial.metalness.toFixed(2)} | R:{" "}
              {customMaterial.roughness.toFixed(2)} | CC:{" "}
              {customMaterial.clearCoat.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No color selected</p>
        )}
      </div>
    </div>
  );
};

export default Materials;
