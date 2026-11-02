import { useRef, type KeyboardEvent } from "react";
import {
  BedDouble,
  CarFront,
  Plane,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { bookingTabs } from "@/data/booking-options";
import { cn } from "@/lib/utils";
import type { TabId } from "@/types";

const icons: Record<TabId, LucideIcon> = {
  flights: Plane,
  hotels: BedDouble,
  cars: CarFront,
  visa: Stamp,
};

interface SearchTabsProps {
  active: TabId;
  disabled: boolean;
  onChange: (tab: TabId) => void;
}

export const tabId = (tab: TabId) => `booking-tab-${tab}`;
export const panelId = (tab: TabId) => `booking-panel-${tab}`;

function arrowStep(key: string): number {
  if (key === "ArrowRight") return 1;
  if (key === "ArrowLeft") return -1;
  return 0;
}

export function SearchTabs({ active, disabled, onChange }: SearchTabsProps) {
  const refs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const step = arrowStep(event.key);
    if (step === 0) return;
    event.preventDefault();
    const count = bookingTabs.length;
    const next = bookingTabs[(index + step + count) % count];
    onChange(next.id);
    refs.current[next.id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="What would you like to plan?"
      className="grid grid-cols-4 gap-1 rounded-full bg-mist p-1.5 sm:inline-grid"
    >
      {bookingTabs.map((tab, index) => {
        const Icon = icons[tab.id];
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node;
            }}
            id={tabId(tab.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(tab.id)}
            tabIndex={selected ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-[background-color,color] duration-200 sm:px-6",
              selected ? "bg-ink text-white" : "text-ink hover:bg-white",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="max-sm:sr-only">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
