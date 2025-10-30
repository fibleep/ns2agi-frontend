import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineLayoutProps extends React.HTMLAttributes<HTMLUListElement> {}

const TimelineLayout = React.forwardRef<HTMLUListElement, TimelineLayoutProps>(
  ({ className, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-0", className)}
      {...props}
    >
      {children}
    </ul>
  )
);
TimelineLayout.displayName = "TimelineLayout";

export { TimelineLayout };
