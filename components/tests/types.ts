export type TestItem = {
  id: string;
  date: string;
  favorite?: boolean;
  cafe?: string;
  machine?: string;
  beverageType?: string;
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
