import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/gallery/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/where-to-print/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.6 },
  ];
}
