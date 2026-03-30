import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PlusCircle,
  Calendar,
  Users,
  BarChart3,
  ArrowRight,
  Layers,
  Activity,
  ListFilter,
  Search,
  MapPin,
  Clock,
  Send,
  Building2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import ClubSidebar from "./ClubSidebar";
import useOrganizer from "../../hooks/useOrganizer";

const ClubDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { fetchOrganizerEvents,orgEvents, loading: eventsLoading } = useOrganizer();

    // Calculate active events (events with status 'active' or upcoming)
  const activeEvents = orgEvents?.filter(event => 
    event.status === "active" || new Date(event.date) > new Date()
  ) || [];

    const statisticData = [
    {
      label: "Total Views",
      value: "4.8k",
      change: "+12%",
      icon: Users,
      color: "indigo",
    },
    {
      label: "Active Events",
      value: activeEvents.length,
      change: activeEvents.length > 0 ? "Live" : "None",
      icon: Calendar,
      color: "emerald",
    },
    {
      label: "Average Rating",
      value: "4.9",
      change: "Excellent",
      icon: Activity,
      color: "amber",
    },
    {
      label: "Ticket Sales",
      value: "24%",
      change: "+3.2%",
      icon: BarChart3,
      color: "rose",
    },
  ];
  if (authLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // SCENARIO 1: NOT REGISTERED AS CLUB
  if (!user.club) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FDFDFF]">
        <div className="max-w-xl w-full text-center space-y-8 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-indigo-50/50">
          <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Building2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Start Hosting{" "}
              <span className="text-indigo-600 underline decoration-4 decoration-indigo-200 underline-offset-8">
                Events
              </span>
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Register your organization to start creating events, managing your guests, 
              and growing your community.
            </p>
          </div>
          <Link
            to="/club/register"
            className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-200 hover:bg-slate-900 transition-all hover:scale-105"
          >
            Register My Club <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // SCENARIO 2: PENDING APPROVAL
  if (!user.club.isVerified && user.club.status === "Pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FDFDFF]">
        <div className="max-w-xl w-full text-center space-y-10 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-indigo-50/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[8rem] -mr-10 -mt-10 animate-pulse"></div>
          <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center text-amber-600 mx-auto relative z-10">
            <Activity size={48} className="animate-spin-slow" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-amber-100">
              Checking Your Application
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Almost There!
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              We are currently reviewing your club details. 
              You'll be able to manage events as soon as our team approves your request.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                Account Status
              </p>
              <p className="font-bold text-amber-600">WAITING FOR APPROVAL</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                Next Step
              </p>
              <p className="font-bold text-slate-800">CHECK BACK LATER</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCENARIO 3: FULL DASHBOARD
  return (
    <div className="min-h-screen flex bg-[#FDFDFF]">
      <ClubSidebar />

      <div className="flex-1 p-10 overflow-auto">
        {/* Header Stats */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">
              Welcome back,{" "}
              <span className="text-indigo-600 font-medium italic">
                {user.name || "Organizer"}
              </span>
            </h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
              <Activity size={14} className="text-emerald-500" /> Dashboard Updated - Tracking your event stats
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/club/create-event"
              className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-3"
            >
              <PlusCircle size={18} /> Create New Event
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {statisticData.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-slate-800">
                    {stat.value}
                  </h4>
                  <span
                    className={`text-[10px] font-bold text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-lg`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Event Snapshot */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                My Recent Events
              </h3>
              <Link
                to="/club/my-events"
                className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline"
              >
                View All Events
              </Link>
            </div>
            {orgEvents?.slice(0, 3).map((event, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group"
              >
                <div className="w-20 h-24 bg-slate-50 rounded-3xl overflow-hidden shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  {event.poster ? (
                    <img
                      src={event.poster}
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
                    <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-100">
                      Active
                    </span>
                    <span className="text-slate-400 text-[9px] font-bold">
                      <Clock size={10} className="inline mr-1" /> {event.time}
                    </span>
                  </div>
                  <h5 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {event.title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 tracking-tight">
                    <MapPin size={10} className="inline mr-1 text-slate-400" />{" "}
                    {event.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-800 mb-1">
                    {event.attendees?.length || 0} / 50
                  </p>
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                    Joined
                  </p>
                </div>
                <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                  <Send size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Help Sidebar */}
          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-[3rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-2 tracking-tight">
                  Need Help?
                </h4>
                <p className="text-indigo-100 text-xs font-bold leading-relaxed mb-8">
                  Having trouble setting up your event? Our team is here to guide you.
                </p>
                <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;