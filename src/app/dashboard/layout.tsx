// src/layouts/DashboardLayout.tsx
import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <DashboardNavbar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
