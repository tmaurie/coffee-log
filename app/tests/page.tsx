"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestsPage() {
  const { tests } = useCafeLog();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Mes tests café</h1>

      <div className="flex justify-end mb-4">
        <Link href="/tests/new">
          <Button className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold px-4 py-2 rounded-lg">
            + Ajouter un test
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {tests.length === 0 && (
          <div className="text-gray-400 text-center py-12">
            Aucun test pour le moment…
          </div>
        )}

        {[...tests]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((test) => (
            <Link key={test.id} href={`/tests/${test.id}`} className="block">
              <Card className="hover:shadow-md transition border cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {new Date(test.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Heart
                        className={`${test.favorite ? "text-red-500" : "text-gray-400 opacity-20"}`}
                        size={16}
                        fill={test.favorite ? "currentColor" : "none"}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <div className="flex-1">
                    <div className="font-semibold text-lg flex items-center gap-2">
                      {test.cafe}
                    </div>
                    <div className="text-xs text-gray-500">
                      {test.machine} &bull; {test.beverageType} &bull;{" "}
                      {test.createdAt}
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Badge variant="outline" className="text-xs">
                      {test.beverageType}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${test.rating >= 4 ? "bg-green-100 text-green-800" : test.rating >= 3 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      Note : {test.rating}/5
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
