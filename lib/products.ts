export const AFFILIATE_TAG = "jessicaphan0d-20";

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const products = {
  banner: {
    asin: "B0CGHSBY8Z",
    image: "/products/banner.webp",
    imageAlt: "A custom vinyl banner with metal grommets in the corners.",
    eyebrow: "Print your banner",
    title: "5 × 3 ft custom vinyl banner",
    body: "Upload the final PNG and select a 5 × 3 ft banner with grommets.",
    cta: "Print my banner on Amazon",
  },
  stand: {
    asin: "B0F1GB7YQY",
    image: "/products/stand.jpg",
    imageAlt: "A collapsible stand holding a 5 by 3 foot team banner.",
    eyebrow: "Add a sideline stand",
    title: "Collapsible 5 × 3 ft banner stand",
    body: "Made for standard 5×3 banners with grommets. No tools required.",
    cta: "Get the banner stand",
  },
} as const;
