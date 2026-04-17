import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Calendar, MapPin, Search, Layers, Clock, 
  ChevronLeft, ExternalLink, Activity, BookmarkCheck 
} from "lucide-react";
import useEvents from "../../hooks/useEvents";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import EventCard from "../../components/common/EventCard";

const RegisteredEvents = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { events, fetchEvents, fetchMyRegistrations, myRegistrations, loading: eventsLoading, error } = useEvents();

  useEffect(() => {
    fetchEvents();
    fetchMyRegistrations();
  }, [fetchEvents, fetchMyRegistrations]);



  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col pt-32 pb-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-10 transition-all bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 w-fit"
        >
          <ChevronLeft size={16} /> Return to Home
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 px-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-2">
              <BookmarkCheck size={12} /> Personalized Registry
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
              My <span className="text-emerald-600">Enrollments</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">Access all your active event subscriptions and participation logs.</p>
          </div>

          <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter Enrollments..." 
                  className="pl-12 pr-4 py-3 rounded-xl border-none outline-none font-bold text-sm bg-transparent w-full md:w-64"
                />
             </div>
          </div>
        </div>

        {eventsLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[3rem] border border-slate-100 shadow-sm"></div>)}
             </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] text-center max-w-md mx-auto">
             <Activity size={40} className="text-red-400 mx-auto mb-4" />
             <p className="text-red-600 font-black uppercase tracking-widest text-xs">{error}</p>
          </div>
        ) : myRegistrations?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {myRegistrations.map((reg, index) => (
              <div key={reg._id} className="relative group">
                <EventCard
                  {...reg.event}
                  direction={index % 2 === 0 ? "left" : "right"}
                />
                <div className="absolute top-6 left-6 z-10">
                   <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/20 backdrop-blur-md ${
                     reg.status === "Confirmed" 
                       ? "bg-emerald-500 text-white shadow-emerald-200" 
                       : "bg-amber-500 text-white shadow-amber-200 animate-pulse"
                   }`}>
                      {reg.status === "Confirmed" ? "Participation Active" : "Payment Pending"}
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-[3rem] p-24 text-center max-w-2xl mx-auto shadow-sm group">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mx-auto mb-10 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-200 transition-all duration-700">
              <Layers size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Subscription Registry Empty</h2>
            <p className="text-slate-500 font-medium mb-12 leading-relaxed px-10 italic capitalize">
              You haven't initialized enrollment for any events yet. Explore the network to find nodes that match your profile.
            </p>
            <Link to="/events" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-200 hover:bg-emerald-600 transition-all active:scale-95">
              Explore Active Nodes <ExternalLink size={20} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegisteredEvents;
