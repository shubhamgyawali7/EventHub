// src/components/admin/SideBar.jsx
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Building2,
  CheckSquare,
  ShieldAlert,
  LogOut,
  Clock,
  MapPin,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import eventService from "../../services/eventService";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const events = await eventService.getAllEvents();
        const now = new Date();
        const upcoming = events
          .filter((event) => new Date(event.eventDate) > now)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
          .slice(0, 5);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "All Events", icon: Calendar, path: "/admin/events" },
    { label: "All Users", icon: Users, path: "/admin/users" },
    { label: "All Clubs", icon: Building2, path: "/admin/clubs" },
    {
      label: "Club Verification",
      icon: CheckSquare,
      path: "/admin/club/verification",
      highlight: true,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin/club/verification") {
      return location.pathname === "/admin/club/verification";
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-72 bg-slate-900 h-screen sticky top-0 flex flex-col p-6 text-slate-400">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <ShieldAlert size={24} />
        </div>
        <span className="text-white font-black tracking-tighter text-xl uppercase">
          Core Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            highlight={item.highlight}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Upcoming Events Calendar */}
      <div className="mt-8 pt-8 border-t border-slate-700">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Calendar size={16} className="text-indigo-400" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest">
            Upcoming Events
          </h3>
        </div>

        {loadingEvents ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-indigo-500 mx-auto"></div>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="space-y-2">
            {upcomingEvents.map((event, idx) => {
              const eventDate = new Date(event.eventDate);
              const daysUntil = Math.ceil(
                (eventDate - new Date()) / (1000 * 60 * 60 * 24),
              );
              const isToday = daysUntil === 0;
              const isTomorrow = daysUntil === 1;

              return (
                <button
                  key={idx}
                  onClick={() => navigate(`/admin/event/${event._id}`)}
                  className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:border-indigo-500/50 border border-slate-700 transition-all group"
                >
                  <div className="flex items-start gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md whitespace-nowrap ${
                        isToday
                          ? "bg-red-500/20 text-red-300"
                          : isTomorrow
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {isToday
                        ? "Today"
                        : isTomorrow
                          ? "Tomorrow"
                          : `${daysUntil}d away`}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 mb-1 group-hover:text-indigo-300 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                    <Clock size={10} />
                    <span>
                      {eventDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} />
                    <span className="truncate">{event.district}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4 text-slate-500 text-xs">
            <p>No upcoming events</p>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all mt-auto group"
      >
        <LogOut
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-bold">Sign Out</span>
      </button>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, active, highlight, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
        : "hover:bg-slate-800 hover:text-slate-200"
    }`}
  >
    <Icon
      size={20}
      className={
        active
          ? "text-white"
          : highlight
            ? "text-amber-500"
            : "text-slate-500 group-hover:text-indigo-400"
      }
    />
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default SideBar;
