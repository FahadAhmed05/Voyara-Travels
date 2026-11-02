"use client";

import { useCallback, useState } from "react";
import { createDefaultForms } from "@/lib/booking";
import type { BookingForms, TabId } from "@/types";

export function useBookingSearch(today: string) {
  const [activeTab, setActiveTab] = useState<TabId>("flights");
  const [forms, setForms] = useState<BookingForms>(() =>
    createDefaultForms(today),
  );

  const updateForm = useCallback(
    <T extends TabId>(tab: T, patch: Partial<BookingForms[T]>) => {
      setForms((current) => ({
        ...current,
        [tab]: { ...current[tab], ...patch },
      }));
    },
    [],
  );

  return { activeTab, setActiveTab, forms, updateForm };
}
