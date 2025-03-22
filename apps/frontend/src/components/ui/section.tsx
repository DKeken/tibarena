import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-16 sm:py-20",
          variant === "muted" && "bg-muted/40",
          className,
        )}
        {...props}
      />
    );
  },
);
Section.displayName = "Section";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto max-w-3xl text-center mb-12", className)}
        {...props}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    );
  },
);
SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };
