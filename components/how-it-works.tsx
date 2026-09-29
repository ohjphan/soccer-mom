import { StepNumber } from "@/components/step-number";

const ink = "#1c1917";
const paper = "#f7f3ea";
const teal = "#14967a";
const neon = "#C8FF4A";
const yellow = "#f0c400";
const tape = "#e4d0a6";

const STEPS = [
  {
    label: "Your team",
    detail: "Add the team name, choose boys or girls, and pick the color. A second color is there if you want it.",
    Art: NameArt,
  },
  {
    label: "Your vibe",
    detail: "Choose up to three moods. Add a note if you want something in the design, or left out.",
    Art: VibeArt,
  },
  {
    label: "Three concepts",
    detail: "Copy the brief into ChatGPT. You get three different banners to compare.",
    Art: ConceptsArt,
  },
  {
    label: "Finalize it",
    detail: "Pick a favorite. One more prompt gets it ready for a 5 × 3 ft banner.",
    Art: RefineArt,
  },
  {
    label: "Print it",
    detail: "You print it yourself. A banner and a stand are waiting when you are ready.",
    Art: PrintArt,
  },
];

export function HowItWorks() {
  return (
    <ol className="mt-10">
      {STEPS.map((step, index) => {
        const last = index === STEPS.length - 1;
        return (
          <li key={step.label} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <StepNumber n={index + 1} />
              {last ? null : <div className="mt-2 w-0.5 flex-1 bg-foreground" aria-hidden="true" />}
            </div>
            <div className={`min-w-0 ${last ? "" : "pb-10"}`}>
              <div className="w-36 sm:w-44">
                <step.Art />
              </div>
              <h2 className="mt-4 min-w-0 font-display text-xl leading-tight sm:text-3xl">{step.label}</h2>
              <p className="mt-2 max-w-xl text-base leading-7 text-muted sm:text-lg">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Art({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 88" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id={`${id}-dots`} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.05" fill={ink} />
        </pattern>
        <filter id={`${id}-grain`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
          <feComponentTransfer in="alpha" result="speck">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0.4" />
          </feComponentTransfer>
          <feFlood floodColor={ink} result="flood" />
          <feComposite in="flood" in2="speck" operator="in" />
        </filter>
      </defs>
      {children}
    </svg>
  );
}

function NameArt() {
  const id = "name";
  const banner = "M18 26 L32 21 L50 26 L70 19 L92 24 L104 22 L106 36 L102 48 L107 58 L92 64 L70 58 L48 66 L30 59 L16 63 L12 46 L16 34 Z";
  return (
    <Art id={id}>
      <Sticker d={banner} />
      <g clipPath={`url(#${id}-clip)`}>
        <path d={banner} fill={teal} />
        <path d="M0 50 H120 V80 H0 Z" fill={neon} />
        <rect x="72" y="22" width="36" height="40" fill={`url(#${id}-dots)`} opacity="0.35" />
        <rect width="120" height="88" filter={`url(#${id}-grain)`} />
      </g>
      <path d={banner} fill="none" stroke={paper} strokeWidth="2" strokeLinejoin="round" />
      <Mark d="M32 38 C46 34, 60 41, 78 36" color={paper} width={3.4} />
      <Mark d="M32 48 C42 46, 50 51, 62 47" color={paper} width={2.2} />
      <Tape x={34} y={20} rotate={-16} />
      <Slash d="M72 72 C84 66, 96 74, 110 67" />
      <Splatter cx={10} cy={74} />
      <clipPath id={`${id}-clip`}>
        <path d={banner} />
      </clipPath>
    </Art>
  );
}

function VibeArt() {
  const id = "vibe";
  return (
    <Art id={id}>
      <Slash d="M78 18 C88 10, 98 22, 108 12" width={6} />
      <Star d="M60 14 L67 34 L90 36 L71 50 L79 72 L58 58 L36 74 L45 50 L22 38 L46 34 Z" />
      <Star d="M98 58 L101 66 L110 67 L103 73 L106 82 L97 77 L88 81 L91 72 L82 68 L91 66 Z" />
      <Star d="M22 16 L24 22 L31 23 L25 27 L27 34 L21 30 L15 33 L17 26 L11 23 L18 22 Z" />
      <Splatter cx={108} cy={48} />
      <Splatter cx={14} cy={70} />
    </Art>
  );
}

function ConceptsArt() {
  const id = "concepts";
  const back = "M4 8 L16 4 L36 7 L48 3 L52 16 L47 32 L34 36 L14 33 L2 24 Z";
  const side = "M6 6 L22 2 L46 7 L50 20 L44 36 L24 40 L4 32 L2 16 Z";
  const front = "M8 10 L22 6 L40 11 L54 6 L60 18 L56 34 L40 40 L18 36 L6 28 Z";
  return (
    <Art id={id}>
      <g transform="rotate(-12 30 42)">
        <Sticker d={back} />
        <path d={back} fill={paper} stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
      </g>
      <g transform="translate(62 26) rotate(10 26 22)">
        <Sticker d={side} />
        <g clipPath={`url(#${id}-side)`}>
          <path d={side} fill={paper} />
          <rect width="80" height="70" fill={`url(#${id}-dots)`} opacity="0.55" />
        </g>
        <path d={side} fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
        <clipPath id={`${id}-side`}>
          <path d={side} />
        </clipPath>
      </g>
      <g transform="translate(30 28)">
        <Sticker d={front} />
        <g clipPath={`url(#${id}-front)`}>
          <path d={front} fill={teal} />
          <path d="M0 24 H70 V48 H0 Z" fill={neon} />
          <rect width="70" height="48" filter={`url(#${id}-grain)`} />
        </g>
        <path d={front} fill="none" stroke={paper} strokeWidth="1.8" strokeLinejoin="round" />
        <Mark d="M16 20 C26 17, 36 22, 48 18" color={paper} width={2.6} />
        <Mark d="M16 28 C24 26, 30 30, 38 27" color={paper} width={1.7} />
        <clipPath id={`${id}-front`}>
          <path d={front} />
        </clipPath>
      </g>
      <Tape x={58} y={30} rotate={-8} />
      <Slash d="M8 78 C20 72, 28 80, 40 74" width={4} />
      <Splatter cx={108} cy={16} />
    </Art>
  );
}

function RefineArt() {
  const id = "refine";
  return (
    <Art id={id}>
      <Slash d="M14 64 C26 52, 18 74, 36 60" width={5} />
      <g transform="rotate(-34 62 44)">
        <path d="M50 52 L70 50 L60 74 Z" fill={ink} transform="translate(1.4 1.6)" />
        <path d="M52 16 L68 14 L70 24 L50 26 Z" fill="#e7a3a3" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M50 26 L70 24 L72 50 L48 53 Z" fill="#efd08a" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M52 24 L68 22 L69 28 L51 30 Z" fill="#c98484" />
        <path d="M48 53 L72 50 L60 74 Z" fill={ink} />
        <path d="M52 52 L68 50 L60 64 Z" fill={paper} />
        <path d="M56 62 L64 60 L60 74 Z" fill={ink} />
        <Mark d="M59 32 L60 46" color="#f6e7b4" width={1.5} />
      </g>
      <Splatter cx={96} cy={22} />
      <Splatter cx={18} cy={24} />
    </Art>
  );
}

function PrintArt() {
  const id = "print";
  const banner = "M24 20 L40 16 L62 21 L84 15 L98 22 L96 40 L100 52 L82 58 L58 53 L36 60 L22 50 Z";
  return (
    <Art id={id}>
      <Mark d="M8 80 C28 76, 48 82, 70 77 C88 74, 100 80, 114 76" color={ink} width={2} />
      <path d="M16 12 L21 11 L22 74 L16 76 Z" fill={ink} />
      <path d="M98 10 L104 12 L102 75 L97 73 Z" fill={ink} />
      <Sticker d={banner} />
      <g clipPath={`url(#${id}-clip)`}>
        <path d={banner} fill={teal} />
        <path d="M0 44 H120 V70 H0 Z" fill={neon} />
        <rect x="60" y="16" width="42" height="40" fill={`url(#${id}-dots)`} opacity="0.4" />
        <rect width="120" height="88" filter={`url(#${id}-grain)`} />
      </g>
      <path d={banner} fill="none" stroke={paper} strokeWidth="2" strokeLinejoin="round" />
      <Mark d="M36 32 C48 28, 60 35, 76 30" color={paper} width={3} />
      <Mark d="M36 42 C46 40, 54 45, 66 41" color={paper} width={2} />
      <Slash d="M68 66 C80 60, 92 70, 108 62" />
      <Splatter cx={12} cy={20} />
      <clipPath id={`${id}-clip`}>
        <path d={banner} />
      </clipPath>
    </Art>
  );
}

function Sticker({ d }: { d: string }) {
  return <path d={d} fill={ink} transform="translate(2 2.5)" />;
}

function Mark({ d, color, width }: { d: string; color: string; width: number }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
}

function Slash({ d, width = 5 }: { d: string; width?: number }) {
  return <Mark d={d} color={yellow} width={width} />;
}

function Star({ d }: { d: string }) {
  return <path d={d} fill={paper} stroke={ink} strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round" />;
}

function Tape({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`} opacity="0.9">
      <rect x={x - 15} y={y - 5} width="30" height="10" fill={tape} />
      <path d={`M${x - 8} ${y - 5} v10 M${x + 3} ${y - 5} v10`} stroke="#cbb892" strokeWidth="0.8" />
    </g>
  );
}

function Splatter({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g fill={ink}>
      <circle cx={cx} cy={cy} r="1.5" />
      <circle cx={cx + 3} cy={cy - 1.5} r="0.65" />
      <circle cx={cx - 2.2} cy={cy + 1.6} r="0.5" />
      <circle cx={cx + 1} cy={cy + 2.4} r="0.35" />
    </g>
  );
}
