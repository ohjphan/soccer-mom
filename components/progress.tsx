"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { StepNumber } from "@/components/step-number";
import { hasColor, hasRoster, isBriefComplete } from "@/lib/draft";
import { isProfane } from "@/lib/profanity";

const STEPS = [
  { id: "team", label: "Your team" },
  { id: "vibe", label: "Your vibe" },
  { id: "prompt", label: "Your prompts" },
  { id: "print", label: "You're done" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const LINES = [
  "M1 8 C16 4, 34 12, 52 7 S78 4, 99 9",
  "M1 7 C18 12, 36 4, 54 9 S80 12, 99 6",
  "M1 9 C20 5, 38 12, 56 7 S82 5, 99 8",
  "M1 6 C14 11, 40 4, 60 9 S84 12, 99 7",
];

export function Progress() {
  const pathname = usePathname();
  const router = useRouter();
  const { draft, update } = useDraft();
  const place = currentPlace(pathname, draft.createStep);
  const current = STEPS.findIndex((item) => item.id === place);
  const nameReady = draft.teamName.trim().length > 0 && !isProfane(draft.teamName);
  const colored = hasColor(draft);
  const briefComplete = isBriefComplete(draft);

  function open(id: StepId) {
    if (id === "team" || id === "vibe") {
      update({ createStep: id });
      if (pathname !== "/create") router.push("/create");
      return;
    }
    router.push(id === "prompt" ? "/prompt" : "/print");
  }

  return (
    <nav aria-label="Progress" className="mt-6 min-w-0">
      <ol className="grid w-full grid-cols-4 gap-1 sm:gap-3">
        {STEPS.map((item, index) => {
          const here = index === current;
          const clickable = canOpen(item.id, place, nameReady, colored, hasRoster(draft), briefComplete, draft.furthest);
          const tone = here ? "current" : index < current || clickable ? "open" : "locked";

          return (
            <li key={item.id} className="relative min-w-0">
              {index < STEPS.length - 1 ? (
                <svg
                  viewBox="0 0 100 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-[calc(50%+1.125rem)] z-0 h-4 w-[calc(100%-2rem)] sm:w-[calc(100%-1.5rem)]"
                >
                  <path
                    d={LINES[index]}
                    fill="none"
                    stroke="#1c1917"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={LINES[(index + 2) % LINES.length]}
                    fill="none"
                    stroke="#1c1917"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeOpacity="0.4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              ) : null}
              <button
                type="button"
                disabled={!clickable}
                aria-current={here ? "step" : undefined}
                onClick={() => open(item.id)}
                className="relative z-10 flex w-full min-w-0 cursor-pointer flex-col items-center gap-1.5 bg-transparent p-0 text-center font-inherit disabled:cursor-default disabled:opacity-100"
              >
                <StepNumber n={index + 1} tone={tone} />
                <span className={`block min-h-8 w-full text-[11px] font-semibold leading-tight sm:min-h-10 sm:text-sm ${tone === "locked" ? "text-muted" : "text-foreground"}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function currentPlace(pathname: string, createStep: "team" | "vibe"): StepId {
  if (pathname.startsWith("/prompt") || pathname.startsWith("/finalize")) return "prompt";
  if (pathname.startsWith("/print")) return "print";
  return createStep;
}

function canOpen(id: StepId, place: StepId, nameReady: boolean, colored: boolean, rosterReady: boolean, briefComplete: boolean, furthest: string): boolean {
  if (id === place) return false;
  if (id === "team") return true;
  if (id === "vibe") return nameReady && colored && rosterReady;
  if (id === "prompt") return briefComplete;
  return furthest === "print";
}
