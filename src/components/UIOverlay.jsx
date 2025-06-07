import { useStore } from "@/store";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="absolute top-0 left-0 z-10 m-4 w-full max-w-md">
      {/* Collapse/Expand Button */}
      {isCollapsed && (
        <Button
          onClick={() => setIsCollapsed(false)}
          variant="outline"
          size="sm"
          className="mb-3 backdrop-blur-md bg-white/90 dark:bg-black/90 border-white/20 w-10 h-10"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}

      {!isCollapsed && (
        <>
          {/* Main Control Panel */}
          <div className="text-left space-y-4 backdrop-blur-md bg-white/90 dark:bg-black/90 p-6 rounded-xl shadow-lg border border-white/20 mb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Car Configurator</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  v1.0
                </Badge>
                <Button
                  onClick={() => setIsCollapsed(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>

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
                    className="h-auto p-3 justify-start"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Icon className="w-4 h-4" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-muted-foreground">
                          {description}
                        </div>
                      </div>
                      {tab === id && (
                        <Badge variant="secondary" size="sm">
                          Active
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          {tab !== "default" && (
            <div className="backdrop-blur-md bg-white/90 dark:bg-black/90 rounded-xl shadow-lg border border-white/20 overflow-hidden">
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
        </>
      )}
    </div>
  );
}
