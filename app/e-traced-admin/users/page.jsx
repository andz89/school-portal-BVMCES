import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import UserTable from "./UserTable";

export default async function Page() {
  // 4. Render admin-only content
  return (
    <div>
      <div className="h-screen p-5">
        <UserTable />
      </div>
    </div>
  );
}
