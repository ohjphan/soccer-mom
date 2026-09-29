"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDraft } from "@/components/draft-store";
import { Loading } from "@/components/ui";
import { isBriefComplete } from "@/lib/draft";

export function RequireBrief({ children }: { children: React.ReactNode }) {
  const { draft, ready } = useDraft();
  const router = useRouter();
  const complete = isBriefComplete(draft);

  useEffect(() => {
    if (!ready) return;
    if (!complete) router.replace("/create");
  }, [complete, ready, router]);

  if (!ready || !complete) return <Loading />;
  return children;
}
