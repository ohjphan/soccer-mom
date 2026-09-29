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
    <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg text-foreground">
      <Logo />
      Banner Duty
    </Link>
  );
}

function Logo() {
  const ink = "#1c1917";
  const paper = "#f7f3ea";
  const teal = "#14967a";
  const neon = "#C8FF4A";
  const yellow = "#f0c400";
  const tape = "#e4d0a6";
  const banner = "M7 18 L22 12 L40 17 L58 11 L74 16 L88 13 L90 24 L86 35 L91 44 L72 49 L50 44 L32 50 L16 44 L5 47 L2 33 L4 22 Z";

  return (
    <svg viewBox="0 0 104 58" className="h-11 w-auto" aria-hidden="true">
      <defs>
        <pattern id="logo-dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.05" fill={ink} />
        </pattern>
        <filter id="logo-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
          <feComponentTransfer in="alpha" result="speck">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0.4" />
          </feComponentTransfer>
          <feFlood floodColor={ink} result="flood" />
          <feComposite in="flood" in2="speck" operator="in" />
        </filter>
        <clipPath id="logo-clip">
          <path d={banner} />
        </clipPath>
      </defs>
      <path d="M76 50 C86 45, 94 53, 102 46" fill="none" stroke={yellow} strokeWidth="4.5" strokeLinecap="round" />
      <path d={banner} fill={ink} transform="translate(2 2.4)" />
      <g clipPath="url(#logo-clip)">
        <path d={banner} fill={teal} />
        <path d="M0 34 H104 V58 H0 Z" fill={neon} />
        <rect x="46" y="10" width="44" height="40" fill="url(#logo-dots)" opacity="0.35" />
        <rect width="104" height="58" filter="url(#logo-grain)" />
      </g>
      <path d={banner} fill="none" stroke={paper} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 27 C28 24, 38 29, 48 25" fill="none" stroke={paper} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 35 C26 33, 34 37, 42 34" fill="none" stroke={paper} strokeWidth="1.7" strokeLinecap="round" />
      <g transform="rotate(-16 26 15)" opacity="0.92">
        <rect x="12" y="11" width="28" height="9" fill={tape} />
        <path d="M18 11 v9 M28 11 v9" stroke="#cbb892" strokeWidth="0.7" />
      </g>
      <g transform="translate(66 30)">
        <circle r="14.5" fill={paper} stroke={ink} strokeWidth="1.7" />
        <path d="M0 -6 L5.6 -1.8 L3.4 5 L-3.4 5 L-5.6 -1.8 Z" fill={ink} />
        <path
          d="M0 -6 L0 -14.5 M5.6 -1.8 L13 -6.6 M3.4 5 L10.6 11.6 M-3.4 5 L-10.6 11.6 M-5.6 -1.8 L-13 -6.6"
          fill="none"
          stroke={ink}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </g>
      <g fill={ink}>
        <circle cx="98" cy="12" r="1.45" />
        <circle cx="101" cy="10.4" r="0.55" />
        <circle cx="96" cy="14.2" r="0.45" />
      </g>
    </svg>
  );
}
