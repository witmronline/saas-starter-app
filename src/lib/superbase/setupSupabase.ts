// src/lib/setupSupabase.ts
import { supabase } from "./supabaseClient";

export async function ensureSummariesTable() {
    const { data, error } = await supabase.rpc("create_summaries_table");

    if (error) {
        console.error("Error creating summaries table:", error);
    } else {
        console.log("Summaries table ensured:", data);
    }
}
