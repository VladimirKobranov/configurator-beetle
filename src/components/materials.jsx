import React, { useEffect, useRef, useState } from "react";
import { Check, Palette, Settings } from "lucide-react";
import { Colorful } from "@uiw/react-color";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStore } from "../store"; // adjust as needed
import { presetColors } from "@/configs/config";

const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsidePointerDown = (event) => {
      if (!pickerRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [isOpen]);

  return (
    <div ref={pickerRef} className="relative space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={color}
          aria-label="Open color picker"
          onClick={(event) => {
            event.preventDefault();
            setIsOpen((open) => !open);
          }}
          className="h-10 w-12 cursor-pointer p-1"
        />
        <Input
          value={color.toUpperCase()}
          aria-label="Hex color value"
          onChange={(event) => {
            const nextColor = event.target.value;
            if (/^#[0-9A-F]{6}$/i.test(nextColor)) onChange(nextColor);
          }}
          className="font-mono uppercase"
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-12 z-20 rounded-lg border border-border bg-card p-2 shadow-lg">
          <Colorful
            color={color}
            onChange={({ hex }) => onChange(hex)}
          />
        </div>
      )}
    </div>
  );
};

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
  const customMaterial = {
    paintColor: currentMaterial.color || "#ff0000",
    metalness: currentMaterial.metalness ?? 0.5,
    roughness: currentMaterial.roughness ?? 0.5,
    clearCoat: currentMaterial.clearCoat ?? 0.5,
    clearCoatRoughness: currentMaterial.clearCoatRoughness ?? 0.1,
  };
  const selectedColor = presetColors.find((p) => {
    const m = p.material;
    return (
      m.paintColor === currentMaterial.color &&
      m.metalness === currentMaterial.metalness &&
      m.roughness === currentMaterial.roughness &&
      m.clearCoat === currentMaterial.clearCoat &&
      m.clearCoatRoughness === currentMaterial.clearCoatRoughness
    );
  })?.name;

  const handleColorSelection = (colorName) => {
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

    // Update the store
    setMaterials({
      color: newMaterial.paintColor,
      metalness: newMaterial.metalness,
      roughness: newMaterial.roughness,
      clearCoat: newMaterial.clearCoat,
      clearCoatRoughness: newMaterial.clearCoatRoughness,
    });

    // Clear preset selection when using custom
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Metalness</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {customMaterial.metalness.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[customMaterial.metalness]}
                  onValueChange={(values) =>
                    updateCustomMaterial("metalness", values[0])
                  }
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Roughness</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {customMaterial.roughness.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[customMaterial.roughness]}
                  onValueChange={(values) =>
                    updateCustomMaterial("roughness", values[0])
                  }
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Clear Coat</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {customMaterial.clearCoat.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[customMaterial.clearCoat]}
                  onValueChange={(values) =>
                    updateCustomMaterial("clearCoat", values[0])
                  }
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    Clear Coat Roughness
                  </Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {customMaterial.clearCoatRoughness.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[customMaterial.clearCoatRoughness]}
                  onValueChange={(values) =>
                    updateCustomMaterial("clearCoatRoughness", values[0])
                  }
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>
            </div>

          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Selected</p>
        {selected ? (
          <p className="text-sm font-medium">{selected.name}</p>
        ) : (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Custom color</p>
            <p className="text-xs font-mono text-muted-foreground">
              {customMaterial.paintColor.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
