import React, { useState } from "react";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const presetColors = [
  { name: "Black", hex: "#1f1f1f" },
  { name: "Jade green", hex: "#a2a37e" },
  { name: "Arctic", hex: "#d8e4e6" },
  { name: "Ceramic green", hex: "#3e514a" },
];

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
        <div className="text-xs text-muted-foreground font-mono">
          {color.hex}
        </div>
      </div>

      {isSelected && <Check className="w-4 h-4 text-primary" />}
    </div>
  );
};

const Materials = () => {
  const [parts, setParts] = useState({
    body: null,
  });

  const handleColorSelection = (colorName) => {
    setParts((prev) => ({
      ...prev,
      body: colorName,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center">Materials</h1>
      <div className="mb-2">
        <h3 className="mb-2 text-md font-medium">Body</h3>
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
            <div className="flex flex-col gap-2">
              {presetColors.map((color) => (
                <ColorCard
                  key={color.name}
                  color={color}
                  isSelected={parts.body === color.name}
                  onSelect={() => handleColorSelection(color.name)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="flex flex-col gap-2">
              <p>Custom color selection controls go here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Materials;
