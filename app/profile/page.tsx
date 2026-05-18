"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { 
  User, 
  Mail, 
  Code, 
  Globe, 
  LayoutDashboard, 
  GraduationCap, 
  Save, 
  Loader2,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DEPARTMENTS = [
  { id: "it", name: "Information Technology", icon: "💻" },
  { id: "eee", name: "Electrical & Electronics", icon: "⚡" },
  { id: "mech", name: "Mechanical Engineering", icon: "⚙️" },
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    department_slug: "",
    github_url: "",
    linkedin_url: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/login";
        return;
      }
      setUserId(session.user.id);

      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) {
        setFormData({
          full_name: data.full_name || "",
          email: session.user.email || "",
          department_slug: data.department_slug || "",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          phone: data.phone || "",
        });
      }
      setFetching(false);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setSuccessMsg(null);
    try {
      await supabase.from("profiles").update({ 
        full_name: formData.full_name,
        department_slug: formData.department_slug,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        phone: formData.phone
      }).eq("id", userId);
      setSuccessMsg("Profile identity keys synchronized successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      alert("Synchronization update transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center"><Loader2 className="animate-spin text-[#00ffcc]" /></div>;

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-[#ffffff] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-[#00ffcc]/10 bg-[#141414]">
        <div className="p-6 flex items-center gap-3 border-b border-[#00ffcc]/10">
          <Image src="/img/Matrixroot_onlyimglogo-removebg-preview.png" alt="Logo" width={32} height={32} />
          <span className="font-medium text-lg text-[#ffffff]">Matrix Root</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Button variant="ghost" className="w-full justify-start font-medium min-h-[40px] text-xs text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-[#00ffcc]/5" onClick={() => window.location.href = '/dashboard'}>
              <LayoutDashboard size={16} className="mr-3 text-[#00ffcc]" /> Dashboard Overview
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Button variant="default" className="w-full justify-start font-medium min-h-[40px] text-xs bg-[#00ffcc]/5 text-[#00ffcc] border border-[#00ffcc]/10 font-semibold shadow-none hover:bg-[#00ffcc]/10">
              <User size={16} className="mr-3 text-[#00ffcc]" /> Active Identity Config
            </Button>
          </motion.div>
        </nav>
        <div className="p-4 border-t border-[#00ffcc]/10">
          <Button variant="outline" size="sm" className="w-full text-xs rounded-[12px] border-[#00ffcc]/20 shadow-none text-[#ffffff]/70" onClick={() => window.location.href = '/dashboard'}>
            <ArrowLeft size={14} className="mr-2 text-[#00ffcc]" /> Portal Workspace
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-[#00ffcc]/10 bg-[#0d0d0d]/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <Button variant="outline" size="icon" onClick={() => window.location.href = '/dashboard'} className="rounded-[12px] h-8 w-8 border-[#00ffcc]/20 shadow-none">
                <ArrowLeft size={16} className="text-[#00ffcc]" />
              </Button>
            </motion.div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#ffffff]">Account Configuration Ledger</h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-[32px] md:p-[64px] pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-[40px]">
              <h1 className="text-3xl font-normal tracking-[-0.02em] text-[#ffffff] mb-2">Member Authentication Mapping</h1>
              <p className="text-xs text-[#ffffff]/80 leading-[1.6]">Configure programmatic access nodes, repository tracking metadata, and public ledger handles.</p>
            </div>

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-[32px] p-[16px] bg-[#00ffcc]/5 text-[#00ffcc] border border-[#00ffcc]/20 rounded-[12px] flex items-center gap-3 text-xs font-medium"
              >
                <ShieldCheck size={16} />
                {successMsg}
              </motion.div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-[32px]">
              {/* Profile Card */}
              <div className="bg-[#141414] border border-[#00ffcc]/20 rounded-[12px] p-[32px] md:p-[48px] space-y-[32px] shadow-none">
                <div className="flex items-center gap-[24px]">
                   <div className="w-14 h-14 rounded-[12px] bg-[#00ffcc]/5 border border-[#00ffcc]/10 flex items-center justify-center text-[#00ffcc] text-lg font-medium shrink-0">
                      {formData.full_name?.charAt(0) || "M"}
                   </div>
                   <div>
                      <h3 className="text-base font-medium tracking-[-0.02em] text-[#ffffff]">{formData.full_name || "Institution Scholar"}</h3>
                      <p className="text-xs text-[#ffffff]/60 mt-0.5">Verified Primary Identity Instance</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-[24px]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-[#ffffff]/60 block">Full Legal Designation</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d]/50 border border-[#00ffcc]/20 rounded-[12px] focus:outline-none focus:border-[#00ffcc] transition-all text-xs text-[#ffffff]"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 opacity-70">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-[#00ffcc] block">Fixed Authentication Hash (Email)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                      <input 
                        type="email" 
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d] border border-[#00ffcc]/10 rounded-[12px] cursor-not-allowed text-xs text-[#ffffff]/80"
                        value={formData.email}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-[#ffffff]/60 block">Academic Branch Specification Node</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                    <select
                      value={formData.department_slug}
                      onChange={(e) => setFormData({...formData, department_slug: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d]/50 border border-[#00ffcc]/20 rounded-[12px] focus:outline-none focus:border-[#00ffcc] transition-all text-xs text-[#ffffff] appearance-none"
                    >
                      <option value="" disabled>Select Core Stream Alignment</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-[24px]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-[#ffffff]/60 block">Code Repository URI</label>
                    <div className="relative">
                      <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                      <input 
                        type="url" 
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d]/50 border border-[#00ffcc]/20 rounded-[12px] focus:outline-none focus:border-[#00ffcc] transition-all text-xs text-[#ffffff]"
                        value={formData.github_url}
                        onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-[#ffffff]/60 block">Public Signature Pointer (LinkedIn)</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                      <input 
                        type="url" 
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d]/50 border border-[#00ffcc]/20 rounded-[12px] focus:outline-none focus:border-[#00ffcc] transition-all text-xs text-[#ffffff]"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-[#ffffff]/60 block">Verified Contact Node (Phone)</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffffff]/40 h-3.5 w-3.5" />
                    <input 
                      type="tel" 
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d]/50 border border-[#00ffcc]/20 rounded-[12px] focus:outline-none focus:border-[#00ffcc] transition-all text-xs text-[#ffffff]"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="pt-[16px]">
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full h-10 rounded-[12px] bg-[#00ffcc] text-[#ffffff] hover:bg-[#00e6b8] shadow-none font-medium text-xs"
                  >
                    {loading ? <Loader2 className="animate-spin h-4 w-4 text-[#00ffcc]" /> : <><Save size={14} className="mr-2 text-[#00ffcc]" /> Commit Local Profile Mutations</>}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
