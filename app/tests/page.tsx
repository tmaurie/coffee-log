"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultFilters, TestFilters } from "@/types/test";
import { useFiltersUrlSync } from "@/lib/hooks/useFilterUrlSync";
import ActiveFilterChips from "@/components/tests/active-filter-chips";
import FiltersForm from "@/components/tests/filter-form";
import FiltersSheetTrigger from "@/components/tests/filter-sheet-trigger";

const dateFormatter = (d: string | Date) =>
  format(typeof d === "string" ? new Date(d) : d, "d MMMM yyyy", {
    locale: fr,
  });

const relativeFormatter = (d?: string | Date) =>
  d
    ? formatDistanceToNow(typeof d === "string" ? new Date(d) : d, {
        addSuffix: true,
        locale: fr,
      })
    : null;

function ratingTone(rating?: number) {
  if (rating == null) return "bg-muted text-muted-foreground";
  if (rating >= 4) return "bg-green-100 text-green-800";
  if (rating >= 3) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

function TestCard({ test }: { test: any }) {
  const {
    id,
    date,
    cafe = "Café inconnu",
    machine = "Machine inconnue",
    beverageType = "—",
    createdAt,
    rating,
  } = test;
  const createdAtRel = relativeFormatter(createdAt);

  return (
    <Link href={`/tests/${id}`} className="block">
      <Card className="hover:shadow-md transition border cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {dateFormatter(date)}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs ${ratingTone(rating)}`}
            >
              Note : {rating ?? "—"}/5
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <div className="flex-1">
            <div className="font-semibold text-lg line-clamp-1">{cafe}</div>
            <div className="text-xs text-gray-500">
              {machine} &bull; {beverageType}
              {createdAtRel ? (
                <span className="ml-1 opacity-70">• {createdAtRel}</span>
              ) : null}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {beverageType}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function TestsPage() {
  const { tests } = useCafeLog();

  const [filters, setFilters] = useState<TestFilters>(defaultFilters);
  useFiltersUrlSync(filters, setFilters);

  const filteredSorted = useMemo(() => {
    const data = Array.isArray(tests) ? tests : [];
    const matches = data.filter((t) => {
      if (filters.favoritesOnly && !t.favorite) return false;
      if (filters.beverageType && t.beverageType !== filters.beverageType)
        return false;
      if (filters.machine && t.machine !== filters.machine) return false;
      if ((filters.minRating ?? 0) > 0 && (t.rating ?? 0) < filters.minRating)
        return false;
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const hay = [t.cafe ?? "", t.machine ?? "", t.beverageType ?? ""]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return matches.sort((a, b) => {
      switch (filters.sort) {
        case "date_asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "rating_desc":
          return (b.rating ?? -Infinity) - (a.rating ?? -Infinity);
        case "rating_asc":
          return (a.rating ?? Infinity) - (b.rating ?? Infinity);
        case "date_desc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [tests, filters]);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <main className="mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Mes tests café</h1>
        <Button
          asChild
          className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold"
        >
          <Link href="/tests/new">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Link>
        </Button>
      </div>

      <ActiveFilterChips
        value={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <div className="md:hidden mb-4">
        <FiltersSheetTrigger
          tests={Array.isArray(tests) ? tests : []}
          value={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6">
        <aside className="hidden md:block">
          <div className="sticky top-20 rounded-xl border p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Filtres</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Réinitialiser
              </Button>
            </div>
            <FiltersForm
              tests={Array.isArray(tests) ? tests : []}
              value={filters}
              onChange={setFilters}
              dense={false}
            />
          </div>
        </aside>

        {/* Liste */}
        <section>
          {filteredSorted.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">Aucun test ne correspond à ces filtres…</p>
              <Button variant="secondary" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredSorted.map((t) => (
                <TestCard key={t.id} test={t} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
