import { UserResource } from "@clerk/types";
import { ChevronsUpDownIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  user,
  showEmail = false,
}: {
  user: UserResource | null;
  showEmail?: boolean;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center gap-x-2">
        <Avatar className="size-6">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1">
          <p className="line-clamp-1 text-sm leading-none font-medium">
            {user?.fullName} &apos;s Jotion
          </p>
          {showEmail && (
            <p className="text-muted-foreground line-clamp-1 text-xs leading-none">
              {user?.emailAddresses[0].emailAddress}
            </p>
          )}
        </div>
      </div>
      <ChevronsUpDownIcon className="text-muted-foreground ml-2 h-4 w-4 shrink-0" />
    </div>
  );
}
