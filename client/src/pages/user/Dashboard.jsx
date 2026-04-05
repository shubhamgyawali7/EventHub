import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Search,
  Layers,
  Clock,
  Activity,
  UserCircle,
  TrendingUp,
  ArrowRight,
  BookmarkCheck,
  Zap,
  Star,
} from "lucide-react";
import useEvents from "../../hooks/useEvents";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { events, fetchEvents, loading: eventsLoading } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Simple Filter for demonstrations
  const registeredEvents = events.filter((event) =>
    event.registeredUsers?.some((u) => u._id === user?.id || u === user?.id),
  );

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col pt-32 pb-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6">
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
              <TrendingUp size={12} /> Live Network Profile
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
              Welcome,{" "}
              <span className="text-indigo-600 italic font-medium">
                {user?.name}
              </span>
            </h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">
              <Activity size={12} className="text-emerald-500" /> Active Session
              - Grade-A Encryption
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/events"
              className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-3"
            >
              <Search size={16} /> Explore Nodes
            </Link>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            {
              label: "Enrollments",
              value: registeredEvents.length,
              icon: BookmarkCheck,
              color: "indigo",
            },
            { label: "XP Points", value: "450", icon: Zap, color: "emerald" },
            { label: "Network Rank", value: "#12", icon: Star, color: "amber" },
            {
              label: "Participation",
              value: "92%",
              icon: Activity,
              color: "rose",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h4 className="text-3xl font-black text-slate-800">
                  {stat.value}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Recent Engagements */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Recent{" "}
                <span className="text-indigo-600 italic">Engagements</span>
              </h3>
              <Link
                to="/registered-events"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
              >
                View All Registrations →
              </Link>
            </div>

            {registeredEvents.length > 0 ? (
              <div className="space-y-6">
                {registeredEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group"
                  >
                    <div className="w-20 h-24 bg-slate-50 rounded-3xl overflow-hidden shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                      {event.poster ? (
                        <img
                          src={normalizePoster(event.poster)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <Layers size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-md border border-indigo-100">
                          Confirmed
                        </span>
                        <span className="text-slate-400 text-[9px] font-bold tracking-tight">
                          <Clock size={10} className="inline mr-1" />{" "}
                          {event.time}
                        </span>
                      </div>
                      <h5 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {event.title}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 tracking-tighter italic">
                        <MapPin
                          size={10}
                          className="inline mr-1 text-slate-400"
                        />{" "}
                        {event.location}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/event/${event._id || event.id}`)
                      }
                      className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all hover:scale-110 active:scale-90"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-[3rem] p-24 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-8">
                  <Layers size={40} />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-2">
                  No Active Enrollments
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 max-w-xs mx-auto mb-10 leading-relaxed italic border-t border-slate-50 pt-4 mt-4">
                  Explore the network to find nodes that match your profile.
                </p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-indigo-600 transition-all"
                >
                  Initiate Search <Search size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* LHS Recommendations */}
          <div className="space-y-10">
            <div className="bg-indigo-600 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black tracking-tight leading-none uppercase">
                    Level Up Your Journey
                  </h4>
                  <p className="text-indigo-100 text-xs font-bold leading-relaxed opacity-80 uppercase pt-2">
                    Complete more engagements to unlock exclusive rewards.
                  </p>
                </div>
                <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl">
                  Browse Challenges
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-sm space-y-8">
              <h4 className="font-black text-slate-800 tracking-tight uppercase text-sm border-l-4 border-indigo-600 pl-4">
                Network Status
              </h4>
              <div className="space-y-6">
                {[
                  { label: "Stability", value: "Optimal", color: "emerald" },
                  { label: "Throughput", value: "Nominal", color: "indigo" },
                  { label: "Security", value: "Verified", color: "emerald" },
                ].map((status, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {status.label}
                    </p>
                    <span
                      className={`bg-${status.color}-50 text-${status.color}-600 text-[8px] font-black uppercase px-2 py-1 rounded-md border border-${status.color}-100`}
                    >
                      {status.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
