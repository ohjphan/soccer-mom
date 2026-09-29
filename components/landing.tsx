"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { useNamePlaceholder } from "@/components/name-placeholder";
import { SiteHeader } from "@/components/site-header";
import { primaryClass } from "@/components/ui";
import { hasResume, resumeHref } from "@/lib/draft";
import { isProfane } from "@/lib/profanity";

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
      {showResume ? (
        <aside className="w-full bg-[#141210] text-[#C8FF4A]">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-2">
            <p className="min-w-0 flex-1 text-sm font-semibold leading-tight">
              Continue your {draft.teamName.trim()} banner?
            </p>
            <Link href={resumeHref(draft)} className="shrink-0 text-sm font-bold underline decoration-[#C8FF4A]/50 underline-offset-4 hover:decoration-[#C8FF4A]">
              Continue
            </Link>
            <button
              type="button"
              className="shrink-0 text-sm font-semibold underline decoration-[#C8FF4A]/50 underline-offset-4 hover:decoration-[#C8FF4A]"
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
      <main className={`mx-auto flex w-full max-w-6xl flex-col px-5 pb-8 sm:pb-14 ${showResume ? "pt-4 sm:pt-6" : "pt-8 sm:pt-14"}`}>
      <SiteHeader />
      <div className="mt-8 flex flex-col gap-6 md:mt-14">
        <img
          src="/hero.webp"
          alt="A young soccer player kicking a ball in front of an Emerald Dragons banner."
          width={1024}
          height={601}
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full"
        />
        <div>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Design your soccer team banner.
          </h1>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            <p>
              Pack the snacks, fill the bottles, drive to practice, do the laundry, work your 9-to-5, and remember the two other activities you signed them up for. And yet, you still said yes to the team banner.
            </p>
            <p>We&apos;ll make this part easy. You give us the name, the color, and the vibe. We hand you three concepts. You refine one and print it.</p>
          </div>
          <form
            className="mt-8"
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
            <label htmlFor="hero-team-name" className="mb-3 block font-semibold">
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
              className="h-14 w-full border-2 border-foreground bg-card px-4 text-lg text-foreground outline-none placeholder:text-muted/70"
            />
            {profane ? (
              <p id="hero-team-name-error" className="mt-4 text-base font-medium text-foreground" role="alert">
                Choose a team name you would put on a youth banner.
              </p>
            ) : null}
            <button type="submit" className={`${primaryClass} mt-4 sm:w-auto sm:px-8`} disabled={profane}>
              Design it — it&apos;s free
            </button>
            <p className="mt-3 text-sm text-muted">
              Designing it is free. You print it on your own.{" "}
              <Link href="/where-to-print" className="underline underline-offset-4 hover:text-foreground">
                I&apos;ll recommend a banner.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
    <footer className="mt-16 pb-12">
      <img
        src="/footer.webp"
        loading="lazy"
        decoding="async"
        alt="Kids playing soccer beside lion, dragon, shark, and eagle team banners."
        width={1024}
        height={455}
        className="h-auto w-full"
      />
      <p className="mt-8 px-5 text-center text-sm text-muted">
        Made by{" "}
        <a
          href="https://jessica.is/a-soccer-mom"
          className="underline underline-offset-4 hover:text-foreground"
        >
          jessica.is/a-soccer-mom
        </a>
      </p>
    </footer>
    </>
  );
}
