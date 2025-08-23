import Image from "next/image";
import { cn } from "@/lib/cn";

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: number;
}

export function Avatar({ src, alt = "User", size = 40 }: AvatarProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full bg-gray-200 text-gray-600 overflow-hidden"
            )}
            style={{ width: size, height: size }}
        >
            {src ? (
                <Image src={src} alt={alt} width={size} height={size} />
            ) : (
                <span className="text-sm font-medium">{alt.charAt(0)}</span>
            )}
        </div>
    );
}
