import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserIdFromSession(session: unknown): string | undefined {
  if (
    session &&
    typeof session === "object" &&
    "user" in session &&
    (session as any).user &&
    typeof (session as any).user === "object" &&
    "id" in (session as any).user &&
    typeof (session as any).user.id === "string"
  ) {
    return (session as any).user.id as string;
  }
  return undefined;
}
