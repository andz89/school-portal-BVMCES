import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import AddMPSDataModal from "./AddMPSDataModal";
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
      gmrc,
      epp,
      filipino,
      english,
      math,
      science,
      ap,
      mapeh,
      reading_literacy,
      created_at
    `
    )
    .eq("mps_description_id", mps.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">MPS – {mps.school_year}</h1>
        <p className="text-sm text-gray-500">
          Created on {new Date(mps.created_at).toLocaleDateString()}
        </p>
      </div>
      <MPSClientTable mpsId={mps.id} mpsData={mpsData ?? []} />
    </div>
  );
}
