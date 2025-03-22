import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-8", className)} {...props} />;
  },
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative pl-8 pb-8", className)} {...props}>
        {icon && (
          <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {icon}
          </div>
        )}
        {children}
        <span className="absolute left-3 top-10 h-[calc(100%-40px)] w-[1px] bg-border"></span>
      </div>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
