import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gallery } from "@/lib/gallery";
import { publicPath } from "@/lib/public-path";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Soccer banner designs",
  description: "Soccer banner design ideas for youth teams, from sharks and cobras to unicorns. Make one for your own team.",
  alternates: { canonical: absoluteUrl("/gallery/") },
  openGraph: { url: absoluteUrl("/gallery/") },
};

export default function GalleryPage() {
  return (
    <>
    <SiteHeader />
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-16">
      <h1 className="mt-8 font-display text-3xl leading-tight tracking-tight min-[380px]:text-4xl sm:mt-14 sm:text-6xl">Gallery</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Soccer team banners made with this tool. Take a vibe, then make one for your own team.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
        {gallery.map((item) => (
          <figure key={item.src}>
            <img
              src={publicPath(item.src)}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
            <figcaption className="mt-3">
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-1 text-base leading-6 text-muted">{item.summary}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
