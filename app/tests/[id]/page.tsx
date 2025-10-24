"use client";

import { useParams, useRouter } from "next/navigation";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Filter, Heart, ToolCase } from "lucide-react";

export default function TestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tests } = useCafeLog();
  const router = useRouter();

  const test = tests.find((t) => t.id === id);

  if (!test) {
    return (
      <main className="max-w-2xl mx-auto p-8">
        <div className="text-center text-destructive">Test introuvable…</div>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Retour
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm"
      >
        ← Retour à la liste
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-1 justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              {test.cafe}
              {test.favorite && (
                <Badge variant="secondary">
                  Favori{" "}
                  <Heart
                    className="inline-block ml-1 text-destructive"
                    fill="currentColor"
                  />
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {new Date(test.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
            <Badge variant="secondary">
              <ToolCase /> {test.machine}
            </Badge>
            <Badge variant="secondary">
              <Coffee />
              {test.beverageType}
            </Badge>
            <Badge variant="secondary">
              <Filter />
              {test.filterType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <span className="text-lg font-semibold">Note</span>
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Coffee
                  key={i}
                  className={
                    i < test.rating
                      ? "text-primary"
                      : "text-muted-foreground/40"
                  }
                  size={20}
                />
              ))}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <span className="block font-semibold mb-1">Conditions</span>
              <ul className="text-sm text-muted-foreground list-disc ml-4 space-y-1">
                <li>
                  Quantité d’eau : <b>{test.waterQuantity} ml</b>
                </li>
                <li>
                  Température : <b>{test.temperature}°C</b>
                </li>
                <li>
                  Pression : <b>{test.pressure} bar</b>
                </li>
                {test.grindFineness && (
                  <li>
                    Finesse de la mouture : <b>{test.grindFineness}</b>
                  </li>
                )}
                {test.doseGrams && (
                  <li>
                    Quantité de mouture <b>{test.doseGrams} g</b>
                  </li>
                )}
                {test.preinfusionSec && (
                  <li>
                    Temps d’infusion : <b>{test.preinfusionSec} s</b>
                  </li>
                )}
                {test.extractionSec && (
                  <li>
                    Temps d’extraction : <b>{test.extractionSec} s</b>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <span className="block font-semibold mb-1">Sensoriel</span>
              <ul className="text-sm text-muted-foreground list-disc ml-4 space-y-1">
                <li>
                  Intensité : <b>{test.intensity}/5</b>
                </li>
                <li>
                  Amertume : <b>{test.bitterness}/5</b>
                </li>
                <li>
                  Acidité : <b>{test.acidity}/5</b>
                </li>
              </ul>
            </div>
          </div>
          {test.comment && (
            <div className="mt-4 p-3 bg-accent rounded-lg italic text-sm ">
              “{test.comment}”
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
