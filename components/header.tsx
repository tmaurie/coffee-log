"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";

export const navlink = {
  home: {
    href: "/",
    label: "Accueil",
  },
  tests: {
    href: "/tests",
    label: "Tests",
  },
  machines: {
    href: "/machines",
    label: "Machines",
  },
  coffees: {
    href: "/coffees",
    label: "Cafés",
  },
};

export default function HeaderClient() {
  const { data: session, status } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email;
  const { theme, toggleTheme } = useTheme();
  const email = session?.user?.email;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 shadow-sm backdrop-blur">
      <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-extrabold text-2xl text-amber-700">
          CaféLog
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {Object.entries(navlink).map(([key, { href, label }]) => (
            <Link key={key} href={href}>
              <Button variant="ghost">{label}</Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {status === "loading" ? null : email ? (
            <>
              <span className="hidden sm:inline">
                Bienvenue, <strong>{displayName}</strong>
              </span>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost">Créer un compte</Button>
              </Link>
            </>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
