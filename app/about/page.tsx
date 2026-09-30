import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { primaryClass } from "@/components/ui";
import { publicPath } from "@/lib/public-path";

export const metadata: Metadata = {
  title: "About",
  description: "Banner Duty is a free soccer banner design tool for parents who ended up in charge of the team banner.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-16">
        <h1 className="mt-8 font-display text-3xl leading-tight tracking-tight min-[380px]:text-4xl sm:mt-14 sm:text-6xl">About</h1>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Every team deserves a banner they&apos;re proud to stand behind.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8">
              <p>Banner Duty is a free soccer banner design tool made for parents who somehow ended up in charge of the team banner.</p>
              <p>
                Hi, I&apos;m{" "}
                <a href="https://jessica.is/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  Jessica
                </a>
                . I&apos;m a mom, product designer, and lifelong design nerd. Banner Duty started when I landed on banner duty for my son&apos;s{" "}
                <a href="https://ayso.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  AYSO
                </a>{" "}
                soccer team.
              </p>
              <p>
                He&apos;s been playing soccer since he was five, and every year, I&apos;ve gotten a little more into it. A little passionate. A little intense. Definitely a little competitive.
              </p>
              <p>
                With a background in graphic design, I was equally determined that his team banner should feel like <strong>their</strong> team, not something generic pulled from a template.
              </p>
              <p>Because the banner is more than decoration.</p>
              <p>When it looks sharp, the kids notice. They stand a little taller. They feel like a real team. The pride starts before the first whistle.</p>
              <h2 className="pt-6 font-sans text-2xl font-semibold leading-tight">Then other parents started asking for help.</h2>
              <p>I happily jumped in.</p>
              <p>A dragon here. A bumblebee there. A very specific shade of green. A team name that absolutely needed to look epic.</p>
              <p>I loved it. But I also realized most parents don&apos;t have a designer on speed dial.</p>
              <p>
                They already have a hundred things to think about: snacks, cleats, practices, schedules, carpools, uniforms, and who remembered the folding chairs.
              </p>
              <p>
                Designing a banner shouldn&apos;t become another spiral of open tabs and <i>&ldquo;Does this look okay?&rdquo;</i>
              </p>
              <p>So I made Banner Duty.</p>
              <h2 className="pt-6 font-sans text-2xl font-semibold leading-tight">Your turn.</h2>
              <p>You&apos;ve already got enough on your soccer-parent to-do list.</p>
              <p>Let&apos;s make the banner the fun part.</p>
            </div>
            <Link href="/create" className={`${primaryClass} mt-8 sm:w-auto sm:px-8`}>
              Create your team banner →
            </Link>
          </div>
          <img
            src={publicPath("/hero.webp")}
            alt="A young soccer player kicking a ball in front of an Emerald Dragons banner."
            width={1024}
            height={601}
            decoding="async"
            className="h-auto w-full"
          />
        </div>
        <section className="mt-16">
          <h2 className="text-center font-display text-2xl leading-tight tracking-tight sm:text-4xl">How it works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-muted">
            Four steps. You leave with a banner file you can print yourself.
          </p>
          <HowItWorks />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
