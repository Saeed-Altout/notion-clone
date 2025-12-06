"use client";
import { UserResource } from "@clerk/types";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

import { UserAvatar } from "./user-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function UserItem() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <UserAvatar user={user as UserResource} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        align="start"
        sideOffset={12}
        side="right"
        forceMount
      >
        <DropdownMenuLabel>
          <UserAvatar user={user as UserResource} showEmail />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <SignOutButton>
            <div className="flex items-center">
              <LogOutIcon className="h-4 w-4" />
              Log out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
