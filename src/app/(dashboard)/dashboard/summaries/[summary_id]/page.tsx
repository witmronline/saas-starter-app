import { SummaryEditorAppProvider } from "../context/SummaryEditorProvider";
import { EditorUI } from "../components/editor/EditorUI";


export default async function Page({ params }: { params: { summary_id: string } }) {
    const { summary_id } = await params;
    return (
        <SummaryEditorAppProvider summary_id={summary_id}>
            <EditorUI />
        </SummaryEditorAppProvider>
    );
}
