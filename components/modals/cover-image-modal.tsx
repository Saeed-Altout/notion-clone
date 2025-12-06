"use client";

import { useCallback } from "react";

import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SingleImageDropzone } from "../upload/single-image";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { UploaderProvider, UploadFn } from "../upload/uploader-provider";

export function CoverImageModal() {
  const params = useParams();

  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      coverImage.onClose();
      return res;
    },
    [edgestore, params.documentId, update, coverImage],
  );

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cover Image</DialogTitle>
          <DialogDescription>Manage your cover image.</DialogDescription>
        </DialogHeader>
        <Separator />
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <SingleImageDropzone
            height={200}
            width={200}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1, // 1 MB
            }}
            className="border-2-primary/5 hover:border-primary w-full! transition-all outline-none"
          />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
}
