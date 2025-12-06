"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function DocumentIdPage() {
  const params = useParams();

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({ id: params.documentId as Id<"documents">, content });
  };

  if (document === undefined) {
    return (
      <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
        <Cover.Skeleton />
        <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pt-6 pl-8">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="mb-40">
      <Cover url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}
