"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronsUpDownIcon } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserItem() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="hover:bg-primary/5 flex w-full items-center p-3 text-sm"
        >
          <div className="flex max-w-[150px] items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="line-clamp-1 font-medium">{user?.fullName}</p>
            </div>
          </div>
          <ChevronsUpDownIcon className="text-muted-foreground ml-2 h-4 w-4 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start" forceMount>
        <DropdownMenuLabel className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="line-clamp-1 text-sm leading-none font-medium">
              {user?.fullName} &apos;s Jotion
            </p>
            <p className="text-muted-foreground line-clamp-1 text-xs leading-none">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          asChild
          className="w-full cursor-pointer"
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
