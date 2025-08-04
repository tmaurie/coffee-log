export type Test = {
    id: string;
    date: string;
    cafe: string;       // Id ou nom du café
    machine: string;    // Id ou nom de la machine
    beverageType: string; // espresso, lungo…
    quantity: number;     // ml
    temperature: number;  // °C
    pressure: number;     // bar
    intensity: number;    // 1-5
    bitterness: number;   // 1-5
    acidity: number;      // 1-5
    rating: number;       // 1-5
    comment?: string;
    favorite?: boolean;
};
