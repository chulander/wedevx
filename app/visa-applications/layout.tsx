import Hero from "@/components/Hero";
export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Hero />
      {children}
    </>
  );
}
