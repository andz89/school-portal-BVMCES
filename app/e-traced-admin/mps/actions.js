"use server";

import { createClient } from "../../../utils/supabase/server";

import { revalidatePath } from "next/cache";

export async function createMPS(formData) {
  const supabase = await createClient();

  const school_year = formData.get("school_year");

  const { data, error } = await supabase
    .from("mps_descriptions")
    .insert({ school_year })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/mps");

  return data.id;
}

export async function createOrUpdateMPSData(formData) {
  const supabase = await createClient();

  const id = formData.get("id");
  const mps_description_id = formData.get("mps_description_id");
  const grade_level = formData.get("grade_level").toLowerCase();
  const section = formData.get("section").toLowerCase();

  const payload = {
    mps_description_id,
    grade_level,
    section,
    gmrc: formData.get("gmrc") || 0,
    epp: formData.get("epp") || 0,
    filipino: formData.get("filipino") || 0,
    english: formData.get("english") || 0,
    math: formData.get("math") || 0,
    science: formData.get("science") || 0,
    ap: formData.get("ap") || 0,
    mapeh: formData.get("mapeh") || 0,
    reading_literacy: formData.get("reading_literacy") || 0,
    link: formData.get("link"),
  };

  /* -----------------------------------
     1. DUPLICATE CHECK
  ----------------------------------- */
  let duplicateQuery = supabase
    .from("mps_data")
    .select("id")
    .eq("mps_description_id", mps_description_id)
    .eq("grade_level", grade_level)
    .eq("section", section);

  // Exclude self when updating
  if (id) {
    duplicateQuery = duplicateQuery.neq("id", id);
  }

  const { data: existing, error: duplicateError } =
    await duplicateQuery.maybeSingle();

  if (duplicateError) {
    throw new Error("Failed to validate existing MPS data");
  }

  if (existing) {
    throw new Error(`Grade ${grade_level} - Section ${section} already exists`);
  }

  /* -----------------------------------
     2. INSERT OR UPDATE
  ----------------------------------- */
  let result;

  if (id) {
    result = await supabase.from("mps_data").update(payload).eq("id", id);
  } else {
    result = await supabase.from("mps_data").insert(payload);
  }

  if (result.error) {
    console.error("MPS save error:", result.error);
    throw new Error(result.error.message);
  }

  /* -----------------------------------
     3. REVALIDATE
  ----------------------------------- */
  revalidatePath(`/admin/mps/${mps_description_id}`);

  return { success: true };
}
export async function deleteMPSData(id, mps_description_id) {
  const supabase = await createClient();

  const { error } = await supabase.from("mps_data").delete().eq("id", id);

  if (error) {
    console.error("Delete MPS error:", error);
    throw new Error("Failed to delete MPS data");
  }

  revalidatePath(`/admin/mps/${mps_description_id}`);
}
