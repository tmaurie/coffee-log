"use client";
import {Coffee} from "lucide-react";

export default function StarRating({
  value,
  onChangeAction,
  max = 5,
  size = 20,
}: {
  value: number;
  onChangeAction: (n: number) => void;
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
            onClick={() => onChangeAction(n)}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            className="p-0.5 cursor-pointer transition-transform duration-150 active:scale-50"
          >
            <Coffee
              className={`h-${size} w-${size} ${active ? "text-amber-500 fill-amber-100" : "text-gray-500"}`}
              width={size}
              height={size}
            />
          </button>
        );
      })}
      <span className="text-sm ml-2 text-gray-100">
        {
          ["😞 Mauvais", "😐 Passable", "🙂 Bon", "😊 Très bon", "😍 Parfait"][
            Math.min(value - 1, 4)
          ]
        }
      </span>
    </div>
  );
}
