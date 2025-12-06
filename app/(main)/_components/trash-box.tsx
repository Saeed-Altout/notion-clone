"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { SearchIcon, TrashIcon, UndoIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export function TrashBox() {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState<string>("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };
  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (!documents) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="text-muted-foreground text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <SearchIcon className="h-4 w-4" />
        <Input
          placeholder="Filter by page title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-secondary h-7 px-2 focus-visible:ring-transparent"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="text-muted-foreground hidden pb-2 text-center text-xs last:block">
          No pages in trash
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="hover:bg-primary/5 text-primary flex w-full items-center justify-between rounded-sm text-sm"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <UndoIcon className="text-muted-foreground h-4 w-4" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  <TrashIcon className="text-muted-foreground h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
