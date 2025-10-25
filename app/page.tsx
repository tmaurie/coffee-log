"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCafeLog } from "@/context/CoffeeLogContext";
import {
  ArrowRight,
  Bean,
  CheckCircle2,
  Coffee,
  Heart,
  PlusCircle,
  Sparkles,
  TestTubeDiagonal,
  TimerReset,
  ToolCase,
} from "lucide-react";

function DashboardHome() {
  const { tests, coffees, machines } = useCafeLog();

  const lastTest = tests.length ? tests[tests.length - 1] : null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold font-serif">
        Bienvenue sur <span className="text-primary">CaféLog</span> !
      </h1>

      {/* Dernier test */}
      <section>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Dernier test
              {lastTest && lastTest.favorite && (
                <Badge variant="secondary">
                  Favori
                  <Heart
                    className="inline-block ml-1 text-destructive"
                    fill="currentColor"
                    size={14}
                  />
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastTest ? (
              <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">{lastTest.cafe}</div>
                <div className="text-sm text-muted-foreground">
                  Machine : {lastTest.machine} — {lastTest.beverageType}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Note</span>
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Coffee
                        key={i}
                        className={
                          i < lastTest.rating
                            ? "text-primary"
                            : "text-muted-foreground/40"
                        }
                        size={18}
                      />
                    ))}
                  </span>
                </div>
                {lastTest.comment && (
                  <div className="text-sm text-muted-foreground italic">
                    “{lastTest.comment}”
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">
                Aucun test enregistré pour le moment.
              </div>
            )}
          </CardContent>
          {lastTest && (
            <CardFooter className="justify-end">
              <Link href={`/tests/${lastTest.id}`} passHref>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  Voir le détail
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </section>

      {/* Bouton ajouter un test */}
      <div className="flex justify-center">
        <Link href="/tests/new">
          <Button size="lg" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Ajouter un test
          </Button>
        </Link>
      </div>

      {/* Accès rapides */}
      <section>
        <h2 className="text-xl font-semibold font-serif mb-4">Accès rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tests">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <TestTubeDiagonal className="mb-2 text-primary" />
                <div className="font-medium">Mes tests</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {tests.length} test{tests.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/coffees">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Coffee className="mb-2 text-primary" />
                <div className="font-medium">Mes cafés</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {coffees.length} café{coffees.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/machines">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <ToolCase className="mb-2 text-secondary-foreground" />
                <div className="font-medium">Mes machines</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {machines.length} machine{machines.length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/favorites">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Heart className="mb-2 text-primary" />
                <div className="font-medium">Mes favoris</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {tests.filter((test) => test.favorite).length} test
                  {tests.filter((test) => test.favorite).length > 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <DashboardHome />;
  }

  const features = [
    {
      title: "Suivi intuitif",
      description:
        "Consignez chaque extraction en quelques secondes, avec toutes les données qui comptent.",
      icon: TestTubeDiagonal,
    },
    {
      title: "Notes sensorielles",
      description:
        "Décrivez vos profils aromatiques favoris et comparez-les au fil du temps.",
      icon: Sparkles,
    },
    {
      title: "Machines et moulins",
      description:
        "Gardez une trace de vos réglages pour ne plus jamais perdre un sweet spot.",
      icon: ToolCase,
    },
  ];

  const highlights = [
    {
      title: "Pensé pour les baristas",
      description:
        "Un outil conçu avec et pour la communauté des amoureux du café.",
      icon: Bean,
    },
    {
      title: "Optimisez vos extractions",
      description:
        "Visualisez vos tests et trouvez le juste équilibre entre mouture, temps et rendu.",
      icon: TimerReset,
    },
    {
      title: "Passez à l'action",
      description:
        "Ajoutez votre premier test dès votre inscription, sans frictions inutiles.",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10">
        <div className="mx-auto h-64 w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="uppercase tracking-widest">
            Votre journal de dégustation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">
            Capturez chaque tasse. Progressez à chaque extraction.
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
            CaféLog vous aide à garder une trace de vos tests, à comprendre vos
            réglages et à construire votre référentiel sensoriel. Un outil
            moderne, sobre et pensé pour l'excellence tasse après tasse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Commencer gratuitement
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2"
              >
                Se connecter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardHeader className="space-y-3">
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-semibold">
              Un compagnon de route pour votre recherche du parfait espresso
            </h2>
            <p className="text-muted-foreground">
              Créez vos profils de cafés, suivez l'évolution de vos machines et
              capturez vos sensations en un clin d'œil. CaféLog centralise vos
              données pour vous permettre d'apprendre, d'expérimenter et de
              partager vos trouvailles avec votre équipe ou votre communauté.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Coffee className="h-4 w-4" /> Cafés, profils et notes
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <ToolCase className="h-4 w-4" /> Machines & moulins
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Sparkles className="h-4 w-4" /> Sensations et favoris
              </Badge>
            </div>
          </div>
          <Card className="bg-muted/40 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Ce que vous allez aimer
              </CardTitle>
              <CardDescription>
                Trois raisons qui font de CaféLog votre tableau de bord
                quotidien.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="flex gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                    <highlight.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl bg-primary/5 border border-primary/10 p-10 text-center space-y-6">
          <h2 className="text-3xl font-serif font-semibold">
            Prêt à savourer votre prochain espresso parfait ?
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Rejoignez la communauté CaféLog et donnez de la profondeur à vos
            dégustations. Commencez un journal qui vous suit dans chaque
            micro-ajustement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Créer un compte
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                Déjà inscrit ?
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
