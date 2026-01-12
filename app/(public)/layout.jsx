import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import Navbar from "./component/header";
export default async function AuthLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❌ Not logged in → go to login
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
