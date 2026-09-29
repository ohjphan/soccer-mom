"use client";

import { useRef, useState } from "react";
import { primaryClass } from "@/components/ui";
import { imageError, sendBanner } from "@/lib/share";

const fieldClass =
  "w-full border-2 border-foreground bg-card px-4 text-lg text-foreground outline-none placeholder:text-muted/70";

export function ShareForm() {
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [permission, setPermission] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const nameReady = teamName.trim().length > 0;
  const emailProblem = email.trim().length > 0 && !/^\S+@\S+\.\S+$/.test(email.trim());
  const canSend = nameReady && file !== null && permission && !emailProblem && !sending;

  function chooseFile(next: File | undefined) {
    if (!next) {
      setFile(null);
      return;
    }
    const problem = imageError(next);
    if (problem) {
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setError(problem);
      return;
    }
    setFile(next);
    setError("");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSend || !file) return;
    setSending(true);
    setError("");
    try {
      await sendBanner({ teamName, email, note, file });
      setSent(true);
    } catch (caught) {
      const message = caught instanceof Error && caught.message === "Sharing isn't set up yet." ? caught.message : "That didn't send. Try again.";
      setError(message);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <p className="mt-8 text-lg leading-8" role="status">
        Sent. It shows up in the gallery only if I add it.
      </p>
    );
  }

  return (
    <form className="mt-8 max-w-xl" onSubmit={(event) => void submit(event)}>
      <label htmlFor="share-team-name" className="block font-semibold">
        Team name
      </label>
      <input
        id="share-team-name"
        value={teamName}
        onChange={(event) => setTeamName(event.target.value)}
        maxLength={80}
        autoComplete="off"
        required
        className={`${fieldClass} mt-3 h-14`}
      />

      <label htmlFor="share-banner" className="mt-8 block font-semibold">
        Banner image
      </label>
      <input
        id="share-banner"
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        onChange={(event) => chooseFile(event.target.files?.[0])}
        className={`${fieldClass} mt-3 py-3 file:mr-4 file:border-0 file:bg-transparent file:text-base file:font-semibold file:text-foreground`}
      />
      <p className="mt-2 text-sm text-muted">JPG, PNG, or WebP. Under 8 MB.</p>

      <label htmlFor="share-note" className="mt-8 block font-semibold">
        Note <span className="font-normal text-muted">Optional</span>
      </label>
      <textarea
        id="share-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        maxLength={400}
        rows={3}
        className={`${fieldClass} mt-3 min-h-28 py-3`}
      />

      <label htmlFor="share-email" className="mt-8 block font-semibold">
        Email <span className="font-normal text-muted">Optional</span>
      </label>
      <input
        id="share-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="If you want a note when it goes up"
        className={`${fieldClass} mt-3 h-14`}
      />

      <label className="mt-8 flex items-start gap-3 text-base leading-6">
        <input
          type="checkbox"
          checked={permission}
          onChange={(event) => setPermission(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-foreground"
        />
        <span>I made this banner. It&apos;s fine to show on a youth soccer site, and it&apos;s banner art, not a photo of a child.</span>
      </label>

      {error ? (
        <p className="mt-4 text-base font-medium" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className={`${primaryClass} mt-8 sm:w-auto sm:px-8`} disabled={!canSend}>
        {sending ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
