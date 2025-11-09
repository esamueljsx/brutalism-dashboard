import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  trackClassName,
  ...props
}: {
  className?: string;
  value?: number;
  trackClassName?: string;
}) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          trackClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}

export { Progress };
