"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Navigation } from "./_components/navigation";

import { Spinner } from "@/components/ui/spinner";
import { SearchCommand } from "@/components/search-command";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
      <SearchCommand />
    </div>
  );
}
