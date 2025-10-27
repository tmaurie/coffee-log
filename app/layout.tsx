import "./globals.css";
import type { Metadata } from "next";
import { CafeLogProvider } from "@/context/CoffeeLogContext";
import Header from "@/components/header";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CaféLog",
  description:
    "Tracke tes tests café maison, améliore tes extractions, et trouve le café parfait !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground transition-colors">
        <CafeLogProvider>
          <Header />
          <div className="pt-6 pb-12">{children}</div>
          <BottomNav />
          <Toaster richColors={true} />
        </CafeLogProvider>
      </body>
    </html>
  );
}
