"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  Mail,
  User,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ── Helpers simples

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-z0-9._-]{3,20}$/i;

function passwordScore(pw: string) {
  // Score rapide 0..4 : longueur + diversité
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

function StrengthBar({ value }: { value: number }) {
  const labels = ["Très faible", "Faible", "Correct", "Bon", "Fort"];
  const tones = [
    "bg-destructive",
    "bg-destructive/80",
    "bg-accent",
    "bg-secondary",
    "bg-primary",
  ];
  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded ${
              i <= value ? tones[value] ?? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{labels[value]}</div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  // champs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [consent, setConsent] = useState(false);

  // ui
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string>("");

  // username availability (live)
  const [nameStatus, setNameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  // validations
  const score = useMemo(() => passwordScore(password), [password]);
  const emailValid = emailRegex.test(email.trim());
  const usernameValid = usernameRegex.test(username.trim());
  const passwordsMatch = password === confirm;

  useEffect(() => {
    setError("");
  }, [email, username, password, confirm]);

  // Check username availability (debounced)
  useEffect(() => {
    if (!usernameValid) {
      setNameStatus("idle");
      return;
    }
    let alive = true;
    setNameStatus("checking");
    const t = setTimeout(async () => {
      try {
        // ⚠️ Prévois une route GET /api/auth/check-username?u=... qui renvoie { available: boolean }
        const res = await fetch(
          `/api/auth/check-username?u=${encodeURIComponent(username.trim())}`,
        );
        if (!alive) return;
        if (!res.ok) {
          setNameStatus("idle"); // route non dispo -> on n'empêche pas l'inscription
          return;
        }
        const data = await res.json();
        setNameStatus(data?.available ? "available" : "taken");
      } catch {
        setNameStatus("idle");
      }
    }, 400);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [username, usernameValid]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // front validations
    if (!email || !username || !password || !confirm) {
      return setError("Tous les champs sont obligatoires");
    }
    if (!emailValid) return setError("Format d’email invalide");
    if (!usernameValid)
      return setError("Username (3–20) : lettres/chiffres/._- uniquement");
    if (!passwordsMatch)
      return setError("Les mots de passe ne correspondent pas");
    if (!consent)
      return setError("Merci d’accepter les CGU/Privacy pour continuer");
    if (nameStatus === "taken")
      return setError("Ce nom d’utilisateur est déjà pris");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (!res.ok) {
        if (res.status === 409)
          throw new Error("Email ou username déjà utilisé");
        throw new Error("Erreur lors de la création du compte");
      }

      // Auto-login juste après création
      const login = await signIn("credentials", {
        identifier: username, // email OU username -> on passe le username ici
        password,
        redirect: false,
      });

      if (login?.error) {
        // fallback: on envoie vers la page de login
        router.push("/login");
        return;
      }

      router.push("/"); // OK
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 space-y-4">
      <CardHeader className="space-y-1 mt-2">
        <CardTitle>Rejoignez-nous ! Créez votre compte</CardTitle>
        <CardDescription>
          Créez un compte pour commencer à déguster!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={submit} className="space-y-5" noValidate>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@domain.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!email && !emailValid}
              required
            />
            {!!email && !emailValid && (
              <p className="text-xs text-destructive">Format d’email invalide</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">
              <User className="w-4 h-4" />
              Nom d’utilisateur
            </Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="coffee_lover"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-invalid={!!username && !usernameValid}
                required
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {nameStatus === "checking" && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {nameStatus === "available" && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                {nameStatus === "taken" && (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
            {!!username && !usernameValid && (
              <p className="text-xs text-destructive">
                3–20 caractères, lettres/chiffres/._-
              </p>
            )}
            {nameStatus === "taken" && (
              <p className="text-xs text-destructive">
                Ce nom d’utilisateur est déjà pris
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              <Lock className="w-4 h-4" />
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <StrengthBar value={score} />
          </div>

          {/* Confirm */}
          <div className="space-y-2">
            <Label htmlFor="confirm">
              <Lock className="w-4 h-4" />
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={!!confirm && !passwordsMatch}
              required
            />
            {!!confirm && !passwordsMatch && (
              <p className="text-xs text-destructive">
                Les mots de passe ne correspondent pas
              </p>
            )}
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(!!v)}
            />
            <Label htmlFor="consent" className="text-sm text-muted-foreground flex ">
              J’accepte les&nbsp; CGU &nbsp;et la&nbsp; Politique de
              confidentialité.
            </Label>
          </div>

          {/* Error global */}
          {error && <div className="text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Création…
              </span>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </form>

        <div className="text-sm text-muted-foreground mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="p-0"
            >
              Se connecter
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
