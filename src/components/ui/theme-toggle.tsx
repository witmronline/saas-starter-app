"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Fix hydration mismatch
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-[0.45rem] btn--sm flex items-center gap-2"
        >
            {currentTheme === "dark" ? (
                <>
                    <Moon size={18} />
                    <span>Dark</span>
                </>
            ) : (
                <>
                    <Sun size={18} />
                    <span>Light</span>
                </>
            )}
        </button>
    )
}