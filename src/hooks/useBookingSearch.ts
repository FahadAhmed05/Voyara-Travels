"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTripPlan } from "@/hooks/useTripPlan";
import { createDefaultForms, runSearch } from "@/lib/booking";
import type { BookingForms, SearchOutcome, SearchStatus, TabId } from "@/types";

const SEARCH_DELAY_MS = 600;

export function useBookingSearch(today: string) {
  const [activeTab, setActiveTab] = useState<TabId>("flights");
  const [forms, setForms] = useState<BookingForms>(() =>
    createDefaultForms(today),
  );
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const plan = useTripPlan();
  const clearPlan = plan.clear;
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const updateForm = useCallback(
    <T extends TabId>(tab: T, patch: Partial<BookingForms[T]>) => {
      setForms((current) => ({
        ...current,
        [tab]: { ...current[tab], ...patch },
      }));
    },
    [],
  );

  const search = useCallback(() => {
    if (status === "loading") return;
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setOutcome(runSearch(activeTab, forms));
      setStatus("done");
    }, SEARCH_DELAY_MS);
  }, [activeTab, forms, status]);

  /** Restores the active tab's defaults and clears results and the plan. */
  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    setForms((current) => ({
      ...current,
      [activeTab]: createDefaultForms(today)[activeTab],
    }));
    setOutcome(null);
    setStatus("idle");
    clearPlan();
  }, [activeTab, clearPlan, today]);

  return {
    activeTab,
    setActiveTab,
    forms,
    updateForm,
    status,
    outcome: outcome?.tab === activeTab ? outcome : null,
    search,
    reset,
    plan,
  };
}
