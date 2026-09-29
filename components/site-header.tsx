"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/ui";

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/where-to-print", label: "Where to print" },
];

const createClass =
  "btn-pop btn-pop-primary inline-flex h-14 w-full cursor-pointer items-center justify-center px-8 text-center text-lg font-bold text-[#C8FF4A] sm:h-11 sm:w-auto sm:px-5 sm:text-base";

function currentPath(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

function HeaderBar({
  open,
  onToggle,
  buttonRef,
}: {
  open: boolean;
  onToggle: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  const pathname = usePathname();

  return (
    <div className="relative z-40 mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
      <Mark />
      <nav aria-label="Site" className="hidden items-center gap-x-5 sm:flex">
        {LINKS.map((link) => {
          const current = currentPath(pathname, link.href);
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
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center border-2 border-foreground sm:hidden"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Menu"}
        onClick={onToggle}
      >
        <svg viewBox="0 0 24 24" className={`h-6 w-6 ${open ? "rotate-45" : ""}`} aria-hidden="true">
          <path d="M12 4.5 V19.5 M4.5 12 H19.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstLink.current?.focus();
  }, []);

  return (
    <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-30 bg-background sm:hidden">
      <nav aria-label="Site" className="flex h-full flex-col justify-center gap-2 px-8 pt-24 pb-12">
        {LINKS.map((link, index) => {
          const current = currentPath(pathname, link.href);
          return (
            <Link
              key={link.href}
              ref={index === 0 ? firstLink : undefined}
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={onClose}
              className={`font-display text-4xl leading-tight underline-offset-4 ${current ? "underline" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/create" onClick={onClose} className={`${createClass} mt-8`}>
          Create
        </Link>
      </nav>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div aria-hidden="true" inert className="invisible">
        <HeaderBar open={false} onToggle={() => {}} />
      </div>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-background">
        <HeaderBar open={open} onToggle={() => setOpen((value) => !value)} buttonRef={buttonRef} />
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </header>
    </>
  );
}
