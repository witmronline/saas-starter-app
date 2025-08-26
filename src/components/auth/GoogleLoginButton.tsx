"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GoogleLoginButtonProps {
    onClick?: () => void;
    className?: string;
}

export default function GoogleLoginButton({ onClick, className }: GoogleLoginButtonProps) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-center gap-2 bg-white text-gray-700 border shadow-sm hover:bg-gray-50 ${className}`}
        >
            <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="h-5 w-5"
            />
            <span className="text-sm font-medium">Continue with Google</span>
        </Button>
    );
}
