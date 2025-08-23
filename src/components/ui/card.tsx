import { cn } from "@/lib/cn";

export function Card({
    className,
    children,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700",
                className
            )}
        >
            {children}
        </div>
    );
}
