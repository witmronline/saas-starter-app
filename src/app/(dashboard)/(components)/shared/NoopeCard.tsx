"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import UserMenu from "./UserMenu";
import CreateNewButton from "./CreateNewButton";

interface MainProps {
    user: {
        full_name?: string;
        email?: string;
        avatar_url?: string;
    };
}

interface Summary {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at?: string;
}

// Document Card with actions
export default function NoodeCard({ user_id, content, created_at, updated_at }: Summary) {
    // const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Delete summary
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this document?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`/api/summaries/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            alert("Deleted successfully!");
        } catch (err: any) {
            alert(err.message);
        }
    };

    // Edit summary
    const handleEdit = (summary: Summary) => {
        // Navigate to editor page for that summary
        router.push(`dashboard/editor/${summary.id}`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition flex flex-col justify-between">
            <div>
                {/* Preview first few lines */}
                <p className="line-clamp-4 text-gray-800 dark:text-gray-100 mb-2">{summary.content}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Updated: {new Date(summary.updated_at || summary.created_at).toLocaleString()}
                </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex justify-end gap-2">
                <button
                    onClick={() => onEdit(summary)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(summary.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
