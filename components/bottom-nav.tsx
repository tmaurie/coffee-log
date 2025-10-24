"use client";

import Link from "next/link";
import {
  Coffee,
  FlaskConical,
  PlusCircle,
  Settings2,
  Star,
} from "lucide-react";

const items = [
  { href: "/coffees", label: "Cafés", icon: <Coffee className="w-5 h-5" /> },
  {
    href: "/tests",
    label: "Tests",
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    href: "/machines",
    label: "Machines",
    icon: <Settings2 className="w-5 h-5" />,
  },
  { href: "/favorites", label: "Favoris", icon: <Star className="w-5 h-5" /> },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-background/95 dark:bg-background/95 border-t border-border shadow md:hidden flex justify-around items-end py-1">
      {/* Les 2 premiers items */}
      {items.slice(0, 2).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-muted-foreground hover:text-primary transition w-10"
        >
          {item.icon}
          <span className="text-[11px]">{item.label}</span>
        </Link>
      ))}

      {/* Bouton central “Ajouter” */}
      <Link
        href="/tests/new"
        className="relative -top-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg p-3 border-4 border-background dark:border-background flex items-center justify-center transition"
        aria-label="Ajouter un test"
      >
        <PlusCircle className="w-7 h-7" />
      </Link>

      {/* Les 2 derniers items */}
      {items.slice(2).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-muted-foreground hover:text-primary w-10"
        >
          {item.icon}
          <span className="text-[11px]">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
