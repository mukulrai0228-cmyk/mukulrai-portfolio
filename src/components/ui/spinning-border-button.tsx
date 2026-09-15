import * as React from "react";
import { ArrowRight } from "lucide-react";

export type SpinningBorderButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SpinningBorderButton = React.forwardRef<HTMLAnchorElement, SpinningBorderButtonProps>(
  function SpinningBorderButton(
    { children = "Download Resume", className, ...props },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={`spinning-border-button${className ? ` ${className}` : ""}`}
        {...props}
      >
        <span className="spinning-border-beam" />
        <span className="spinning-border-static" />
        <span className="spinning-border-surface">
          <span className="spinning-border-label">{children}</span>
          <ArrowRight className="spinning-border-arrow" aria-hidden="true" />
        </span>
      </a>
    );
  },
);

export default SpinningBorderButton;
