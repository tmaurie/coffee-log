"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TestFilters } from "@/types/test";
import {
  buildSearchParamsFromFilters,
  parseFiltersFromSearchParams,
  shallowEqualFilters,
} from "../filter-url";

export function useFiltersUrlSync(
  filters: TestFilters,
  setFilters: (f: TestFilters) => void,
) {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = parseFiltersFromSearchParams(
      new URLSearchParams(window.location.search),
    );
    // @ts-ignore
    setFilters((prev) => (shallowEqualFilters(prev, fromUrl) ? prev : fromUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const onPopState = () => {
      const sp = new URLSearchParams(window.location.search);
      const fromUrl = parseFiltersFromSearchParams(sp);
      // @ts-ignore
      setFilters((prev) =>
        shallowEqualFilters(prev, fromUrl) ? prev : fromUrl,
      );
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [setFilters]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      const q = buildSearchParamsFromFilters(filters);
      router.replace(`${pathname}${q}`, { scroll: false });
    }, 180);
    return () => clearTimeout(id);
  }, [filters, pathname, router]);
}
