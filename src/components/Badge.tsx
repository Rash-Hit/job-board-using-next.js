import React from "react";

type BadgeProps = {
  children: React.ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border bg-muted px-2 py-0 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export default Badge;
