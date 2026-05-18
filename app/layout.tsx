import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matrix Root | Enterprise Software Solutions & IT Internships",
  description: "Registered MSME enterprise offering production-grade full-stack web development and comprehensive 30-day practical internship evaluations.",
  keywords: ["Matrixroot", "Matrix Root", "Virtual Internship", "Software Agency Hyderabad"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0d0d0d] text-white selection:bg-[#00ffcc] selection:text-black">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
