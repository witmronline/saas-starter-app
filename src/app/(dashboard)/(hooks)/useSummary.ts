"use client";

import { useState, useCallback } from "react";
import { Summary } from "@/types";

export function useSummary() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, options: RequestInit) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(await res.text());
            return await res.json();
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getSummary = useCallback((id: string) => request(`/api/summaries/${id}`, { method: "GET" }), [request]);

    const createSummary = useCallback((user_id: string, data?: Partial<Summary>) =>
        request(`/api/summaries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id, ...data }) }),
        [request]
    );

    const updateSummary = useCallback((id: string, data: Partial<Summary>) =>
        request(`/api/summaries/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
        [request]
    );

    const deleteSummary = useCallback((id: string) =>
        request(`/api/summaries/${id}`, { method: "DELETE" }),
        [request]
    );

    return { loading, error, getSummary, createSummary, updateSummary, deleteSummary };
}
