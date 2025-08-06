'use client';

import {useCafeLog} from '@/context/CoffeeLogContext';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function MachinesPage() {
    const {machines} = useCafeLog();

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">Mes machines</h1>

            {/* Bouton ajout futur (pour la V2, ici juste affiché) */}
            <div className="flex justify-end mb-4">
                <button
                    className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
                    disabled
                >
                    + Ajouter une machine (à venir)
                </button>
            </div>

            {(!machines || machines.length === 0) && (
                <div className="text-gray-400 text-center py-10">Aucune machine référencée pour l’instant…</div>
            )}

            <div className="grid gap-4">
                {machines?.map((machine) => (
                    <Card key={machine.id} className="transition border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {machine.name}
                                {machine.brand && (
                                    <span className="ml-2 text-xs text-gray-500 font-medium">({machine.brand})</span>
                                )}
                            </CardTitle>
                            {machine.description && (
                                <div className="text-xs text-gray-500 mt-1">{machine.description}</div>
                            )}
                        </CardHeader>
                        <CardContent>
                            {/* Ajoute d'autres infos techniques ici pour V2 (pression, chauffe, etc.) */}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
