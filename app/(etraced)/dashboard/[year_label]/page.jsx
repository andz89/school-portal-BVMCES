import { redirect } from "next/navigation";
import { getClasses } from "./actions";
import ClassClient from "./ClassClient";
import { checkRole } from "../../../../utils/lib/checkRole";
export default async function Page({ params, searchParams }) {
  const { year_label } = await params;
  const { id } = await searchParams;
  const profile = await checkRole();

  if (id === null || id === undefined) {
    redirect("/dashboard");
  }
  const classes = await getClasses(id, profile);

  return (
    <div className="p-6 space-y-6 h-screen">
      <h1 className="text-xl font-semibold">
        Classes for School Year {year_label}
      </h1>

      <ClassClient
        school_year_id={id}
        profile={profile}
        year_label={year_label}
        initialData={classes}
      />
    </div>
  );
}
