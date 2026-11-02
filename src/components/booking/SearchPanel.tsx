import type { FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CarFields } from "@/components/booking/CarFields";
import { FlightFields } from "@/components/booking/FlightFields";
import { HotelFields } from "@/components/booking/HotelFields";
import { panelId, SearchTabs, tabId } from "@/components/booking/SearchTabs";
import { VisaFields } from "@/components/booking/VisaFields";
import type { useBookingSearch } from "@/hooks/useBookingSearch";

type Booking = ReturnType<typeof useBookingSearch>;

interface SearchPanelProps {
  booking: Booking;
  today: string;
}

export function SearchPanel({ booking, today }: SearchPanelProps) {
  const { activeTab, forms, updateForm, status } = booking;
  const loading = status === "loading";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    booking.search();
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_30px_60px_-25px_rgba(12,36,49,0.35)] md:p-8">
      <SearchTabs
        active={activeTab}
        disabled={loading}
        onChange={booking.setActiveTab}
      />

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <fieldset disabled={loading} className="min-w-0">
          <legend className="sr-only">Trip details</legend>
          <div
            key={activeTab}
            role="tabpanel"
            id={panelId(activeTab)}
            aria-labelledby={tabId(activeTab)}
            className="animate-panel-in"
          >
            {activeTab === "flights" ? (
              <FlightFields
                form={forms.flights}
                today={today}
                onChange={(patch) => updateForm("flights", patch)}
              />
            ) : null}
            {activeTab === "hotels" ? (
              <HotelFields
                form={forms.hotels}
                today={today}
                onChange={(patch) => updateForm("hotels", patch)}
              />
            ) : null}
            {activeTab === "cars" ? (
              <CarFields
                form={forms.cars}
                today={today}
                onChange={(patch) => updateForm("cars", patch)}
              />
            ) : null}
            {activeTab === "visa" ? (
              <VisaFields
                form={forms.visa}
                onChange={(patch) => updateForm("visa", patch)}
              />
            ) : null}
          </div>
        </fieldset>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="mt-6 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <LoaderCircle
                className="size-5 animate-spin"
                aria-hidden="true"
              />
              Searching…
            </>
          ) : (
            <>
              <Search className="size-5" aria-hidden="true" />
              Begin your journey
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
