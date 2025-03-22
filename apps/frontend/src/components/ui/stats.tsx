import * as React from "react";
import { cn } from "@/lib/utils";

interface StatsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4 md:gap-6 lg:gap-8", className)}
        {...props}
      />
    );
  },
);
Stats.displayName = "Stats";

interface StatsItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const StatsItem = React.forwardRef<HTMLDivElement, StatsItemProps>(
  ({ className, value, label, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        {icon && <div className="text-primary">{icon}</div>}
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    );
  },
);
StatsItem.displayName = "StatsItem";

export { Stats, StatsItem };
