"use client";
import React, { useRef, useState } from "react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"; // ou remplace par une simple concat

type TagInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

export default function TagInput({
  value,
  onChange,
  placeholder = "Ajoutez un tag et tapez Entrée…",
  maxTags,
}: TagInputProps) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    if (maxTags && value.length >= maxTags) return;
    if (value.includes(t)) return; // no dup
    onChange([...value, t]);
    setDraft("");
  };

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      addTag(draft.charAt(0).toUpperCase() + draft.slice(1)); // majuscule
    } else if (e.key === "Backspace" && !draft && value.length) {
      // backspace sur input vide -> supprime le dernier tag
      onChange(value.slice(0, -1));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (text.includes(",") || text.includes("\n")) {
      e.preventDefault();
      const parts = text
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
      const unique = Array.from(new Set([...value, ...parts]));
      onChange(unique);
      setDraft("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDraft(e.target.value)
          }
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => addTag(draft)}
          placeholder={placeholder}
        />
        {value.map((tag) => (
          <Badge key={tag}>
            {tag}
            <button
              type="button"
              aria-label={`Supprimer ${tag}`}
              onClick={() => removeTag(tag)}
              className="hover:text-amber-600"
            >
              <Trash className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
