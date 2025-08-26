"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CreateNewButtonProps {
    profile: {
        id?: string;
        email?: string;
        full_name?: string;
        avatar_url?: string;
    } | null;
}

export default function CreateNewButton({ profile }: CreateNewButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreateNew = async () => {
        if (!profile?.id) {
            console.warn("No user profile available, cannot create summary.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/summaries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: profile.id, content: "" }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to create new summary:", data);
                alert("Failed to create new summary. Please try again.");
                return;
            }

            router.push(`/dashboard/editor/${data.id}`);
        } catch (err) {
            console.error("Unexpected error creating summary:", err);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleCreateNew}
            disabled={loading || !profile?.id}
            className="flex items-center gap-2 px-3 py-1 text-sm rounded"
            style={{
                backgroundColor: "var(--tt-brand-color-500)",
                color: "var(--white)",
                border: "1px solid var(--tt-brand-color-600)",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--tt-brand-color-600)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--tt-brand-color-500)")
            }
        >
            <Plus className="w-4 h-4" />
            {loading ? "Creating..." : "New Summary"}
        </Button>
    );
}
