"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Summary, UserProfile } from "@/types";

import UserMenu from "../shared/UserMenu";
import SummaryCard from "../cards/SummaryCard";
import CreateNewButton from "../shared/CreateNewButton";
import { LoadingState } from "../states/LoadingState";
import { EmptyState } from "../states/EmptyState";

interface MainProps {
    user: UserProfile;
}

export default function Main({ user }: MainProps) {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch all summaries
    const fetchSummaries = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/summaries");
            if (!res.ok) throw new Error("Failed to fetch summaries");
            const data = await res.json();
            setSummaries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummaries();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this document?")) return;

        try {
            const res = await fetch(`/api/summaries/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            fetchSummaries();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEdit = (summary: Summary) => {
        router.push(`dashboard/summaries/${summary.id}`);
    };

    return (
        <div className="flex flex-col flex-1">
            {/* Navbar */}
            <header
                className={cn(
                    "flex items-center justify-between p-4 border-b",
                    "bg-[var(--tt-bg-color)] border-[var(--tt-border-color)]"
                )}
            >
                <CreateNewButton profile={user} />
                <UserMenu profile={user} />
            </header>

            {/* Main content */}
            <main
                className={cn(
                    "flex-1 p-6 overflow-auto",
                    "bg-[var(--tt-bg-color)]"
                )}
            >
                {loading ? (
                    <LoadingState />
                ) : summaries.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {summaries.map((summary) => (
                            <SummaryCard
                                key={summary.id}
                                summary={summary}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
