import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  ListOrdered,
  UserCircle,
  LogOut,
  Settings,
  PieChart,
  Calendar,
  Clock,
  MapPin,
  Home,
  Users,
} from "lucide-react";
import useOrganizer from "../../hooks/useOrganizer";
import useAuth from "../../hooks/useAuth";

const ClubSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orgEvents, fetchOrganizerEvents } = useOrganizer();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    // Fetch organizer events
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);

  const upcomingEvents = useMemo(() => {
    if (orgEvents && orgEvents.length > 0) {
      const now = new Date();
      return orgEvents
        .filter((event) => new Date(event.eventDate) > now)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .slice(0, 5);
    }
    return [];
  }, [orgEvents]);

  const navItems = [
    { name: "Dashboard", path: "/club/dashboard", icon: LayoutDashboard },
    { name: "Create Event", path: "/club/create-event", icon: CalendarPlus },
    { name: "Event List", path: "/club/my-events", icon: ListOrdered },
    { name: "Registrations", path: "/club/registrations", icon: Users },
    { name: "Settings", path: "/club/profile", icon: UserCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          EventHub
        </h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
          CLUB CONSOLE
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 mb-4 border-b border-slate-50 rounded-b-none"
        >
          <Home
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-black tracking-tight uppercase">
            Back to Home
          </span>
        </Link>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                  : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-white"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              <span className="text-sm font-bold tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Upcoming Events Section */}
      <div className="px-4 py-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Calendar size={16} className="text-indigo-600" />
          <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">
            Your Upcoming
          </h3>
        </div>

        {upcomingEvents.length > 0 ? (
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
                  onClick={() => navigate(`/club/my-events/${event._id}`)}
                  className="w-full text-left p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all group"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-700">
                      {event.title}
                    </h4>
                    <span
                      className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded whitespace-nowrap ml-1 ${
                        isToday
                          ? "bg-red-200 text-red-700"
                          : isTomorrow
                            ? "bg-orange-200 text-orange-700"
                            : "bg-indigo-200 text-indigo-700"
                      }`}
                    >
                      {isToday
                        ? "Today"
                        : isTomorrow
                          ? "Tomorrow"
                          : `${daysUntil}d`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 mb-0.5">
                    <Clock size={10} />
                    <span>
                      {eventDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 line-clamp-1">
                    <MapPin size={10} />
                    <span className="truncate">
                      {event.venue || event.district}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-3 text-slate-400 text-xs">
            <p>No upcoming events</p>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-slate-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ClubSidebar;
