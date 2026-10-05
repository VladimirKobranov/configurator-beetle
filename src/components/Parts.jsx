import { useStore } from "@/store";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Zap, Settings } from "lucide-react";

import { partOptions } from "@/configs/config";
import { Separator } from "@/components/ui/separator";
import SelectableCard from "@/components/SelectableCard";

const PartSection = ({ options, currentValue, onSelect }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <SelectableCard
          key={option.id}
          title={option.name}
          description={option.description}
          selected={currentValue === option.id}
          onSelect={() => onSelect(option.id)}
          disabled={option.disabled}
        />
      ))}
    </div>
  </div>
);

const Parts = () => {
  const parts = useStore((state) => state.parts);
  const setParts = useStore((state) => state.setParts);

  return (
    <div className="mx-auto w-full max-w-md">
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

      <Separator className="my-4" />
      <div className="space-y-1 text-xs">
        <p className="text-sm font-medium">Current Configuration</p>
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
            {partOptions.wheels.find((opt) => opt.id === parts.wheels)?.name ||
              "Not selected"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Lights:</span>{" "}
          <span className="font-medium">
            {partOptions.lights.find((opt) => opt.id === parts.lights)?.name ||
              "Not selected"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Parts;
