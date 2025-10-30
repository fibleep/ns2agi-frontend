import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  status?: "done" | "default";
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status, ...props }, ref) => (
    <li
      className={cn("relative flex flex-col gap-6 pb-8", className)}
      data-status={status}
      ref={ref}
      {...props}
    />
  )
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineConnectorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-[29px] top-[5px] h-full w-px bg-white/20",
      "last:hidden", // Hide connector on last item
      className
    )}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-4", className)}
      {...props}
    />
  )
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black",
        "border-2 border-white/20",
        className
      )}
      {...props}
    />
  )
);
TimelineIcon.displayName = "TimelineIcon";

interface TimelineTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none text-white", className)}
      {...props}
    />
  )
);
TimelineTitle.displayName = "TimelineTitle";

interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/70 leading-relaxed", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  )
);
TimelineContent.displayName = "TimelineContent";

export {
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineDescription,
  TimelineContent,
};
