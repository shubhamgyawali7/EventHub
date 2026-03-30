// src/pages/admin/AdminHome.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";

const AdminHome = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split("/").filter(Boolean).pop();
    
    if (!path || path === "dashboard") return "Central Oversight";
    
    if (path === "club" && location.pathname.includes("verification")) {
      return "Club Verification";
    }
    
    if (path === "clubs") return "All Clubs";
    if (path === "users") return "All Users";
    if (path === "events") return "All Events";
    
    return path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFF]">
      {/* Sidebar - Fixed left navigation */}
      <SideBar />

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header with breadcrumb */}
        <header className="px-10 pt-10 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Root</span>
            <span className="text-slate-200">/</span>
            <span className="text-indigo-600">{getPageTitle()}</span>
          </div>
        </header>

        {/* Main content - This is where child routes render */}
        <main className="px-10 pb-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto py-8 px-10 border-t border-slate-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Terminal Status: <span className="text-emerald-500">Encrypted & Secure</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminHome;