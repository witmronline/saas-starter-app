"use client";

import Link from "next/link";
import { Summary } from "@/types";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Card } from "@/components/tiptap-ui-primitive/card";
import { cn } from "@/lib/cn";

interface SummaryCardProps {
    summary: Summary;
    onEdit: (s: Summary) => void;
    onDelete: (id: string) => void;
}

function formatDate(date?: string) {
    return date ? new Date(date).toLocaleString() : "";
}

export default function SummaryCard({ summary, onEdit, onDelete }: SummaryCardProps) {
    return (
        <Card className={cn(
            "p-3 flex flex-col justify-between",
            "hover:shadow-md transition"
        )}>
            <div className="flex-1">
                <p className="line-clamp-4 mb-1">{summary.content}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated: {formatDate(summary.updated_at || summary.created_at)}
                </div>
            </div>

            <div className="mt-2 flex justify-end gap-1">
                <Button
                    onClick={() => onEdit(summary)}
                    className="px-2 py-0.5 text-sm hover:bg-blue-600 transition"
                    aria-label={`Edit summary ${summary.id}`}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => onDelete(summary.id)}
                    className="px-2 py-0.5 text-sm hover:bg-red-600 transition"
                    aria-label={`Delete summary ${summary.id}`}
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
}
