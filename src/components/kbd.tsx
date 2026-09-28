import type { ReactNode } from "react";

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-[7px] border border-[rgba(27,31,38,0.12)] border-b-[rgba(27,31,38,0.2)] bg-white px-1.5 font-sans text-[12.5px] font-medium text-[#1b1f26] shadow-[0_1px_0_rgba(27,31,38,0.06)]">
      {children}
    </kbd>
  );
}
