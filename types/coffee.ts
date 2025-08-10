export type Coffee = {
  id: string;
  name: string;
  origin?: string;
  description?: string;
  tags?: string[];
  roastLevel?: "Clair" | "Moyen" | "Foncé" | "Très foncé";
  rating?: number;
};
