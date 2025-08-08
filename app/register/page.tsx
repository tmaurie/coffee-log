"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !confirm) {
            return setError("Tous les champs sont obligatoires");
        }
        if (password !== confirm) {
            return setError("Les mots de passe ne correspondent pas");
        }

        setLoading(true);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        setLoading(false);

        if (!res.ok) {
            if (res.status === 409) return setError("Cet email est déjà utilisé");
            return setError("Erreur lors de l'inscription");
        }

        router.push("/"); // Redirige vers la home après inscription
    };

    return (
        <main className="max-w-sm mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Créer un compte</h1>
            <form onSubmit={submit} className="space-y-3">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Création..." : "S'inscrire"}
                </Button>
            </form>
        </main>
    );
}
