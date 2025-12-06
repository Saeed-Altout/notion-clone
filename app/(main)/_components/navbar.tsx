"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function Navbar({
  isCollapsed,
  onResetWidth,
}: {
  isCollapsed: boolean;
  onResetWidth: () => void;
}) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background flex w-full items-center gap-x-4 px-3 py-2">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background flex w-full items-center gap-x-4 px-3 py-2">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="text-muted-foreground h-4 w-4"
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
