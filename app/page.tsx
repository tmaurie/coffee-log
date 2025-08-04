'use client';

import {useCafeLog} from '@/context/CoffeeLogContext';
import Link from 'next/link';

export default function Home() {
    const {tests} = useCafeLog();

    // On prend le dernier test (le + récent ajouté)
    const lastTest = tests.length ? tests[tests.length - 1] : null;

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Bienvenue sur CaféLog !</h1>

            {/* Dernier test */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Dernier test</h2>
                {lastTest ? (
                    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border border-gray-100">
                        <div className="font-bold">{lastTest.cafe}</div>
                        <div className="text-sm text-gray-500">Machine
                            : {lastTest.machine} — {lastTest.beverageType}</div>
                        <div>
                            Note : <span className="font-mono">{lastTest.rating} / 5</span>
                            {lastTest.favorite && <span className="ml-2 text-yellow-500">★</span>}
                        </div>
                        <Link href={`/tests/${lastTest.id}`} className="text-blue-500 text-sm underline mt-2 w-fit">Voir
                            le détail</Link>
                    </div>
                ) : (
                    <div className="text-gray-400">Aucun test enregistré pour le moment.</div>
                )}
            </section>

            {/* Bouton ajouter un test */}
            <div className="flex justify-center mb-8">
                <Link href="/new-test">
                    <button
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-xl shadow transition">
                        + Ajouter un test
                    </button>
                </Link>
            </div>

            {/* Accès rapides */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Accès rapide</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/tests">
                        <div
                            className="bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl p-4 text-center cursor-pointer transition shadow-sm">
                            <div className="text-2xl mb-2">🧪</div>
                            <div>Mes tests</div>
                        </div>
                    </Link>
                    <Link href="/cafes">
                        <div
                            className="bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl p-4 text-center cursor-pointer transition shadow-sm">
                            <div className="text-2xl mb-2">☕</div>
                            <div>Mes cafés</div>
                        </div>
                    </Link>
                    <Link href="/machines">
                        <div
                            className="bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl p-4 text-center cursor-pointer transition shadow-sm">
                            <div className="text-2xl mb-2">🛠️</div>
                            <div>Mes machines</div>
                        </div>
                    </Link>
                    <Link href="/favoris">
                        <div
                            className="bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl p-4 text-center cursor-pointer transition shadow-sm">
                            <div className="text-2xl mb-2">⭐</div>
                            <div>Favoris</div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
