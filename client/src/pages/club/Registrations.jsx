import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Mail,
  Phone,
  Building2,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  FileText,
  Clock,
  ExternalLink,
  Target,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClubSidebar from "./ClubSidebar";
import clubService from "../../services/clubService";

const Registrations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEventId = queryParams.get("eventId") || "all";

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState(initialEventId);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const data = await clubService.getClubRegistrations();
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRegistrations = [...registrations].sort((a, b) => {
    let aValue, bValue;
    
    if (sortConfig.key === "event") {
      aValue = a.event?.title || "";
      bValue = b.event?.title || "";
    } else if (sortConfig.key === "userName") {
      aValue = a.user?.name || a.name || "";
      bValue = b.user?.name || b.name || "";
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRegistrations = sortedRegistrations.filter((reg) => {
    const searchStr = searchTerm.toLowerCase();
    const eventMatch = filterEvent === "all" || reg.event?._id === filterEvent;
    const searchMatch =
      (reg.user?.name || reg.name || "").toLowerCase().includes(searchStr) ||
      (reg.user?.email || reg.email || "").toLowerCase().includes(searchStr) ||
      (reg.event?.title || "").toLowerCase().includes(searchStr);
    
    return eventMatch && searchMatch;
  });

  // Get unique events for filtering
  const uniqueEvents = Array.from(new Set(registrations.map(r => JSON.stringify({id: r.event?._id, title: r.event?.title}))))
    .map(e => JSON.parse(e))
    .filter(e => e.id);

  const exportToCSV = () => {
    const headers = ["Event", "Participant", "Email", "Phone", "College", "Registration Date"];
    const rows = filteredRegistrations.map(reg => [
      reg.event?.title || "N/A",
      reg.user?.name || reg.name || "N/A",
      reg.user?.email || reg.email || "N/A",
      reg.phone || "N/A",
      reg.user?.college || reg.college || "N/A",
      new Date(reg.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-[#FDFDFF]">
      <ClubSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] mb-1 flex items-center gap-2">
                <Target size={14} className="animate-pulse" /> Participant Management
              </p>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
                Event{" "}
                <span className="text-indigo-600 underline decoration-4 decoration-indigo-100 underline-offset-8">
                  Registrations
                </span>
              </h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-4">
                Monitor and manage all users registered across your network
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:shadow-lg transition-all active:scale-95"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Total Registrations</p>
            <h3 className="text-4xl font-black">{registrations.length}</h3>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Unique Events</p>
            <h3 className="text-4xl font-black text-slate-800">{uniqueEvents.length}</h3>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Participants</p>
            <h3 className="text-4xl font-black text-emerald-500">{registrations.filter(r => r.status === 'Confirmed').length}</h3>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/50 backdrop-blur-xl border border-white p-4 rounded-[2.5rem] shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by participant name, email or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 border border-slate-100 rounded-2xl py-4 pl-16 pr-6 font-bold text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
            />
          </div>
          
          <div className="flex bg-white/80 p-1.5 border border-slate-100 rounded-2xl">
            <div className="flex items-center px-4 border-r border-slate-100">
              <Filter size={16} className="text-slate-400" />
            </div>
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="bg-transparent px-4 font-bold text-xs uppercase tracking-widest text-slate-600 outline-none h-full min-w-[200px]"
            >
              <option value="all">Filter By Event: ALL</option>
              {uniqueEvents.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Detailed List */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-indigo-50/50 overflow-hidden">
          {loading ? (
             <div className="p-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Registry Node...</p>
             </div>
          ) : error ? (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-6">
                <FileText size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">Sync Error</h2>
              <p className="text-slate-400 font-bold mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest"
              >
                Retry Sync
              </button>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-8 border border-slate-100">
                <Users size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No Registrations Found</h3>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed max-w-xs mx-auto">
                No participant records match the current filter criteria in the central node.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th 
                      onClick={() => handleSort("userName")}
                      className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">PARTICIPANT <ArrowUpDown size={12} /></div>
                    </th>
                    <th 
                      onClick={() => handleSort("event")}
                      className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">EVENT <ArrowUpDown size={12} /></div>
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">INSTITUTE NODE</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">STATUS</th>
                    <th 
                      onClick={() => handleSort("createdAt")}
                      className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">DATE <ArrowUpDown size={12} /></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-indigo-50/20 transition-all group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg group-hover:scale-110 transition-transform shadow-sm">
                            {(reg.user?.name || reg.name || "?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-black text-slate-800 tracking-tight block text-lg leading-none mb-1">
                              {reg.user?.name || reg.name}
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <Mail size={10} /> {reg.user?.email || reg.email || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="space-y-1">
                            <span className="font-black text-slate-800 text-sm block leading-tight">{reg.event?.title || "Deleted Event"}</span>
                            <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                               {reg.event?.eventDate ? new Date(reg.event.eventDate).toLocaleDateString() : "TBD"}
                            </span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                              <Building2 size={12} className="text-slate-300"/> {reg.user?.college || reg.college || "N/A"}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <MapPin size={10} className="text-slate-300"/> {reg.user?.district || "Unknown Hub"}
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                          reg.status === 'Confirmed' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          <Clock size={10} /> {reg.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center justify-between">
                           <div className="text-right flex flex-col">
                              <span className="text-slate-800 font-black text-sm">{new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Sync Stamp</span>
                           </div>
                           <Link to={`/club/my-events/${reg.event?._id}`} className="p-2 text-slate-200 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                              <ExternalLink size={16} />
                           </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Registrations;
