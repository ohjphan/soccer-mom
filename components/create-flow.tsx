"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { useNamePlaceholder } from "@/components/name-placeholder";
import { ColorPickerIcon, Loading, primaryClass } from "@/components/ui";
import { colorHex, swatchById, SWATCHES, type SwatchId } from "@/lib/colors";
import { furtherStep, hasColor, hasRoster, isBriefComplete, type Draft } from "@/lib/draft";
import { isProfane } from "@/lib/profanity";
import { toggleVibe, VIBES, vibesByIds } from "@/lib/vibes";

const COLOR_GROUPS: SwatchId[][] = [
  ["red", "maroon"],
  ["pink", "purple"],
  ["orange", "neon", "yellow", "sand"],
  ["lime", "green", "forest"],
  ["cyan", "teal", "sky", "blue", "navy"],
  ["white", "gray", "black"],
];

const fieldClass =
  "w-full border-2 border-foreground bg-card px-4 text-lg text-foreground outline-none placeholder:text-muted/70";

const VIBE_TAILS: Record<string, string> = {
  fierce: "Not scary.",
  playful: "Not too babyish.",
  friendly: "Easy for kids to love.",
  epic: "Still welcoming.",
  clean: "Leave some space.",
  dynamic: "Show the motion.",
  fast: "Show the speed.",
  bold: "Big enough to read across the field.",
  cool: "Not costume-y.",
  sharp: "Keep the name easy to read.",
  artistic: "More illustrated than a logo stamp.",
  classic: "A crest is plenty.",
};

function notesPlaceholder(draft: Draft): string {
  const name = draft.teamName.trim() || "the team";
  const swatch = swatchById(draft.colorId);
  const secondary = swatchById(draft.secondaryColorId);
  const color = joinList(
    [
      swatch?.name.toLowerCase() ?? (draft.colorId === "custom" ? draft.customHex : ""),
      secondary?.name.toLowerCase() ?? (draft.secondaryColorId === "custom" ? draft.secondaryCustomHex : ""),
    ].filter(Boolean),
  );
  const vibes = vibesByIds(draft.vibes);
  const vibeText = joinList(vibes.map((vibe) => vibe.label.toLowerCase()));
  const tail = (vibes[0] && VIBE_TAILS[vibes[0].id]) || "Add a detail, or something to leave out.";

  if (color && vibeText) return `Make the ${name} ${joinList([color, ...vibes.map((vibe) => vibe.label.toLowerCase())])}. ${tail}`;
  if (color) return `Make the ${name} ${color}. Add a detail, or something to leave out.`;
  if (vibeText) return `Make the ${name} ${vibeText}. ${tail}`;
  return `Make the ${name} banner yours. Add a detail, or something to leave out.`;
}

function ColorChoices({
  colorId,
  customHex,
  pickerLabel,
  onSwatch,
  onCustom,
  size = "primary",
}: {
  colorId: string;
  customHex: string;
  pickerLabel: string;
  onSwatch: (id: SwatchId) => void;
  onCustom: (hex: string) => void;
  size?: "primary" | "secondary";
}) {
  const picked = colorId !== "";
  const hex = picked ? colorHex({ colorId, customHex }) : customHex;
  const secondary = size === "secondary";
  const swatchClass = secondary ? "h-5 w-5" : "h-12 w-12 sm:h-14 sm:w-14";
  const hitClass = secondary ? "h-11 w-11" : swatchClass;

  return (
    <div className={`flex flex-wrap ${secondary ? "mt-4 gap-1 sm:gap-1.5" : "mt-6 gap-2.5 sm:gap-2"}`}>
      {COLOR_GROUPS.flat()
        .flatMap((id) => {
          const swatch = SWATCHES.find((item) => item.id === id);
          return swatch ? [swatch] : [];
        })
        .map((swatch) => {
          const pressed = colorId === swatch.id;
          const circle = `rounded-full border border-black/10 ${swatchClass} ${
            pressed ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
          }`;
          return (
            <button
              key={swatch.id}
              type="button"
              aria-pressed={pressed}
              aria-label={swatch.name}
              onClick={() => onSwatch(swatch.id)}
              className={
                secondary
                  ? `flex ${hitClass} items-center justify-center`
                  : circle
              }
              style={secondary ? undefined : { backgroundColor: swatch.hex }}
            >
              {secondary ? <span className={circle} style={{ backgroundColor: swatch.hex }} /> : null}
            </button>
          );
        })}
      <label className={`relative flex items-center justify-center ${secondary ? hitClass : ""}`}>
        <span
          className={`flex items-center justify-center overflow-hidden rounded-full border border-line ${swatchClass} ${
            picked ? "" : "bg-card"
          } ${picked && isDark(hex) ? "text-white" : "text-foreground"} ${
            colorId === "custom" ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
          }`}
          style={picked ? { backgroundColor: hex } : undefined}
        >
          <ColorPickerIcon className={secondary ? "h-3 w-3" : "h-6 w-6"} />
        </span>
        <input
          type="color"
          value={hex}
          aria-label={pickerLabel}
          onChange={(event) => onCustom(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}

function isDark(hex: string): boolean {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000 < 150;
}

function joinList(items: string[]): string {
  const names = items.filter(Boolean);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export function CreateFlow() {
  const { draft, ready, hydrate, update } = useDraft();
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const namePlaceholder = useNamePlaceholder();
  const [secondaryOpen, setSecondaryOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0 });
    if (draft.createStep !== "team") headingRef.current?.focus();
  }, [draft.createStep, ready]);

  if (!ready) return <Loading />;

  const name = draft.teamName.trim();
  const profane = isProfane(draft.teamName);
  const selected = vibesByIds(draft.vibes);
  const atMax = draft.vibes.length >= 3;
  const teamReady = Boolean(name) && !profane && hasRoster(draft) && hasColor(draft);
  if (draft.createStep === "team") {
    return (
      <FlowShell
        footer={
          <>
            {name && !profane ? <p className="text-center text-base break-words text-foreground">{name}</p> : null}
            <button type="submit" form="team-form" className={primaryClass} disabled={!teamReady}>
              Choose a vibe
            </button>
          </>
        }
      >
        <form
          id="team-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!teamReady) return;
            update({ teamName: name, createStep: "vibe" });
          }}
        >
          <h1
            id="team-name-heading"
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-4xl leading-tight tracking-tight"
          >
            Your team
          </h1>
          <label htmlFor="team-name" className="mt-6 block font-semibold">
            Team name
          </label>
          <input
            id="team-name"
            value={draft.teamName}
            onChange={(event) => update({ teamName: event.target.value })}
            placeholder={namePlaceholder}
            maxLength={80}
            autoComplete="off"
            autoFocus
            aria-invalid={profane}
            aria-describedby={profane ? "team-name-error" : undefined}
            className={`${fieldClass} mt-3 h-14`}
          />
          {profane ? (
            <p id="team-name-error" className="mt-4 text-base font-medium text-foreground" role="alert">
              Choose a team name you would put on a youth banner.
            </p>
          ) : null}

          <fieldset className="mt-8">
            <legend className="font-semibold">Boys or girls</legend>
            <div className="mt-3 flex gap-2">
              {(["boys", "girls"] as const).map((id) => {
                const pressed = draft.roster === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => update({ roster: id })}
                    className={`inline-flex h-12 min-w-28 items-center justify-center border-2 px-5 text-base font-semibold ${
                      pressed ? "border-foreground bg-foreground text-white" : "border-foreground bg-card text-foreground"
                    }`}
                  >
                    {id === "boys" ? "Boys" : "Girls"}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-8 font-semibold">Team color</p>
          <ColorChoices
            colorId={draft.colorId}
            customHex={draft.customHex}
            pickerLabel="Choose another color"
            onSwatch={(id) => update({ colorId: id })}
            onCustom={(hex) => update({ colorId: "custom", customHex: hex })}
          />

          <button
            type="button"
            aria-expanded={secondaryOpen}
            aria-controls="secondary-colors"
            onClick={() => setSecondaryOpen((open) => !open)}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold"
          >
            {draft.secondaryColorId && !secondaryOpen ? (
              <span
                className="h-4 w-4 rounded-full border border-black/10"
                style={{
                  backgroundColor: colorHex({
                    colorId: draft.secondaryColorId,
                    customHex: draft.secondaryCustomHex,
                  }),
                }}
              />
            ) : null}
            Add secondary color {secondaryOpen ? "–" : "+"}
          </button>
          {secondaryOpen ? (
            <div id="secondary-colors">
              <ColorChoices
                colorId={draft.secondaryColorId}
                customHex={draft.secondaryCustomHex}
                pickerLabel="Choose another secondary color"
                size="secondary"
                onSwatch={(id) => update({ secondaryColorId: draft.secondaryColorId === id ? "" : id })}
                onCustom={(hex) => update({ secondaryColorId: "custom", secondaryCustomHex: hex })}
              />
            </div>
          ) : null}
        </form>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      footer={
        <>
          {selected.length > 0 ? (
            <p className="text-center text-base text-foreground">{selected.map((vibe) => vibe.label).join(", ")}</p>
          ) : null}
          <button type="submit" form="team-vibe-form" className={primaryClass} disabled={!isBriefComplete(draft)}>
            Create my concepts
          </button>
        </>
      }
    >
      <form
        id="team-vibe-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!isBriefComplete(draft)) return;
          update((current) => ({
            notes: current.notes.trim(),
            furthest: furtherStep(current.furthest, "prompt"),
          }));
          router.push("/prompt");
        }}
      >
        <h1 ref={headingRef} tabIndex={-1} className="font-display text-4xl leading-tight tracking-tight">
          Your vibe
        </h1>
        <p className="mt-3 text-lg leading-7 text-muted">Pick up to 3.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {VIBES.map((vibe) => {
            const pressed = draft.vibes.includes(vibe.id);
            return (
              <button
                key={vibe.id}
                type="button"
                aria-pressed={pressed}
                aria-label={vibe.label}
                disabled={!pressed && atMax}
                onClick={() => update((current) => ({ vibes: toggleVibe(current.vibes, vibe.id) }))}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-base font-semibold ${
                  pressed
                    ? "border-foreground bg-foreground text-white"
                    : "border-line bg-card text-foreground disabled:opacity-40"
                }`}
              >
                {vibe.label}
              </button>
            );
          })}
        </div>
        <label htmlFor="notes" className="mt-8 block font-semibold">
          Anything else? <span className="font-normal text-muted">Optional</span>
        </label>
        <textarea
          id="notes"
          value={draft.notes}
          onChange={(event) => update({ notes: event.target.value })}
          placeholder={notesPlaceholder(draft)}
          maxLength={400}
          rows={3}
          className={`${fieldClass} mt-3 min-h-28 py-3`}
        />
      </form>
    </FlowShell>
  );
}
