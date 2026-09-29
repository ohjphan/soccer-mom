import type { Metadata } from "next";
import { CreateFlow } from "@/components/create-flow";

export const metadata: Metadata = {
  title: "Your team",
};

export default function CreatePage() {
  return <CreateFlow />;
}
