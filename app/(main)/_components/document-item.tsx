"use client";

import {
  ChevronRight,
  FileIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function DocumentItem({ document }: { document: Doc<"documents"> }) {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();

  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const onRedirect = () => {
    router.push(`/documents/${document._id}`);
  };

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const promise = archive({ id: document._id! });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to move note to trash",
    });
  };

  const onCreate = () => {
    if (!document._id) return;

    const promise = create({
      title: "Untitled",
      parentDocument: document._id,
    }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new page...",
      success: "New page created!",
      error: "Failed to create a new page",
    });
  };

  return (
    <SidebarMenuButton
      className="group/button"
      isActive={params.documentId === document._id}
      onClick={onRedirect}
    >
      <ChevronRight className={cn("transition-transform")} />
      {document.icon ? (
        <span className="size-4">{document.icon}</span>
      ) : (
        <FileIcon />
      )}
      <span className="truncate">{document.title}</span>
      <div className="ml-auto flex items-center gap-x-2 opacity-0 group-hover/button:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontalIcon className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-72"
            align="start"
            side="right"
            forceMount
            sideOffset={47}
          >
            <DropdownMenuItem variant="destructive" onClick={onArchive}>
              <TrashIcon className="size-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-muted-foreground p-2 text-xs">
              Last edited by: {user?.fullName}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            onCreate();
          }}
        >
          <PlusIcon className="text-muted-foreground size-4" />
        </Button>
      </div>
    </SidebarMenuButton>
  );
}

DocumentItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
