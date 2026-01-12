import Link from "next/link";

export default function UserMenu() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
        <Link
          href="/user/dashboard"
          className="font-medium text-gray-800 hover:text-blue-600"
        >
          Dashboard
        </Link>

        <Link href="/profile" className="text-gray-600 hover:text-blue-600">
          Profile
        </Link>

        <Link href="/settings" className="text-gray-600 hover:text-blue-600">
          Settings
        </Link>
        <Link href="/access" className="text-gray-600 hover:text-blue-600">
          Pages
        </Link>
      </div>
    </nav>
  );
}
