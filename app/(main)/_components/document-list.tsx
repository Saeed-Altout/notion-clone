"use client";

import { useState } from "react";
import { FileIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Item } from "./item";

export function DocumentList({
  parentDocumentId,
  level = 0,
}: {
  parentDocumentId?: Id<"documents">;
  level?: number;
}) {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: Id<"documents">) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>

      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            expanded={expanded[document._id]}
            icon={FileIcon}
            level={level}
            onClick={() => onRedirect(document._id)}
            onExpand={() => onExpand(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
