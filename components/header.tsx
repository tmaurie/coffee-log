"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";

export const navlink = {
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
  const email = session?.user?.email;
  const displayName = session?.user?.name ?? session?.user?.email;
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/90 dark:bg-background/90 shadow-sm backdrop-blur">
      <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-extrabold text-2xl text-primary">
            CaféLog
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <HomeIcon className="h-5 w-5" />
              </Button>
            </Link>
            {Object.entries(navlink).map(([key, { href, label }]) => (
              <Link key={key} href={href}>
                <Button variant="ghost">{label}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {status === "loading" ? null : email && displayName ? (
            <>
              <span className="hidden sm:inline">
                Bienvenue,{" "}
                <strong>
                  {displayName.charAt(0).toUpperCase() + displayName?.slice(1)}
                </strong>
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
                <Button variant="outline" className="rounded-full">
                  Créer un compte
                </Button>
              </Link>
            </>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full"
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
