"use client";

import { useRouter } from "next/navigation";
import { useAdvance, useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { MatchaTrigger } from "@/components/ice-matcha";
import { ProductPicks } from "@/components/product-picks";
import { secondaryClass } from "@/components/ui";

export function PrintScreen() {
  const { reset } = useDraft();
  const router = useRouter();
  useAdvance("print");

  return (
    <FlowShell>
      <h1 className="min-w-0 font-display text-3xl leading-tight tracking-tight hyphens-auto sm:text-5xl">Bring it to the sidelines.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        You&apos;re done. Banner Duty is free. You pay only if you decide to print the banner or buy a stand.
      </p>
      <p className="mt-2 text-lg leading-8 text-muted">
        If Banner Duty saved you some time (or made banner duty a little more fun), you can always{" "}
        <MatchaTrigger className="text-foreground underline underline-offset-4">
          buy me a matcha 🍵
        </MatchaTrigger>
        . Totally optional, always appreciated.
      </p>
      <ProductPicks />
      <button
        type="button"
        className={`${secondaryClass} mt-8 md:w-auto md:px-8`}
        onClick={() => {
          reset();
          router.push("/");
        }}
      >
        Start over
      </button>
    </FlowShell>
  );
}
