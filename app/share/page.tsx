import type { Metadata } from "next";
import { ShareForm } from "@/components/share-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Share your banner",
};

export default function SharePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-8 pb-16 sm:pt-14">
      <SiteHeader />
      <h1 className="mt-8 font-display text-4xl leading-tight tracking-tight sm:mt-14 sm:text-6xl">Share your banner</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">If it fits, I&apos;ll add it to the gallery.</p>
      <ShareForm />
    </main>
  );
}
