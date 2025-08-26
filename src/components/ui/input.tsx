import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                // Base
                "w-full rounded-md border border-input bg-card text-foreground shadow-xs",
                "px-4 py-3 text-sm",

                // Focus
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",

                // Disabled
                "disabled:cursor-not-allowed disabled:opacity-50",

                className
            )}
            {...props}
        />
    );
}
