"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useSummaryEditorApp } from "../../context/SummaryEditorProvider";
import type { Summary } from "@/types"; // adjust path to where you keep the interface

interface TitleInputProps {
    placeholder?: string;
    className?: string;
}

export default function TitleInput({
    placeholder = "Untitled document",
    className,
}: TitleInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // ✅ Get summary + updater directly from context
    const { summary, setSummary } = useSummaryEditorApp();

    const handleChange = (val: string) => {
        // Update only the title field, but keep other fields intact
        setSummary({
            ...(summary as Summary),
            title: val,
        });
    };

    return (
        <input
            ref={inputRef}
            type="text"
            value={summary?.title ?? (placeholder || "")}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
                "bg-transparent outline-none border-none text-sm font-semibold w-full max-w-[250px]",
                "focus:ring-0 focus:outline-none",
                className
            )}
        />
    );
}
