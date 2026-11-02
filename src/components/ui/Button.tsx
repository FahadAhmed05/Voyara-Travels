import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "light";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-soft hover:bg-teal-dark hover:shadow-lift",
  secondary: "bg-ink text-white shadow-soft hover:bg-teal-dark",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-teal hover:text-teal",
  light: "bg-white text-ink shadow-soft hover:bg-sand",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  if (props.href !== undefined) {
    return <a className={classes} {...props} />;
  }
  return <button className={classes} type="button" {...props} />;
}
