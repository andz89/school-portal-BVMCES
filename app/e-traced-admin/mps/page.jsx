import Link from "next/link";
import { createClient } from "../../../utils/supabase/server";
import MPSCreateModal from "./MPSCreateModal";

export default async function Page() {
  const supabase = await createClient();

  const { data: mpsList, error } = await supabase
    .from("mps_descriptions")
    .select("id, school_year, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">MPS</h1>
        <p className="text-sm text-gray-500">
          Manage MPS descriptions by school year
        </p>
      </div>

      <MPSCreateModal />

      {/* MPS List */}
      <div className="bg-white rounded border">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-3">School Year</th>
              <th className="text-left p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {mpsList.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No MPS records yet
                </td>
              </tr>
            )}

            {mpsList.map((mps) => (
              <tr key={mps.id} className="border-b last:border-0">
                <td className="p-3 font-medium">
                  <Link href={`/e-traced-admin/mps/` + mps.id}>
                    {mps.school_year}{" "}
                  </Link>{" "}
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(mps.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
