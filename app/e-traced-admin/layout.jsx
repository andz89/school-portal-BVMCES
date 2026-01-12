import { redirect } from "next/navigation";
import { checkRole } from "../../utils/lib/checkRole";

import AdminMenu from "./components/AdminMenu";
import UserMenu from "./components/userMenu";

export default async function AuthLayout({ children }) {
  const profile = await checkRole();
  // 3. Block non-admins
  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/");
  }
  return (
    <>
      {profile.role == "admin" ? <AdminMenu /> : <UserMenu />}
      {children}
    </>
  );
}
