"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { useNamePlaceholder } from "@/components/name-placeholder";
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

const floatTiming = [
  { delay: "0s", duration: "7.2s" },
  { delay: "1.4s", duration: "8.4s" },
  { delay: "2.6s", duration: "6.6s" },
  { delay: "0.7s", duration: "9s" },
  { delay: "2s", duration: "7.6s" },
  { delay: "3.1s", duration: "8s" },
];

function HeroBanner({
  item,
  bleed,
  delay,
  duration,
}: {
  item: GalleryItem;
  bleed: string;
  delay: string;
  duration: string;
}) {
  const [shown, setShown] = useState(item);
  const [outgoing, setOutgoing] = useState<GalleryItem | null>(null);
  const shownRef = useRef(item);

  useEffect(() => {
    if (item.src === shownRef.current.src) return;
    setOutgoing(shownRef.current);
    shownRef.current = item;
    setShown(item);
    const timeout = window.setTimeout(() => setOutgoing(null), 900);
    return () => window.clearTimeout(timeout);
  }, [item]);

  return (
    <span className={`block h-[28%] shrink-0 ${bleed}`}>
      <span className="hero-float relative block h-full" style={{ animationDelay: delay, animationDuration: duration }}>
        {outgoing ? (
          <img
            src={publicPath(outgoing.src)}
            alt=""
            width={outgoing.width}
            height={outgoing.height}
            className="hero-banner-out absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <img
          src={publicPath(shown.src)}
          alt=""
          width={shown.width}
          height={shown.height}
          className={`h-full w-auto max-w-none ${outgoing ? "hero-banner-in" : ""}`}
        />
      </span>
    </span>
  );
}

function HeroPan() {
  const items = [...heroSlots, ...heroSpare];

  return (
    <div className="hero-pan overflow-hidden md:hidden" aria-hidden="true">
      <div className="hero-pan-track flex w-max">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-3 pr-3">
            {items.map((item) => (
              <img
                key={`${setIndex}-${item.src}`}
                src={publicPath(item.src)}
                alt=""
                width={item.width}
                height={item.height}
                className="h-36 w-auto max-w-none sm:h-44"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroWall() {
  const [slots, setSlots] = useState(heroSlots);
  const spare = useRef(heroSpare);
  const nextSlot = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      const incoming = spare.current[0];
      if (!incoming) return;
      const index = nextSlot.current;
      nextSlot.current = (index + 1) % slots.length;
      setSlots((current) => {
        const outgoing = current[index];
        spare.current = [...spare.current.slice(1), outgoing];
        const next = current.slice();
        next[index] = incoming;
        return next;
      });
    }, 6000);
    return () => window.clearInterval(interval);
  }, [slots.length]);

  const left = slots.slice(0, 3);
  const right = slots.slice(3);

  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] flex-col items-start justify-center gap-4 py-5 md:flex md:w-[36%]" aria-hidden="true">
        {left.map((item, index) => (
          <HeroBanner
            key={index}
            item={item}
            bleed="-translate-x-[12%] sm:-translate-x-[18%]"
            delay={floatTiming[index].delay}
            duration={floatTiming[index].duration}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] flex-col items-end justify-center gap-4 py-5 md:flex md:w-[36%]" aria-hidden="true">
        {right.map((item, index) => (
          <HeroBanner
            key={index + 3}
            item={item}
            bleed="translate-x-[12%] sm:translate-x-[18%]"
            delay={floatTiming[index + 3].delay}
            duration={floatTiming[index + 3].duration}
          />
        ))}
      </div>
    </>
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
        <section className="relative mt-4 md:flex md:min-h-[44rem] md:items-center md:overflow-hidden">
          <HeroPan />
          <HeroWall />
          <div className="relative z-10 mx-auto w-full max-w-xl bg-background px-5 py-8 text-center md:px-6 md:py-10">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Design your soccer team banner
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            You volunteered for the team banner. <i className="italic">Now what?</i> We&apos;ll do the heavy lifting. You give us the name, the color, and the vibe. We hand you three concepts. You refine one and print it.
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
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
