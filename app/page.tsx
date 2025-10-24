"use client";

import { useCafeLog } from "@/context/CoffeeLogContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  Heart,
  PlusCircle,
  TestTubeDiagonal,
  ToolCase,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { tests, coffees, machines } = useCafeLog();
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email;

  const lastTest = tests.length ? tests[tests.length - 1] : null;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold font-serif">
        Bienvenue sur <span className="text-amber-700">CaféLog</span>
        {displayName && <span>, {displayName}</span>} !
      </h1>

      {/* Dernier test */}
      <section>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Dernier test
              {lastTest && lastTest.favorite && (
                <Badge variant="secondary">
                  Favori{" "}
                  <Heart
                    className="inline-block ml-1 text-red-500"
                    fill="currentColor"
                  />
                </Badge>
              )}
            </CardTitle>
            {lastTest && (
              <Link href={`/tests/${lastTest.id}`} passHref>
                <Button className="mt-2 w-fit" variant="secondary" size="sm">
                  Voir le détail
                </Button>
              </Link>
            )}
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
                  <span className="font-mono">{lastTest.rating}/5</span>
                </div>
                {lastTest.comment && (
                  <div className="text-sm text-gray-600 italic">
                    “{lastTest.comment}”
                  </div>
                )}
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
          <Button size="lg" className="flex items-center gap-2">
            <PlusCircle /> Ajouter un test
          </Button>
        </Link>
      </div>

      {/* Accès rapides */}
      <section>
        <h2 className="text-xl font-semibold font-serif mb-4">Accès rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tests">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <TestTubeDiagonal className="text-2xl mb-2 text-blue-300" />
                <div>Mes tests</div>
                <div className="text-xs text-gray-500 mt-1 relative z-10">
                  {tests.length} test{tests.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/coffees">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Coffee className="text-2xl mb-2 text-amber-300" />
                <div>Mes cafés</div>
                <div className="text-xs text-gray-500 mt-1 relative z-10">
                  {coffees.length} café{coffees.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/machines">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <ToolCase className="text-2xl mb-2 text-green-300" />
                <div>Mes machines</div>
                <div className="text-xs text-gray-500 mt-1 relative z-10">
                  {machines.length} machine{machines.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/favorites">
            <Card className="hover:shadow-md cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Heart className="text-2xl mb-2 text-red-500" />
                <div>Mes favoris</div>
                <div className="text-xs text-gray-500 mt-1 relative z-10">
                  {tests.filter((test) => test.favorite).length} test
                  {tests.filter((test) => test.favorite).length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
