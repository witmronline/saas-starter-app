// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
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
