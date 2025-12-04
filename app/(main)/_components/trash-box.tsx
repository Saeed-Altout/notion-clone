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
    documentId: Id<"documents">
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
      <div className="p-4 flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="text-sm text-muted-foreground">
      <div className="flex items-center gap-x-1 p-2">
        <SearchIcon className="h-4 w-4" />
        <Input
          placeholder="Filter by page title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No pages in trash
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <UndoIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  <TrashIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
