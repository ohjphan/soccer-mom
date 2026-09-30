const ink = "#1c1917";
const locked = "#c4bbb0";
const neon = "#C8FF4A";
const paper = "#f4f0e8";

const RINGS = [
  "M18 5.5 C25 3.2, 32.5 8, 32 16.5 C33.5 25, 27 33.2, 18 32 C10 33.6, 3.5 27, 5 17.5 C3.2 9.5, 10.5 3.4, 18 5.5",
  "M17.2 4.6 C26 5.4, 32.2 10.5, 33 18 C32.2 26.4, 25.5 33, 17 32.2 C8.8 33.4, 3.6 26.2, 5.2 17.2 C4.2 8.6, 9 3.2, 17.2 4.6",
  "M18.4 5 C26.2 3.6, 33.4 9.2, 32.2 17.4 C33.6 26, 26.4 33.4, 17.6 32.2 C9.2 33.8, 3.2 26.6, 4.8 17 C3.4 9, 10 3.2, 18.4 5",
  "M17.6 5.2 C24.8 3.4, 32 7.6, 32.6 16 C34 24.6, 27.4 32.6, 18.2 32.4 C9.6 33.2, 4 27.4, 4.6 18.2 C3.6 10, 10.2 3.6, 17.6 5.2",
  "M18 4.4 C26.4 4.8, 32.8 10, 32.4 17.8 C33.2 26.2, 26 33.6, 17.4 32.4 C9 33.4, 3.4 26.8, 5 17.4 C3.8 9.2, 9.6 3, 18 4.4",
  "M17.4 5.4 C25.2 3.8, 33 8.8, 32.6 17 C33.8 25.4, 26.8 33, 17.8 32.6 C9.4 33.6, 3.8 26.4, 4.6 17.6 C3.4 9.4, 9.8 3.6, 17.4 5.4",
];

export function StepNumber({
  n,
  tone = "open",
  className = "",
}: {
  n: number;
  tone?: "current" | "open" | "locked";
  className?: string;
}) {
  const stroke = tone === "locked" ? locked : ink;
  const number = tone === "locked" ? locked : ink;
  const fill = tone === "current" ? neon : paper;

  return (
    <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center ${className}`}>
      <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d={RINGS[n - 1]}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative z-10 text-sm font-bold leading-none" style={{ color: number }}>
        {n}
      </span>
    </span>
  );
}
