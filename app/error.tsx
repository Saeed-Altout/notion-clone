"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        alt="Error"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        alt="Error"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
}
