"use client";

import { PlusCircleIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useSearchStore } from "@/hooks/use-search-store";
import { useSettingsStore } from "@/hooks/use-settings";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Kbd } from "@/components/ui/kbd";

export function NavMain() {
  const router = useRouter();

  const create = useMutation(api.documents.create);
  const search = useSearchStore((state) => state.toggle);
  const settings = useSettingsStore((state) => state.toggle);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={search}>
          <SearchIcon />
          <span>Search</span>
          <Kbd className="ml-auto">⌘ K</Kbd>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={settings}>
          <SettingsIcon />
          <span>Settings</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={onCreate}>
          <PlusCircleIcon />
          <span>New page</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
