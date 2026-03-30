import React, { useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Image as ImageIcon,
  Save,
  ShieldCheck,
  UserCircle,
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";
import ClubSidebar from "./ClubSidebar";
import useAuth from "../../hooks/useAuth";

const OrganizationalIdentityNode = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.club?.name || "",
    website: user?.club?.website || "",
    district: user?.club?.district || "Kathmandu",
    email: user?.club?.email || "",
    logo: user?.club?.logo || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClubProfileApi(formData);
      alert("Organizational identity synchronized successfully.");
    } catch (error) {
       alert(error.message || "Data synchronization failure.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="h-screen flex items-center justify-center font-black text-slate-400">LOADING...</div>;

  return (
    <div className="min-h-screen flex bg-[#FDFDFF]">
      <ClubSidebar />

      <main className="flex-1 p-10 overflow-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-2 flex items-center gap-2">
                    <UserCircle size={14} /> Identity Registry v2.1
                 </p>
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
                     Organizational <span className="text-indigo-600 underline decoration-4 decoration-indigo-200 underline-offset-8">Identity Node</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Manage your public credentials and branding assets</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verification Status</p>
                    <p className="text-sm font-black text-emerald-900 tracking-tight">FULLY VERIFIED</p>
                </div>
            </div>
        </header>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Core Credentials */}
            <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Building2 size={12} /> Legal Entity Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-800"
                              required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <MapPin size={12} /> Regional Deployment (District)
                            </label>
                            <select
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-800"
                            >
                                {["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal"].map(d => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Mail size={12} /> Registry Endpoint (Email)
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-800"
                              required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Globe size={12} /> Web Presence URL
                            </label>
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-800"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Synchronizing..." : <><Save size={18} /> Update credentials</>}
                    </button>
                </section>
            </div>

            {/* Visual branding & Summary */}
            <div className="space-y-8">
                 <section className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm text-center">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-8">Primary Branding Asset</label>
                     <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-50/50 mx-auto overflow-hidden shadow-2xl shadow-indigo-100 relative group p-1 ring-2 ring-indigo-50 ring-offset-8">
                         {formData.logo ? (
                            <img src={formData.logo} alt="Brand" className="w-full h-full object-cover rounded-4xl" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-indigo-400"><ImageIcon size={48} /></div>
                         )}
                         <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-[9px] font-black text-white uppercase tracking-tighter">Recalibrate Visual</span>
                         </div>
                     </div>
                     <h4 className="text-xl font-black text-slate-800 tracking-tight mt-10 mb-2">{formData.name}</h4>
                     <p className="text-[10px] font-black text-indigo-600 tracking-widest uppercase">Validated identity node</p>
                 </section>

                 <section className="bg-indigo-600 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full -mr-10 -mt-10 group-hover:rotate-6 transition-transform"></div>
                      <div className="relative z-10 space-y-6">
                           <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Zap size={22} className="text-white" /></div>
                                <h4 className="font-black tracking-tight leading-none uppercase text-sm">Security Intel</h4>
                           </div>
                           <p className="text-xs font-bold leading-relaxed opacity-80">This organizational node is currently synchronized with the global central registry. Any changes will undergo automated security audits.</p>
                           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-2 transition-transform">View audit Trail <ChevronRight size={14} /></button>
                      </div>
                 </section>
            </div>
        </form>
      </main>
    </div>
  );
};

export default OrganizationalIdentityNode;
