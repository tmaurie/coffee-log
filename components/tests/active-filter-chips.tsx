"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestFilters } from "@/types/test";

type Props = {
  value: TestFilters;
  onChange: (next: TestFilters) => void;
  onReset?: () => void;
};

export default function ActiveFilterChips({ value, onChange, onReset }: Props) {
  const chips: { label: string; clear: () => void }[] = [];

  if (value.query.trim())
    chips.push({
      label: `Recherche: “${value.query.trim()}”`,
      clear: () => onChange({ ...value, query: "" }),
    });

  if (value.beverageType)
    chips.push({
      label: `Méthode: ${value.beverageType}`,
      clear: () => onChange({ ...value, beverageType: null }),
    });

  if (value.machine)
    chips.push({
      label: `Machine: ${value.machine}`,
      clear: () => onChange({ ...value, machine: null }),
    });

  if (value.minRating > 0)
    chips.push({
      label: `Note ≥ ${value.minRating}`,
      clear: () => onChange({ ...value, minRating: 0 }),
    });

  if (value.favoritesOnly)
    chips.push({
      label: "Favoris",
      clear: () => onChange({ ...value, favoritesOnly: false }),
    });

  if (value.sort !== "date_desc")
    chips.push({
      label: `Tri: ${value.sort}`,
      clear: () => onChange({ ...value, sort: "date_desc" }),
    });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {chips.map((c, idx) => (
        <Badge key={idx} variant="secondary" className="pr-0">
          <span className="mr-1">{c.label}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-1"
            onClick={c.clear}
            aria-label={`Supprimer le filtre ${c.label}`}
            title="Supprimer ce filtre"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </Badge>
      ))}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} className="ml-1">
          Réinitialiser
        </Button>
      )}
    </div>
  );
}
