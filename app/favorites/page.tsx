"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star } from "lucide-react";

export default function FavorisPage() {
  const { tests } = useCafeLog();
  const favoris = tests.filter((test) => test.favorite);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Mes favoris</h1>

      {favoris.length === 0 && (
        <div className="text-gray-400 text-center py-10">
          Aucun test favori pour l’instant…
        </div>
      )}

      <div className="grid gap-4">
        {favoris.map((test) => (
          <Link key={test.id} href={`/tests/${test.id}`} className="block">
            <Card className="hover:shadow-md transition border cursor-pointer">
              <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-2 p-4">
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {test.cafe}
                    <Star
                      className="inline h-5 w-5 text-yellow-500"
                      fill="#facc15"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {test.machine} &bull; {test.beverageType} &bull; {test.date}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Badge variant="secondary" className="text-sm">
                    Note : {test.rating}/5
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {test.beverageType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
