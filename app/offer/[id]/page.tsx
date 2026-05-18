"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Loader2 } from "lucide-react";

export default function OfferLetterPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchOffer() {
      const { data: application, error: fetchError } = await supabase
        .from("internship_applications")
        .select("*")
        .eq("id", id)
        .single();
        
      if (fetchError || !application) {
        console.error("Error fetching offer:", fetchError);
        setError("Offer letter not found or access denied.");
      } else {
        setData(application);
      }
      setLoading(false);
    }
    
    fetchOffer();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!letterRef.current || !data) return;
    
    try {
      setDownloading(true);
      
      const canvas = await html2canvas(letterRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff", // Ensure white background for PDF
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Matrix_Root_Offer_${data.full_name.replace(/\s+/g, '_')}.pdf`);
      
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00ffcc] animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Offer Not Found</h1>
        <p className="text-gray-400 text-center max-w-md">
          {error || "We couldn't locate this offer letter. Please verify the link you received in your email."}
        </p>
      </div>
    );
  }

  // Format the date dynamically based on when it was created
  const issueDate = new Date(data.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] py-12 px-4 flex flex-col items-center font-sans">
      
      {/* Controls */}
      <div className="max-w-[800px] w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Your Offer Letter</h1>
        <Button 
          onClick={handleDownloadPDF} 
          disabled={downloading}
          className="bg-[#00ffcc] text-black hover:bg-[#00e6b8] font-bold shadow-none flex items-center gap-2"
        >
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {downloading ? "Generating PDF..." : "Download PDF"}
        </Button>
      </div>

      {/* The Printable Offer Letter */}
      <div className="w-full max-w-[800px] bg-white rounded-lg overflow-hidden shadow-2xl relative">
        <div 
          ref={letterRef} 
          className="p-12 md:p-16 text-black bg-white"
          style={{ minHeight: "1056px" }} // Approx 11 inches for standard letter ratio
        >
          {/* Header */}
          <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter uppercase m-0 leading-none">Matrix Root</h1>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">Enterprise Engineering</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500">Ref: MR-INT-{data.id.substring(0, 8).toUpperCase()}</p>
              <p className="text-xs font-medium text-gray-500">Date: {issueDate}</p>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="mb-10">
            <h3 className="font-bold text-lg m-0">{data.full_name}</h3>
            <p className="text-sm text-gray-600 m-0">{data.college}</p>
            <p className="text-sm text-gray-600 m-0">{data.email}</p>
            <p className="text-sm text-gray-600 m-0">{data.phone_number}</p>
          </div>

          {/* Subject */}
          <div className="mb-8">
            <p className="font-bold underline decoration-2 underline-offset-4">Subject: Offer of Internship - {data.internship_domain}</p>
          </div>

          {/* Body */}
          <div className="space-y-6 text-sm leading-relaxed text-justify">
            <p>
              Dear <strong>{data.full_name}</strong>,
            </p>
            <p>
              Following your recent application and evaluation process, we are pleased to offer you an internship position at Matrix Root in the capacity of <strong>{data.internship_domain} Intern</strong>.
            </p>
            <p>
              During your internship, you will be exposed to our enterprise-grade engineering workflows, participating in the development, deployment, and optimization of production systems. This role is designed to elevate your technical capabilities within a fast-paced, professional environment.
            </p>
            <p>
              <strong>Key Terms of the Internship:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Duration:</strong> 8-Week Structured Track.</li>
              <li><strong>Domain:</strong> {data.internship_domain}.</li>
              <li><strong>Curriculum:</strong> You will be actively engaged in practical, project-based assignments reflecting real-world business requirements.</li>
              <li><strong>Certification:</strong> Upon successful completion and performance review, you will receive an MSME-recognized certification of completion.</li>
            </ul>
            <p>
              By accepting this offer, you agree to adhere to the company's confidentiality agreements, professional conduct guidelines, and operational standards. Intellectual property created during your tenure remains the sole property of Matrix Root.
            </p>
            <p>
              We are excited to welcome you to the ecosystem and look forward to your contributions.
            </p>
          </div>

          {/* Signatures */}
          <div className="mt-24 flex justify-between items-end">
            <div>
              <div className="border-t border-black w-48 pt-2">
                <p className="font-bold text-sm m-0">Authorized Signatory</p>
                <p className="text-xs text-gray-500 m-0">Matrix Root Administration</p>
              </div>
            </div>
            <div>
              <div className="border-t border-black w-48 pt-2">
                <p className="font-bold text-sm m-0">{data.full_name}</p>
                <p className="text-xs text-gray-500 m-0">Applicant Signature</p>
              </div>
            </div>
          </div>
          
          {/* Footer branding */}
          <div className="mt-16 text-center border-t border-gray-200 pt-4">
             <p className="text-[10px] text-gray-400 font-medium">Matrix Root • matrixroot.in • This is an automatically generated document.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
