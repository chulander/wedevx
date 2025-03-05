import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto text-black">{children}</main>
    </div>
  );
}
