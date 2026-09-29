import Link from "next/link";

export const primaryClass =
  "btn-pop btn-pop-primary inline-flex h-14 w-full cursor-pointer items-center justify-center px-8 text-center text-lg font-bold text-[#C8FF4A] disabled:cursor-not-allowed disabled:opacity-40";

export const secondaryClass =
  "btn-pop btn-pop-secondary inline-flex h-14 w-full cursor-pointer items-center justify-center px-8 text-center text-lg font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40";

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

export function Mark() {
  return (
    <Link href="/" className="inline-flex h-11 shrink-0 items-center gap-2.5 font-display text-lg text-foreground">
      <svg viewBox="-16 -16 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle r="14.5" fill="#f7f3ea" stroke="#1c1917" strokeWidth="1.7" />
        <path d="M0 -6 L5.6 -1.8 L3.4 5 L-3.4 5 L-5.6 -1.8 Z" fill="#1c1917" />
        <path
          d="M0 -6 L0 -14.5 M5.6 -1.8 L13 -6.6 M3.4 5 L10.6 11.6 M-3.4 5 L-10.6 11.6 M-5.6 -1.8 L-13 -6.6"
          fill="none"
          stroke="#1c1917"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
      Banner Duty
    </Link>
  );
}
