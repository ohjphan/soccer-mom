"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FinalizePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/prompt");
  }, [router]);

  return null;
}
