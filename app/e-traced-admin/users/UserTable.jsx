import React from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/server";
import DeleteUserButton from "./DeleteUserButton";

import UserFormModal from "./UserFormModal";
const UserTable = async () => {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("users")
    .select("id, full_name, email, role, grade")
    .neq("email", "andzrivero89@gmail.com")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-white   rounded-lg p-6  mx-auto  ">
      <UserFormModal />
      <h3 className="text-lg font-semibold mb-4">Users</h3>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-1 bg-gray-50 border-slate-400 text-left">
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Role</th>
            <th className="py-2 px-3">Grade</th>
            <th className="py-2 px-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-1 border-slate-400">
              <td className="py-2 px-3">{user.full_name}</td>
              <td className="py-2 px-3">{user.email}</td>
              <td className="py-2 px-3 capitalize">{user.role}</td>
              <td className="py-2 px-3">{user.grade ?? "-"}</td>

              {/* Actions */}
              <td className="py-2 px-3 text-right space-x-2">
                <Link
                  href={`/e-traced-admin/users/edit/${user.id}`}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Edit
                </Link>

                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))}

          {!users?.length && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
