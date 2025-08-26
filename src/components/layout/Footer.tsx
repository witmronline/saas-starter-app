"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname() || "";

    // Hide footer on dashboard routes
    const hideFooterPaths = ["/dashboard"];
    const shouldHide = hideFooterPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (shouldHide) return null; // don't render footer

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
                <p>
                    © {new Date().getFullYear()} SaaSKit. Built with ❤️ using Next.js.
                </p>
                <div className="mt-2 flex justify-center gap-4">
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    );
}
