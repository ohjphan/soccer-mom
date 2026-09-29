"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/ui";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/where-to-print", label: "Where to print" },
];

const createClass =
  "btn-pop btn-pop-primary inline-flex h-11 shrink-0 cursor-pointer items-center justify-center px-5 text-base font-bold text-[#C8FF4A]";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Mark />
      <nav aria-label="Site" className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {LINKS.map((link) => {
          const current = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center text-base font-semibold underline-offset-4 hover:underline ${
                current ? "underline" : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/create" className={createClass}>
          Create
        </Link>
      </nav>
    </header>
  );
}
