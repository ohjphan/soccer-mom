"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdvance, useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { primaryClass } from "@/components/ui";
import { furtherStep } from "@/lib/draft";
import { copyText } from "@/lib/chatgpt";
import { buildFinalizePrompt } from "@/lib/prompt";

export function FinalizeScreen() {
  const { draft, update } = useDraft();
  const router = useRouter();
  const [message, setMessage] = useState("");
  useAdvance("finalize");

  const prompt = buildFinalizePrompt(draft);

  async function copyPrompt() {
    const copied = await copyText(prompt);
    if (copied) {
      setMessage("Copied. Paste it into the same ChatGPT chat.");
    } else {
      setMessage("Select the prompt above and copy it, then paste it into ChatGPT.");
    }
  }

  return (
    <FlowShell>
      <h1 className="font-display text-4xl leading-tight tracking-tight">Make it print-ready</h1>
      <p className="mt-3 text-lg leading-7 text-muted">We&apos;ll prepare your design for a 5 × 3 ft banner.</p>
      <pre className="mt-6 max-h-56 overflow-auto rounded-2xl border border-line bg-card p-4 text-sm leading-6 whitespace-pre-wrap">
        {prompt}
      </pre>
      <button type="button" className={`${primaryClass} mt-6`} onClick={() => void copyPrompt()}>
        Copy to make it print-ready
      </button>
      <p className="mt-3 text-sm text-muted">5 × 3 ft · 6000 × 3600 px · PNG</p>
      {message ? (
        <p role="status" className="mt-3 text-sm text-accent">
          {message}
        </p>
      ) : null}
      <p className="mt-6 text-sm leading-6 text-muted">
        Before you print, check the name, color, mascot, and edges.
      </p>
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
    </FlowShell>
  );
}
