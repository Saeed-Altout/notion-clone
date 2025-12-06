"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { CheckIcon, CopyIcon, EyeIcon, GlobeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function Publish({ initialData }: { initialData: Doc<"documents"> }) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const url = `${origin}/preview/${initialData?._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published!",
      error: "Failed to publish",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Unpublished!",
      error: "Failed to unpublish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          Publish
          {initialData.isPublished && (
            <GlobeIcon className="ml-2 h-4 w-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <GlobeIcon className="h-4 w-4 text-sky-500" />
              <p className="text-xs font-medium text-sky-500">
                This document is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="bg-muted h-8 flex-1 truncate rounded-l-md border px-2 text-xs"
                disabled
              />
              <Button onClick={onCopy} disabled={copied} size="icon">
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              disabled={isSubmitting}
              onClick={onUnpublish}
              className="w-full text-xs"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <GlobeIcon className="text-muted-foreground mb-2 h-8 w-8" />
            <p className="mb-2 text-sm font-medium">Publish this document</p>
            <p className="text-muted-foreground mb-4 text-xs">
              Share your work with others.
            </p>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
