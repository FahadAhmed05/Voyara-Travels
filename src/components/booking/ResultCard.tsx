import Image from "next/image";
import type { ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface CardActionProps {
  selected: boolean;
  onToggle: () => void;
}

interface ResultCardProps extends CardActionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: { src: string; alt: string };
  /** Shown in place of a photo for icon-led cards. */
  icon?: LucideIcon;
  meta: ReactNode;
  price: ReactNode;
  ctaLabel: string;
  children?: ReactNode;
}

export function MetaItem({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Icon className="size-4 text-teal" aria-hidden="true" />
      {children}
    </li>
  );
}

export function ResultCard({
  title,
  subtitle,
  badge,
  image,
  icon: Icon,
  meta,
  price,
  ctaLabel,
  selected,
  onToggle,
  children,
}: ResultCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        selected && "ring-2 ring-teal",
      )}
    >
      {image ? (
        <div className="relative aspect-[16/10] bg-gradient-to-br from-teal-dark to-ink">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {badge ? (
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
              {badge}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start gap-4">
          {Icon ? (
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-teal">
              <Icon className="size-6" aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-xl leading-snug font-semibold break-words">
              {title}
            </h3>
            {subtitle ? (
              <p className="line-clamp-1 text-sm">{subtitle}</p>
            ) : null}
          </div>
          {!image && badge ? (
            <span className="shrink-0 rounded-full bg-mist px-3 py-1 text-xs font-bold text-teal-dark">
              {badge}
            </span>
          ) : null}
        </div>

        {children}

        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">{meta}</ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-4">
          {price}
          <Button
            variant={selected ? "outline" : "primary"}
            aria-pressed={selected}
            onClick={onToggle}
            className={cn(selected && "border-teal text-teal")}
          >
            {selected ? (
              <>
                In your plan
                <Check className="size-4" aria-hidden="true" />
              </>
            ) : (
              ctaLabel
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
