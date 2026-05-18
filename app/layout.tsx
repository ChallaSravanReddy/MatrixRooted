import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <header className="w-full border-b border-[#222]">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#00ffcc]">&gt;</span> Matrix Root
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link href="/#services" className="hover:text-[#00ffcc] transition-colors">Services</Link>
              <Link href="/careers" className="hover:text-[#00ffcc] transition-colors">Careers</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
