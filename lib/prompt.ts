import { colorDirection, secondaryColorDirection } from "@/lib/colors";
import { isLongName, type ConceptChoice, type Draft } from "@/lib/draft";
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
  const word = draft.roster === "boys" ? "boys" : "girls";
  return [
    `This is a ${word} youth soccer team.`,
    "Use this only as context for the image.",
    "Do not add a gender word to the banner unless it is already part of the team name.",
  ].join("\n");
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

function selectedConcept(concept: ConceptChoice): string {
  const place =
    concept === 1
      ? "the left one when the three sit in a row, or the top one when they are stacked"
      : concept === 2
        ? "the center one when the three sit in a row, or the middle one when they are stacked"
        : "the right one when the three sit in a row, or the bottom one when they are stacked";
  return [
    "The previous image shows three banner concepts.",
    "They may sit side by side, or they may be stacked from top to bottom.",
    `Use concept ${concept} only, ${place}.`,
    "Do not use the other two concepts.",
    "That selected concept is the approved design.",
  ].join("\n");
}

export function buildConceptPrompt(draft: Draft): string {
  const name = draft.teamName.trim();
  const vibes = vibesByIds(draft.vibes);
  const vibeBlock = vibes.length
    ? vibes.map((vibe) => `- ${vibe.label} — ${vibe.communicates}`).join("\n")
    : "not specified";
  const notes = draft.notes.trim();
  const secondary = secondaryColorDirection(draft) || "none";
  const roster = draft.roster === "boys" || draft.roster === "girls" ? draft.roster : "not specified";

  return `# CREATE A NEW IMAGE FROM SCRATCH

This is a TEXT-TO-IMAGE generation request.

Do not edit, transform, or reference an existing image.
Do not request a reference image, upload, blank canvas, template, or previous concept.

Generate ONE brand-new image containing THREE distinctly different concept explorations shown side by side.

---

# ROLE

You are an experienced sports brand designer and illustrator creating concept art for a real youth soccer team banner that will hang on the sideline.

Think like a creative director, not a logo generator.

The banner must read clearly:

- from across a soccer field
- in bright daylight
- in a phone photo
- amid the visual noise of a real game

The result should feel like a real youth club identity:

- confident
- original
- memorable
- age-appropriate
- specific to this team
- intentionally designed

It should feel DESIGNED, not GENERATED.

Do NOT make it feel like:

- a party decoration
- a generic sports template
- a stock mascot logo
- an esports logo
- AI-generated sports art
- a copy of a professional sports league identity

---

# TEAM

Team name: ${name}

Roster context: ${roster}

Use roster information only as context for the design.

Do not add a gender word to the banner unless it is already part of the team name or explicitly requested.

Primary team color: ${colorDirection(draft)}

Secondary team color: ${secondary}

Vibe:
${vibeBlock}
${notes ? `\nOptional parent direction:\n${notes}\n` : ""}
---

# ASSIGNMENT

Create THREE distinctly different visual identities for this youth soccer team.

Each identity will be applied to a horizontal 5:3 soccer banner.

These are CONCEPT EXPLORATIONS ONLY.

Do not prepare a final print file.
Do not present the artwork as production-ready.

Design THREE identities — not three variations of one design.

Imagine three talented designers were independently given the same brief.

Their solutions should feel genuinely different in:

- creative idea
- typography
- composition
- illustration style
- visual references
- graphic language
- level of restraint
- overall personality

Do not simply change:

- the mascot pose
- the font
- the background
- decorative effects

The underlying idea must change.

---

# THINK SPECIFICALLY ABOUT THIS TEAM

Before designing, consider the actual:

- team name
- team colors
- selected vibes
- roster context
- parent direction

Ask internally:

What makes THIS team visually interesting?

What is the obvious interpretation?

What are two less-obvious interpretations?

What visual ideas could come from:

- the meaning of the team name
- movement
- behavior
- silhouette
- pattern
- texture
- symbolism
- habitat
- objects
- word associations
- visual metaphor
- personality
- cultural or historical references
- typography itself

Do not automatically choose the most literal interpretation.

For example, a team named after an animal does not automatically require a large illustrated animal mascot.

The name could instead inspire:

- movement
- pattern
- typography
- silhouette
- behavior
- environment
- symbolism
- wordplay
- an abstract graphic device

At least ONE of the three concepts must take a less-obvious interpretation of the team name or vibe.

The unexpected idea should still feel clear, intentional, kid-appropriate, and traceable back to the brief.

---

# CHOOSE THREE CREATIVE STRATEGIES

Before rendering, silently choose THREE distinctly different identity strategies that best fit THIS team.

Possible strategies include:

- character-led
- typography-led
- illustration-led
- symbol-led
- pattern-led
- object-led
- hand-lettered
- scene-led
- badge-led
- abstract graphic
- heritage / archival
- editorial
- folk / handmade
- experimental typography
- graphic storytelling
- photographic-inspired graphic treatment
- printmaking
- signage-inspired
- patch-inspired

These are possibilities, NOT required categories.

Do NOT automatically choose the same three strategies every time.

Do NOT automatically create:

1. mascot logo
2. crest
3. action illustration

A mascot is NOT required.

A crest is NOT required.

A soccer ball is NOT required in every concept.

Choose the three approaches that create the strongest and most distinct interpretations of THIS team.

---

# CHOOSE THREE DIFFERENT VISUAL WORLDS

Silently pair each concept with a different visual tradition or art-direction family.

Possible territories include:

- heritage athletic
- modern independent club
- hand-painted signage
- 90s sports graphics
- 70s rec league
- editorial poster
- comic illustration
- embroidered patch
- surf / skate
- minimal graphic
- storybook illustration
- street-sport
- folk / handmade
- printmaking
- vintage sporting goods
- archival community sports
- playful contemporary illustration
- experimental typography
- children's publishing
- vernacular signage
- modernist poster design
- screen-printed apparel
- local club ephemera

These are inspiration territories, not templates.

Choose directions based on the specific team.

Do not select the same visual worlds every time.

Avoid relying on cinematic rendering or visual effects as a substitute for a strong graphic idea.

---

# AUTHENTICITY + HUMAN CRAFT

The artwork should feel intentionally created by a real graphic designer or illustrator.

Favor AUTHORED DESIGN over visual spectacle.

Look toward the authenticity of:

- independent sports branding
- vintage youth and rec-league graphics
- screen-printed team apparel
- hand-painted athletic signage
- editorial illustration
- old sporting-goods graphics
- patches and embroidered ephemera
- skate and surf graphics
- community club identities
- handmade printmaking
- children's book illustration
- locally designed team merchandise

When appropriate, allow evidence of human craft:

- imperfect linework
- irregular shapes
- slightly uneven lettering
- hand-drawn marks
- simplified forms
- natural asymmetry
- restrained ink texture
- print texture
- imperfect registration
- screen-print character
- unusual cropping
- charming illustration quirks

These qualities should feel intentional, not messy.

Do not make every surface perfectly polished.

A simpler, more opinionated graphic idea is better than an impressive but generic rendering.

---

# AVOID THE "AI SPORTS ART" LOOK

Avoid:

- glossy 3D mascots
- hyper-detailed fur
- hyper-detailed feathers
- hyper-detailed scales
- exaggerated muscles
- dramatic rim lighting
- excessive glow
- smoke
- sparks
- lightning
- flames used only for drama
- energy trails
- lens flare
- arbitrary particles
- unnecessary depth effects
- overly smooth gradients
- fake metallic treatments
- chrome
- excessive highlights
- excessive shadows
- hyper-rendered environments
- symmetrical esports-logo compositions
- generic aggressive mascot poses
- fake intensity
- cinematic effects added merely to make the design feel "epic"

Do not confuse more rendering with better design.

The result should feel plausible as something a talented independent designer could actually have made for a real neighborhood youth soccer team.

---

# DIVERSITY RULE

The three concepts must differ substantially.

Each concept must differ from the other two in at least FOUR of these SIX dimensions:

1. typography family
2. fundamental composition
3. illustration or mascot treatment
4. graphic language
5. background treatment
6. era / visual tradition

No two concepts may use the same fundamental composition.

If two concepts would still look essentially the same after swapping:

- the colors
- the mascot
- the team name

then redesign one.

Also vary:

- visual density
- focal scale
- negative space
- symmetry vs. asymmetry
- illustration-to-type ratio

Do not make all three concepts equally busy.

One may be minimal.
One may be expressive.
One may be more illustrative.

The specific combination should be chosen based on the team.

---

# TYPOGRAPHY

Typography is a major part of the identity.

Do not automatically default to:

- varsity block
- condensed italic sports type
- brush script

Across the three concepts, use THREE meaningfully different typographic personalities.

Possible approaches include:

- rounded grotesk
- compressed slab
- hand-painted sign lettering
- geometric sans
- retro bubble lettering
- custom angular display lettering
- oversized editorial typography
- stitched or patch-inspired lettering
- playful hand-drawn lettering
- irregular vernacular lettering
- chunky 70s display type
- understated modern typography
- serif display lettering
- monospaced or technical lettering
- custom modular lettering

Treat the team name as a custom wordmark whenever appropriate.

The lettering should feel owned by this team rather than typed into a generic sports font.

---

# BRAND RULES

The TEAM NAME is the hero.

Prioritize readability from across a soccer field.

Spell the team name exactly:

${name}

You may change capitalization when appropriate, but every word must remain correct.

Use the primary team color as the dominant color.

Use the secondary color only as a supporting color.

Black, white, cream, gray, or other appropriate neutrals may be used.

Do not invent unrelated team colors.

If the team name suggests a mascot, character, object, or visual motif, interpret it originally.

Do not reproduce or strongly resemble copyrighted or trademarked characters.

---

# CHARACTERS + MASCOTS

If a character or mascot is appropriate to a chosen concept, it should feel:

- confident
- energetic
- age-appropriate
- memorable
- easy for kids to love
- specific to this identity

It does NOT need to look aggressive.

Avoid generic:

- roaring
- snarling
- flexing
- charging-at-camera
- clenched-fist
- "extreme sports mascot"

poses unless there is a strong conceptual reason.

Personality is more valuable than aggression.

Never make the character:

- frightening
- violent
- sexualized
- adult

---

# SOCCER

Soccer should appear naturally when it strengthens the identity.

Possible cues include:

- soccer ball
- pitch markings
- goal geometry
- movement
- jersey details
- field geometry
- match-day ephemera
- scorecard references
- pennants
- sideline markings
- stitching
- formation diagrams

Do not force soccer imagery into every concept.

The TEAM IDENTITY should lead.

Soccer is the context, not the entire concept.

---

# CRAFT

Each concept should have:

- one clear focal idea
- a strong silhouette
- strong contrast
- a limited palette
- intentional hierarchy
- comfortable safe space around important elements
- readable typography
- a memorable visual hook

Avoid:

- muddy textures
- overly busy backgrounds
- tiny decorative details
- clip art
- generic stock mascot poses
- duplicated visual motifs
- unnecessary shields
- unnecessary crests
- meaningless stars
- meaningless flames
- decorative elements with no conceptual purpose

Every element should earn its place.

---

# SPECIFICITY TEST

Before finalizing EACH concept, ask internally:

"Could this exact design easily be reused for ten unrelated youth teams simply by changing the mascot, name, and color?"

If YES, the concept is too generic.

Make the idea more specific to this team's:

- name
- personality
- selected vibes
- color
- visual story

Each concept should contain at least ONE memorable design decision that feels particular to this team.

---

# SURPRISE TEST

At least one concept should create a small moment of:

"I wouldn't have thought of that — but it makes sense."

Unexpected does NOT mean random.

The idea should be traceable back to the team's:

- name
- personality
- vibe
- visual story

Do not add strange elements simply to make a concept different.

---

# FINAL CREATIVE-DIRECTOR CHECK

Before rendering, inspect the three concepts as a set.

Confirm:

- all three typography styles are meaningfully different
- no two concepts use the same fundamental composition
- illustration styles are meaningfully different
- graphic languages are meaningfully different
- no two concepts rely on the same sports-logo formula
- at least one concept challenges the obvious interpretation
- none feels like a generic template with the team name swapped in
- the primary team color remains dominant
- the team name is spelled correctly
- important elements have comfortable safe margins
- hands, paws, limbs, anatomy, and soccer-ball geometry are correct where relevant
- the banners remain readable from a distance

Then imagine all three concepts converted into simple black-and-white silhouettes with the team names removed.

If they still feel structurally similar, REDESIGN the weakest concept.

Finally ask:

"Do these look like three ideas from three different designers, or three outputs from the same generator?"

If they feel like outputs from the same visual system, increase the differences before rendering.

---

# OUTPUT

Generate ONE new comparison image.

Draw all THREE concepts side by side in that ONE image so they can be easily compared.

Each concept must appear as its own complete horizontal 5:3 banner.

Show the FLAT ARTWORK ITSELF.

Do NOT:

- place it on a fence
- hang it on a wall
- put it in a stadium
- add grommets
- photograph it as a physical banner
- present it as merchandise
- show people holding it
- show a print-production mockup

Use simple neutral spacing between concepts so each banner is easy to evaluate.

Do not add concept labels unless necessary.

These are concept explorations only.

Do not claim they are:

- production-resolution
- print-ready
- final artwork

Generate the three concepts now.`;
}

export function buildFinalizePrompt(draft: Draft): string {
  const name = draft.teamName.trim();
  const sections = [
    draft.concept === 1 || draft.concept === 2 || draft.concept === 3
      ? selectedConcept(draft.concept)
      : "Use this exact approved banner design as the basis for the final artwork.",
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
