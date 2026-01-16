import Link from "next/link";
import { createClient } from "../../../utils/supabase/server";
import MPSCreateModal from "./MPSCreateModal";
import { profile } from "console";

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
    <div className="p-6 space-y-6 h-screen">
      <div>
        <h1 className="text-xl font-semibold">MPS</h1>
        <p className="text-sm text-gray-500">
          Manage MPS descriptions by school year
        </p>
      </div>

      {profile.role === "admin" && <MPSCreateModal />}

      {/* MPS List */}
      <div className="bg-white rounded  ">
        <div className=" flex gap-2 w-full flex-wrap  ">
          {mpsList.length === 0 && (
            <div className="p-4 text-center text-gray-500 border rounded bg-gray-50">
              No MPS records yet
            </div>
          )}

          {mpsList.map((mps) => (
            <div key={mps.id} className="w-[300px]">
              <Link href={`/mps/${mps.id}`}>
                <div
                  key={mps.id}
                  className="flex items-center justify-between border rounded p-4 bg-white hover:bg-gray-50 transition"
                >
                  <div>
                    <div className="text-sm font-semibold text-blue-600  ">
                      {mps.school_year}
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Created: {new Date(mps.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-xs text-gray-400">→</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
