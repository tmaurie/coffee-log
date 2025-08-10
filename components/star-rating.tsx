"use client";
import { Star } from "lucide-react";

export default function StarRating({
  value,
  onChange,
  max = 5,
  size = 20,
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const active = value >= n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            className="p-0.5"
          >
            <Star
              className={
                active ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }
              width={size}
              height={size}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm">{value}/{max}</span>
    </div>
  );
}
