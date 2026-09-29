import type { Draft } from "@/lib/draft";

export const SWATCHES = [
  { id: "red", name: "Red", hex: "#B51B2E" },
  { id: "maroon", name: "Maroon", hex: "#78123A" },
  { id: "pink", name: "Pink", hex: "#C51175" },
  { id: "purple", name: "Purple", hex: "#55246A" },
  { id: "orange", name: "Orange", hex: "#DC5D25" },
  { id: "neon", name: "Neon yellow", hex: "#F2C812" },
  { id: "yellow", name: "Yellow", hex: "#F0AF1A" },
  { id: "sand", name: "Sand", hex: "#BEAD67" },
  { id: "lime", name: "Lime", hex: "#A4BD3D" },
  { id: "green", name: "Green", hex: "#03733E" },
  { id: "forest", name: "Forest", hex: "#03472E" },
  { id: "cyan", name: "Cyan", hex: "#049CD3" },
  { id: "teal", name: "Teal", hex: "#038581" },
  { id: "sky", name: "Sky", hex: "#4294C4" },
  { id: "blue", name: "Blue", hex: "#034C90" },
  { id: "navy", name: "Navy", hex: "#11325E" },
  { id: "white", name: "White", hex: "#F4F5F6" },
  { id: "gray", name: "Gray", hex: "#ADB3B8" },
  { id: "black", name: "Black", hex: "#111214" },
] as const;

export type SwatchId = (typeof SWATCHES)[number]["id"];

const SWATCH_IDS = new Set<string>(SWATCHES.map((swatch) => swatch.id));

export function isSwatchId(value: string): value is SwatchId {
  return SWATCH_IDS.has(value);
}

export function swatchById(id: string) {
  return SWATCHES.find((swatch) => swatch.id === id);
}

export function colorHex(draft: Pick<Draft, "colorId" | "customHex">): string {
  if (draft.colorId === "custom") return draft.customHex;
  return swatchById(draft.colorId)?.hex ?? "#1B7A45";
}

export function colorLabel(
  draft: Pick<Draft, "colorId" | "customHex" | "secondaryColorId" | "secondaryCustomHex">,
): string {
  const swatch = swatchById(draft.colorId);
  const primary = swatch?.name || (draft.colorId === "custom" ? draft.customHex : "");
  const secondarySwatch = swatchById(draft.secondaryColorId);
  const secondary =
    secondarySwatch?.name || (draft.secondaryColorId === "custom" ? draft.secondaryCustomHex : "");
  if (primary && secondary) return `${primary} / ${secondary}`;
  return primary;
}

export function secondaryColorDirection(
  draft: Pick<Draft, "secondaryColorId" | "secondaryCustomHex">,
): string {
  const swatch = swatchById(draft.secondaryColorId);
  if (swatch) return `${swatch.name.toLowerCase()} (${swatch.hex})`;
  if (draft.secondaryColorId === "custom") return `custom shade ${draft.secondaryCustomHex}`;
  return "";
}

export function colorDirection(draft: Pick<Draft, "colorId" | "customHex">): string {
  const swatch = swatchById(draft.colorId);
  if (swatch) return `${swatch.name.toLowerCase()} (${swatch.hex})`;
  if (draft.colorId === "custom") return `custom shade ${draft.customHex}`;
  return "a strong team color";
}
