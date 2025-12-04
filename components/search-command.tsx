"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";

import { useSearchStore } from "@/hooks/use-search-store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchCommand() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);

  const toggle = useSearchStore((state) => state.toggle);
  const onClose = useSearchStore((state) => state.onClose);
  const onOpen = useSearchStore((state) => state.onOpen);
  const isOpen = useSearchStore((state) => state.isOpen);

  const onSelect = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return (
    <CommandDialog open={isOpen} onOpenChange={isOpen ? onClose : onOpen}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <FileIcon className="h-4 w-4 mr-2" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
