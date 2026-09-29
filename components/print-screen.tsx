"use client";

import { useRouter } from "next/navigation";
import { useAdvance, useDraft } from "@/components/draft-store";
import { FlowShell } from "@/components/flow-shell";
import { ProductPicks } from "@/components/product-picks";
import { secondaryClass } from "@/components/ui";

export function PrintScreen() {
  const { reset } = useDraft();
  const router = useRouter();
  useAdvance("print");

  return (
    <FlowShell>
      <h1 className="min-w-0 font-display text-3xl leading-tight tracking-tight hyphens-auto sm:text-5xl">Bring it to the sidelines.</h1>
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
