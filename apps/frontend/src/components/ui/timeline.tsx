import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, animated = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-primary/10 before:content-['']",
          className
        )}
        {...props}
      />
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, animated = false, ...props }, ref) => {
    const content = (
      <>
        <div className="absolute left-0 top-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
          <div className="h-4 w-4 rounded-full bg-primary shadow-sm shadow-primary/20" />
        </div>
        <div className="relative z-10 rounded-lg border border-border/50 bg-card p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
          <div className="text-base md:text-lg">{children}</div>
        </div>
      </>
    );

    if (animated) {
      // For motion.div, only pass specific props and avoid event handlers
      const { onDrag, onDragEnd, onDragStart, ...safeProps } = props;

      return (
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn("relative pl-12 pb-6", className)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("relative pl-12 pb-6", className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
