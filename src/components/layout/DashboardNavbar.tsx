// components/navigation/DashboardNavbar.tsx
import Link from "next/link";
import { cn } from "@/lib/cn"; // if you’re using cn utility
import { Menu } from "lucide-react"; // example icon

interface DashboardNavbarProps {
    className?: string;
}

export default function DashboardNavbar({ className }: DashboardNavbarProps) {
    return (
        <nav
            className={cn(
                "flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950",
                className
            )}
        >
            {/* Left: Brand/Logo */}
            <div className="flex items-center gap-2">
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="font-semibold text-lg">MyApp</span>
            </div>

            {/* Center: Links */}
            <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="hover:text-blue-600">
                    Dashboard
                </Link>
                <Link href="/settings" className="hover:text-blue-600">
                    Settings
                </Link>
                <Link href="/pricing" className="hover:text-blue-600">
                    Pricing
                </Link>
            </div>

            {/* Right: Profile / Auth */}
            <div className="flex items-center gap-4">
                <button className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8"></button>
            </div>
        </nav>
    );
}
