import Link from "next/link";
import { gallery } from "@/lib/gallery";
import { publicPath } from "@/lib/public-path";

export function GalleryPan() {
  return (
    <section aria-label="Gallery" className="gallery-pan mt-4 overflow-hidden">
      <div className="gallery-pan-track flex w-max">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-4 pr-4" aria-hidden={setIndex === 1 || undefined}>
            {gallery.map((item) => (
              <Link
                key={`${setIndex}-${item.src}`}
                href="/gallery"
                tabIndex={setIndex === 1 ? -1 : undefined}
                className="w-72 shrink-0 sm:w-96"
              >
                <img
                  src={publicPath(item.src)}
                  alt={setIndex === 0 ? item.alt : ""}
                  width={item.width}
                  height={item.height}
                  decoding="async"
                  className="aspect-[5/3] h-auto w-full object-cover"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
