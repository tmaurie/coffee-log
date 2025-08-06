"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CafesPage() {
  const { coffees } = useCafeLog();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Mes cafés</h1>

      {/* Bouton ajout futur (pour la V2, ici juste affiché) */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
          disabled
        >
          + Ajouter un café (à venir)
        </button>
      </div>

      {(!coffees || coffees.length === 0) && (
        <div className="text-gray-400 text-center py-10">
          Aucun café référencé pour l’instant…
        </div>
      )}

      <div className="grid gap-4">
        {coffees?.map((cafe) => (
          <Card key={cafe.id} className="transition border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {cafe.name}
                {cafe.origin && (
                  <Badge variant="secondary" className="ml-2">
                    {cafe.origin}
                  </Badge>
                )}
              </CardTitle>
              {cafe.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {cafe.description}
                </div>
              )}
            </CardHeader>
            <CardContent>
              {/* Ajoute d'autres infos si tu veux (notes, type, intensité, etc.) */}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
