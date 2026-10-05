import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
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
import { ThemeToggle } from "./themeToggler";

const isMobileViewport = () =>
  window.matchMedia("(max-width: 639px) and (hover: none)").matches;

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

function MenuPanel({ tab, onTab, onCollapse, showTitle = true }) {
  return (
    <div className="rounded-xl border border-border bg-card/90 p-3 text-card-foreground shadow-lg backdrop-blur-md sm:p-4">
      {showTitle && (
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Car Configurator</h1>
          <Button
            onClick={onCollapse}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            aria-label="Collapse menu"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className={showTitle ? "mt-4 space-y-4" : "space-y-4"}>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Customize
          </h3>
          <div className="grid gap-2">
            {tabConfig.map(({ id, label, icon: Icon, description }) => (
              <Button
                key={id}
                onClick={() => onTab(id)}
                variant={tab === id ? "default" : "outline"}
                aria-pressed={tab === id}
                className="h-auto justify-start p-3"
              >
                <div className="flex w-full items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{label}</div>
                    <div
                      className={`text-xs ${tab === id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
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
  );
}

function ContentPanel({ tab, onClose, rotateSpeed, updateRotateSpeed }) {
  if (tab === "default") return null;
  const currentTab = tabConfig.find((item) => item.id === tab);
  const Icon = currentTab?.icon;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/90 text-card-foreground shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <h2 className="flex items-center gap-2 font-semibold">
          {Icon && <Icon className="h-4 w-4" />}
          {currentTab?.label}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-3 sm:p-4">
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
  );
}

export default function UIOverlay() {
  const rotateSpeed = useStore((state) => state.rotateSpeed);
  const updateRotateSpeed = useStore((state) => state.updateRotateSpeed);
  const [tab, setTab] = useState("default");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileViewport);
  const closeMenu = () => setIsCollapsed(true);
  const selectTab = (value) =>
    setTab((current) => (current === value ? "default" : value));

  useEffect(() => {
    const handleViewportChange = () => {
      const mobile = isMobileViewport();
      setIsMobile(mobile);
      setIsCollapsed(mobile);
    };
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  return (
    <>
      {!isMobile && (
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
            <>
              <MenuPanel tab={tab} onTab={selectTab} onCollapse={closeMenu} />
              <div className="mt-3">
                <ContentPanel
                  tab={tab}
                  onClose={() => setTab("default")}
                  rotateSpeed={rotateSpeed}
                  updateRotateSpeed={updateRotateSpeed}
                />
              </div>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <div>
          <Drawer
            open={!isCollapsed}
            onOpenChange={(open) => setIsCollapsed(!open)}
          >
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed top-2 left-2 z-20 bg-card/90 shadow-lg backdrop-blur-md"
                aria-label="Open menu"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[92dvh] bg-card text-card-foreground">
              <DrawerHeader className="text-left">
                <DrawerTitle>Car Configurator</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-2">
                <MenuPanel tab={tab} onTab={selectTab} showTitle={false} />
                <div className="mt-3">
                  <ContentPanel
                    tab={tab}
                    onClose={() => setTab("default")}
                    rotateSpeed={rotateSpeed}
                    updateRotateSpeed={updateRotateSpeed}
                  />
                </div>
              </div>
              <DrawerFooter className="items-center">
                <div
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ThemeToggle />
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
}
