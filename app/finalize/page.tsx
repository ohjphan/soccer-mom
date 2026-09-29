import type { Metadata } from "next";
import { FinalizeScreen } from "@/components/finalize-screen";
import { RequireBrief } from "@/components/require-brief";

export const metadata: Metadata = {
  title: "Make it print-ready",
};

export default function FinalizePage() {
  return (
    <RequireBrief>
      <FinalizeScreen />
    </RequireBrief>
  );
}
