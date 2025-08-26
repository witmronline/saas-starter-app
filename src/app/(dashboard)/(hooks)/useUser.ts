"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/superbase/supabaseClient";

export function useUser() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current user on mount
        const fetchUser = async () => {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) console.error("Error fetching user:", error);
            setUser(user || null);
            setLoading(false);
        };

        fetchUser();

        // Listen for auth state changes (login/logout)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
}
