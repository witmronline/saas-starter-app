"use client";

import { useState, ReactNode } from "react";

interface DropdownProps {
    trigger: ReactNode;
    items: { label: string; onClick: () => void }[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <div onClick={() => setOpen(!open)}>{trigger}</div>
            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
