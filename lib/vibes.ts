export const VIBES = [
  {
    id: "dynamic",
    label: "Dynamic",
    emoji: "⚡",
    meaning: "Motion, speed, energy",
    visual: "motion, speed, and energetic movement",
    mascot: "caught mid-action, athletic and alive",
    type: "athletic lettering that suggests speed",
  },
  {
    id: "fierce",
    label: "Fierce",
    emoji: "🔥",
    meaning: "Competitive and powerful",
    visual: "a powerful stance, sharper forms, and dramatic lighting",
    mascot: "confident and formidable, but never frightening or violent",
    type: "strong angular athletic typography",
  },
  {
    id: "bold",
    label: "Bold",
    emoji: "💪",
    meaning: "Strong shapes and typography",
    visual: "strong shapes, high contrast, and commanding scale",
    mascot: "a confident graphic form with a strong silhouette",
    type: "heavy athletic lettering that reads from across a field",
  },
  {
    id: "cool",
    label: "Cool",
    emoji: "😎",
    meaning: "Confident and modern",
    visual: "confident, modern, and slightly understated",
    mascot: "poised, with a calm and self-assured expression",
    type: "sleek modern sports typography",
  },
  {
    id: "epic",
    label: "Epic",
    emoji: "🏆",
    meaning: "Big, dramatic, heroic",
    visual: "big, dramatic, and heroic scale",
    mascot: "heroic and legendary, while still welcoming to kids",
    type: "monumental sports lettering",
  },
  {
    id: "clean",
    label: "Clean",
    emoji: "✨",
    meaning: "Polished and uncluttered",
    visual: "a restrained composition with strong negative space",
    mascot: "a simplified graphic treatment",
    type: "clean modern sports typography",
  },
  {
    id: "playful",
    label: "Playful",
    emoji: "🎉",
    meaning: "Fun and kid-friendly",
    visual: "bright, energetic, and expressive",
    mascot: "friendly, spirited, and approachable",
    type: "bold rounded athletic typography",
  },
  {
    id: "friendly",
    label: "Friendly",
    emoji: "😊",
    meaning: "Approachable mascot",
    visual: "warm, open, and inviting",
    mascot: "kind and easy for kids to love",
    type: "rounded, readable athletic typography",
  },
  {
    id: "fast",
    label: "Fast",
    emoji: "🚀",
    meaning: "Speed and action",
    visual: "speed lines, forward motion, and action",
    mascot: "sprinting or striking the ball",
    type: "condensed italic sports typography",
  },
  {
    id: "sharp",
    label: "Sharp",
    emoji: "🧊",
    meaning: "Crisp, angular, energetic",
    visual: "crisp angles, clean edges, and energetic contrast",
    mascot: "angular and precise",
    type: "crisp geometric athletic typography",
  },
  {
    id: "artistic",
    label: "Artistic",
    emoji: "🎨",
    meaning: "More illustrative and expressive",
    visual: "illustrative, expressive, and painterly where it helps",
    mascot: "more illustrated and expressive",
    type: "expressive sports lettering that stays legible",
  },
  {
    id: "classic",
    label: "Classic",
    emoji: "🛡️",
    meaning: "Traditional sports-team identity",
    visual: "a traditional sports-team identity with a crest-like structure",
    mascot: "timeless, proud, and familiar",
    type: "classic varsity sports typography",
  },
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
