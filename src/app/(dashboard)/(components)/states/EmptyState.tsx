"use client";

import Image from "next/image";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-gray-600 dark:text-gray-400">
            <Image
                src="/images/empty-state.svg" // replace with your empty state illustration
                alt="No documents"
                width={100}
                height={100}
            />
            <p className="mt-4 text-sm sm:text-base text-center">
                No documents found. <br /> Create a new one to get started!
            </p>
        </div>
    );
}
