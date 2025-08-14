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
import { Card } from "@/components/ui/card";
import { Coffee } from "lucide-react";

const ROAST_LEVELS = ["Verte", "Moyenne", "Foncée", "Très foncée"] as const;

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
    <Card className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 flex items-center">
        <Coffee className="h-6 w-6 mr-2" />
        Ajouter un café
      </h1>
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
          placeholder="Torréfaction / mélange / avis…"
        />
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Ajoutez un tag (Entrée pour valider)"
        />

        {/* Roast level */}
        <div className="space-y-1">
          <Select
            value={roastLevel}
            onValueChange={(value) =>
              setRoastLevel(value as (typeof ROAST_LEVELS)[number])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Niveau de torréfaction…" />
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
          <StarRating value={rating} onChangeAction={setRating} />
        </div>
        <Button type="submit">Ajouter</Button>
      </form>
    </Card>
  );
}
