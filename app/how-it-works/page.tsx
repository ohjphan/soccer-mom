import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/how-it-works";
import { SiteHeader } from "@/components/site-header";
import { primaryClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
};

export default function HowItWorksPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-8 pb-16 sm:pt-14">
      <SiteHeader />
      <h1 className="mt-8 font-display text-4xl leading-tight tracking-tight sm:mt-14 sm:text-6xl">How it works</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Five steps. You leave with a banner file you can print yourself.
      </p>
      <HowItWorks />
      <Link href="/create" className={`${primaryClass} mt-12 sm:w-auto sm:px-8`}>
        Design it — it&apos;s free
      </Link>
    </main>
  );
}
