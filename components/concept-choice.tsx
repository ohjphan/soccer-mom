"use client";

import type { ConceptChoice } from "@/lib/draft";

const OPTIONS = [1, 2, 3] as const;

export function ConceptChoiceField({
  value,
  onChange,
}: {
  value: ConceptChoice | "";
  onChange: (concept: ConceptChoice) => void;
}) {
  return (
    <fieldset aria-label="Select concept">
      <div className="flex gap-2">
        {OPTIONS.map((option) => {
          const pressed = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(option)}
              className={`inline-flex h-12 w-12 items-center justify-center border-2 text-base font-semibold ${
                pressed ? "border-foreground bg-foreground text-white" : "border-foreground bg-card text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
