import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] px-6 py-20 space-y-32">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Building Scalable Digital <br className="hidden md:block" />
          <span className="text-[#00ffcc]">Infrastructure for the Future.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
          Matrix Root is a Government Registered MSME Enterprise. We balance real-world client operations with rigorous student workforce development to engineer the next generation of the web.
        </p>
      </section>

      {/* Core Pillars Section */}
      <section id="services" className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#141414] border border-[#222] p-8 rounded-xl hover:border-[#00ffcc] transition-colors group">
            <div className="h-12 w-12 rounded bg-[#0d0d0d] border border-[#222] flex items-center justify-center mb-6 group-hover:border-[#00ffcc] transition-colors">
              <svg className="w-6 h-6 text-[#00ffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Web & App Engineering</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building responsive platforms via Next.js & Vercel Edge. We architect high-performance interfaces tailored for production environments.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-8 rounded-xl hover:border-[#00ffcc] transition-colors group">
            <div className="h-12 w-12 rounded bg-[#0d0d0d] border border-[#222] flex items-center justify-center mb-6 group-hover:border-[#00ffcc] transition-colors">
              <svg className="w-6 h-6 text-[#00ffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Business Automation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Designing lightweight AI agent workflows and custom backend routines. We eliminate operational bottlenecks with intelligent software.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-8 rounded-xl hover:border-[#00ffcc] transition-colors group">
            <div className="h-12 w-12 rounded bg-[#0d0d0d] border border-[#222] flex items-center justify-center mb-6 group-hover:border-[#00ffcc] transition-colors">
              <svg className="w-6 h-6 text-[#00ffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Technical Talent Pipeline</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Evaluating the next generation of engineers through rigorous milestone tracks. We transform classroom theory into production capability.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-20">
        <Link 
          href="/careers" 
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-[#00ffcc] hover:bg-[#00e6b8] border border-[#00ffcc] hover:border-[#00e6b8] rounded-md transition-all uppercase tracking-wider"
        >
          Explore Virtual Internships
        </Link>
      </section>

    </div>
  );
}
