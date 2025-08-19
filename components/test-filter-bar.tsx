"use client";

import * as React from "react";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";

export type TestItem = {
    id: string;
    date: string; // ISO
    favorite?: boolean;
    cafe?: string;
    machine?: string;
    beverageType?: string; // méthode: espresso, V60, etc.
    createdAt?: string;
    rating?: number;
};

export type TestFilters = {
    query: string;
    beverageType: string | null;
    machine: string | null;
    minRating: number;
    favoritesOnly: boolean;
    sort: "date_desc" | "date_asc" | "rating_desc" | "rating_asc";
};

type Props = {
    tests: TestItem[];
    value: TestFilters;
    onChangeAction: (next: TestFilters) => void;
};

export default function TestFiltersBar({ tests, value, onChangeAction }: Props) {
    const beverageTypes = useMemo(() => {
        return Array.from(new Set(tests.map(t => t.beverageType).filter(Boolean))) as string[];
    }, [tests]);

    const machines = useMemo(() => {
        return Array.from(new Set(tests.map(t => t.machine).filter(Boolean))) as string[];
    }, [tests]);

    const set = <K extends keyof TestFilters>(key: K, v: TestFilters[K]) =>
        onChangeAction({ ...value, [key]: v });

    // Debounce léger pour la recherche (évite de rerendre à chaque frappe)
    const [q, setQ] = React.useState(value.query);
    React.useEffect(() => {
        const id = setTimeout(() => set("query", q), 180);
        return () => clearTimeout(id);
    }, [q]); // eslint-disable-line

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <div className="grid grid-cols-6 gap-3 items-end">
                {/* Recherche texte */}
                <div className="md:col-span-2">
                    <Label htmlFor="q">Recherche</Label>
                    <Input
                        id="q"
                        placeholder="Café, machine, méthode…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>

                {/* Méthode */}
                <div>
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
                            {beverageTypes.map(bt => (
                                <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Machine */}
                <div>
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
                            {machines.map(m => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Note min */}
                <div>
                    <Label>Note min : {value.minRating}/5</Label>
                    <Select
                        value={value.minRating.toString()}
                        onValueChange={(v) => set("minRating", parseInt(v, 10))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Aucune" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Aucune</SelectItem>
                            {[1, 2, 3, 4, 5].map(r => (
                                <SelectItem key={r} value={r.toString()}>{r}/5</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tri */}
                <div>
                    <Label>Tri</Label>
                    <Select
                        value={value.sort}
                        onValueChange={(v: TestFilters["sort"]) => set("sort", v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">Date ↓</SelectItem>
                            <SelectItem value="date_asc">Date ↑</SelectItem>
                            <SelectItem value="rating_desc">Note ↓</SelectItem>
                            <SelectItem value="rating_asc">Note ↑</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Favoris */}
                <div className="flex items-center gap-3 md:justify-end">
                    <div className="space-y-1">
                        <Label htmlFor="fav">Favoris uniquement</Label>
                        <div className="flex items-center gap-2">
                            <Switch id="fav" checked={value.favoritesOnly} onCheckedChange={(b) => set("favoritesOnly", b)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
