import { TestFilters } from "@/types/test";

export function parseFiltersFromSearchParams(sp: URLSearchParams): TestFilters {
  const q = sp.get("q") ?? "";
  const method = sp.get("method");
  const machine = sp.get("machine");
  const min = Number(sp.get("min") ?? "0");
  const fav = sp.get("fav") === "1";
  const sort = (sp.get("sort") as TestFilters["sort"]) ?? "date_desc";

  return {
    query: q,
    beverageType: method && method !== "all" ? method : null,
    machine: machine && machine !== "all" ? machine : null,
    minRating: Number.isFinite(min) ? Math.max(0, Math.min(5, min)) : 0,
    favoritesOnly: fav,
    sort: ["date_desc", "date_asc", "rating_desc", "rating_asc"].includes(sort)
      ? sort
      : "date_desc",
  };
}

export function buildSearchParamsFromFilters(f: TestFilters): string {
  const sp = new URLSearchParams();
  if (f.query.trim()) sp.set("q", f.query.trim());
  if (f.beverageType) sp.set("method", f.beverageType);
  if (f.machine) sp.set("machine", f.machine);
  if (f.minRating > 0) sp.set("min", String(f.minRating));
  if (f.favoritesOnly) sp.set("fav", "1");
  if (f.sort !== "date_desc") sp.set("sort", f.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function shallowEqualFilters(a: TestFilters, b: TestFilters) {
  return (
    a.query === b.query &&
    a.beverageType === b.beverageType &&
    a.machine === b.machine &&
    a.minRating === b.minRating &&
    a.favoritesOnly === b.favoritesOnly &&
    a.sort === b.sort
  );
}
