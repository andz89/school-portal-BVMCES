import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function checkRole(requiredRole = "admin") {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile, error } = await supabase
      .from("users")
      .select("role ,grade")
      .eq("id", user.id)
      .single();

    return profile;
  }
}
