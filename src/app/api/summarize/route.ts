import { NextRequest, NextResponse } from "next/server";
import { summarize, Provider } from "@/lib/summarizer/summaryProviders";

const DEFAULT_PROVIDER: Provider = (process.env.SUMMARY_PROVIDER as Provider) || "huggingface";

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (!text || text.length < 10) {
            return NextResponse.json({ error: "Text too short" }, { status: 400 });
        }

        // Use server-side API key for the default provider
        let apiKey: string | undefined;
        switch (DEFAULT_PROVIDER) {
            case "huggingface":
                apiKey = process.env.HF_API_KEY;
                break;
            case "openai":
                apiKey = process.env.OPENAI_API_KEY;
                break;
            case "groq":
                apiKey = process.env.GROQ_API_KEY;
                break;
        }

        const summary = await summarize({
            provider: DEFAULT_PROVIDER,
            text,
            apiKey,
        });

        return NextResponse.json({ summary });
    } catch (err: any) {
        console.error("Summary API error:", err);
        return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
    }
}
