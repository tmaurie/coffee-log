"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import InfoCard from "@/components/info-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CafesPage() {
  const { coffees } = useCafeLog();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Mes cafés</h1>

      <div className="flex justify-end mb-4">
        <Link href="/coffees/new">
          <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold px-4 py-2 rounded-lg">
            + Ajouter un café
          </Button>
        </Link>
      </div>

      {(!coffees || coffees.length === 0) && (
        <div className="text-muted-foreground text-center py-10">
          Aucun café référencé pour l’instant…
        </div>
      )}

      <div className="grid gap-6">
        {coffees?.map((cafe) => (
          <InfoCard
            key={cafe.id}
            title={cafe.name}
            subtitle={cafe.origin}
            description={cafe.description}
            tags={cafe.tags}
            right={
              <span className="text-sm text-muted-foreground">
                {cafe.roastLevel ?? "N/A"} &bull; {cafe.rating ?? "-"}/5
              </span>
            }
          />
        ))}
      </div>
    </main>
  );
}
