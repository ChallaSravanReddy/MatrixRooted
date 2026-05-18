"use server";

import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";



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

  const { data, error } = await supabase
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
    ])
    .select()
    .single();

  if (error) {
    console.error("Error inserting application:", error);
    
    // Provide a more helpful error message based on common Supabase issues
    if (error.code === '42P01') {
      return { error: "Database error: The 'internship_applications' table is missing. Please run the SQL script in your Supabase dashboard." };
    }
    if (error.code === '42501') {
      return { error: "Database error: Row Level Security (RLS) is blocking the submission. Please disable RLS or add a public insert policy." };
    }
    
    return { error: `Failed to submit application: ${error.message || "Unknown database error"}` };
  }

  // If successful, send the automated offer letter email
  if (data?.id) {
    try {
      // Use the NEXT_PUBLIC_SITE_URL or fallback to localhost for local testing
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const offerLink = `${siteUrl}/offer/${data.id}`;
      
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: "Matrix Root Ecosystem <onboarding@resend.dev>", // Resend testing domain
        to: email, // This will only work if the email is verified in Resend free tier, or if a custom domain is verified.
        subject: "Congratulations! Your Matrix Root Internship Offer Letter",
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #ffffff; background-color: #0d0d0d; border: 1px solid #222; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #141414; padding: 30px; text-align: center; border-bottom: 1px solid #00ffcc20;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">
                <span style="color: #00ffcc;">></span> Matrix Root
              </h1>
            </div>
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear <strong>${fullName}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6;">Congratulations! Based on your application, we are thrilled to offer you a position in the <strong>${internshipDomain}</strong> track.</p>
              <p style="font-size: 16px; line-height: 1.6;">Your profile aligns with our production-ready ecosystem, and we are excited to invite you to begin your onboarding process.</p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${offerLink}" style="background-color: #00ffcc; color: #000000; padding: 16px 32px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; font-size: 14px;">
                  View & Download Official Offer Letter
                </a>
              </div>
              
              <p style="font-size: 14px; line-height: 1.6; color: #aaaaaa;">Click the button above to access your secure portal, review the terms, and download your official PDF document.</p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #222;">
                <p style="margin: 0; font-size: 14px; color: #aaaaaa;">Welcome to the team,</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #ffffff;">The Matrix Root Engineering Team</p>
              </div>
            </div>
          </div>
        `,
      });
      console.log(`Successfully sent offer letter email to ${email}`);
    } catch (emailError) {
      console.error("Failed to send automated email via Resend:", emailError);
      // We don't return an error to the user here because their application WAS successfully saved to the database.
    }
  }

  return { success: true };
}
