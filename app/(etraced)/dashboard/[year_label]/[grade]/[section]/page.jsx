import Link from "next/link";
import { createClient } from "../../../../../../utils/supabase/server";

import { checkRole } from "../../../../../../utils/lib/checkRole";
import MPSClientTable from "./mps/MPSClientTable";
export default async function Page({ params, searchParams }) {
  const { section } = await params;
  const { id } = await searchParams;
  const { year_label } = await params;
  const { grade } = await params;

  const supabase = await createClient();
  const profile = await checkRole();
  const { data: mpsData } = await supabase
    .from("mps")
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
    .eq("class_id", id)
    .eq("grade_level", grade)
    .eq("section", section)
    .order("created_at", { ascending: false });
  console.log(mpsData);
  console.log(grade);
  console.log(section);

  return (
    <div className="py-6 px-2 space-y-6 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold">
        {grade.toUpperCase().replace("-", " ")} - {section.toUpperCase()}
      </h2>

      <MPSClientTable
        section={section}
        grade={grade}
        year_label={year_label}
        profile={profile}
        classID={id}
        mpsData={mpsData ?? []}
      />
    </div>
  );
}
