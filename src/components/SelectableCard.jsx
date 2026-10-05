import { Button } from "@/components/ui/button";

function SelectableCard({
  title,
  description,
  selected,
  onSelect,
  disabled,
  children,
}) {
  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className="h-auto min-h-16 w-full items-start justify-start gap-3 p-3 text-left"
    >
      {children}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span
          className={`mt-1 block whitespace-normal break-words text-xs leading-relaxed ${
            selected ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </span>
      </span>
    </Button>
  );
}

export default SelectableCard;
