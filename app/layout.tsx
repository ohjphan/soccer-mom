import type { Metadata } from "next";
import { BBH_Bartle, DM_Mono, Outfit } from "next/font/google";
import { DraftProvider } from "@/components/draft-store";
import { MatchaModalProvider } from "@/components/ice-matcha";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bbhBartle = BBH_Bartle({
  variable: "--font-bbh-bartle",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
});

const description =
  "Make a custom soccer team banner for free. Add the name, color, and vibe, then buy a 5×3 ft print. No design skills needed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Soccer banner design · Banner Duty",
    template: "%s · Banner Duty",
  },
  description,
  applicationName: "Banner Duty",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Soccer banner design · Banner Duty",
    description,
    type: "website",
    siteName: "Banner Duty",
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${bbhBartle.variable} ${dmMono.variable} min-h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <DraftProvider>
          <MatchaModalProvider>{children}</MatchaModalProvider>
        </DraftProvider>
      </body>
    </html>
  );
}
