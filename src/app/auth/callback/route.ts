import { supabase } from "@/lib/superbase/supabaseClient"; // your client

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        // Exchange the code for a session (server-side only)
        const { data: { session }, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error("Error exchanging code:", exchangeError.message);
        }

        // ✅ If user exists, create a profile row if not already
        if (session?.user) {
            const userId = session.user.id;
            const email = session.user.email;
            const full_name = session.user.user_metadata?.full_name || "";
            const avatar_url = session.user.user_metadata?.picture || "";

            // Check if profile already exists
            const { data: existingProfile } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", userId)
                .single();

            if (!existingProfile) {
                await supabase.from("profiles").insert({
                    id: userId,
                    email,
                    full_name,
                    avatar_url,
                });
            }
        }
    }

    // Redirect user after login
    return Response.redirect(new URL("/dashboard", request.url));
}
