import React from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Settings,
  ShieldCheck,
  Activity,
  LogOut,
  ChevronRight,
  Globe,
  Fingerprint,
  Zap,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Essential Identity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm text-center relative overflow-hidden group">
              {/* Background Decorative Element */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors"></div>

              <div className="relative">
                <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white font-black text-5xl shadow-2xl shadow-indigo-200 mx-auto mb-6 border-4 border-white transition-transform group-hover:scale-105 group-hover:rotate-3">
                  {user.name.charAt(0).toUpperCase()}
                  {/* Online Status Pulse */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full animate-pulse"></div>
                </div>

                <h2 className="text-2xl font-black text-slate-800 tracking-tighter">
                  {user.name}
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6">
                  Certified Node Operator
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-800"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all group/btn">
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Edit Node Profile
                  </span>
                  <Edit3
                    size={16}
                    className="text-slate-400 group-hover/btn:text-white"
                  />
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all group/btn"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Terminate Session
                  </span>
                  <LogOut
                    size={16}
                    className="text-red-300 group-hover/btn:text-white"
                  />
                </button>
              </div>
            </div>

            {/* Reputation Card with Glassmorphism */}
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Network Reputation
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck size={28} className="text-indigo-200" />
                <div className="flex-1 h-3 bg-white/20 backdrop-blur-md rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </div>
                <span className="text-xs font-black">85%</span>
              </div>
              <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest leading-relaxed">
                Reputation is synced across 12 distributed clusters.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Data & Activity */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <Fingerprint className="text-indigo-600" size={24} />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Node Configuration
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  {
                    label: "Identity Primary",
                    value: user.name,
                    icon: User,
                    sub: "Unique Identifier",
                  },
                  {
                    label: "Uplink Encryption",
                    value: user.email,
                    icon: Mail,
                    sub: "Secure Mailing Protocol",
                  },
                  {
                    label: "Hub Region",
                    value: user.district || "Nepal Cluster",
                    icon: MapPin,
                    sub: "Geospatial Connectivity",
                  },
                  {
                    label: "Onboarding Point",
                    value: "Jan 2024",
                    icon: Calendar,
                    sub: "Initial System Hook",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-default">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                      {item.label}
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 rounded-2xl transition-all">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 tracking-tight">
                          {item.value}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-12 w-full flex items-center justify-center gap-4 bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-600 transition-all group">
                Request Profile Migration
                <Settings
                  size={18}
                  className="group-hover:rotate-90 transition-transform duration-500"
                />
              </button>
            </div>

            {/* Quick Actions / Activity Feed */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] group hover:border-indigo-100 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Activity size={20} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 tracking-tight">
                  Registry Activity
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Review 14 past event interactions.
                </p>
              </div>

              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] group hover:border-emerald-100 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                    <Globe size={20} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 tracking-tight">
                  Public Alias
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Manage how nodes see you publicly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
