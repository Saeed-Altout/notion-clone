"use client";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  const isScrolling = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background dark:bg-[#1F1F1F] flex items-center w-full p-6",
        isScrolling && "border-b"
      )}
    >
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button variant="ghost">Login</Button>
        <ModeToggle />
      </div>
    </div>
  );
}
