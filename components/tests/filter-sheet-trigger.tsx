"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import type { TestFilters, TestItem } from "./types";
import FiltersForm from "@/components/tests/filter-form";

function countActive(f: TestFilters) {
  let n = 0;
  if (f.query.trim()) n++;
  if (f.beverageType) n++;
  if (f.machine) n++;
  if (f.minRating > 0) n++;
  if (f.favoritesOnly) n++;
  if (f.sort !== "date_desc") n++;
  return n;
}

type Props = {
  tests: TestItem[];
  value: TestFilters;
  onChange: (next: TestFilters) => void;
  onReset: () => void;
};

export default function FiltersSheetTrigger({
  tests,
  value,
  onChange,
  onReset,
}: Props) {
  const active = countActive(value);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          Filtrer {active > 0 ? `(${active})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-4">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
        </SheetHeader>

        <div className="mt-3">
          <FiltersForm tests={tests} value={value} onChange={onChange} dense />
        </div>

        <SheetFooter className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={onReset}>
            Réinitialiser
          </Button>
          <SheetClose asChild>
            <Button>Appliquer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
