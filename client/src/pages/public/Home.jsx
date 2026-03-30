import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Zap, TrendingUp, Sparkles, Calendar as CalendarIcon } from "lucide-react";

import Navbar from "../../components/common/Navbar";
import Hero from "../../components/common/Header";
import Stats from "../../components/common/Stats";
import Footer from "../../components/common/Footer";
import FeaturedEventCard from "../../components/common/FeaturedEventCard";
import EventCalendar from "../../components/common/EventCalendar";

import useEvents from "../../hooks/useEvents";

const Home = () => {
    const { events, fetchEvents, loading, error } = useEvents();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFDFF]">
            <Navbar />
            
            <main className="flex-1">
                <Hero />

                {/* 📊 Real-time Network Stats */}
                <Stats />

                {/* ✨ Handpicked Experiences Section */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-4">
                                <Sparkles size={12} /> Curated Experiences
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
                                Featured <span className="text-indigo-600 italic font-medium">Opportunities</span>
                            </h2>
                            <p className="text-slate-500 mt-4 max-w-lg font-medium leading-relaxed italic border-l-4 border-slate-50 pl-6 capitalize">
                                High-impact academic, technical, and cultural events synchronized from top-tier institutional nodes.
                            </p>
                        </div>

                        <Link
                            to="/events"
                            className="group flex items-center gap-4 bg-white border border-slate-100 px-10 py-5 rounded-4xl text-xs font-black uppercase tracking-widest text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                        >
                            Explore All Nodes <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[3rem] border border-slate-100 shadow-sm shadow-indigo-100/20"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-rose-50 border border-rose-100 p-12 rounded-[3.5rem] text-center max-w-2xl mx-auto shadow-2xl shadow-rose-100/20">
                            <Activity size={48} className="text-rose-400 mx-auto mb-6 animate-pulse" />
                            <h4 className="text-xl font-black text-rose-900 mb-2 uppercase tracking-wide">Sync Protocol Interrupted</h4>
                            <p className="text-rose-600 font-bold text-xs uppercase tracking-widest opacity-60 italic">{error}</p>
                            <button onClick={() => fetchEvents()} className="mt-8 px-8 py-3 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all">Reload Terminal</button>
                        </div>
                    ) : Array.isArray(events) && events.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {events.slice(0, 3).map((event) => (
                                    <FeaturedEventCard
                                        key={event._id || event.id}
                                        {...event}
                                    />
                                ))}
                            </div>

                            <div className="mt-20 text-center">
                                <Link
                                    to="/events"
                                    className="inline-flex items-center gap-6 text-slate-400 font-black hover:text-indigo-600 transition-all uppercase tracking-[0.4em] text-[10px] group"
                                >
                                    Browse Extended Registry
                                    <span className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-100">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white border border-slate-100 rounded-[4rem] p-24 text-center max-w-2xl mx-auto shadow-2xl shadow-indigo-50/50 group">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-10 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-200 transition-all duration-700">
                                <Zap size={48} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-6 tracking-tight uppercase">Terminal Idle</h3>
                            <p className="text-slate-500 font-medium mb-12 leading-relaxed px-10 italic border-t border-slate-50 pt-6 mt-6 capitalize">
                                No active transmissions detected. The network is currently in a high-stability, low-activity state.
                            </p>
                            <Link to="/events" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-4xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
                                Initialize Uplink <TrendingUp size={18} />
                            </Link>
                        </div>
                    )}
                </section>

                {/* 📅 Central Timeline Section */}
                <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-4">
                            <CalendarIcon size={12} /> Time-Series Data
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Event <span className="text-emerald-600 italic font-medium">Timeline</span></h2>
                        <p className="text-slate-400 mt-4 font-medium max-w-md italic border-l-4 border-slate-50 pl-6 lowercase">Real-time tracking of upcoming deadlines and celebration protocols across the network.</p>
                    </div>

                    <EventCalendar events={events} />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;