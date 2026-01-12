import { React } from "react";
import LoginUserForm from "./LoginUserForm";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
const signin = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //  Not logged in → go to login
  if (user) {
    redirect("/user/dashboard");
  }
  return (
    <>
      <LoginUserForm />
    </>
  );
};

export default signin;
