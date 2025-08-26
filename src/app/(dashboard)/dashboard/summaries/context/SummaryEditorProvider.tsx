"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Summary } from "@/types";
import { useSummary } from "@/app/(dashboard)/(hooks)/useSummary";
import { useUserProfile } from "@/app/(dashboard)/(hooks)/useUserProfile";
import { SummaryEditorProvider } from "./SummariesEditorContext";

interface SummaryEditorAppContextType {
  summary: Summary | null;
  setSummary: (s: Summary) => void;
  profile: any;
  loading: boolean;
}

const SummaryEditorAppContext = createContext<SummaryEditorAppContextType | null>(null);

export function SummaryEditorAppProvider({
  summary_id,
  children,
}: {
  summary_id: string;
  children: ReactNode;
}) {
  const { profile } = useUserProfile();
  const { getSummary } = useSummary();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!summary_id) return;
    (async () => {
      setLoading(true);
      const fetched = await getSummary(summary_id);
      if (fetched) setSummary(fetched);
      setLoading(false);
    })();
  }, [summary_id, getSummary]);

  if (loading) {
    return <div>Loading editor...</div>; // or spinner
  }

  return (
    <SummaryEditorAppContext.Provider value={{ summary, setSummary, profile, loading }}>
      {summary && (
        <SummaryEditorProvider summary={summary}>{children}</SummaryEditorProvider>
      )}
    </SummaryEditorAppContext.Provider>
  );
}

export function useSummaryEditorApp() {
  const ctx = useContext(SummaryEditorAppContext);
  if (!ctx) throw new Error("useSummaryEditorApp must be used inside SummaryEditorAppProvider");
  return ctx;
}
