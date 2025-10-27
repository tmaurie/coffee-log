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
import { Separator } from "@/components/ui/separator";
import { useCafeLog } from "@/context/CoffeeLogContext";
import {
  ArrowRight,
  Bean,
  CalendarClock,
  CheckCircle2,
  Coffee,
  Heart,
  MapPin,
  PlusCircle,
  Sparkles,
  Star,
  TestTubeDiagonal,
  TimerReset,
  ToolCase,
} from "lucide-react";

function formatTestDate(date?: string) {
  if (!date) return "Date inconnue";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function DashboardHome() {
  const { tests, coffees, machines } = useCafeLog();

  const lastTest = tests.length ? tests[tests.length - 1] : null;
  const favoritesCount = tests.filter((test) => test.favorite).length;
  const recentTests = [...tests]
    .slice(-3)
    .reverse();

  const stats = [
    {
      label: "Tests réalisés",
      value: tests.length,
      icon: TestTubeDiagonal,
      accent: "text-primary",
    },
    {
      label: "Cafés référencés",
      value: coffees.length,
      icon: Coffee,
      accent: "text-amber-500",
    },
    {
      label: "Machines suivies",
      value: machines.length,
      icon: ToolCase,
      accent: "text-secondary-foreground",
    },
    {
      label: "Tests favoris",
      value: favoritesCount,
      icon: Heart,
      accent: "text-destructive",
    },
  ];

  return (
    <div className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="grid gap-6 rounded-3xl border border-border/50 bg-background/60 p-8 shadow-sm backdrop-blur md:grid-cols-[1.3fr,1fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit uppercase tracking-wide">
              Tableau de bord
            </Badge>
            <div className="space-y-3">
              <h1 className="text-3xl font-serif font-semibold md:text-4xl">
                Ravie de vous retrouver sur <span className="text-primary">CaféLog</span>
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                Visualisez vos dernières extractions, gardez vos favoris à portée de main et lancez un nouveau test en un clin d'œil.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/tests/new">
                <Button size="lg" className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Ajouter un test
                </Button>
              </Link>
              <Link href="/tests">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5" />
                  Historique complet
                </Button>
              </Link>
            </div>
          </div>
          <Card className="border-0 bg-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold uppercase tracking-wide text-muted-foreground">
                Vue rapide
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <stat.icon className={`h-4 w-4 ${stat.accent}`} />
                    {stat.label}
                  </div>
                  <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-2 border-b bg-muted/40">
              <CardTitle className="flex items-center gap-2 text-lg">
                Dernière dégustation
                {lastTest && lastTest.favorite && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <Heart className="h-3 w-3 text-destructive" fill="currentColor" />
                    Favori
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {lastTest
                  ? `${formatTestDate(lastTest.createdAt ?? lastTest.date)} • ${lastTest.machine} • ${lastTest.beverageType}`
                  : "Aucun test n'a encore été enregistré."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {lastTest ? (
                <div className="space-y-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      Café dégusté
                    </span>
                    <h3 className="text-2xl font-serif font-semibold">{lastTest.cafe}</h3>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Note globale</span>
                      <div className="mt-2 flex items-center gap-1 text-primary">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={
                              i < lastTest.rating
                                ? "h-5 w-5 fill-current"
                                : "h-5 w-5 text-muted-foreground/40"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Type de boisson</span>
                      <p className="mt-2 font-medium">{lastTest.beverageType}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Machine</span>
                      <p className="mt-2 font-medium">{lastTest.machine}</p>
                    </div>
                  </div>
                  {lastTest.comment && (
                    <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-4 text-sm italic text-muted-foreground">
                      “{lastTest.comment}”
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4 text-muted-foreground">
                  <p>Commencez votre journal en ajoutant votre premier test.</p>
                  <Link href="/tests/new">
                    <Button size="sm" className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Créer un test
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
            {lastTest && (
              <CardFooter className="justify-end bg-muted/20">
                <Link href={`/tests/${lastTest.id}`} passHref>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    Voir le détail
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Activité récente
              </CardTitle>
              <CardDescription>
                Les trois dernières dégustations enregistrées.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTests.length ? (
                recentTests.map((test) => (
                  <Link
                    key={test.id}
                    href={`/tests/${test.id}`}
                    className="block rounded-xl border border-transparent bg-muted/30 p-4 transition hover:border-primary/40 hover:bg-background"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{test.cafe}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTestDate(test.createdAt ?? test.date)} • {test.machine}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Coffee
                            key={i}
                            className={
                              i < (test.rating ?? 0)
                                ? "h-4 w-4"
                                : "h-4 w-4 text-muted-foreground/40"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
                  Vos dernières dégustations apparaîtront ici dès que vous aurez enregistré des tests.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link href="/tests">
            <Card className="group h-full border-border/60 transition hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <TestTubeDiagonal className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Historique des tests</h3>
                    <p className="text-sm text-muted-foreground">
                      Parcourez l'ensemble de vos dégustations et suivez vos réglages.
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">
                  {tests.length} test{tests.length > 1 ? "s" : ""} enregistré{tests.length > 1 ? "s" : ""}
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/coffees">
            <Card className="group h-full border-border/60 transition hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <MapPin className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Bibliothèque de cafés</h3>
                    <p className="text-sm text-muted-foreground">
                      Gardez une trace de vos origines, torréfactions et notes sensorielles.
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-amber-600">
                  {coffees.length} café{coffees.length > 1 ? "s" : ""} référencé{coffees.length > 1 ? "s" : ""}
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/machines">
            <Card className="group h-full border-border/60 transition hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <ToolCase className="h-8 w-8 text-secondary-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">Machines & moulins</h3>
                    <p className="text-sm text-muted-foreground">
                      Archivez vos réglages pour reproduire vos extractions idéales.
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-secondary-foreground">
                  {machines.length} machine{machines.length > 1 ? "s" : ""} suivie{machines.length > 1 ? "s" : ""}
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/favorites">
            <Card className="group h-full border-border/60 transition hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <Heart className="h-8 w-8 text-destructive" />
                  <div>
                    <h3 className="text-lg font-semibold">Sélection favorites</h3>
                    <p className="text-sm text-muted-foreground">
                      Retrouvez vos meilleures tasses et partagez vos coups de cœur.
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-destructive">
                  {favoritesCount} test{favoritesCount > 1 ? "s" : ""} favori{favoritesCount > 1 ? "s" : ""}
                </span>
              </CardContent>
            </Card>
          </Link>
        </section>
      </div>
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
