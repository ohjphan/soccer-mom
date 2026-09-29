import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { primaryClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Banner Duty is a soccer banner tool for AYSO parents, made by a soccer mom on banner duty.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-16">
        <h1 className="mt-8 font-display text-4xl leading-tight tracking-tight sm:mt-14 sm:text-6xl">About</h1>
        <div className="mt-4 max-w-2xl space-y-4 text-lg leading-8">
          <p>Banner Duty is a soccer banner tool for AYSO parents. A soccer mom made it because she landed on banner duty for her son.</p>
          <p>
            It is free. A parent enters the team name, picks a color, chooses a vibe, and gets a prompt for a banner the team can feel proud of on the sideline.
          </p>
          <p>
            This is her second year on banner duty. Somewhere between snacks, carpools, laundry, and the rest of the week, she got serious about it. Passionate, a little intense, and determined that her son&apos;s team banner should feel that way too.
          </p>
          <p>When the banner looks sharp, the kids notice. They stand taller. They feel like a real team. Pride and confidence show up before the first whistle.</p>
          <p>
            Most parents already have a hundred things on their mind. Designing a banner shouldn&apos;t be one more spiral of open tabs and &ldquo;does this look okay?&rdquo; So she built Banner Duty. Enter the team name, pick a color, choose a vibe, and copy a prompt into ChatGPT. From there it&apos;s download, print, and hang it on the sideline.
          </p>
        </div>
        <Link href="/create" className={`${primaryClass} mt-12 sm:w-auto sm:px-8`}>
          Design it — it&apos;s free
        </Link>
      </main>
    </>
  );
}
