"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/billing", label: "Billing" },
];

interface SidebarProps {
    user: {
        full_name?: string;
        email?: string;
        avatar_url?: string;
    };
    className?: string;
}

export default function Sidebar({ user, className }: SidebarProps) {
    return (
        <aside
            className={cn(
                "w-64 border-r p-4 hidden md:block",
                "bg-[var(--tt-sidebar-bg-color)] border-[var(--tt-border-color)]",
                className
            )}
        >
            {/* User info */}
            <div className="flex flex-col items-center gap-2 mb-6 text-center">
                {user.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.full_name || "User avatar"}
                        className="w-16 h-16 rounded-full object-cover border border-[var(--tt-border-color-tint)]"
                    />
                ) : (
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{
                            backgroundColor: "var(--tt-gray-light-200)",
                            color: "var(--tt-color-text-gray)",
                        }}
                    >
                        {user.full_name?.[0] || "U"}
                    </div>
                )}
                <p className="font-semibold text-[var(--tt-color-text-gray)]">
                    {user.full_name || "Unknown User"}
                </p>
                <p className="text-xs text-[var(--tt-color-text-gray-contrast)]">{user.email}</p>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "rounded-md px-3 py-2 text-sm transition-colors",
                            "text-[var(--tt-color-text-gray)]",
                            "hover:bg-[var(--tt-gray-light-a-200)] dark:hover:bg-[var(--tt-gray-dark-a-200)]"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
