"use client";
import React, { useState } from "react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/tag-input";
import StarRating from "@/components/star-rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROAST_LEVELS = ["Clair", "Moyen", "Foncé", "Très foncé"] as const;

export default function NewCoffeePage() {
  const { addCoffee } = useCafeLog();
  const router = useRouter();
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [roastLevel, setRoastLevel] = useState<(typeof ROAST_LEVELS)[number]>();
  const [rating, setRating] = useState(0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCoffee({
      name,
      origin,
      description,
      tags,
      roastLevel,
      rating,
    });
    router.push("/coffees");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Ajouter un café</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
        />
        <Input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origine"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Ajoutez un tag (Entrée pour valider)"
        />

        {/* Roast level */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Niveau de torréfaction</label>
          <Select
            value={roastLevel}
            onValueChange={(value) =>
              setRoastLevel(value as (typeof ROAST_LEVELS)[number])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner…" />
            </SelectTrigger>
            <SelectContent>
              {ROAST_LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Note du café */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Note du café</label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <Button type="submit">Ajouter</Button>
      </form>
    </main>
  );
}
