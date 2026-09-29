import { colorDirection, secondaryColorDirection } from "@/lib/colors";
import { isLongName, type Draft } from "@/lib/draft";
import { vibesByIds, type Vibe } from "@/lib/vibes";

const SKIP_WORDS = new Set([
  "fc",
  "sc",
  "ac",
  "cf",
  "united",
  "city",
  "town",
  "club",
  "athletic",
  "athletics",
  "soccer",
  "football",
  "team",
  "the",
  "of",
  "and",
  "youth",
  "junior",
  "juniors",
  "jr",
  "jrs",
  "elite",
  "select",
  "premier",
  "academy",
  "boys",
  "girls",
  "coed",
  "little",
  "big",
]);

const COLOR_WORDS = new Set([
  "green",
  "blue",
  "red",
  "gold",
  "silver",
  "white",
  "black",
  "orange",
  "purple",
  "yellow",
  "teal",
  "navy",
  "pink",
]);

const TRADEMARKS = [
  "bulbasaur",
  "pikachu",
  "pokemon",
  "charizard",
  "mario",
  "luigi",
  "sonic",
  "disney",
  "elsa",
  "frozen",
  "spiderman",
  "batman",
  "superman",
  "minion",
  "barbie",
  "naruto",
  "goku",
  "mickey",
  "minecraft",
  "roblox",
  "fortnite",
];

function teamWords(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean);
}

function singular(word: string): string {
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 4) return word.slice(0, -1);
  return word;
}

function mentionsTrademark(words: string[]): boolean {
  return words.some((word) => TRADEMARKS.some((mark) => word === mark || word.startsWith(mark)));
}

export function motifGuidance(teamName: string): string {
  const words = teamWords(teamName);
  const trademarked = mentionsTrademark(words);
  const motif = [...words]
    .reverse()
    .find((word) => !SKIP_WORDS.has(word) && !COLOR_WORDS.has(word) && word.length > 2 && !/^u\d+$/.test(word));

  if (trademarked) {
    const mentioned = words.find((word) => TRADEMARKS.some((mark) => word.startsWith(mark))) ?? "that name";
    return `The team name includes “${mentioned}”. Treat that only as inspiration for an original design. Do not reproduce a trademarked or copyrighted character, and do not imply the team owns that character.`;
  }

  if (!motif) {
    return "The name does not suggest a specific mascot. Use symbolic imagery such as a soccer ball, a crest, motion, or the team colors rather than inventing an unrelated animal. Do not reproduce a trademarked or copyrighted character.";
  }

  const noun = singular(motif);
  return `The name suggests “${noun}” as a visual motif. Use an original ${noun}. Do not reproduce a trademarked or copyrighted character.`;
}

function vibeDirection(vibes: Vibe[]): string {
  const lines = vibes.map(
    (vibe) => `- ${vibe.label}: look ${vibe.visual}. Mascot should be ${vibe.mascot}. Typography should be ${vibe.type}.`,
  );
  return ["Style direction from the selected vibes:", ...lines].join("\n");
}

function typographyRules(name: string): string {
  const lines = [
    "Prioritize the team name so it remains readable from across a soccer field.",
    `Spell the team name exactly as written here: ${name}. You may set it in athletic capitals, but every word must match.`,
  ];
  if (isLongName(name)) {
    lines.push(
      "The team name is long. Favor condensed athletic typography and break it across 2–3 lines so it stays readable.",
    );
  }
  return lines.join(" ");
}

function rosterLine(draft: Draft): string {
  if (draft.roster !== "boys" && draft.roster !== "girls") return "";
  const word = draft.roster === "boys" ? "Boys" : "Girls";
  return `Roster: ${word}. This is a ${word.toLowerCase()} youth soccer team. You may include the word ${word} on the banner. Design for the kids on this team, without gender stereotypes.`;
}

function colorBrief(draft: Draft): string {
  const lines = [`Primary team color: ${colorDirection(draft)}`];
  const secondary = secondaryColorDirection(draft);
  if (secondary) lines.push(`Secondary team color: ${secondary}`);
  return lines.join("\n");
}

function colorRule(draft: Draft): string {
  if (!draft.secondaryColorId) {
    return "The team color is dominant. Support it with black, white, or a neutral. Do not invent a second team color.";
  }
  return "The primary color is dominant. Use the secondary color as a clear supporting hit in the mascot, lettering, or a stripe. Neutrals can do the rest. Do not add extra team colors.";
}

export function buildConceptPrompt(draft: Draft): string {
  const name = draft.teamName.trim();
  const vibes = vibesByIds(draft.vibes);
  const vibeLabels = vibes.map((vibe) => vibe.label.toLowerCase()).join(", ");
  const notes = draft.notes.trim();

  const sections = [
    "You are a sports brand designer. Create concept art for a youth soccer team banner that hangs on a sideline. It has to read from across the field, in daylight, and in a phone photo. Make it feel like a club identity: confident, original, and made for kids. Not a party decoration, and not a copy of a pro league brand.",
    [`Team name: ${name}`, rosterLine(draft), colorBrief(draft), `Vibe: ${vibeLabels || "energetic youth soccer"}`]
      .filter(Boolean)
      .join("\n"),
    "Create THREE distinctly different concepts for one horizontal banner, aspect ratio 5:3. These are explorations to compare. Do not prepare a final print file, and do not claim any image is already production-resolution.",
    [
      "Brand rules:",
      typographyRules(name),
      colorRule(draft),
      motifGuidance(name),
      "The mascot should feel powerful and confident, and still welcome to kids. Never frightening, violent, or adult.",
      "Soccer belongs in the design through a ball, a pitch, a stadium, or motion. The name and mascot lead. The sport is the setting.",
    ].join("\n"),
    vibes.length > 0 ? vibeDirection(vibes) : "",
    notes ? `Direction from the parent, follow this closely: ${notes}` : "",
    [
      "Craft:",
      "One focal point. A silhouette that reads at a distance. A limited palette. Athletic typography with real weight and spacing.",
      "Do not use clip art, a generic stock mascot, muddy textures, or three layouts that are the same idea with small changes.",
      "Before you finish, check paws, hands, limbs, duplicated parts, soccer-ball geometry, and the spelling of the team name.",
    ].join("\n"),
    [
      "Concept 1 — Action",
      "The mascot is in the play: striking, chasing, or controlling the ball. Show movement and a pitch or stadium. Let the vibe come through the action.",
    ].join("\n"),
    [
      "Concept 2 — Crest",
      "A badge or crest with a strong mascot mark and a clear type hierarchy. More restraint, more open space, still this team.",
    ].join("\n"),
    [
      "Concept 3 — Wildcard",
      "A third direction: cinematic, illustrative, typographic, or retro. It must still be this name, these colors, and this team, and it must not resemble the first two.",
    ].join("\n"),
    "Show all three concepts together in one image so they can be compared side by side.",
  ];

  return sections.filter(Boolean).join("\n\n");
}

export function buildFinalizePrompt(draft: Draft): string {
  const name = draft.teamName.trim();
  const sections = [
    "Use this exact approved banner design as the basis for the final artwork.",
    "Do not redesign the concept or introduce a new creative direction.",
    [`Team name, spelled exactly: ${name}`, rosterLine(draft), colorBrief(draft), colorRule(draft)]
      .filter(Boolean)
      .join("\n"),
    "Prepare the artwork for a horizontal 5 ft × 3 ft soccer banner.",
    "Final aspect ratio: 5:3",
    "Keep the team name highly legible and preserve the approved colors, mascot, composition, typography, and overall visual direction.",
    "Ensure important text and mascot details have comfortable safe margins from the edges.",
    isLongName(name)
      ? "The team name is long. Keep the condensed athletic typography and the 2–3 line break from the approved design."
      : "",
    "Generate the highest-quality master artwork you can. This master is the approved design at the best resolution you can produce. Do not claim the image file itself is already 6000 × 3600 pixels.",
    "The final production target, handled as a separate print file, is a 6000 × 3600 px PNG. That size is about 100 PPI at 60 × 36 inches.",
    "Before considering the artwork final, check for common image errors: malformed hands, paws, claws, or limbs; duplicated elements; broken soccer-ball geometry; and misspelled typography. The team name must match the spelling above.",
  ];

  return sections.filter(Boolean).join("\n\n");
}
