"use client";

import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import { DropdownMenu } from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Tooltip } from "@/components/tiptap-ui-primitive/tooltip";
import { supabase } from "@/lib/superbase/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { cn } from "@/lib/cn";

interface UserMenuProps {
    profile: {
        full_name?: string;
        email?: string;
        avatar_url?: string;
    };
}

export default function UserMenu({ profile }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) router.push("/login");
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar button with tooltip */}
            <Tooltip content="Open user menu" side="bottom">
                <Button
                    onClick={() => setOpen(!open)}
                    variant="outline"
                    className="flex items-center gap-2 rounded-full p-2"
                >
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--tt-gray-light-a-400)] dark:bg-[var(--tt-gray-dark-a-400)] flex items-center justify-center text-white">
                            {profile.full_name?.[0] || "U"}
                        </div>
                    )}
                    <span className="hidden sm:inline">{profile.full_name || profile.email}</span>
                </Button>
            </Tooltip>

            {/* Dropdown menu */}
            {open && (
                <DropdownMenu>
                    <div
                        className="absolute right-0 mt-2 w-56 bg-[var(--tt-card-bg-color)] dark:bg-[var(--tt-gray-dark-50)] border border-[var(--tt-card-border-color)] rounded-md shadow-[var(--tt-shadow-elevated-md)] z-50"
                    >
                        {/* User info */}
                        <div className="p-3 border-b dark:border-gray-700">
                            <p className="font-semibold text-[var(--tt-color-text-gray)]">{profile.full_name || "User"}</p>
                            <p className="text-sm text-[var(--tt-color-text-gray-contrast)]">{profile.email}</p>
                        </div>

                        {/* Theme toggle with tooltip */}
                        <div className="px-4 py-2">
                            <Tooltip content="Toggle theme" side="left">
                                <ThemeToggle />
                            </Tooltip>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className={cn(
                                "w-full text-left px-4 py-2 hover:bg-[var(--tt-gray-light-a-200)] dark:hover:bg-[var(--tt-gray-dark-a-400)] text-sm text-[var(--tt-color-text-red)] rounded-md transition-colors"
                            )}
                        >
                            Logout
                        </button>
                    </div>
                </DropdownMenu>
            )}
        </div>
    );
}
