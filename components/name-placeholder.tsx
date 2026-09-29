"use client";

import { useEffect, useState } from "react";

const NAME_EXAMPLES = ["Ice Dragons", "Black Flames", "Magical Unicorns", "Buzzing Bumblebees"];
const NAME_PLACEHOLDER = `e.g. ${NAME_EXAMPLES.join(", ")}`;

export function useNamePlaceholder() {
  const [placeholder, setPlaceholder] = useState(NAME_PLACEHOLDER);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let timer = 0;

    const apply = () => {
      window.clearInterval(timer);
      if (!narrow.matches || reduce.matches) {
        setPlaceholder(NAME_PLACEHOLDER);
        return;
      }
      setPlaceholder(`e.g. ${NAME_EXAMPLES[index]}`);
      timer = window.setInterval(() => {
        index = (index + 1) % NAME_EXAMPLES.length;
        setPlaceholder(`e.g. ${NAME_EXAMPLES[index]}`);
      }, 2200);
    };

    apply();
    narrow.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      window.clearInterval(timer);
      narrow.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  return placeholder;
}
