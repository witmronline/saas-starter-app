// summarizer.ts
import { pipeline } from "@xenova/transformers";

// Load summarization pipeline
let summarizer: any;

export async function getSummarizer() {
    if (!summarizer) {
        summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");
    }
    return summarizer;
}

// Example usage
async function run() {
    const summarizer = await getSummarizer();

    const text = `
    Artificial intelligence (AI) is intelligence demonstrated by machines, 
    as opposed to the natural intelligence displayed by humans or animals. 
    Leading AI textbooks define the field as the study of "intelligent agents": 
    any system that perceives its environment and takes actions that maximize 
    its chance of achieving its goals.
  `;

    const result = await summarizer(text, {
        max_length: 50,
        min_length: 10,
    });

    console.log("Summary:", result[0].summary_text);
}

run();
