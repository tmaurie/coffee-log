export type Test = {
  id: string;
  date: string;
  cafe: string; // Id ou nom du café
  machine: string; // Id ou nom de la machine
  beverageType: string; // espresso, lungo…
  waterQuantity?: number; // ml, optionnel
  filterType?: string; // ex: Bottomless, Simple, Double...
  grindFineness?: string; // fin, moyen, gros
  doseGrams?: number; // g, optionnel
  preinfusionSec?: number; // secondes
  extractionSec?: number; // secondes
  temperature: number; // °C
  pressure: number; // bar
  intensity: number; // 1-5
  bitterness: number; // 1-5
  acidity: number; // 1-5
  flavor: number; // 1-5
  rating: number; // 1-5
  comment?: string;
  favorite?: boolean;
  createdAt?: string;
};

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

export const defaultFilters: TestFilters = {
  query: "",
  beverageType: null,
  machine: null,
  minRating: 0,
  favoritesOnly: false,
  sort: "date_desc",
};
