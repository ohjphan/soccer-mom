"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { primaryClass } from "@/components/ui";
import { publicPath } from "@/lib/public-path";

const VENMO_URL = "https://venmo.com/u/ohjphan";

type MatchaContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const MatchaContext = createContext<MatchaContextValue | null>(null);

export function useMatchaModal() {
  const context = useContext(MatchaContext);
  if (!context) {
    throw new Error("useMatchaModal must be used within a MatchaModalProvider");
  }
  return context;
}

export function MatchaModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <MatchaContext.Provider value={{ openModal, closeModal }}>
      {children}
      {open ? <MatchaModal onClose={closeModal} /> : null}
    </MatchaContext.Provider>
  );
}

export function MatchaTrigger({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openModal } = useMatchaModal();
  return (
    <button
      type="button"
      className={className ?? "cursor-pointer underline underline-offset-4"}
      onClick={openModal}
    >
      {children ?? "buy me a matcha 🍵"}
    </button>
  );
}

export function IceMatcha() {
  return (
    <p>
      If you like what you see, or you&apos;ve used Banner Duty to create a banner, you can{" "}
      <MatchaTrigger>buy me an ice matcha</MatchaTrigger>.
    </p>
  );
}

export function MatchaModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center sm:p-5">
      <button
        type="button"
        className="fixed inset-0 hidden bg-[#141210]/50 sm:block"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex min-h-dvh w-full flex-col justify-between overflow-y-auto bg-white p-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:min-h-0 sm:max-h-[90dvh] sm:max-w-sm sm:justify-start sm:rounded-3xl sm:border sm:border-line sm:bg-white sm:p-6"
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-sans text-2xl font-semibold leading-tight text-foreground sm:text-2xl">
              Buy me a matcha or two 🍵
            </h2>
            <button
              ref={closeRef}
              type="button"
              className="-mr-1 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-[#141210]/5"
              aria-label="Close"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-base leading-6 text-muted">
            Banner Duty is a little passion project I made for soccer parents. If it helped your team, you can send a few bucks my way. Thank you!
          </p>
          <div className="mt-5 flex justify-center">
            <img
              src={publicPath("/venmo-ohjphan.jpg")}
              alt="Venmo QR code for Jessica Phan, @ohjphan"
              width={967}
              height={1024}
              className="h-auto w-full max-w-[280px] rounded-2xl bg-white shadow-xs sm:max-w-full"
            />
          </div>
        </div>
        <div className="mt-6 sm:mt-5">
          <a
            href={VENMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${primaryClass} w-full`}
          >
            Open Venmo →
          </a>
        </div>
      </div>
    </div>
  );
}
