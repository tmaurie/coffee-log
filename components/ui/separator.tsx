import * as React from "react";

import { cn } from "@/lib/utils";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      role,
      ...props
    },
    ref,
  ) => {
    const ariaOrientation = orientation === "vertical" ? "vertical" : "horizontal";

    return (
      <div
        ref={ref}
        role={decorative ? role ?? "none" : role ?? "separator"}
        aria-orientation={ariaOrientation}
        className={cn(
          "bg-border",
          orientation === "vertical" ? "h-full w-px" : "h-px w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator };
