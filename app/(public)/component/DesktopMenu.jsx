import Link from "next/link";
import { logout } from "../../auth/actions";
import { createClient } from "../../../utils/supabase/server";
import { checkRole } from "../../../utils/lib/checkRole";

export default async function DesktopMenu() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  let isAdmin = false;
  let isEditor = false;

  // if (user) {
  //   const { data: profile } = await supabase
  //     .from("users")
  //     .select("role")
  //     .eq("id", user.id)
  //     .single();

  //   isAdmin = profile?.role === "admin";
  //   isEditor = profile?.role === "editor";
  // }
  // if (!user) return null;

  const profile = await checkRole();
  isAdmin = profile?.role === "admin";
  isEditor = profile?.role === "editor";
  return (
    <>
      <div className="hidden  md:flex    gap-8  ">
        <Link href="/access" className="text-gray-700 hover:text-blue-700">
          Access
        </Link>

        <Link href="/equity" className="text-gray-700 hover:text-blue-700">
          Equity
        </Link>

        {/* Quality Dropdown */}
        <div className="relative group">
          <span className="cursor-pointer text-gray-700 hover:text-blue-700">
            Quality
          </span>

          <div className="absolute left-0 top-full z-50 hidden w-48 border bg-white shadow-md group-hover:block">
            <Link
              href="/quality/mps"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              MPS
            </Link>
            <Link
              href="/quality/gpa"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              GPA
            </Link>
            <Link
              href="/quality/diagnostic"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Diagnostic
            </Link>
            <Link
              href="/quality/rna"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              RMA
            </Link>
          </div>
        </div>

        <Link
          href="/resilience-well-being"
          className="text-gray-700 hover:text-blue-700"
        >
          Resiliency & Well-being
        </Link>

        <Link
          href="/enabling-mechanism"
          className="text-gray-700 hover:text-blue-700"
        >
          Enabling Mechanism
        </Link>
        {/* ✅ Admin-only menu item */}
      </div>

      <div className="hidden md:flex items-center gap-4">
        {isEditor && (
          <div>
            <Link
              href="/user-dashboard"
              className="text-gray-700 bg-slate-900 p-3 rounded-sm text-white"
            >
              Dashboard
            </Link>
          </div>
        )}
        {isAdmin && (
          <div>
            <Link
              href="/admin-dashboard"
              className="text-white bg-slate-900 p-3 rounded-sm"
            >
              Administration
            </Link>
          </div>
        )}
        <form>
          <button
            formAction={logout}
            className=" bg-blue-500 text-white font-medium rounded shadow-sm p-2 w-full"
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
}
