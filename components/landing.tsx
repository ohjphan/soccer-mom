"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { useNamePlaceholder } from "@/components/name-placeholder";
import { BannerAnswers } from "@/components/banner-answers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { linkType, primaryClass } from "@/components/ui";
import { hasResume, resumeHref } from "@/lib/draft";
import { gallery } from "@/lib/gallery";
import { isProfane } from "@/lib/profanity";
import { publicPath } from "@/lib/public-path";

type GalleryItem = (typeof gallery)[number];

function banner(src: GalleryItem["src"]): GalleryItem {
  const item = gallery.find((entry) => entry.src === src);
  if (!item) throw new Error(`Missing gallery image ${src}`);
  return item;
}

const heroSlots: GalleryItem[] = [
  banner("/gallery/neon-cobras.webp"),
  banner("/gallery/cosmic-comets.webp"),
  banner("/gallery/thunder-sharks.webp"),
  banner("/gallery/midnight-wolves.webp"),
  banner("/gallery/blazing-bumblebees-girls.webp"),
  banner("/gallery/red-turtles.webp"),
];
const heroSpare: GalleryItem[] = [
  banner("/gallery/magical-unicorns.webp"),
  banner("/gallery/black-magic.webp"),
  banner("/gallery/emerald-dragons.webp"),
  banner("/gallery/ice-dragons.webp"),
  banner("/gallery/little-lions.webp"),
  banner("/gallery/grasshoppers.webp"),
];

function HeroPan({ reverse = false }: { reverse?: boolean }) {
  const items = [...heroSlots, ...heroSpare];
  const row = reverse ? [...items.slice(items.length / 2), ...items.slice(0, items.length / 2)] : items;

  return (
    <div className="hero-pan overflow-hidden" aria-hidden="true">
      <div className={`hero-pan-track flex w-max ${reverse ? "hero-pan-track-reverse" : ""}`}>
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-3 pr-3">
            {row.map((item) => (
              <img
                key={`${setIndex}-${item.src}`}
                src={publicPath(item.src)}
                alt=""
                width={item.width}
                height={item.height}
                className="h-36 w-auto max-w-none sm:h-44 md:h-52"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Landing() {
  const { draft, ready, hydrate, reset, update } = useDraft();
  const router = useRouter();
  const namePlaceholder = useNamePlaceholder();
  const showResume = ready && hasResume(draft);
  const profane = isProfane(draft.teamName);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <SiteHeader />
      {showResume ? (
        <aside className="w-full bg-[#141210] text-[#C8FF4A]">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-2">
            <p className="min-w-0 flex-1 text-sm font-semibold leading-tight text-white">
              Continue your {draft.teamName.trim()} banner?
            </p>
            <Link href={resumeHref(draft)} className={`inline-flex min-h-11 shrink-0 items-center underline decoration-[#C8FF4A]/50 underline-offset-4 hover:decoration-[#C8FF4A] ${linkType}`}>
              Continue
            </Link>
            <button
              type="button"
              className={`inline-flex min-h-11 shrink-0 items-center underline decoration-[#C8FF4A]/50 underline-offset-4 hover:decoration-[#C8FF4A] ${linkType}`}
              onClick={() => {
                reset();
                router.push("/create");
              }}
            >
              Start over
            </button>
          </div>
        </aside>
      ) : null}
      <main>
        <section className="relative mt-4">
          <HeroPan />
          <div className="relative z-10 mx-auto w-full max-w-xl bg-background px-5 py-8 text-center md:max-w-5xl md:px-6 md:py-10">
          <h1 className="font-display text-xl leading-[1.05] tracking-tight text-foreground min-[360px]:text-2xl min-[390px]:text-[26px] sm:text-4xl md:text-6xl">
            Design your soccer team banner
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            You volunteered for the team banner. <i className="italic">Now what?</i> Give us the name, color, and vibe. We&apos;ll do the lifting and hand you the right prompts.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col items-center text-left"
            onSubmit={(event) => {
              event.preventDefault();
              const name = draft.teamName.trim();
              if (isProfane(name)) return;
              if (!name) {
                update({ createStep: "team" });
                router.push("/create");
                return;
              }
              update({ teamName: name, createStep: "team" });
              router.push("/create");
            }}
          >
            <label htmlFor="hero-team-name" className="mb-3 block w-full text-center font-semibold">
              Team name
            </label>
            <input
              id="hero-team-name"
              value={draft.teamName}
              onChange={(event) => update({ teamName: event.target.value })}
              placeholder={namePlaceholder}
              maxLength={80}
              autoComplete="off"
              aria-invalid={profane}
              aria-describedby={profane ? "hero-team-name-error" : undefined}
              className="h-14 w-full border-2 border-foreground bg-card px-4 text-center text-lg text-foreground outline-none placeholder:text-muted/70"
            />
            {profane ? (
              <p id="hero-team-name-error" className="mt-4 text-center text-base font-medium text-foreground" role="alert">
                Choose a team name you would put on a youth banner.
              </p>
            ) : null}
            <button type="submit" className={`${primaryClass} mx-auto mt-4 md:w-auto md:px-8`} disabled={profane}>
              Design it — it&apos;s free
            </button>
          </form>
          </div>
          <HeroPan reverse />
        </section>
        <BannerAnswers />
      </main>
      <SiteFooter />
    </>
  );
}
