"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

// Example navigation links
const links = [
  { route: "/dashboard/leads", name: "Leads" },
  { route: "/dashboard/settings", name: "Settings" },
];

// Helper function to see if a route is active
function isActive(path: string, route: string) {
  // Return true if the current path starts with the route
  return path === route || path.startsWith(route);
}

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      // Make a request to your sign-out endpoint, which clears cookies
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (res.ok) {
        // Redirect to sign-in page or homepage after successful sign-out
        router.push("/signin");
      } else {
        console.error("Sign out failed.");
      }
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setSigningOut(false);
  }

  return (
    <aside className="flex w-64 flex-col bg-white px-4 py-8 text-black sm:min-h-screen">
      {/* Branding (Logo) */}
      <Link href="/" className="text-md mb-8 font-bold">
        <Logo />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 text-lg">
        {links.map((link) => {
          const active = isActive(path, link.route)
            ? "font-bold text-black"
            : "text-gray-700 hover:text-black";
          return (
            <Link key={link.route} href={link.route} className={active}>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Admin Avatar Section */}
      <div className="mt-auto flex items-center gap-3">
        {/* Circle Avatar */}
        <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-800"
          onClick={handleSignOut}
          title="Sign Out"
        >
          {signingOut ? (
            <span className="text-sm">...</span> // Loading indicator
          ) : (
            <span className="font-bold">A</span> // Letter in the circle
          )}
        </div>
        <span
          onClick={handleSignOut}
          className="cursor-pointer text-sm font-medium"
        >
          Admin Sign Out
        </span>
      </div>
    </aside>
  );
}
