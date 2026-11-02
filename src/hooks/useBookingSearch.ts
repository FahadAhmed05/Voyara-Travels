"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTripPlan } from "@/hooks/useTripPlan";
import { createDefaultForms, runSearch, validateForm } from "@/lib/booking";
import { onBookingIntent } from "@/lib/booking-intent";
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

  const issues = validateForm(activeTab, forms, today);

  const updateForm = useCallback(
    <T extends TabId>(tab: T, patch: Partial<BookingForms[T]>) => {
      setForms((current) => ({
        ...current,
        [tab]: { ...current[tab], ...patch },
      }));
    },
    [],
  );

  useEffect(
    () =>
      onBookingIntent(({ tab, destination }) => {
        setActiveTab(tab);
        if (destination) updateForm("hotels", { destination });
      }),
    [updateForm],
  );

  const search = useCallback(() => {
    if (status === "loading" || issues.length > 0) return;
    window.clearTimeout(timer.current);
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setOutcome(runSearch(activeTab, forms));
      setStatus("done");
    }, SEARCH_DELAY_MS);
  }, [activeTab, forms, issues.length, status]);

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
    issues,
    status,
    outcome: outcome?.tab === activeTab ? outcome : null,
    search,
    reset,
    plan,
  };
}
