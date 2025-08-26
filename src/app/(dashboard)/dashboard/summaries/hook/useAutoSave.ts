"use client";

import { useEffect, useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Summary } from "@/types";
import { useSummary } from "../../../(hooks)/useSummary";

interface AutoSaveOptions {
    editor: Editor | null;
    summary: Summary | null;
    debounceTime?: number;
}

export function useAutoSave({
    editor,
    summary,
    debounceTime = 60000,
}: AutoSaveOptions) {
    const { updateSummary } = useSummary();
    const [isSaved, setIsSaved] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    const lastSavedContent = useRef("");
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    const extractTitle = (html: string): string | null => {
        if (!html) return null;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const heading =
            doc.querySelector("h1")?.textContent ||
            doc.querySelector("h2")?.textContent;
        return heading?.trim() || null;
    };

    const saveContent = async (force = false) => {
        if (!editor || !summary) return;

        const currentContent = editor.getHTML();

        // skip if unchanged
        if (!force && currentContent === lastSavedContent.current) return;

        setIsSaved(false);
        setIsDirty(false);

        try {
            // Auto-extract title if missing
            let title = summary.title?.trim();
            if (!title || title === "Untitled") {
                const extracted = extractTitle(currentContent);
                if (extracted) title = extracted;
            }

            await updateSummary(summary.id, {
                title: title || "Untitled",
                content: currentContent,
            });

            lastSavedContent.current = currentContent;
            setIsSaved(true);

            // fallback cache
            localStorage.setItem(`doc-${summary.id}`, currentContent);
        } catch (err) {
            console.error("Failed to save:", err);
        }
    };

    // Load initial cached content
    useEffect(() => {
        if (!editor || !summary) return;
        const saved = localStorage.getItem(`doc-${summary.id}`);
        if (saved && saved !== editor.getHTML()) {
            editor.commands.setContent(saved);
            lastSavedContent.current = saved;
            setIsSaved(true);
            setIsDirty(false);
        }
    }, [editor, summary?.id]);

    // Auto-save on changes
    useEffect(() => {
        if (!editor || !summary) return;

        const onUpdate = () => {
            setIsDirty(true);
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => saveContent(), debounceTime);
        };

        editor.on("update", onUpdate);

        return () => {
            editor.off("update", onUpdate);
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
        };
    }, [editor, debounceTime, summary?.id]);

    // Undo/Redo integration
    useEffect(() => {
        if (!editor) return;

        const onTransaction = () => {
            const currentContent = editor.getHTML();
            setIsDirty(currentContent !== lastSavedContent.current);
        };

        editor.on("transaction", onTransaction);

        return () => {
            editor.off("transaction", onTransaction);
        };
    }, [editor]);

    return { isSaved, isDirty, saveContent };
}
