import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
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
      <Eyebrow tone={dark ? "gold" : "teal"}>{eyebrow}</Eyebrow>
      <h2
        id={titleId}
        className={cn("mt-3 text-section", dark && "text-white")}
      >
        {title}
      </h2>
      {description ? (
        <p data-reveal className={cn("mt-4 text-lg", dark && "text-on-dark")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
