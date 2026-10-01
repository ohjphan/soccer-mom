import Link from "next/link";
import { bannerFaqs } from "@/lib/banner-faq";
import { absoluteUrl } from "@/lib/site";

const description =
  "Free soccer team banner design tool. It writes the prompts for a print-ready 5×3 ft banner. You generate the image in ChatGPT and print it yourself.";

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Banner Duty",
        url: absoluteUrl("/"),
        description,
      },
      {
        "@type": "WebApplication",
        name: "Banner Duty",
        url: absoluteUrl("/"),
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Person",
          name: "Jessica Phan",
          url: "https://jessica.is/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: bannerFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function BannerAnswers() {
  return (
    <section aria-labelledby="banner-answers" className="mx-auto w-full max-w-3xl px-5 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <h2 id="banner-answers" className="font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        Make a soccer banner
      </h2>
      <p className="mt-4 text-lg leading-8">
        Banner Duty is a free soccer banner design tool. The team name, the colors, and the vibe go in. A 5×3 ft design comes out, ready to print. Buying the banner is the last step, and only if you want one.
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {bannerFaqs.map((item) => (
          <div key={item.question}>
            <h3 className="text-xl font-semibold leading-tight">{item.question}</h3>
            <p className="mt-2 text-lg leading-8 text-muted">
              {item.question === "Where do I buy a soccer banner?" ? (
                <>
                  You print it yourself. The design is made for a 5×3 ft vinyl banner with grommets. The{" "}
                  <Link href="/where-to-print" className="text-foreground underline underline-offset-4">
                    Where to print
                  </Link>{" "}
                  page has the banner and a sideline stand.
                </>
              ) : (
                item.answer
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
