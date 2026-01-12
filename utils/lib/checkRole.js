import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function checkRole() {
  const supabase = await createClient();

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Get role from profile table
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  // 3. Block non-admins
  return profile;
}
