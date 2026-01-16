import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import { checkRole } from "../../../../utils/lib/checkRole";
import MPSClientTable from "./MPSClientTable";
export default async function Page({ params }) {
  const supabase = await createClient();
  const p = await params;
  const { data: mps, error } = await supabase
    .from("mps_descriptions")
    .select("id, school_year, created_at")
    .eq("id", p.id)
    .single();

  if (error || !mps) notFound();

  const { data: mpsData } = await supabase
    .from("mps_data")
    .select(
      `
      id,
      grade_level,
      section,
      quarter,
      gmrc,
      epp,
      filipino,
      english,
      math,
      science,
      ap,
      mapeh,
      reading_literacy,
      link,
      created_at
    `
    )
    .eq("mps_description_id", mps.id)
    .order("created_at", { ascending: false });
  const profile = await checkRole();

  return (
    <div className="p-6 space-y-6 ">
      <div>
        <h1 className="text-xl font-semibold">MPS – {mps.school_year}</h1>
        <p className="text-sm text-gray-500">
          Created on {new Date(mps.created_at).toLocaleDateString()}
        </p>
      </div>
      <MPSClientTable
        profile={profile}
        mpsId={mps.id}
        mpsData={mpsData ?? []}
      />
    </div>
  );
}
