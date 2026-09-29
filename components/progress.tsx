"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { StepNumber } from "@/components/step-number";
import { hasColor, hasRoster, isBriefComplete } from "@/lib/draft";
import { isProfane } from "@/lib/profanity";

const STEPS = [
  { id: "team", label: "Your team" },
  { id: "vibe", label: "Your vibe" },
  { id: "prompt", label: "Copy to ChatGPT" },
  { id: "finalize", label: "Finalize" },
  { id: "print", label: "Print" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

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
    router.push(id === "prompt" ? "/prompt" : id === "finalize" ? "/finalize" : "/print");
  }

  return (
    <nav aria-label="Progress" className="mt-6 min-w-0">
      <ol className="grid w-full grid-cols-5 gap-1 sm:gap-3">
        {STEPS.map((item, index) => {
          const here = index === current;
          const clickable = canOpen(item.id, place, nameReady, colored, hasRoster(draft), briefComplete, draft.furthest);
          const tone = here ? "current" : index < current || clickable ? "open" : "locked";

          return (
            <li key={item.id} className="min-w-0">
              <button
                type="button"
                disabled={!clickable}
                aria-current={here ? "step" : undefined}
                onClick={() => open(item.id)}
                className="flex w-full min-w-0 cursor-pointer flex-col items-center gap-1.5 bg-transparent p-0 text-center font-inherit disabled:cursor-default disabled:opacity-100"
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
  if (pathname.startsWith("/prompt")) return "prompt";
  if (pathname.startsWith("/print")) return "print";
  if (pathname.startsWith("/finalize")) return "finalize";
  return createStep;
}

function canOpen(id: StepId, place: StepId, nameReady: boolean, colored: boolean, rosterReady: boolean, briefComplete: boolean, furthest: string): boolean {
  if (id === place) return false;
  if (id === "team") return true;
  if (id === "vibe") return nameReady && colored && rosterReady;
  if (id === "prompt") return briefComplete;
  const reachedFinalize = furthest === "guide" || furthest === "finalize" || furthest === "print";
  if (id === "finalize") return reachedFinalize;
  return furthest === "print";
}
