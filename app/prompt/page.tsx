import type { Metadata } from "next";
import { PromptScreen } from "@/components/prompt-screen";
import { RequireBrief } from "@/components/require-brief";

export const metadata: Metadata = {
  title: "Your brief",
};

export default function PromptPage() {
  return (
    <RequireBrief>
      <PromptScreen />
    </RequireBrief>
  );
}
