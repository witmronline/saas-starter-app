"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/superbase/supabaseClient"; // your client
import { cn } from "@/lib/cn";

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Check your email for a confirmation link!");
        }

        setLoading(false);
    }

    async function handleGoogleSignup() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage(error.message);
        }

        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSignup}
            className={cn("w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-md bg-card")}
        >
            <h2 className={cn("text-2xl font-semibold text-center")}>Create Account</h2>

            <div className={cn("space-y-2")}>
                <Input placeholder="Full Name" name="name" required />
                <Input placeholder="Email" type="email" name="email" required />
                <Input placeholder="Password" type="password" name="password" required />
            </div>

            <Button type="submit" disabled={loading} className={cn("w-full")}>
                {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <div className={cn("relative flex items-center justify-center")}>
                <div className={cn("h-px w-full bg-border")} />
                <span className={cn("absolute bg-card px-2 text-xs text-muted-foreground")}>
                    OR
                </span>
            </div>

            <Button
                type="button"
                variant="outline"
                className={cn("w-full flex items-center justify-center gap-2")}
                disabled={loading}
                onClick={handleGoogleSignup}
            >
                <img src="/google-icon.svg" alt="Google" className={cn("w-5 h-5")} />
                Continue with Google
            </Button>

            {message && (
                <p className={cn("text-center text-sm text-muted-foreground")}>{message}</p>
            )}

            <p className={cn("text-center text-sm text-muted-foreground")}>
                Already have an account?{" "}
                <a href="/login" className={cn("text-blue-600 hover:underline")}>
                    Log in
                </a>
            </p>
        </form>
    );
}
