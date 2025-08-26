"use client";

import { Button } from "@/components/ui/button";
import { useSummaryEditor } from "../../context/SummariesEditorContext";
import { Check, Save } from "lucide-react"; // icons

export default function SaveButton() {

    const { autoSave: { isDirty, isSaved, saveContent } } = useSummaryEditor();

    // Choose icon: Check if saved, Save otherwise
    const Icon = isSaved ? Check : Save;

    return (
        <Button
            onClick={() => { saveContent() }}
            disabled={!isDirty} // only allow save if there are unsaved changes
            className="flex items-center gap-2 text-sm p-2 rounded-4xl"
        >
            <Icon className="h-4 w-4" />
            <span>{isSaved ? "Saved" : "Save"}</span>
        </Button>
    );
}
