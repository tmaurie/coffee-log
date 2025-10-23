"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import type { TestFilters, TestItem } from "./types";

type Props = {
  tests: TestItem[];
  value: TestFilters;
  onChange: (next: TestFilters) => void;
  dense?: boolean; // pour réduire les margins si nécessaire
};

export default function FiltersForm({ tests, value, onChange, dense }: Props) {
  const beverageTypes = React.useMemo(
    () =>
      Array.from(
        new Set(tests.map((t) => t.beverageType).filter(Boolean)),
      ) as string[],
    [tests],
  );
  const machines = React.useMemo(
    () =>
      Array.from(
        new Set(tests.map((t) => t.machine).filter(Boolean)),
      ) as string[],
    [tests],
  );

  const set = <K extends keyof TestFilters>(key: K, v: TestFilters[K]) =>
    onChange({ ...value, [key]: v });

  // debounce pour la recherche
  const [q, setQ] = React.useState(value.query);
  React.useEffect(() => {
    const id = setTimeout(() => set("query", q), 160);
    return () => clearTimeout(id);
  }, [q]); // eslint-disable-line

  const block = dense ? "space-y-2" : "space-y-3";

  return (
    <div className="w-full">
      <div className={block}>
        <div className="space-y-1">
          <Label htmlFor="q">Recherche</Label>
          <Input
            id="q"
            placeholder="Café, machine, méthode…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label>Méthode</Label>
          <Select
            value={value.beverageType ?? "all"}
            onValueChange={(v) => set("beverageType", v === "all" ? null : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {beverageTypes.map((bt) => (
                <SelectItem key={bt} value={bt}>
                  {bt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Machine</Label>
          <Select
            value={value.machine ?? "all"}
            onValueChange={(v) => set("machine", v === "all" ? null : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {machines.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Note min : {value.minRating}/5</Label>
          <div className="px-1">
            <Slider
              min={0}
              max={5}
              step={1}
              value={[value.minRating]}
              onValueChange={(arr) => set("minRating", arr[0] ?? 0)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Tri</Label>
          <Select value={value.sort} onValueChange={(v: any) => set("sort", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Date ↓ (récent)</SelectItem>
              <SelectItem value="date_asc">Date ↑ (ancien)</SelectItem>
              <SelectItem value="rating_desc">Note ↓ (meilleur)</SelectItem>
              <SelectItem value="rating_asc">Note ↑ (moins bon)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="fav">Favoris uniquement</Label>
          <Switch
            id="fav"
            checked={value.favoritesOnly}
            onCheckedChange={(b) => set("favoritesOnly", b)}
          />
        </div>
      </div>
    </div>
  );
}
