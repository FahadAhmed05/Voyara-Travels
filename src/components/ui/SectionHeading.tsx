import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("eyebrow", dark && "text-gold")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-section", dark && "text-white")}>{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-lg", dark && "text-on-dark")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
