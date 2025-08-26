"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/superbase/supabaseClient";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Email/Password login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage("Logged in successfully!");
        }

        setLoading(false);
    };

    // Google OAuth login
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`, // make sure your callback handles profile creation
            },
        });

        if (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleLogin}
            className="w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-md bg-background"
        >
            <h2 className="text-xl font-semibold text-center">Login</h2>

            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="relative flex items-center justify-center">
                <div className="h-px w-full bg-border" />
                <span className="absolute bg-background px-2 text-xs text-muted-foreground">
                    OR
                </span>
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={loading}
            >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
            </Button>
        </form>
    );
}
