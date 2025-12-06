import Image from "next/image";

export function Heroes() {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center gap-x-8">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            alt="Documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/documents-dark.png"
            alt="Documents"
            fill
            className="hidden object-contain dark:block"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            src="/reading.png"
            alt="Reading"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="Reading"
            fill
            className="hidden object-contain dark:block"
          />
        </div>
      </div>
    </div>
  );
}
