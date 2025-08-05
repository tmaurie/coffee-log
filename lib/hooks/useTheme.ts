import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Check for saved theme or user OS preference
        const saved = window.localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) setTheme(saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return {theme, toggleTheme};
}
