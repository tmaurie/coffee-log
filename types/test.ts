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
