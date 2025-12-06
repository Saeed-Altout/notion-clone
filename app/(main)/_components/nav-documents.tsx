"use client";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { DocumentItem } from "@/app/(main)/_components/document-item";

export function NavDocuments() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Tree />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function Tree({
  parentDocumentId,
  level = 0,
}: {
  parentDocumentId?: Id<"documents">;
  level?: number;
}) {
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  if (documents === undefined) {
    return null;
  }

  if (level === 0 && documents.length === 0) {
    return (
      <p className="text-muted-foreground/80 truncate pl-2 text-xs font-medium whitespace-nowrap">
        No pages
      </p>
    );
  }

  if (documents.length === 0) {
    if (level === 0) {
      return null;
    }
    return (
      <p className="text-muted-foreground/80 truncate pl-2 text-xs font-medium whitespace-nowrap">
        No pages inside
      </p>
    );
  }

  return (
    <>
      {documents.map((document) => (
        <SidebarMenuItem key={document._id}>
          <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
            <CollapsibleTrigger className="w-full">
              <DocumentItem document={document} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub
                style={{
                  width:
                    level === 1
                      ? `${100 - (level + 1) * 1}%`
                      : `${100 - (level + 1) * 2}%`,
                }}
              >
                <Tree parentDocumentId={document._id} level={level + 1} />
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      ))}
    </>
  );
}
