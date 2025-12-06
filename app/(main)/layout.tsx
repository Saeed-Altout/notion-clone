"use client";
import { useConvexAuth } from "convex/react";
import { redirect, useParams } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { SearchCommand } from "@/components/search-command";

import { NavActions } from "./_components/nav-actions";
import { AppSidebar } from "./_components/app-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const params = useParams();

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
          {!!params.documentId && (
            <div className="ml-auto px-3">
              <NavActions />
            </div>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4">
          {children}
          <SearchCommand />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
