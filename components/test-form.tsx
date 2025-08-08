"use client";
import { useState } from "react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { BEVERAGE_TYPES } from "@/lib/consts/beverage-types";

type TestFormFields = {
  date: string;
  cafe: string;
  machine: string;
  beverageType: string;
  quantity: number;
  temperature: number;
  pressure: number;
  grindSize: string;
  intensity: number;
  bitterness: number;
  acidity: number;
  rating: number;
  comment: string;
  favorite: boolean;
};

const defaultForm: TestFormFields = {
  date: new Date().toISOString().slice(0, 10),
  cafe: "",
  machine: "",
  beverageType: "",
  quantity: 30,
  temperature: 92,
  pressure: 9,
  grindSize: "",
  intensity: 3,
  bitterness: 3,
  acidity: 3,
  rating: 3,
  comment: "",
  favorite: false,
};

export default function TestForm() {
  const [form, setForm] = useState<TestFormFields>(defaultForm);
  const { addTest } = useCafeLog();
  const router = useRouter();

  // Helpers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSlider = (name: keyof TestFormFields, value: number[]) => {
    setForm((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleSwitch = (checked: boolean) => {
    setForm((prev) => ({ ...prev, favorite: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTest(form);
    setForm(defaultForm);
    router.push("/tests");
  };

  const { coffees, machines } = useCafeLog();

  return (
    <form className="max-w-2xl mx-auto space-y-8" onSubmit={handleSubmit}>
      {/* 1. Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Conditions du test</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Café</label>
            <Select
              name="cafe"
              value={form.cafe}
              onValueChange={(value) => setForm((f) => ({ ...f, cafe: value }))}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un café" />
              </SelectTrigger>
              <SelectContent>
                {coffees.map((coffee) => (
                  <SelectItem key={coffee.id} value={coffee.name}>
                    {coffee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Machine</label>
            <Select
              name="machine"
              value={form.machine}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, machine: value }))
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir une machine" />
              </SelectTrigger>
              <SelectContent>
                {machines.map((machine) => (
                  <SelectItem key={machine.id} value={machine.name}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Type de boisson</label>
            <Select
              name="beverageType"
              value={form.beverageType}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, beverageType: value }))
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {BEVERAGE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 2. Caractéristiques infusion */}
      <Card>
        <CardHeader>
          <CardTitle>Caractéristiques de l’infusion</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">
              Quantité d’eau (ml)
            </label>
            <Input
              type="number"
              name="quantity"
              value={form.quantity}
              min={10}
              max={500}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Température (°C)</label>
            <Input
              type="number"
              name="temperature"
              value={form.temperature}
              min={60}
              max={100}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Pression (bar)</label>
            <Input
              type="number"
              name="pressure"
              value={form.pressure}
              min={1}
              max={15}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mouture</label>
            <Input
              name="grindSize"
              value={form.grindSize}
              onChange={handleChange}
              placeholder="Fine, moyenne, grosse..."
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Évaluation sensorielle */}
      <Card>
        <CardHeader>
          <CardTitle>Évaluation sensorielle</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">Intensité</label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[form.intensity]}
              onValueChange={(v) => handleSlider("intensity", v)}
            />
            <span className="text-sm">Niveau : {form.intensity}</span>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Amertume</label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[form.bitterness]}
              onValueChange={(v) => handleSlider("bitterness", v)}
            />
            <span className="text-sm">Niveau : {form.bitterness}</span>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Acidité</label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[form.acidity]}
              onValueChange={(v) => handleSlider("acidity", v)}
            />
            <span className="text-sm">Niveau : {form.acidity}</span>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Note globale</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setForm((f) => ({ ...f, rating: n }))}
                  className="focus:outline-none"
                  aria-label={`Donner ${n} étoile${n > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`h-7 w-7 ${form.rating >= n ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
            <span className="ml-2 text-sm">{form.rating} / 5</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Avis & favori */}
      <Card>
        <CardHeader>
          <CardTitle>Avis & favori</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              Commentaire (optionnel)
            </label>
            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Donne ton avis, ton astuce, une anecdote…"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.favorite}
              onCheckedChange={handleSwitch}
              id="fav-switch"
            />
            <label htmlFor="fav-switch" className="font-semibold">
              Marquer comme favori
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          Ajouter le test
        </Button>
      </div>
    </form>
  );
}
