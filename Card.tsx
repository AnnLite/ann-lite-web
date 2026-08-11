import type { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[--radius-card] border border-line-200 bg-white/60 p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
