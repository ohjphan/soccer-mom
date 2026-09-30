"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConceptChoiceField } from "@/components/concept-choice";
import { useAdvance, useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { primaryClass } from "@/components/ui";
import { chatgptPromptUrl, copyText } from "@/lib/chatgpt";
import { colorLabel } from "@/lib/colors";
import { furtherStep, type ConceptChoice } from "@/lib/draft";
import { buildConceptPrompt, buildFinalizePrompt } from "@/lib/prompt";
import { vibesByIds } from "@/lib/vibes";

export function PromptScreen() {
  const { draft, update } = useDraft();
  const router = useRouter();
  const [toast, setToast] = useState<{ text: string; at: number } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useAdvance("prompt");

  const prompt = buildConceptPrompt(draft);
  const printPrompt = buildFinalizePrompt(draft);
  const conceptChosen = draft.concept === 1 || draft.concept === 2 || draft.concept === 3;
  const summary = [
    draft.teamName.trim(),
    colorLabel(draft),
    vibesByIds(draft.vibes)
      .map((vibe) => vibe.label)
      .join(", "),
  ]
    .filter(Boolean)
    .join(" · ");

  function chooseConcept(concept: ConceptChoice) {
    update({ concept });
  }

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

  async function copyFinalize() {
    if (!conceptChosen) return;
    const copied = await copyText(printPrompt);
    update((current) => ({ furthest: furtherStep(current.furthest, "finalize") }));
    setToast({
      text: copied
        ? "Copied. Paste it into the same ChatGPT chat."
        : "Select the prompt above and copy it, then paste it into the same chat.",
      at: Date.now(),
    });
  }

  return (
    <FlowShell>
      <h1 className="font-display text-3xl leading-tight tracking-tight min-[380px]:text-4xl">Make it in ChatGPT</h1>
      <p className="mt-3 text-lg leading-7 text-muted">Same chat, in this order.</p>
      <p className="mt-4 text-sm font-semibold text-foreground">{summary}</p>
      <ol className="mt-10 flex flex-col gap-12">
        <li>
          <h2 className="font-sans text-2xl font-semibold leading-tight">1. Copy prompt to generate</h2>
          <p className="mt-2 text-lg leading-7 text-muted">This asks for three different banners.</p>
          <PromptBlock text={prompt} copyLabel="Copy prompt to generate" compact onCopy={() => copyPrompt(false)} />
          <button type="button" className={`${primaryClass} mt-4`} onClick={() => void copyPrompt(true)}>
            Copy prompt & open ChatGPT
          </button>
        </li>
        <li>
          <h2 className="font-sans text-2xl font-semibold leading-tight">2. Select concept</h2>
          <p className="mt-2 text-lg leading-7 text-muted">When the three banners show up, pick the one to print.</p>
          <div className="mt-4">
            <ConceptChoiceField value={draft.concept} onChange={chooseConcept} />
          </div>
        </li>
        <li>
          <h2 className="font-sans text-2xl font-semibold leading-tight">3. Copy prompt to finalize</h2>
          <p className="mt-2 text-lg leading-7 text-muted">Paste this into the same chat. It keeps the concept you picked.</p>
          {conceptChosen ? (
            <>
              <PromptBlock text={printPrompt} copyLabel="Copy prompt to finalize" compact onCopy={() => void copyFinalize()} />
              <button type="button" className={`${primaryClass} mt-4`} onClick={() => void copyFinalize()}>
                Copy prompt to finalize
              </button>
              <p className="mt-3 text-sm text-muted">5 × 3 ft · 6000 × 3600 px · PNG</p>
            </>
          ) : (
            <p className="mt-4 text-base text-muted">Pick 1, 2, or 3 first.</p>
          )}
        </li>
      </ol>
      <p className="mt-12 text-sm leading-6 text-muted">Before you print, check the name, color, mascot, and edges.</p>
      <button
        type="button"
        className={`${primaryClass} mt-4`}
        onClick={() => {
          update((current) => ({ furthest: furtherStep(current.furthest, "print") }));
          router.push("/print");
        }}
      >
        My banner is ready
      </button>
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

function PromptBlock({
  text,
  copyLabel,
  onCopy,
  compact = false,
}: {
  text: string;
  copyLabel: string;
  onCopy: () => void;
  compact?: boolean;
}) {
  return (
    <div className="relative mt-4">
      <pre
        className={`${compact ? "max-h-32" : "max-h-64"} overflow-auto rounded-2xl border border-line bg-card p-4 pr-14 text-sm leading-6 whitespace-pre-wrap text-foreground`}
      >
        {text}
      </pre>
      <button
        type="button"
        aria-label={copyLabel}
        onClick={onCopy}
        className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center text-foreground"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <rect x="8" y="8" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 15.5V6.2C6 5.5 6.5 5 7.2 5H15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
