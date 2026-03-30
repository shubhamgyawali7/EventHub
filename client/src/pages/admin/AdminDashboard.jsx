// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from "react";
import {
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
  ShieldCheck,
  BarChart,
  Activity,
  Settings,
  Building2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import useAdmin from "../../hooks/useAdmin";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, colorClass, bgColorClass, trend }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
    <div
      className={`w-14 h-14 rounded-2xl ${bgColorClass} flex items-center justify-center ${colorClass} mb-6 group-hover:scale-110 transition-transform`}
    >
      <Icon size={28} />
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
      {label}
    </p>
    <p className="text-4xl font-black text-slate-800">{value}</p>
    {trend && (
      <p className="text-xs text-slate-400 mt-2">{trend}</p>
    )}
  </div>
);

const AdminDashboard = () => {
  const { adminData, fetchEvents, fetchUsers, fetchClubs } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchUsers();
    fetchClubs();
  }, [fetchEvents, fetchUsers, fetchClubs]);

  const totalEvents = adminData.events?.length ?? 0;
  const totalUsers = adminData.users?.length ?? 0;
  const totalClubs = adminData.clubs?.length ?? 0;
  const pendingClubs = adminData.clubs?.filter((c) => c.status === "Pending")?.length ?? 0;

  const shortcuts = [
    {
      label: "Verify Clubs",
      link: "/admin/club/verification",
      icon: CheckSquare,
      desc: `${pendingClubs} club${pendingClubs !== 1 ? 's' : ''} waiting for verification`,
      highlight: pendingClubs > 0
    },
    {
      label: "All Clubs",
      link: "/admin/clubs",
      icon: Building2,
      desc: "View and manage all registered clubs",
    },
    {
      label: "All Users",
      link: "/admin/users",
      icon: Users,
      desc: "Manage platform users",
    },
    {
      label: "All Events",
      link: "/admin/events",
      icon: Calendar,
      desc: "Monitor all events",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
              <ShieldCheck size={12} /> Admin Control Panel
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
              Admin <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">
              Manage clubs, users, and monitor platform activity.
            </p>
          </div>

          {pendingClubs > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-3 flex items-center gap-3">
              <AlertCircle className="text-amber-600" size={20} />
              <div>
                <p className="text-sm font-bold text-amber-800">{pendingClubs} Club{pendingClubs !== 1 ? 's' : ''} Pending Verification</p>
                <p className="text-xs text-amber-600">Review club registration requests</p>
              </div>
            </div>
          )}
        </div>

        {adminData.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100" />
            ))}
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <StatCard
                icon={Building2}
                label="Total Clubs"
                value={totalClubs}
                colorClass="text-purple-600"
                bgColorClass="bg-purple-50"
              />
              <StatCard
                icon={Users}
                label="Total Users"
                value={totalUsers}
                colorClass="text-emerald-600"
                bgColorClass="bg-emerald-50"
              />
              <StatCard
                icon={Calendar}
                label="Total Events"
                value={totalEvents}
                colorClass="text-indigo-600"
                bgColorClass="bg-indigo-50"
              />
              <StatCard
                icon={CheckSquare}
                label="Pending Verifications"
                value={pendingClubs}
                colorClass="text-amber-600"
                bgColorClass="bg-amber-50"
                trend={pendingClubs > 0 ? "Awaiting approval" : "All verified"}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                    <TrendingUp className="text-indigo-600" /> Quick Actions
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {shortcuts.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(item.link)}
                      className={`bg-white border p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all flex items-center gap-4 group text-left ${
                        item.highlight ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        item.highlight 
                          ? 'bg-amber-500 text-white group-hover:bg-amber-600' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
                      }`}>
                        {item.icon && <item.icon size={20} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">
                          {item.label}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-tight">
                          {item.desc}
                        </p>
                      </div>
                      <ExternalLink size={16} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;