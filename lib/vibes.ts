export const VIBES = [
  { id: "bold", label: "Bold", communicates: "big shapes, strong type, high contrast" },
  { id: "fierce", label: "Fierce", communicates: "attitude, intensity, competitive energy" },
  { id: "fast", label: "Fast", communicates: "speed, motion, directional graphics" },
  { id: "dynamic", label: "Dynamic", communicates: "movement, action, energetic composition" },
  { id: "sharp", label: "Sharp", communicates: "angular, precise, crisp" },
  { id: "epic", label: "Epic", communicates: "larger-than-life, heroic scale" },
  { id: "playful", label: "Playful", communicates: "quirky, energetic, unexpected" },
  { id: "friendly", label: "Friendly", communicates: "approachable, warm, lovable" },
  { id: "cheeky", label: "Cheeky", communicates: "mischievous, personality-driven" },
  { id: "magical", label: "Magical", communicates: "imaginative, whimsical, fantastical" },
  { id: "cool", label: "Cool", communicates: "effortless, contemporary, understated" },
  { id: "clean", label: "Clean", communicates: "simple, restrained, uncluttered" },
  { id: "minimal", label: "Minimal", communicates: "fewer elements, graphic simplicity" },
  { id: "classic", label: "Classic", communicates: "timeless, established, athletic" },
  { id: "retro", label: "Retro", communicates: "nostalgic, vintage sports character" },
  { id: "modern", label: "Modern", communicates: "contemporary club/design language" },
  { id: "artistic", label: "Artistic", communicates: "expressive, illustrative, unconventional" },
  { id: "handmade", label: "Handmade", communicates: "imperfect, tactile, human" },
  { id: "edgy", label: "Edgy", communicates: "unconventional, rebellious, less polished" },
  { id: "clever", label: "Clever", communicates: "visual wit, conceptual ideas, wordplay" },
  { id: "scrappy", label: "Scrappy", communicates: "underdog energy, rough-around-the-edges" },
  { id: "proud", label: "Proud", communicates: "confident, communal, team-first" },
  { id: "quirky", label: "Quirky", communicates: "unusual, charming, unexpected" },
  { id: "dreamy", label: "Dreamy", communicates: "soft, imaginative, atmospheric" },
] as const;

export type VibeId = (typeof VIBES)[number]["id"];
export type Vibe = (typeof VIBES)[number];

const VIBE_IDS = new Set<string>(VIBES.map((vibe) => vibe.id));

export function isVibeId(value: string): value is VibeId {
  return VIBE_IDS.has(value);
}

export function vibesByIds(ids: string[]): Vibe[] {
  return ids.flatMap((id) => {
    const vibe = VIBES.find((item) => item.id === id);
    return vibe ? [vibe] : [];
  });
}

export function toggleVibe(current: string[], id: string): string[] {
  if (!isVibeId(id)) return current;
  if (current.includes(id)) return current.filter((item) => item !== id);
  if (current.length >= 3) return current;
  return [...current, id];
}
