"use client";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "./logo";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";

export function Navbar() {
  const isScrolling = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background dark:bg-[#1F1F1F] flex items-center w-full p-6",
        isScrolling && "border-b"
      )}
    >
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        {isLoading && <Spinner />}

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
