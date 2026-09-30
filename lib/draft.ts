import { isProfane } from "@/lib/profanity";

export type CreateStep = "team" | "vibe";

export type Roster = "boys" | "girls";

export type ConceptChoice = 1 | 2 | 3;

export type FlowStep = "create" | "prompt" | "guide" | "finalize" | "print";

export type Draft = {
  teamName: string;
  roster: Roster | "";
  colorId: string;
  customHex: string;
  secondaryColorId: string;
  secondaryCustomHex: string;
  vibes: string[];
  notes: string;
  concept: ConceptChoice | "";
  createStep: CreateStep;
  furthest: FlowStep;
  updatedAt: number;
};

const FLOW_ORDER: FlowStep[] = ["create", "prompt", "guide", "finalize", "print"];

export function emptyDraft(): Draft {
  return {
    teamName: "",
    roster: "",
    colorId: "",
    customHex: "#0F766E",
    secondaryColorId: "",
    secondaryCustomHex: "#111214",
    vibes: [],
    notes: "",
    concept: "",
    createStep: "team",
    furthest: "create",
    updatedAt: 0,
  };
}

export function hasColor(draft: Pick<Draft, "colorId">): boolean {
  return draft.colorId !== "";
}

export function hasRoster(draft: Pick<Draft, "roster">): boolean {
  return draft.roster === "boys" || draft.roster === "girls";
}

export function isBriefComplete(draft: Draft): boolean {
  return (
    draft.teamName.trim().length > 0 &&
    !isProfane(draft.teamName) &&
    hasRoster(draft) &&
    hasColor(draft) &&
    draft.vibes.length > 0
  );
}

export function hasResume(draft: Draft): boolean {
  return draft.teamName.trim().length > 0;
}

export function furtherStep(current: FlowStep, next: FlowStep): FlowStep {
  return FLOW_ORDER.indexOf(next) > FLOW_ORDER.indexOf(current) ? next : current;
}

export function resumeHref(draft: Draft): string {
  if (!isBriefComplete(draft) || draft.furthest === "create") return "/create";
  if (draft.furthest === "prompt" || draft.furthest === "guide" || draft.furthest === "finalize") return "/prompt";
  return "/print";
}

export function isLongName(name: string): boolean {
  return name.trim().length > 24;
}
