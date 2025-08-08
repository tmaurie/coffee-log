"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Star, TestTubeDiagonal, ToolCase } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { tests } = useCafeLog();
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email;

  const lastTest = tests.length ? tests[tests.length - 1] : null;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Bienvenue sur <span className="text-amber-700">CaféLog</span>
        {displayName && <span>, {displayName}</span>} !
      </h1>

      {/* Dernier test */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Dernier test
              {lastTest && lastTest.favorite && (
                <Badge className="ml-2 bg-yellow-400 text-yellow-900">
                  Favori
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastTest ? (
              <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">{lastTest.cafe}</div>
                <div className="text-sm text-gray-500">
                  Machine&nbsp;: {lastTest.machine} — {lastTest.beverageType}
                </div>
                <div>
                  Note&nbsp;:{" "}
                  <span className="font-mono">{lastTest.rating} / 5</span>
                </div>
                {lastTest.comment && (
                  <div className="italic text-xs text-gray-500">
                    “{lastTest.comment}”
                  </div>
                )}
                <Link href={`/tests/${lastTest.id}`} passHref>
                  <Button className="mt-2 w-fit" variant="secondary" size="sm">
                    Voir le détail
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-gray-400">
                Aucun test enregistré pour le moment.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Bouton ajouter un test */}
      <div className="flex justify-center">
        <Link href="/tests/new">
          <Button>+ Ajouter un test</Button>
        </Link>
      </div>

      {/* Accès rapides */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Accès rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tests">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <TestTubeDiagonal className="text-2xl mb-2 text-blue-500" />
                <div>Mes tests</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/coffees">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Coffee className="text-2xl mb-2 text-amber-800" />
                <div>Mes cafés</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/machines">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <ToolCase className="text-2xl mb-2 text-green-500" />
                <div>Mes machines</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/favorites">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Star className="text-2xl mb-2 text-yellow-500" />
                <div>Favoris</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
