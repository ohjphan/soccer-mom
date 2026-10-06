"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { linkType, Mark, primaryClass } from "@/components/ui";

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/where-to-print", label: "Where to print" },
  { href: "/about", label: "About" },
];

const createClass = `${primaryClass} sm:h-11 sm:w-auto sm:px-5`;

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
    <div className="relative z-40 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 min-[380px]:gap-5 min-[380px]:px-5">
      <Mark tone="ink" />
      <nav aria-label="Site" className="hidden items-center gap-x-5 md:flex">
        {LINKS.map((link) => {
          const current = currentPath(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center underline-offset-4 hover:underline ${linkType} ${
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
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 border-foreground text-foreground md:hidden"
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
  const linkClass = "flex min-h-11 items-center font-display text-3xl leading-none tracking-tight outline-none min-[380px]:text-4xl focus:outline-none focus-visible:outline-none";

  return (
    <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-30 bg-[#c8ff4a] text-[#141210] md:hidden">
      <nav aria-label="Site" className="flex h-full flex-col justify-center gap-4 px-5 pt-24 pb-32">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className={linkClass}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/create"
        onClick={onClose}
        className={`absolute inset-x-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex h-14 items-center justify-center rounded-full bg-[#141210] text-white outline-none focus:outline-none focus-visible:outline-none ${linkType}`}
      >
        Create
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

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
      <header className={`fixed inset-x-0 top-0 z-40 border-b ${open ? "border-[#c8ff4a] bg-[#c8ff4a]" : "border-line bg-background"}`}>
        <HeaderBar open={open} onToggle={() => setOpen((value) => !value)} buttonRef={buttonRef} />
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </header>
    </>
  );
}
