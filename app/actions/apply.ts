"use server";

import { supabase } from "@/lib/supabaseClient";

export async function submitApplication(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const college = formData.get("college") as string;
  const yearOfStudy = formData.get("yearOfStudy") as string;
  const courseOfStudy = formData.get("courseOfStudy") as string;
  const internshipDomain = formData.get("internshipDomain") as string;
  const termsAccepted = formData.get("termsAccepted") === "on";

  if (!fullName || !email || !phoneNumber || !college || !yearOfStudy || !courseOfStudy || !internshipDomain || !termsAccepted) {
    return { error: "All fields are required, including accepting the terms and conditions." };
  }

  const { error } = await supabase
    .from("internship_applications")
    .insert([
      {
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        college,
        year_of_study: yearOfStudy,
        course_of_study: courseOfStudy,
        internship_domain: internshipDomain,
        terms_accepted: termsAccepted,
      },
    ]);

  if (error) {
    console.error("Error inserting application:", error);
    return { error: "Failed to submit application. Please try again." };
  }

  return { success: true };
}
