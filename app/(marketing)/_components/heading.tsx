"use client";

import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your ideas, documents, & plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>.
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <div className="flex h-10 items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && isAuthenticated && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button>
            Get Jotion free <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
