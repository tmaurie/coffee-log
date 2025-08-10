export type Coffee = {
  id: string;
  name: string;
  origin?: string;
  description?: string;
  tags?: string[];
  roastLevel?: "Verte" | "Moyenne" | "Foncée" | "Très foncée";
  rating?: number;
};
