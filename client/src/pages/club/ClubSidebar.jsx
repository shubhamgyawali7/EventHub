import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarPlus, 
  ListOrdered, 
  UserCircle, 
  LogOut,
  Settings,
  PieChart
} from "lucide-react";

const ClubSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/club/dashboard", icon: LayoutDashboard },
    { name: "Create Event", path: "/club/create-event", icon: CalendarPlus },
    { name: "Event List", path: "/club/my-events", icon: ListOrdered },
    { name: "Settings", path: "/club/profile", icon: UserCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          EventHub
        </h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">CLUB CONSOLE</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
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
              <item.icon size={20} className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"} />
              <span className="text-sm font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-50">
        <button 
          onClick={() => console.log("Logout triggered")}
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
