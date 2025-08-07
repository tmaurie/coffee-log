"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import InfoCard from "@/components/info-card";

export default function MachinesPage() {
  const { machines } = useCafeLog();

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
        <div className="text-gray-400 text-center py-10">
          Aucune machine référencée pour l’instant…
        </div>
      )}

      <div className="grid gap-4">
        {machines?.map((machine) => (
          <InfoCard
            key={machine.id}
            title={machine.name}
            subtitle={machine.brand}
            description={machine.description}
          />
        ))}
      </div>
    </main>
  );
}
