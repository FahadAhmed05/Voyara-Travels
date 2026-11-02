import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TabId } from "@/types";

const copy: Record<TabId, { title: string; description: string }> = {
  flights: {
    title: "No journeys on that route yet",
    description:
      "We don't fly that way just yet. Try a nearby city, or tell us where you're headed and we'll chart a route by hand.",
  },
  hotels: {
    title: "No stays there yet",
    description:
      "We haven't found a place for you in that city. Try another destination, and we'll keep looking for this one.",
  },
  cars: {
    title: "No cars of that kind yet",
    description:
      "That type isn't available right now. Try another one, or leave it on Any and see everything we have.",
  },
  visa: {
    title: "No visa package for that combination yet",
    description:
      "We don't process that visa type for this country just yet. Try another type, or ask our team and we'll guide you.",
  },
};

interface EmptyResultsProps {
  tab: TabId;
  onReset: () => void;
}

export function EmptyResults({ tab, onReset }: EmptyResultsProps) {
  return (
    <EmptyState
      icon={Compass}
      title={copy[tab].title}
      description={copy[tab].description}
      className="mt-8"
      action={
        <Button variant="secondary" onClick={onReset}>
          Start a new search
        </Button>
      }
    />
  );
}
