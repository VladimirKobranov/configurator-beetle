import { useStore } from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Zap, Settings } from "lucide-react";

import { partOptions } from "@/configs/config";

const Parts = () => {
  const parts = useStore((state) => state.parts);
  const setParts = useStore((state) => state.setParts);

  const PartSection = ({ options, currentValue, onSelect }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        {currentValue !== undefined && (
          <Badge variant="outline" className="text-xs">
            {options.find((opt) => opt.id === currentValue)?.name || "None"}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <Button
            key={option.id}
            onClick={() => onSelect(option.id)}
            variant={currentValue === option.id ? "default" : "outline"}
            disabled={option.disabled}
            className="h-auto p-3 flex flex-col items-start text-left"
          >
            <div className="font-medium text-sm">{option.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {option.description}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        <Car className="w-5 h-5" />
        Car Parts Configuration
      </h1>

      <Tabs defaultValue="body" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="body" className="flex items-center gap-1">
            <Car className="w-3 h-3" />
            Body
          </TabsTrigger>
          <TabsTrigger value="wheels" className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            Wheels
          </TabsTrigger>
          <TabsTrigger value="lights" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Lights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="body" className="mt-4">
          <PartSection
            options={partOptions.body}
            currentValue={parts.body}
            onSelect={(value) => setParts({ body: value })}
          />
        </TabsContent>

        <TabsContent value="wheels" className="mt-4">
          <PartSection
            options={partOptions.wheels}
            currentValue={parts.wheels}
            onSelect={(value) => setParts({ wheels: value })}
          />
        </TabsContent>

        <TabsContent value="lights" className="mt-4">
          <PartSection
            options={partOptions.lights}
            currentValue={parts.lights}
            onSelect={(value) => setParts({ lights: value })}
          />
        </TabsContent>
      </Tabs>

      {/* Configuration Summary */}
      <div className="bg-muted/50 rounded-lg p-3 mt-4">
        <h4 className="font-semibold mb-2 text-sm">Current Configuration</h4>
        <div className="space-y-1 text-xs">
          <div>
            <span className="text-muted-foreground">Body:</span>{" "}
            <span className="font-medium">
              {partOptions.body.find((opt) => opt.id === parts.body)?.name ||
                "Not selected"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Wheels:</span>{" "}
            <span className="font-medium">
              {partOptions.wheels.find((opt) => opt.id === parts.wheels)
                ?.name || "Not selected"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Lights:</span>{" "}
            <span className="font-medium">
              {partOptions.lights.find((opt) => opt.id === parts.lights)
                ?.name || "Not selected"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parts;
