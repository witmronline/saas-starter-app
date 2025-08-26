"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/superbase/supabaseClient";

const STORAGE_KEY = "cached_profile";

export function useUserProfile() {
    const [profile, setProfile] = useState<any>(() => {
        // hydrate from cache first
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem(STORAGE_KEY);
            return cached ? JSON.parse(cached) : null;
        }
        return null;
    });

    const [loading, setLoading] = useState(!profile); // skip loading if cached
    const prevProfileRef = useRef<any>(profile);

    const fetchProfile = useCallback(async (retryCount = 0): Promise<void> => {
        setLoading(true);

        try {
            // ✅ Get session
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session?.user) {
                setProfile(null);
                localStorage.removeItem(STORAGE_KEY);
                setLoading(false);
                return;
            }

            const user = session.user;

            // ✅ Fetch profile
            const { data: profileData, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) throw error;

            const finalProfile = profileData || {
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || "",
                avatar_url:
                    user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
            };

            // ✅ Only update if different
            if (
                JSON.stringify(prevProfileRef.current) !== JSON.stringify(finalProfile)
            ) {
                setProfile(finalProfile);
                prevProfileRef.current = finalProfile;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(finalProfile));
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);

            // Retry with backoff (max 3 times)
            if (retryCount < 3) {
                const delay = 500 * Math.pow(2, retryCount);
                setTimeout(() => fetchProfile(retryCount + 1), delay);
                return;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();

        // ✅ Subscribe to auth changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session?.user) {
                    setProfile(null);
                    prevProfileRef.current = null;
                    localStorage.removeItem(STORAGE_KEY);
                    return;
                }

                const user = session.user;
                const newProfile = {
                    id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name || "",
                    avatar_url:
                        user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
                };

                if (
                    JSON.stringify(prevProfileRef.current) !== JSON.stringify(newProfile)
                ) {
                    setProfile(newProfile);
                    prevProfileRef.current = newProfile;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [fetchProfile]);

    return { profile, loading, refreshProfile: fetchProfile };
}
