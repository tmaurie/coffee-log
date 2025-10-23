"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  buildSearchParamsFromFilters,
  parseFiltersFromSearchParams,
  shallowEqualFilters,
} from "@/lib/filter-url";
import { TestFilters } from "@/types/test";

export function useFiltersUrlSync(
  filters: TestFilters,
  setFilters: (f: TestFilters) => void,
) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  React.useEffect(() => {
    const fromUrl = parseFiltersFromSearchParams(
      new URLSearchParams(sp?.toString() ?? ""),
    );

    // @ts-ignore
    setFilters((current: TestFilters) =>
      shallowEqualFilters(current, fromUrl) ? current : fromUrl,
    );
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      const q = buildSearchParamsFromFilters(filters);
      router.replace(`${pathname}${q}`, { scroll: false });
    }, 180);
    return () => clearTimeout(id);
  }, [filters, pathname, router]);
}
