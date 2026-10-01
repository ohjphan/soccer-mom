import type { Metadata } from "next";
import { PrintScreen } from "@/components/print-screen";
import { RequireBrief } from "@/components/require-brief";

export const metadata: Metadata = {
  title: "Bring it to the sidelines",
  robots: { index: false, follow: true },
};

export default function PrintPage() {
  return (
    <RequireBrief>
      <PrintScreen />
    </RequireBrief>
  );
}
