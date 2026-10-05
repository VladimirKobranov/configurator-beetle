import { useStore } from "@/store";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  X,
  Palette,
  Wrench,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Parts from "@/components/parts";
import Materials from "./materials";
import Extra from "./extra";

export default function UIOverlay() {
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const updateRotateSpeed = useStore((state) => state.updateRotateSpeed);
  const [tab, setTab] = useState("default");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleTab = (val) => {
    setTab((prev) => (prev === val ? "default" : val));
  };

  const tabConfig = [
    {
      id: "material",
      label: "Materials",
      icon: Palette,
      description: "Colors & finishes",
    },
    {
      id: "parts",
      label: "Parts",
      icon: Wrench,
      description: "Body, wheels & lights",
    },
    {
      id: "extra",
      label: "Extras",
      icon: Plus,
      description: "Additional features",
    },
  ];

  return (
    <div className="absolute top-0 left-0 z-10 m-4 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md overflow-y-auto">
      {isCollapsed ? (
        <Button
          onClick={() => setIsCollapsed(false)}
          variant="outline"
          size="sm"
          className="h-10 w-10 bg-card/90 backdrop-blur-md"
          aria-label="Expand menu"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <div className="mb-3 rounded-xl border border-border bg-card/90 p-4 text-card-foreground shadow-lg backdrop-blur-md">
          {/* Main UI block with title */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Car Configurator</h1>
            <Button
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Tab Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Customize
              </h3>
              <div className="grid gap-2">
                {tabConfig.map(({ id, label, icon: Icon, description }) => (
                  <Button
                    key={id}
                    onClick={() => handleTab(id)}
                    variant={tab === id ? "default" : "outline"}
                    aria-pressed={tab === id}
                    className="h-auto p-3 justify-start"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Icon className="w-4 h-4" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-sm">{label}</div>
                        <div
                          className={`text-xs ${
                            tab === id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Panel */}
      {!isCollapsed && tab !== "default" && (
        <div className="bg-card/90 text-card-foreground backdrop-blur-md rounded-xl shadow-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="font-semibold flex items-center gap-2">
              {(() => {
                const currentTab = tabConfig.find((t) => t.id === tab);
                const Icon = currentTab?.icon;
                return (
                  <>
                    {Icon && <Icon className="w-4 h-4" />}
                    {currentTab?.label}
                  </>
                );
              })()}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTab("default")}
              className="h-8 w-8 p-0"
              aria-label={`Close ${tabConfig.find((item) => item.id === tab)?.label ?? "panel"}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            {tab === "material" && <Materials />}
            {tab === "parts" && <Parts />}
            {tab === "extra" && (
              <Extra
                rotateSpeed={rotateSpeed}
                updateRotateSpeed={updateRotateSpeed}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
