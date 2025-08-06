'use client';

import Link from "next/link";
import {Coffee, FlaskConical, PlusCircle, Settings2, Star} from "lucide-react";

const items = [
    {href: "/cafes", label: "Cafés", icon: <Coffee className="w-5 h-5"/>},
    {href: "/tests", label: "Tests", icon: <FlaskConical className="w-5 h-5"/>},
    {href: "/machines", label: "Machines", icon: <Settings2 className="w-5 h-5"/>},
    {href: "/favoris", label: "Favoris", icon: <Star className="w-5 h-5"/>},
];

export default function BottomNav() {
    return (
        <nav
            className="fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-zinc-900/95 border-t border-zinc-200 dark:border-zinc-800 shadow md:hidden flex justify-around items-end py-1">
            {/* Les 2 premiers items */}
            {items.slice(0, 2).map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-gray-500 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition"
                >
                    {item.icon}
                    <span className="text-[11px]">{item.label}</span>
                </Link>
            ))}

            {/* Bouton central “Ajouter” */}
            <Link
                href="/new-test"
                className="relative -top-6 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg p-3 border-4 border-white dark:border-zinc-900 flex items-center justify-center transition"
                aria-label="Ajouter un test"
            >
                <PlusCircle className="w-7 h-7"/>
            </Link>

            {/* Les 2 derniers items */}
            {items.slice(2).map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-gray-500 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition"
                >
                    {item.icon}
                    <span className="text-[11px]">{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
