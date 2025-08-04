'use client';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-coffee-100 shadow">
            <div className="text-xl font-bold">CaféLog</div>
            <nav className="flex gap-4">
                <Link href="/">Accueil</Link>
                <Link href="/tests">Tests</Link>
                <Link href="/new-test">Ajouter</Link>
                {/* Ajoute d'autres liens */}
            </nav>
        </header>
    );
}
