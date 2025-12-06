import { Logo } from "./logo";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <div className="bg-background z-50 flex w-full items-center p-6">
      <Logo />
      <div className="text-muted-foreground flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <Button variant="link" size="xs">
          Privacy Policy
        </Button>
        <Button variant="link" size="xs">
          Terms of Conditions
        </Button>
      </div>
    </div>
  );
}
