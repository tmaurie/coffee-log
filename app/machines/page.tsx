"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useCafeLog } from "@/context/CoffeeLogContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Machine = {
  id: string;
  name: string;
  brand?: string | null;
  description?: string | null;
};

function MachineCard({
  machine,
  onDeleted, // optionnel: callback pour rafraîchir la liste après suppression
}: {
  machine: Machine;
  onDeleted?: (id: string) => void;
}) {
  const { deleteMachine } = useCafeLog();
  const { id, name, brand, description } = machine;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      toast.promise(deleteMachine(id), {
        loading: "Suppression de la machine…",
        success: "Machine supprimée avec succès !",
        error: "Impossible de supprimer la machine.",
      });
      onDeleted?.(id);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Impossible de supprimer la machine." + e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition border">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className=" flex flex-1 gap-3">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            {brand ? (
              <Badge variant="secondary" className="mt-1">
                {brand}
              </Badge>
            ) : null}
          </div>

          {/* Menu … */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/machines/${id}/edit`}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Éditer
                </Link>
              </DropdownMenuItem>

              {/* Supprimer avec confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Supprimer cette machine ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. La machine « {name} » sera
                      définitivement supprimée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isDeleting ? "Suppression…" : "Supprimer"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p className="line-clamp-3">{description || "—"}</p>
      </CardContent>
    </Card>
  );
}

export default function MachinesPage() {
  const { machines } = useCafeLog(); // dans ta V1, pas d'état de chargement, on garde la logique simple

  const isEmpty = !machines || machines.length === 0;

  const handleDeleted = (id: string) => {};

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mes machines</h1>

        <Button
          asChild
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold px-4 py-2 rounded-lg"
        >
          <Link href="/machines/new">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Link>
        </Button>
      </div>

      {isEmpty ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="mb-4">Aucune machine référencée pour l’instant…</p>
          <Button asChild>
            <Link href="/machines/new">Ajouter ma première machine</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {machines.map((m: Machine) => (
            <MachineCard key={m.id} machine={m} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </main>
  );
}
