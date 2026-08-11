import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-blue-700 text-paper-50 hover:bg-blue-600",
  secondary: "bg-gold-500 text-ink-950 hover:bg-gold-400",
  ghost: "bg-transparent text-blue-700 border border-blue-700/30 hover:bg-blue-700/5",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }) {
  return (
    <Link href={href} className={clsx(base, variants[variant], className)} {...props} />
  );
}
