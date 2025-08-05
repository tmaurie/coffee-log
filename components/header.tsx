'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useTheme} from '@/lib/hooks/useTheme';
import {Moon, Sun} from 'lucide-react';

export default function Header() {
    const {theme, toggleTheme} = useTheme();

    return (
        <header
            className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60">
            <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
                {/* Logo & Home */}
                <Link href="/" className="font-extrabold text-2xl text-amber-700 tracking-tight hover:opacity-90">
                    CaféLog
                </Link>
                {/* Nav Links */}
                <div className="md:flex items-center space-x-4 hidden">
                    <Link href="/tests">
                        <Button variant="ghost" className="text-md font-medium">
                            Tests
                        </Button>
                    </Link>
                    <Link href="/cafes">
                        <Button variant="ghost" className="text-md font-medium">
                            Cafés
                        </Button>
                    </Link>
                    <Link href="/machines">
                        <Button variant="ghost" className="text-md font-medium">
                            Machines
                        </Button>
                    </Link>
                    <Link href="/favoris">
                        <Button variant="ghost" className="text-md font-medium">
                            Favoris
                        </Button>
                    </Link>

                </div>
                {/* Toggle dark/light */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="ml-2"
                    aria-label={theme === "dark" ? "Mode clair" : "Mode sombre"}
                >
                    {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                </Button>
            </nav>
        </header>
    );
}
