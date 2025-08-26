"use client";

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { useEditor, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { Highlight } from "@tiptap/extension-highlight";
import { Typography } from "@tiptap/extension-typography";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Selection } from "@tiptap/extensions";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useAutoSave } from "../hook/useAutoSave";
import { Summary } from "@/types";

interface SummaryEditorContextType {
    editor: Editor | null;
    autoSave: ReturnType<typeof useAutoSave>;
    mobileView: "main" | "highlighter" | "link";
    setMobileView: (view: "main" | "highlighter" | "link") => void;
    toolbarRef: React.RefObject<HTMLDivElement>;
    isMobile: boolean;
    height: number;
}

const SummaryEditorContext = createContext<SummaryEditorContextType | undefined>(undefined);

export function SummaryEditorProvider({ summary, children }: { summary: Summary; children: ReactNode }) {
    const isMobile = useIsMobile();
    const { height } = useWindowSize();
    const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">("main");
    const toolbarRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "on",
                autocapitalize: "on",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor",
            },
        },
        extensions: [
            StarterKit.configure({ horizontalRule: false, link: { openOnClick: false, enableClickSelection: true } }),
            HorizontalRule,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            Typography,
            Superscript,
            Subscript,
            Selection,
            ImageUploadNode.configure({
                accept: "image/*",
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload,
                onError: (error) => console.error("Upload failed:", error),
            }),
        ],
        content: summary.content || "",
    });

    const autoSave = useAutoSave({
        editor,
        summary,
        debounceTime: 60000,
    });

    useEffect(() => {
        if (!isMobile && mobileView !== "main") {
            setMobileView("main");
        }
    }, [isMobile, mobileView]);

    return (
        <SummaryEditorContext.Provider value={{ editor, mobileView, setMobileView, autoSave, toolbarRef, isMobile, height }}>
            {children}
        </SummaryEditorContext.Provider>
    );
}

export function useSummaryEditor() {
    const ctx = useContext(SummaryEditorContext);
    if (!ctx) throw new Error("useSummaryEditor must be used within SummaryEditorProvider");
    return ctx;
}
