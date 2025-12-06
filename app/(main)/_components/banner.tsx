"use client";

import { useMutation } from "convex/react";
import { TrashIcon, UndoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function Banner({ documentId }: { documentId: Id<"documents"> }) {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  return (
    <div className="bg-destructive flex w-full items-center justify-center gap-x-2 p-2 text-center text-sm text-white">
      <p>This page is in the trash</p>
      <Button variant="outline" size="sm" onClick={onRestore}>
        <UndoIcon className="h-4 w-4" />
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button variant="outline" size="sm">
          <TrashIcon className="h-4 w-4" />
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
