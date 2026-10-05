import { CarFront, LoaderCircle } from "lucide-react";

export default function AppLoader({ error = false }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <div className="flex w-full max-w-xs flex-col items-center gap-6 text-center">
        <div className="relative grid size-20 place-items-center rounded-3xl border border-border bg-card shadow-xl">
          <div className="absolute inset-2 rounded-2xl bg-primary/10" />
          {error ? (
            <CarFront className="relative size-9 text-destructive" />
          ) : (
            <CarFront className="relative size-9 text-primary" />
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Car Configurator</h1>
          <p className="text-sm text-muted-foreground">
            {error ? "3d assets could not be loaded" : "Loading 3d assets"}
          </p>
        </div>
        {!error && (
          <LoaderCircle className="size-5 animate-spin text-primary" />
        )}
        {error && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm text-primary underline underline-offset-4"
          >
            Reload
          </button>
        )}
      </div>
    </div>
  );
}
