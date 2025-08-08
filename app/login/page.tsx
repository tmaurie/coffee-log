"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });
    if (res?.error) return setErr("Email ou mot de passe invalide");
    router.push("/");
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="max-w-sm mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">Connexion</h1>
      <form onSubmit={submit} className="space-y-3">
        <Input
          placeholder="Email ou username"
          value={identifier}
          onChange={handleIdentifierChange}
        />

        <Input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </main>
  );
}
