// src/layouts/AuthLayout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="w-full max-w-md p-6 bg-background shadow-md rounded-xl">
                {children}
            </div>
        </div>
    );
}
