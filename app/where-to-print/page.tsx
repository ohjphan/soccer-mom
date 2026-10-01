import type { Metadata } from "next";
import { ProductPicks } from "@/components/product-picks";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buy a soccer banner",
  description: "Buy a 5×3 ft soccer banner and a sideline stand. Upload your design and print it yourself.",
  alternates: { canonical: absoluteUrl("/where-to-print/") },
  openGraph: { url: absoluteUrl("/where-to-print/") },
};

export default function WhereToPrintPage() {
  return (
    <>
    <SiteHeader />
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-16">
      <h1 className="mt-8 font-display text-3xl leading-tight tracking-tight min-[380px]:text-4xl sm:mt-14 sm:text-6xl">Where to print</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        You buy the print yourself. This is the 5×3 ft vinyl soccer banner and the sideline stand I use.
      </p>
      <ProductPicks />
    </main>
    <SiteFooter />
    </>
  );
}
