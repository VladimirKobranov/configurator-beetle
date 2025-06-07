import React, { useState } from "react";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { presetColors } from "@/configs/config";

const ColorCard = ({ color, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
        hover:bg-accent hover:border-accent-foreground/20
        ${isSelected ? "border-primary bg-primary/5" : "border-border"}
      `}
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback
          style={{ backgroundColor: color.hex }}
          className="border-2 border-background"
        ></AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <span className="font-medium">{color.name}</span>
        <div className="text-xs text-muted-foreground">{color.description}</div>
        <div className="text-xs text-muted-foreground font-mono">
          {color.hex}
        </div>
      </div>
      {isSelected && <Check className="w-4 h-4 text-primary" />}
    </div>
  );
};

const Materials = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelection = (colorName) => {
    setSelectedColor(colorName);
  };

  const selectedColorData = presetColors.find(
    (color) => color.name === selectedColor,
  );

  return (
<div className="w-full max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">Materials</h1>

      <Tabs defaultValue="presets">
        <TabsList className="flex w-full">
          <TabsTrigger value="presets" className="flex-1">
            Presets
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">
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
          <div className="flex flex-col gap-2 p-4 border rounded-lg">
            <p className="text-muted-foreground">
              Custom color selection controls will be available here.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Section */}
      <div className="bg-muted/50 rounded-lg p-3 mt-2">
        <h4 className="font-semibold mb-2 text-sm">Selected</h4>
        {selectedColorData ? (
          <p className="text-sm font-medium">{selectedColorData.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No color selected</p>
        )}
      </div>
    </div>
  );
};

export default Materials;
