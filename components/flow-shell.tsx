import { Progress } from "@/components/progress";
import { Mark } from "@/components/ui";

export function FlowShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const width = "max-w-3xl";

  return (
      <div className={`mx-auto flex w-full ${width} flex-col px-5 pt-6 ${footer ? "pb-56" : "pb-16"}`}>
      <Mark />
      <Progress />
      <div className="mt-8">{children}</div>
      {footer ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-background/95 backdrop-blur">
          <div className={`mx-auto flex w-full ${width} flex-col gap-3 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]`}>
            {footer}
          </div>
        </div>
      ) : null}
    </div>
  );
}
