"use client";
import React, { useState } from "react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { BEVERAGE_TYPES } from "@/lib/consts/beverage-types";
import StarRating from "@/components/star-rating";
import { Separator } from "@radix-ui/react-select";

type TestFormFields = {
  date: string;
  cafe: string;
  machine: string;
  beverageType: string;
  doseGrams?: number;
  filterType?: string;
  waterQuantity?: number;
  preinfusionSec?: number;
  extractionSec?: number;
  temperature: number;
  pressure: number;
  grindFineness?: string;
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
  waterQuantity: 0,
  temperature: 92,
  pressure: 9,
  grindFineness: "",
  filterType: undefined,
  doseGrams: undefined,
  preinfusionSec: undefined,
  extractionSec: undefined,
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
  const FILTER_TYPES = [
    "Simple 1 tasse",
    "Simple 2 tasses",
    "Pressurisé 1 tasse",
    "Pressurisé 2 tasses",
  ] as const;

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
                <SelectValue placeholder="Sélectionnez un type de boisson" />
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
          {/* Type de filtre */}
          <div className="space-y-1">
            <label className="block mb-1 font-semibold">Type de filtre</label>
            <Select
              value={form.filterType}
              onValueChange={(v) => setForm((f) => ({ ...f, filterType: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type de filtre" />
              </SelectTrigger>
              <SelectContent>
                {FILTER_TYPES.map((ft) => (
                  <SelectItem key={ft} value={ft}>
                    {ft}
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
          {/* Finesse de la mouture */}
          <div>
            <label className="block mb-1 font-semibold">
              Finesse de la mouture
            </label>
            <Select
              name="grindSize"
              value={form.grindFineness}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, grindSize: value }))
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez une finesse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Très fine">Très fine</SelectItem>
                <SelectItem value="Fine">Fine</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Grossière">Grossière</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* 2. Quantité de mouture (g) */}
          <div>
            <label className="block mb-1 font-semibold">
              Quantité de mouture (g)
            </label>
            <Input
              type="number"
              value={form.doseGrams ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  doseGrams: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
              min={0}
              step={0.1}
              placeholder="Ex: 18"
            />
          </div>
          {/* 3. Température (°C) */}
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
          {/* 4. Quantité d’eau (ml) */}
          <div>
            <label className="block mb-1 font-semibold">
              Quantité d’eau (ml) (optionnel)
            </label>
            <Input
              type="number"
              name="quantity"
              value={form.waterQuantity}
              min={10}
              max={500}
              onChange={handleChange}
            />
          </div>
          {/* 5. Pré-infusion (sec) */}
          <div>
            <label className="block mb-1 font-semibold">Pré-infusion (s)</label>
            <Input
              type="number"
              value={form.preinfusionSec ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  preinfusionSec: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
              min={0}
              step={1}
              placeholder="Ex: 5"
            />
          </div>
          {/* 6. Temps d’infusion (s) */}
          <div>
            <label className="block mb-1 font-semibold">
              Temps d’infusion (s)
            </label>
            <Input
              type="number"
              value={form.extractionSec ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  extractionSec: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
              min={0}
              step={1}
              placeholder="Ex: 25"
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
            <span className="text-sm">Niveau : {form.intensity}</span>
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
            <span className="text-sm">Niveau : {form.bitterness}</span>
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
            <span className="text-sm">Niveau : {form.acidity}</span>
          </div>
        </CardContent>
        <Separator className="border-t" />
        <CardFooter>
          <div>
            <label className="block mb-1 font-semibold">Note globale</label>
            <StarRating
              value={form.rating}
              onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
            />
          </div>
        </CardFooter>
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
