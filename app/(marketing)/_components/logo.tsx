import Image from "next/image";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function Logo() {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={30}
        height={30}
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        width={30}
        height={30}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
}
