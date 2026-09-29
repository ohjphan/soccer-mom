import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { gallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-8 pb-16 sm:pt-14">
      <SiteHeader />
      <h1 className="mt-8 font-display text-4xl leading-tight tracking-tight sm:mt-14 sm:text-6xl">Gallery</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">A few banners made with this site.</p>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
        {gallery.map((item) => (
          <figure key={item.src}>
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-base font-semibold">{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
