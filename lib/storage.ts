import { isSwatchId } from "@/lib/colors";
import { emptyDraft, type ConceptChoice, type Draft, type FlowStep } from "@/lib/draft";
import { isVibeId } from "@/lib/vibes";

export const DRAFT_KEY = "team-banner-draft";

const FLOW_STEPS = new Set<FlowStep>(["create", "prompt", "guide", "finalize", "print"]);

function isConceptChoice(value: unknown): value is ConceptChoice {
  return value === 1 || value === 2 || value === 3;
}

function isHex(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function normalizeDraft(value: Partial<Draft> | null | undefined): Draft {
  const base = emptyDraft();
  if (!value) return base;

  const colorId =
    value.colorId === "custom" || (typeof value.colorId === "string" && isSwatchId(value.colorId))
      ? value.colorId
      : "";
  const secondaryColorId =
    value.secondaryColorId === "custom" ||
    (typeof value.secondaryColorId === "string" && isSwatchId(value.secondaryColorId))
      ? value.secondaryColorId
      : "";

  return {
    teamName: typeof value.teamName === "string" ? value.teamName.slice(0, 80) : "",
    roster: value.roster === "boys" || value.roster === "girls" ? value.roster : "",
    colorId,
    customHex: typeof value.customHex === "string" && isHex(value.customHex) ? value.customHex : base.customHex,
    secondaryColorId,
    secondaryCustomHex:
      typeof value.secondaryCustomHex === "string" && isHex(value.secondaryCustomHex)
        ? value.secondaryCustomHex
        : base.secondaryCustomHex,
    vibes: Array.isArray(value.vibes) ? value.vibes.filter(isVibeId).slice(0, 3) : [],
    notes: typeof value.notes === "string" ? value.notes.slice(0, 400) : "",
    concept: isConceptChoice(value.concept) ? value.concept : "",
    createStep: value.createStep === "vibe" ? "vibe" : "team",
    furthest: FLOW_STEPS.has(value.furthest as FlowStep) ? (value.furthest as FlowStep) : "create",
    updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0,
  };
}

export function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    if (typeof parsed.teamName !== "string") return null;
    return normalizeDraft(parsed);
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(normalizeDraft(draft)));
  } catch {
    // Private mode or a full disk should not block the flow.
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore storage failures.
  }
}
