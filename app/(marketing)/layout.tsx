import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full  ">
      <Navbar />
      <main className="pt-40 h-full">{children}</main>
    </div>
  );
}
