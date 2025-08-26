"use client";

import Image from "next/image";

export function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-gray-700 dark:text-gray-300">
            <Image
                src="/images/loading.svg" // replace with your loading illustration
                alt="Loading..."
                width={80}
                height={80}
                className="animate-spin"
            />
            <p className="mt-4 text-sm sm:text-base">Loading documents...</p>
        </div>
    );
}
