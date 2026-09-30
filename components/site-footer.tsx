import { linkType } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className={`mt-16 bg-[#141210] px-5 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center text-[#C8FF4A] ${linkType}`}>
      <p className="inline-flex min-h-11 flex-wrap items-center justify-center gap-x-1">
        <span>Made with 💚 in Redwood City • by</span>
        <a
          href="https://jessica.is/"
          className="underline decoration-[#C8FF4A]/50 underline-offset-4 hover:decoration-[#C8FF4A]"
        >
          Jessica Phan
        </a>
      </p>
    </footer>
  );
}
