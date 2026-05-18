"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-[#00ffcc]/10 bg-[#0d0d0d] py-[64px] mt-[64px]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-16 md:grid-cols-4">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/img/Matrixroot_onlyimglogo-removebg-preview.png" alt="Logo" width={32} height={32} className="object-contain opacity-90" />
              <span className="font-bold text-base tracking-tight text-[#ffffff]">Matrix Root</span>
            </Link>
            <p className="max-w-md text-[#ffffff]/80 font-medium leading-relaxed text-xs">
              Enterprise-grade web development, custom AI automation, and technical software solutions designed for scalable business growth.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ffcc]/5 border border-[#00ffcc]/10 text-xs font-bold text-[#00ffcc]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>A Government Registered MSME Enterprise (UDYAM-TS-31-0053124)</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#ffffff] mb-6 uppercase">Navigation</h4>
            <ul className="space-y-3 text-xs font-medium text-[#ffffff]/80">
              <li><Link href="/#services" className="hover:text-[#ffffff] transition-colors">Services & Results</Link></li>
              <li><Link href="/careers" className="hover:text-[#ffffff] transition-colors">Internship Ecosystem</Link></li>
              <li><Link href="/careers" className="hover:text-[#ffffff] transition-colors">Explore Tracks</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#ffffff] mb-6 uppercase">Institution</h4>
            <ul className="space-y-3 text-xs font-medium text-[#ffffff]/80">
              <li><Link href="/apply" className="hover:text-[#ffffff] transition-colors">Apply for Internship</Link></li>
              <li><Link href="#" className="hover:text-[#ffffff] transition-colors">Privacy Charter</Link></li>
              <li><Link href="#" className="hover:text-[#ffffff] transition-colors">Support Operations</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-[64px] pt-8 border-t border-[#00ffcc]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#ffffff]/60 font-medium">
          <p>© {new Date().getFullYear()} Matrix Root. Practical Tech Infrastructure.</p>
          <div className="flex items-center gap-6">
            <span>Ecosystem Integrity</span>
            <div className="h-4 w-px bg-[#00ffcc]/10" />
            <span>Hyderabad & Bangalore, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
