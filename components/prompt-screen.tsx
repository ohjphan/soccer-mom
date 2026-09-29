"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdvance, useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { primaryClass, secondaryClass } from "@/components/ui";
import { chatgptPromptUrl, copyText } from "@/lib/chatgpt";
import { colorLabel } from "@/lib/colors";
import { buildConceptPrompt } from "@/lib/prompt";
import { vibesByIds } from "@/lib/vibes";

export function PromptScreen() {
  const { draft } = useDraft();
  const [toast, setToast] = useState<{ text: string; at: number } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useAdvance("prompt");

  const prompt = buildConceptPrompt(draft);
  const summary = [
    draft.teamName.trim(),
    colorLabel(draft),
    vibesByIds(draft.vibes)
      .map((vibe) => vibe.label)
      .join(", "),
  ]
    .filter(Boolean)
    .join(" · ");

  function copyPrompt(openChat: boolean) {
    if (openChat) window.open(chatgptPromptUrl(prompt), "_blank", "noopener,noreferrer");
    void copyText(prompt).then((copied) => {
      if (!openChat) {
        setToast({ text: copied ? "Copied." : "Select the brief below and copy it.", at: Date.now() });
        return;
      }
      setToast({
        text: copied
          ? "ChatGPT is opening with your brief filled in. A copy is on your clipboard too."
          : "ChatGPT is opening with your brief filled in.",
        at: Date.now(),
      });
    });
  }

  return (
    <FlowShell
      footer={
        <>
          <button type="button" className={primaryClass} onClick={() => void copyPrompt(true)}>
            Copy prompt & open ChatGPT
          </button>
          <Link href="/finalize" className={secondaryClass}>
            Make it print-ready
          </Link>
        </>
      }
    >
      <h1 className="font-display text-4xl leading-tight tracking-tight">Your banner brief is ready</h1>
      <p className="mt-3 text-lg leading-7 text-muted">
        We&apos;ll give ChatGPT everything it needs to create three different directions for your team.
      </p>
      <p className="mt-4 text-sm font-semibold text-foreground">{summary}</p>
      <div className="relative mt-6">
        <pre className="max-h-64 overflow-auto rounded-2xl border border-line bg-card p-4 pr-14 text-sm leading-6 whitespace-pre-wrap text-foreground">
          {prompt}
        </pre>
        <button
          type="button"
          aria-label="Copy prompt"
          onClick={() => copyPrompt(false)}
          className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <rect x="8" y="8" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M6 15.5V6.2C6 5.5 6.5 5 7.2 5H15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {toast ? (
        <p
          role="status"
          className="fixed top-5 left-1/2 z-50 w-[min(22rem,calc(100%-2.5rem))] -translate-x-1/2 bg-[#141210] px-4 py-3 text-center text-sm font-semibold text-[#C8FF4A] md:top-auto md:right-6 md:bottom-6 md:left-auto md:translate-x-0 md:text-left"
        >
          {toast.text}
        </p>
      ) : null}
    </FlowShell>
  );
}
