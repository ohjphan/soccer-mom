"use client";

import { useEffect, useState } from "react";

const NAME_EXAMPLES = [
  "Ice Dragons",
  "Midnight Wolves",
  "Little Lions",
  "Emerald Dragons",
  "Blazing Bumblebees",
  "Magical Unicorns",
  "The Grasshoppers",
  "Black Magic",
  "Thunder Sharks",
  "Cosmic Comets",
];

export function useNamePlaceholder() {
  const [placeholder, setPlaceholder] = useState(`e.g. ${NAME_EXAMPLES[0]}`);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let timer = 0;

    const apply = () => {
      window.clearInterval(timer);
      if (reduce.matches) {
        setPlaceholder(`e.g. ${NAME_EXAMPLES[0]}`);
        return;
      }
      setPlaceholder(`e.g. ${NAME_EXAMPLES[index]}`);
      timer = window.setInterval(() => {
        index = (index + 1) % NAME_EXAMPLES.length;
        setPlaceholder(`e.g. ${NAME_EXAMPLES[index]}`);
      }, 2200);
    };

    apply();
    reduce.addEventListener("change", apply);
    return () => {
      window.clearInterval(timer);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  return placeholder;
}
