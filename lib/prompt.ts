import { colorDirection, secondaryColorDirection } from "@/lib/colors";
import { isLongName, type Draft } from "@/lib/draft";
import { vibesByIds } from "@/lib/vibes";

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
    return "The name does not suggest a specific mascot. Use symbolic imagery such as a soccer ball, motion, or the team colors rather than inventing an unrelated animal. Do not reproduce a trademarked or copyrighted character.";
  }

  const noun = singular(motif);
  return `The name suggests “${noun}” as a visual motif. Use an original ${noun}. Do not reproduce a trademarked or copyrighted character.`;
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
    [
      "You are a sports brand designer creating concept art for a youth soccer team banner that hangs on a sideline.",
      "The banner must read clearly from across the soccer field, in bright daylight, and in a phone photo.",
      "The result should feel like a real youth club identity: confident, original, memorable, and made for kids.",
      "Do not make it feel like a party decoration, a generic sports template, a stock mascot logo, or a copy of a professional sports league identity.",
    ].join("\n"),
    ["TEAM", `Team name: ${name}`, rosterLine(draft), colorBrief(draft), `Vibe: ${vibeLabels || "energetic youth soccer"}`]
      .filter(Boolean)
      .join("\n"),
    notes ? `Direction from the parent, follow this closely: ${notes}` : "",
    [
      "Create THREE distinctly different visual identity concepts for one horizontal youth soccer banner.",
      "Aspect ratio: 5:3",
      "These are concept explorations only. Do not prepare a final print file. Do not claim any image is already production-resolution.",
      "Design three identities, not three variations of one template.",
    ].join("\n"),
    [
      "Before designing, silently choose three clearly different art-direction families.",
      "Possible families: heritage athletic, modern club, hand-painted signage, 90s sports graphics, 70s rec league, editorial poster, comic action, mascot patch, surf/skate, minimal graphic, storybook illustration, street-sport, futurist, folk/handmade, cinematic.",
      "Do not show or label the chosen families unless useful.",
    ].join("\n"),
    [
      "DIVERSITY RULE",
      "Each concept must differ from the other two in at least four of these six dimensions: typography family, composition, mascot rendering style, graphic language, background treatment, and era or visual reference.",
      "If two concepts would still feel like the same template after swapping the mascot and colors, redesign one of them.",
    ].join("\n"),
    [
      "TYPOGRAPHY RULE",
      "Typography is a major part of the identity.",
      "Do not automatically default to varsity block, condensed italic sports type, or brush script.",
      "Across the three concepts, use three clearly different typography personalities, such as rounded grotesk, compressed slab, hand-painted sign lettering, geometric sans, retro bubble athletic lettering, custom angular display type, editorial oversized type, stitched or patch-inspired lettering, or playful hand-drawn lettering.",
      "Custom-draw or modify the wordmark where appropriate so it feels owned by the team rather than typed from a generic sports font.",
      isLongName(name)
        ? "The team name is long. Break it across 2–3 lines so it stays readable from across the field. Do not solve that by defaulting to condensed varsity type."
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
    [
      "BRAND RULES",
      "Prioritize the team name so it remains readable from across a soccer field.",
      `Spell the team name exactly: ${name}`,
      "You may set it in capitals if appropriate, but every word must match.",
      colorRule(draft),
      motifGuidance(name),
      "The mascot should feel confident, energetic, age-appropriate, and easy for kids to love. Never frightening, violent, sexualized, or adult.",
      "Soccer should appear naturally through a ball, a pitch, a goal, movement, field markings, or stadium context. The team name and identity lead. Soccer is the setting, not the entire concept.",
    ].join("\n"),
    [
      "CRAFT RULES",
      "Each concept should have one clear focal point, a silhouette that reads at a distance, strong contrast, a limited palette, intentional type hierarchy, and comfortable safe margins.",
      "Avoid muddy textures, overly busy backgrounds, tiny decorative details, clip art, generic stock mascot poses, duplicated visual motifs, and unnecessary shields or crests.",
      "Do not use a crest unless the selected art direction genuinely calls for one.",
    ].join("\n"),
    [
      "CONCEPT 1 — CHARACTER-LED",
      "Build the identity around the personality or movement of the mascot: action, attitude, motion, interaction with the soccer ball, or a bold character silhouette.",
      "Do not automatically use a stadium or the standard mascot-left, giant-text-right composition. Let the chosen art direction determine the layout.",
    ].join("\n"),
    [
      "CONCEPT 2 — IDENTITY-LED",
      "Build the concept around the visual identity rather than mascot action: a custom wordmark, symbol, monogram, patch, stripe system, graphic pattern, abstract mascot mark, or strong type-led composition.",
      "A crest is only one possible solution. Use more restraint and hierarchy than Concept 1.",
    ].join("\n"),
    [
      "CONCEPT 3 — ART-DIRECTION WILDCARD",
      "Choose a visual world that feels significantly different from Concepts 1 and 2: retro rec league, editorial sports poster, hand-painted sign, comic book, surf/skate, minimal club identity, folk illustration, cinematic, futuristic, storybook, vintage patch, or experimental typography.",
      "This concept should be the least predictable while still feeling usable as a real youth soccer team identity.",
    ].join("\n"),
    [
      "FINAL DIVERSITY CHECK",
      "Before rendering, confirm all three typography styles are meaningfully different, no two concepts use the same basic composition, no two mascots are rendered in the same illustration style, and no two concepts rely on the same sports-logo formula.",
      "Confirm the team name is spelled correctly. Check paws, hands, limbs, duplicated parts, and soccer-ball geometry.",
      "Show all three concepts together in one image so they can be compared.",
    ].join("\n"),
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
