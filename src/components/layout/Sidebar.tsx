// src/components/layout/Sidebar.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/billing", label: "Billing" },
];

export default function Sidebar({ className }: { className?: string }) {
    return (
        <aside
            className={cn(
                "w-64 border-r bg-muted/30 p-4 hidden md:block",
                className
            )}
        >
            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
