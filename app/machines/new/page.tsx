"use client";
import { useState } from "react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewMachinePage() {
  const { addMachine } = useCafeLog();
  const router = useRouter();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMachine({ name, brand, description });
    router.push("/machines");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Ajouter une machine</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
        />
        <Input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Marque"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Button type="submit">Ajouter</Button>
      </form>
    </main>
  );
}
