"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-z0-9._-]{3,20}$/i;

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // reset error on changes
  useEffect(() => setErr(""), [identifier, password]);

  const validIdentifier =
    !!identifier &&
    (emailRegex.test(identifier.trim()) ||
      usernameRegex.test(identifier.trim()));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!validIdentifier) {
      return setErr("Saisis un email ou un username valide.");
    }
    if (!password) {
      return setErr("Le mot de passe est requis.");
    }

    setLoading(true);
    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      // Message neutre (pas de fuite d’info)
      return setErr("Identifiants invalides");
    }

    // Succès
    router.push("/");
    // Si ton header est SSR, tu peux forcer le refresh :
    // router.refresh();
  };

  return (
    <Card className="max-w-lg mx-auto p-6 space-y-4">
      <CardHeader className="space-y-1 mt-2">
        <CardTitle>Content de te revoir 👋</CardTitle>
        <CardDescription>
          Connecte-toi pour reprendre tes dégustations.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={submit} className="space-y-5" noValidate>
          {/* Identifiant (email ou username) */}
          <div className="space-y-2">
            <Label htmlFor="identifier" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <User className="w-4 h-4" />
              Email ou nom d’utilisateur
            </Label>
            <Input
              id="identifier"
              placeholder="you@domain.fr ou coffee_lover"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              aria-invalid={!!identifier && !validIdentifier}
              autoComplete="username"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPw((s) => !s)}
                aria-label={
                  showPw
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPw ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Erreur globale */}
          {err && <div className="text-red-600 text-sm">{err}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Connexion…
              </span>
            ) : (
              "Se connecter"
            )}
          </Button>

          <div className="flex items-center justify-between text-sm text-zinc-500">
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={() => router.push("/register")}
            >
              Créer un compte
            </Button>
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={() => router.push("/reset-password")}
            >
              Mot de passe oublié ?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
