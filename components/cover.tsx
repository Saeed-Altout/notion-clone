"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

export function Cover({ url, preview }: { url?: string; preview?: boolean }) {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCover);

  const onRemove = () => {
    if (!url) return;

    edgestore.publicFiles.delete({ url });

    const promise = removeCover({ id: params.documentId as Id<"documents"> });
    toast.promise(promise, {
      loading: "Removing cover...",
      success: "Cover removed!",
      error: "Failed to remove cover",
    });
  };

  return (
    <div
      className={cn(
        "relative h-[35vh] w-full group",
        url && "bg-muted",
        !url && "h-[12vh]"
      )}
    >
      {!!url && <Image src={url} alt="Cover" fill className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button size="sm" onClick={() => coverImage.onReplace(url)}>
            <ImageIcon />
            Change cover
          </Button>
          <Button size="sm" onClick={onRemove}>
            <XIcon />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
}
