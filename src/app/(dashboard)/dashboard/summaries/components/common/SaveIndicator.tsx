"use client";

import { useSummaryEditor } from "../../context/SummariesEditorContext";

export default function SaveIndicator() {
    const { autoSave: { isDirty, isSaved } } = useSummaryEditor();

    let text = "All changes saved";
    if (isSaved) text = "Saved";
    else if (isDirty) text = "Unsaved changes";

    return (
        <div className="text-xs text-muted">
            {text}
        </div>
    );
}
