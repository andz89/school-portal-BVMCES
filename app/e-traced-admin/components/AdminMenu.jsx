"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMenu() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `  ${
      pathname === path
        ? "bg-gray-300 rounded-sm p-2"
        : "border-transparent text-gray-600 hover:text-red-600"
    }`;

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-8">
        <Link href="/e-traced-admin" className={linkClass("/e-traced-admin")}>
          Dashboard
        </Link>

        <Link
          href="/e-traced-admin/users"
          className={linkClass("/e-traced-admin/users")}
        >
          Users
        </Link>

        <Link href="/admin/mps" className={linkClass("admin/mps")}>
          MPS
        </Link>

        <Link href="/admin/settings" className={linkClass("/admin/settings")}>
          Settings
        </Link>
        <Link href="/access" className="text-gray-600 hover:text-blue-600">
          Pages
        </Link>
      </div>
    </nav>
  );
}
