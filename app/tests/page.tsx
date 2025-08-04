'use client';
import { useCafeLog } from '@/context/CoffeeLogContext';
import TestCard from '@/components/test-card';

export default function TestsPage() {
    const { tests } = useCafeLog();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Mes tests</h1>
            <div className="grid gap-4">
                {tests.length === 0 && <div>Aucun test pour l’instant…</div>}
                {tests.map(test => <TestCard key={test.id} test={test}  />)}
            </div>
        </main>
    );
}
