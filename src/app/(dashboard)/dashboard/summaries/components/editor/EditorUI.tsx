"use client";

import { EditorContent, EditorContext } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useState, useEffect } from "react";
import { Toolbar } from "@/components/tiptap-ui-primitive/toolbar";
import { MainToolbarContent, MobileToolbarContent } from "../toolbar/MainToolbarContent";
import { useSummaryEditor } from "../../context/SummariesEditorContext";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Styles ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";

export const EditorUI = () => {
    const { editor, mobileView, setMobileView, toolbarRef, isMobile, height } = useSummaryEditor();
    const rect = useCursorVisibility({
        editor,
        overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
    });

    const [expanded, setExpanded] = useState(false);
    const [selectedText, setSelectedText] = useState("");
    const [summaryResult, setSummaryResult] = useState<string | null>(null);

    const getSelectedText = () => {
        if (!editor) return "";
        const { from, to } = editor.state.selection;
        return editor.state.doc.textBetween(from, to, "\n");
    };

    useEffect(() => {
        if (!expanded) return;
        setSelectedText(getSelectedText());
    }, [expanded]);

    const handleSummarize = async () => {
        const text = selectedText.trim();
        if (!text) return;

        try {
            setSummaryResult("Loading...");
            const res = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            setSummaryResult(data.summary || "No summary returned.");
        } catch (err) {
            console.error("Summarize API error:", err);
            setSummaryResult("Failed to summarize.");
        }
    };

    const handlePasteSummary = () => {
        if (!editor || !summaryResult) return;
        const { from, to } = editor.state.selection;
        editor.chain().focus().deleteRange({ from, to }).insertContent(summaryResult).run();
        setSummaryResult(null);
        setExpanded(false);
    };

    const handleCopySummary = () => {
        if (!summaryResult) return;
        navigator.clipboard.writeText(summaryResult);
    };

    const shouldShowIcon = ({ editor }: any) => {
        if (!editor || !editor.isEditable) return false;
        const sel = editor.state.selection;
        if (sel.empty) return false;
        if (editor.isActive("image") || editor.isActive("codeBlock")) return false;

        const text = editor.state.doc.textBetween(sel.from, sel.to, "\n").trim();
        if (!text) return false;

        const lines = text.split(/\n+/).filter(Boolean).length;
        return lines >= 1;
    };

    return (
        <EditorContext.Provider value={{ editor }}>
            <div className="relative flex flex-col gap-4">
                <Toolbar
                    ref={toolbarRef}
                    // className="bg-amber-500"
                    style={isMobile ? { bottom: `calc(100% - ${height - rect.y}px)` } : {}}
                >
                    {mobileView === "main" ? (
                        <MainToolbarContent
                            onHighlighterClick={() => setMobileView("highlighter")}
                            onLinkClick={() => setMobileView("link")}
                            isMobile={isMobile}
                        />
                    ) : (
                        <MobileToolbarContent
                            type={mobileView === "highlighter" ? "highlighter" : "link"}
                            onBack={() => setMobileView("main")}
                        />
                    )}
                </Toolbar>

                <div className="flex md:flex-row gap-4 w-full">
                    <EditorContent editor={editor} role="presentation" className="simple-editor-content flex-1" />

                    {/* Bubble icon for small selection */}
                    {editor && !expanded && (
                        <BubbleMenu
                            editor={editor}
                            pluginKey="summarizeIcon"
                            options={{ placement: "bottom", offset: 4 }}
                            shouldShow={shouldShowIcon}
                        >
                            <button
                                className="p-1 rounded-full bg-blue-600 text-white shadow-md"
                                onClick={() => setExpanded(true)}
                            >
                                ✨
                            </button>
                        </BubbleMenu>
                    )}

                    {/* Expanded summary panel */}
                    {expanded && (
                        <div className="flex flex-col md:w-1/3 w-full bg-white dark:bg-gray-800 p-4 rounded shadow-lg gap-2">
                            <textarea
                                value={selectedText}
                                onChange={(e) => setSelectedText(e.target.value)}
                                className="w-full flex-1 p-2 border rounded resize-none"
                                placeholder="Edit or paste text to summarize..."
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="flex-1 bg-blue-600 text-white rounded-md"
                                    onClick={handleSummarize}
                                >
                                    Summarize
                                </button>
                                <button
                                    className="flex-1 bg-green-600 text-white rounded-md"
                                    onClick={handlePasteSummary}
                                >
                                    Paste
                                </button>
                                {summaryResult && (
                                    <button
                                        className="flex-1 bg-gray-500 text-white rounded-md"
                                        onClick={handleCopySummary}
                                    >
                                        Copy
                                    </button>
                                )}
                                <button
                                    className="flex-1 bg-gray-400 text-white rounded-md"
                                    onClick={() => setExpanded(false)}
                                >
                                    Close
                                </button>
                            </div>
                            {summaryResult && (
                                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm whitespace-pre-line">
                                    {summaryResult}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </EditorContext.Provider>
    );
};
