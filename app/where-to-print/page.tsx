import type { Metadata } from "next";
import { ProductPicks } from "@/components/product-picks";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Where to print",
};

export default function WhereToPrintPage() {
  return (
    <>
    <SiteHeader />
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-16">
      <h1 className="mt-8 font-display text-3xl leading-tight tracking-tight min-[380px]:text-4xl sm:mt-14 sm:text-5xl">Where to print</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        You print it on your own. These are the banner and stand I recommend.
      </p>
      <ProductPicks />
    </main>
    </>
  );
}
