"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { emptyDraft, furtherStep, type Draft, type FlowStep } from "@/lib/draft";
import { clearDraft, loadDraft, normalizeDraft, saveDraft } from "@/lib/storage";

type DraftState = {
  draft: Draft;
  ready: boolean;
};

const serverState: DraftState = { draft: emptyDraft(), ready: false };
let state: DraftState = serverState;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useDraft() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => state,
    () => serverState,
  );

  const hydrate = useCallback(() => {
    if (state.ready) return;
    state = { draft: loadDraft() ?? emptyDraft(), ready: true };
    emit();
  }, []);

  const update = useCallback((partial: Partial<Draft> | ((draft: Draft) => Partial<Draft>)) => {
    const patch = typeof partial === "function" ? partial(state.draft) : partial;
    state = {
      draft: normalizeDraft({ ...state.draft, ...patch, updatedAt: Date.now() }),
      ready: true,
    };
    saveDraft(state.draft);
    emit();
  }, []);

  const reset = useCallback(() => {
    clearDraft();
    state = { draft: emptyDraft(), ready: true };
    emit();
  }, []);

  return { draft: snapshot.draft, ready: snapshot.ready, hydrate, update, reset };
}

export function useAdvance(step: FlowStep) {
  const { draft, ready, update } = useDraft();

  useEffect(() => {
    if (!ready) return;
    const next = furtherStep(draft.furthest, step);
    if (next !== draft.furthest) update({ furthest: next });
  }, [draft.furthest, ready, step, update]);
}

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const { hydrate } = useDraft();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return children;
}
