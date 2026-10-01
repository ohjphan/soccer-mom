import type { Metadata } from "next";
import { PromptScreen } from "@/components/prompt-screen";
import { RequireBrief } from "@/components/require-brief";

export const metadata: Metadata = {
  title: "Make it in ChatGPT",
  robots: { index: false, follow: true },
};

export default function PromptPage() {
  return (
    <RequireBrief>
      <PromptScreen />
    </RequireBrief>
  );
}
