import { primaryClass } from "@/components/ui";
import { amazonUrl, products } from "@/lib/products";
import { publicPath } from "@/lib/public-path";

export function ProductPicks() {
  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        {([products.banner, products.stand] as const).map((product) => (
          <article key={product.asin} className="min-w-0 rounded-3xl border border-line bg-card p-4 sm:p-5">
            <div className="grid min-w-0 grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
              <img
                src={publicPath(product.image)}
                alt={product.imageAlt}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full min-w-0 rounded-2xl bg-background object-contain"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">{product.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl leading-tight break-words hyphens-auto sm:text-3xl">{product.title}</h2>
                <p className="mt-3 leading-7 text-muted">{product.body}</p>
              </div>
            </div>
            <a
              href={amazonUrl(product.asin)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className={`${primaryClass} mt-4 sm:mt-6 sm:ml-[calc(13rem+1.5rem)] sm:w-auto sm:px-8`}
            >
              {product.cta} →
            </a>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-muted">
        <span className="font-semibold text-foreground">Affiliate disclosure: </span>
        Some links are affiliate links. If you purchase through them, I may earn a small commission at no additional cost to you.
      </p>
    </>
  );
}
