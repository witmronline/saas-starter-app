export type Provider = "huggingface" | "openai" | "groq";

export interface SummaryOptions {
    provider: Provider;
    text: string;
    apiKey?: string;
}

export async function summarize({ provider, text, apiKey }: SummaryOptions) {
    switch (provider) {
        case "huggingface":
            return summarizeWithHF(text, apiKey);
        case "openai":
            return summarizeWithOpenAI(text, apiKey);
        case "groq":
            return summarizeWithGroq(text, apiKey);
        default:
            throw new Error("Unsupported provider");
    }
}

async function summarizeWithHF(text: string, apiKey?: string) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey || process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: text }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HuggingFace API error: ${err}`);
        }

        const result = await response.json();
        return result[0]?.summary_text || "No summary returned.";
    } catch (err: any) {
        console.error("HF summarize error:", err);
        return "Failed to summarize text (HuggingFace).";
    }
}

async function summarizeWithOpenAI(text: string, apiKey?: string) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Summarize the following text." },
                    { role: "user", content: text },
                ],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`OpenAI API error: ${err}`);
        }

        const result = await response.json();
        return result.choices?.[0]?.message?.content?.trim() || "No summary returned.";
    } catch (err: any) {
        console.error("OpenAI summarize error:", err);
        return "Failed to summarize text (OpenAI).";
    }
}

async function summarizeWithGroq(text: string, apiKey?: string) {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey || process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mixtral-8x7b",
                messages: [
                    { role: "system", content: "Summarize the following text." },
                    { role: "user", content: text },
                ],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Groq API error: ${err}`);
        }

        const result = await response.json();
        return result.choices?.[0]?.message?.content?.trim() || "No summary returned.";
    } catch (err: any) {
        console.error("Groq summarize error:", err);
        return "Failed to summarize text (Groq).";
    }
}
