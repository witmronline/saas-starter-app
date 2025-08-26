"use client";

import Link from "next/link";
import { Tooltip } from "@/components/tiptap-ui-primitive/tooltip";
import { Button } from "@/components/tiptap-ui-primitive/button";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useUserProfile } from "../../(hooks)/useUserProfile";

export default function Noope() {
    const { profile, loading } = useUserProfile();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--tt-bg-color)]">
                <p className="text-[var(--tt-color-text-gray)]">Loading dashboard...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[var(--tt-bg-color)]">
                <div className="relative w-40 h-40">
                    <Image
                        src="/dashboard/vercel.svg"
                        alt="Dashboard Placeholder"
                        fill
                        className="object-contain"
                    />
                </div>
                <p className="text-center text-lg font-medium text-[var(--tt-color-text-gray)]">
                    Please log in to access the dashboard
                </p>
                <Link href="/login" passHref>
                    <Tooltip>
                        <Button
                            className="px-4 py-2 rounded text-white"
                            style={{
                                backgroundColor: "var(--tt-brand-color-500)",
                                border: "1px solid var(--tt-brand-color-600)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "var(--tt-brand-color-600)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "var(--tt-brand-color-500)")
                            }
                        >
                            Go to Login
                        </Button>
                    </Tooltip>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[var(--tt-bg-color)]">
            <Sidebar user={profile} />
            <div className="flex flex-col flex-1">
                <Main user={profile} />
            </div>
        </div>
    );
}
