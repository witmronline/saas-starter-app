"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/40"
                onClick={onClose}
            />
            <div className={cn("relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg")}>
                {children}
            </div>
        </div>
    );
}
