import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Layers,
  Search,
  PlusCircle,
  FileEdit,
  Trash2,
  Eye,
  AlertCircle,
  Cpu,
  Calendar,
} from "lucide-react";
import ClubSidebar from "./ClubSidebar";
import useOrganizer from "../../hooks/useOrganizer";

const ManagedOperationNodes = () => {
  const navigate = useNavigate();
  const {
    orgEvents,
    loading,
    error,
    fetchOrganizerEvents,
    deleteOrganizerEvent,
  } = useOrganizer();

  const [searchTerm, setSearchTerm] = useState("");
  const hasFetched = useRef(false);
  useEffect(() => {
    // Only fetch once when component mounts
    if (!hasFetched.current && !loading) {
      hasFetched.current = true;
      fetchOrganizerEvents();
    }
  }, [fetchOrganizerEvents, loading]); // Empty dependency array - only run once

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      const result = await deleteOrganizerEvent(id);
      if (!result?.error) {
        console.log("Event successfully deleted.");
        // Optional: Show success toast/notification here
      } else {
        console.error("Delete failed:", result.error);
        // Optional: Show error toast/notification here
      }
    }
  };

  const filteredEvents = orgEvents?.filter((e) =>
    e.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex bg-[#F8F9FD]">
      <ClubSidebar />

      <main className="flex-1 p-10 overflow-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-2 flex items-center gap-2">
              <Calendar size={14} /> Event Management Dashboard
            </p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              All{" "}
              <span className="text-indigo-600 underline decoration-4 decoration-indigo-100 underline-offset-8">
                Events Data
              </span>
            </h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-3 opacity-70">
              View and manage all your hosted events activities
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative group">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search events..."
                className="bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-8 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700 shadow-sm w-64 lg:w-80"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <Link
              to="/club/create-event"
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-3"
            >
              <PlusCircle size={18} /> Create New Event
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-white/50 border border-slate-100 rounded-[2rem] animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-100 p-12 rounded-[3rem] text-rose-600 flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-rose-100 rounded-full animate-bounce">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">
              Error: Connection Failed
            </h3>
            <p className="font-bold text-xs max-w-xs">{error}</p>
            <button
              onClick={() => fetchOrganizerEvents()}
              className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents?.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Event Details
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Date & Time
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Registration Status
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr
                      key={event._id}
                      className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl border border-slate-200 overflow-hidden shadow-inner group-hover:rotate-2 transition-transform flex-shrink-0 bg-slate-100">
                            {event.poster ? (
                              <img
                                src={event.poster}
                                className="w-full h-full object-cover"
                                alt={event.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Cpu size={24} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 tracking-tight text-lg mb-1">
                              {event.title}
                            </p>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter flex items-center gap-1">
                              <Layers size={10} /> Venue: {event.venue}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-800 tracking-tight">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Starts at {event.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-slate-900 leading-none mb-2">
                              Bookings: {event.attendees?.length || 0}/
                              {event.capacity || 50}
                            </p>
                            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${Math.min(100, ((event.attendees?.length || 0) / (event.capacity || 50)) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span
                            className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${
                              event.status === "active"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {event.status || "Active"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <Link
                            to={`/club/event/${event._id}`}
                            className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/club/edit-event/${event._id}`}
                            className="p-3 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            title="Edit Event"
                          >
                            <FileEdit size={16} />
                          </Link>
                          <button
                            title="Delete Event"
                            onClick={() => handleDelete(event._id)}
                            className="p-3 bg-white border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-32 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-8 border border-slate-100">
              <Layers size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              No Events Found
            </h3>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
              {searchTerm
                ? "No events match your search criteria."
                : "You haven't created any events yet. Click 'Create New Event' to get started."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManagedOperationNodes;
