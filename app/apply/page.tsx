"use client";

import { useState } from "react";
import { submitApplication } from "@/app/actions/apply";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await submitApplication(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({ type: "success", text: "Application submitted successfully! We will contact you soon." });
      (event.target as HTMLFormElement).reset();
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0] py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl border border-[#8B4513]/10 shadow-xl overflow-hidden">
        <div className="bg-[#8B4513]/5 px-8 py-10 text-center border-b border-[#8B4513]/10">
          <h1 className="text-3xl font-bold tracking-tight text-[#3D2B1F] mb-3">Apply for Internship</h1>
          <p className="text-[#3D2B1F]/70 max-w-lg mx-auto">
            Join the Matrix Root Ecosystem. Fill out the form below to begin your application process for our internship programs.
          </p>
        </div>

        <div className="p-8 md:p-12">
          {message && (
            <div className={`mb-8 p-4 rounded-lg font-medium text-sm ${message.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#3D2B1F] font-semibold">Full Name</Label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  required
                  placeholder="John Doe"
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#3D2B1F] font-semibold">Gmail</Label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder="john.doe@gmail.com"
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-[#3D2B1F] font-semibold">Phone Number</Label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  required
                  placeholder="+91 9876543210"
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="college" className="text-[#3D2B1F] font-semibold">College Name</Label>
                <input 
                  type="text" 
                  id="college" 
                  name="college" 
                  required
                  placeholder="Matrix Institute of Technology"
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseOfStudy" className="text-[#3D2B1F] font-semibold">Course of Study</Label>
                <input 
                  type="text" 
                  id="courseOfStudy" 
                  name="courseOfStudy" 
                  required
                  placeholder="e.g., B.Tech CSE, BCA, MCA"
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearOfStudy" className="text-[#3D2B1F] font-semibold">Year of Study</Label>
                <select 
                  id="yearOfStudy" 
                  name="yearOfStudy" 
                  required
                  className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Passed Out">Passed Out</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="internshipDomain" className="text-[#3D2B1F] font-semibold">Internship Domain</Label>
              <select 
                id="internshipDomain" 
                name="internshipDomain" 
                required
                className="flex h-10 w-full rounded-md border border-[#8B4513]/20 bg-white/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
              >
                <option value="">Select Domain</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Machine Learning / AI">Machine Learning / AI</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud Computing">Cloud Computing</option>
              </select>
            </div>

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox id="termsAccepted" name="termsAccepted" required className="mt-1 border-[#8B4513]/30 data-[state=checked]:bg-[#8B4513] data-[state=checked]:text-white" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="termsAccepted"
                  className="text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#3D2B1F]/80"
                >
                  Accept Terms and Conditions
                </label>
                <p className="text-xs text-[#3D2B1F]/60">
                  By applying, you agree to our Terms of Service and Privacy Policy. You confirm that all provided information is accurate.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#D2B48C] text-[#3D2B1F] hover:bg-[#C1A37B] font-bold py-6 text-base rounded-xl transition-all shadow-md hover:shadow-lg" disabled={loading}>
                {loading ? "Submitting Application..." : "Apply for Internship"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
