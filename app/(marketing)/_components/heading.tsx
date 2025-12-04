"use client";

import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";
import { useConvexAuth } from "convex/react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignInButton } from "@clerk/nextjs";

export function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, documents, & plans. Unified. Welcome to
        <span className="underline">Jotion</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <Button>
          <Spinner />
        </Button>
      )}
      {!isLoading && isAuthenticated && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button>
            Get Jotion free <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
