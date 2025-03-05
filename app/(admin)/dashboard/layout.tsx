import Sidebar from "@/components/Sidebar";
import { getUserFromToken } from "@/utils/authTools";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromToken();
  if (!user) {
    redirect("/signin");
  }
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto text-black sm:border-l-2">
        {children}
      </main>
    </div>
  );
}
