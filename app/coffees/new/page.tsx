"use client";
import { useState } from "react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/tag-input";

export default function NewCoffeePage() {
  const { addCoffee } = useCafeLog();
  const router = useRouter();
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCoffee({
      name,
      origin,
      description,
      tags,
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
        <Button type="submit">Ajouter</Button>
      </form>
    </main>
  );
}
