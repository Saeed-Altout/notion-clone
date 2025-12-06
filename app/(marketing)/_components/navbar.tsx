"use client";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "./logo";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  const isScrolling = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "bg-background fixed top-0 right-0 left-0 z-50 flex w-full items-center p-6 py-4",
        isScrolling && "border-b",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {!isLoading && !isAuthenticated && (
          <div className="flex items-center gap-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignInButton>
          </div>
        )}
        {!isLoading && isAuthenticated && (
          <div className="flex items-center gap-x-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton />
          </div>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}
