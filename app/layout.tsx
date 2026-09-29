import type { Metadata } from "next";
import { BBH_Bartle, Outfit } from "next/font/google";
import { DraftProvider } from "@/components/draft-store";
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

export const metadata: Metadata = {
  title: {
    default: "Banner Duty",
    template: "%s · Banner Duty",
  },
  description: "Create a custom soccer banner in minutes. No design skills needed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${bbhBartle.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <DraftProvider>{children}</DraftProvider>
      </body>
    </html>
  );
}
