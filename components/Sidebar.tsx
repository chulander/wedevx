"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
    <aside className="flex w-64 flex-col bg-white px-4 py-8 text-black">
      {/* Branding (Logo) */}
      <div className="mb-8 text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 59 18"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          role="img"
        >
          {/* Insert your existing SVG paths here */}
          <path
            d="M16.4837 0C16.2308 0 16.0258 0.204991 16.0258 0.45786V17.5472C16.0258 17.8001 16.2308 18.0051 16.4837 18.0051H19.2012C19.454 18.0051 19.659 17.8001 19.659 17.5472V0.45786C19.659 0.204991 19.454 0 19.2012 0H16.4837Z"
            fill="currentColor"
          ></path>
          {/* ... Omitted for brevity ... */}
        </svg>
      </div>

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
        <span className="text-sm font-medium">Admin</span>
      </div>
    </aside>
  );
}
