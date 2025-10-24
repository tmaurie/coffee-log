"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import InfoCard from "@/components/info-card";
import Link from "next/link";

export default function MachinesPage() {
  const { machines } = useCafeLog();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Mes machines</h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/machines/new"
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold px-4 py-2 rounded-lg"
        >
          + Ajouter une machine
        </Link>
      </div>

      {(!machines || machines.length === 0) && (
        <div className="text-muted-foreground text-center py-10">
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
