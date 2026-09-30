import Link from "next/link";

const ctaType = "text-center font-mono text-[12px] font-medium uppercase tracking-[1px]";

export const linkType = "font-mono text-[12px] font-medium uppercase tracking-[1px]";

export const primaryClass =
  `inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-[#141210] px-8 ${ctaType} text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40`;

export const secondaryClass =
  `inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-full border-2 border-[#141210] bg-transparent px-8 ${ctaType} text-[#141210] hover:bg-[#141210]/5 disabled:cursor-not-allowed disabled:opacity-40`;

export function Loading() {
  return (
    <p className="px-5 py-24 text-center text-muted" role="status">
      Loading your banner…
    </p>
  );
}

export function ColorPickerIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 -960 960 960" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M120-120v-190l358-358-58-56 58-56 76 76 124-124q5-5 12.5-8t15.5-3q8 0 15 3t13 8l94 94q5 6 8 13t3 15q0 8-3 15.5t-8 12.5L705-555l76 78-57 57-56-58-358 358H120Zm80-80h78l332-334-76-76-334 332v78Zm447-410 96-96-37-37-96 96 37 37Zm0 0-37-37 37 37Z"
      />
    </svg>
  );
}

export function Mark({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const paper = tone === "paper";
  const ink = paper ? "#f4f0e8" : "#1c1917";
  const ball = paper ? "#141210" : "#f7f3ea";

  return (
    <Link href="/" className={`inline-flex h-11 min-w-0 items-center gap-2 font-display text-sm whitespace-nowrap min-[380px]:text-base sm:gap-2.5 sm:text-lg ${paper ? "text-[#f4f0e8]" : "text-foreground"}`}>
      <svg viewBox="-16 -16 32 32" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" aria-hidden="true">
        <circle r="14.5" fill={ball} stroke={ink} strokeWidth="1.7" />
        <path d="M0 -6 L5.6 -1.8 L3.4 5 L-3.4 5 L-5.6 -1.8 Z" fill={ink} />
        <path
          d="M0 -6 L0 -14.5 M5.6 -1.8 L13 -6.6 M3.4 5 L10.6 11.6 M-3.4 5 L-10.6 11.6 M-5.6 -1.8 L-13 -6.6"
          fill="none"
          stroke={ink}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
      <span className="truncate">Banner Duty</span>
    </Link>
  );
}
