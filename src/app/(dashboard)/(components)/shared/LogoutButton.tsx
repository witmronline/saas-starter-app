"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/superbase/supabaseClient";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);

        if (error) {
            console.error("Logout error:", error.message);
            return;
        }

        // Redirect to login page after logout
        router.push("/login");
    };

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            className="px-4 py-2"
            disabled={loading}
        >
            {loading ? "Logging out..." : "Logout"}
        </Button>
    );
}
