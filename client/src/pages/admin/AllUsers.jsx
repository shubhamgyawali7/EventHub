// src/pages/admin/AllUsers.jsx
import React, { useEffect, useState } from "react";
import { Users, Search, Trash2, Shield, Mail, Calendar, AlertCircle } from "lucide-react";
import useAdmin from "../../hooks/useAdmin";

const AdminAllUsers = () => {
  const { adminData, fetchUsers, deleteUser } = useAdmin(); // Use deleteUser instead of removeUser
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    console.log("Fetching users...");
    fetchUsers();
  }, [fetchUsers]);

  // Debug log to see what data we're getting
  useEffect(() => {
    console.log("Admin data in AllUsers:", adminData);
    console.log("Users data:", adminData.users);
  }, [adminData]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone and will delete all associated data.")) {
      try {
        await deleteUser(userId);
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(error.message || "Failed to delete user. Please try again.");
      }
    }
  };

  // Filter users based on search term and role
  const filteredUsers = adminData.users?.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.district?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle role filtering - users might have multiple roles in an array
    let userRole = "student";
    if (user.roles) {
      if (Array.isArray(user.roles)) {
        if (user.roles.includes("Admin")) userRole = "admin";
        else if (user.roles.includes("Club")) userRole = "club";
        else userRole = "student";
      } else {
        userRole = user.roles?.toLowerCase() || "student";
      }
    }
    
    const matchesRole = roleFilter === "all" || userRole === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  const getRoleBadge = (user) => {
    let role = "student";
    let roleLabel = "Student";
    
    if (user.roles) {
      if (Array.isArray(user.roles)) {
        if (user.roles.includes("Admin")) {
          role = "admin";
          roleLabel = "Admin";
        } else if (user.roles.includes("Club")) {
          role = "club";
          roleLabel = "Club";
        } else {
          role = "student";
          roleLabel = "Student";
        }
      } else {
        const roleValue = user.roles?.toLowerCase();
        if (roleValue === "admin") {
          role = "admin";
          roleLabel = "Admin";
        } else if (roleValue === "club") {
          role = "club";
          roleLabel = "Club";
        } else {
          role = "student";
          roleLabel = "Student";
        }
      }
    }
    
    const badgeStyles = {
      admin: "bg-purple-50 text-purple-600 border border-purple-100",
      club: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      student: "bg-emerald-50 text-emerald-600 border border-emerald-100"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyles[role]}`}>
        {roleLabel}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Show loading state
  if (adminData.loading && !adminData.users) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">All Users</h1>
        <p className="text-slate-500">Manage and moderate platform users</p>
        {adminData.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            Error: {adminData.error}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name, email, college, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-100">
          {[
            { value: "all", label: "All" },
            { value: "student", label: "Student" },
            { value: "club", label: "Club" },
            { value: "admin", label: "Admin" }
          ].map(role => (
            <button
              key={role.value}
              onClick={() => setRoleFilter(role.value)}
              className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition ${
                roleFilter === role.value
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {role.label}
              {role.value !== "all" && (
                <span className="ml-2 text-xs">
                  ({adminData.users?.filter(user => {
                    if (user.roles) {
                      if (Array.isArray(user.roles)) {
                        if (role.value === "admin") return user.roles.includes("Admin");
                        if (role.value === "club") return user.roles.includes("Club");
                        if (role.value === "student") return !user.roles.includes("Admin") && !user.roles.includes("Club");
                      } else {
                        return user.roles?.toLowerCase() === role.value;
                      }
                    }
                    return role.value === "student";
                  }).length || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      {adminData.loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Users className="mx-auto mb-4 text-slate-300" size={48} />
          <p className="text-slate-500 font-medium">
            {searchTerm || roleFilter !== "all" 
              ? "No users match your search criteria"
              : "No users found in the system"}
          </p>
          {(searchTerm || roleFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    College/District
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-slate-50/50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-slate-800 block">{user.name}</span>
                          <span className="text-xs text-slate-400">
                            ID: {user._id?.slice(-6) || user.id?.slice(-6) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        <div>{user.college || "N/A"}</div>
                        <div className="text-xs text-slate-400">{user.district || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user)}
                      {user.club && user.club.status === "Pending" && (
                        <div className="text-xs text-amber-600 mt-1">
                          Club Pending
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} />
                        {formatDate(user.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user._id || user.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition opacity-0 group-hover:opacity-100"
                        title="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">
                Showing {filteredUsers.length} of {adminData.users?.length || 0} users
              </span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-500">Student: {adminData.users?.filter(u => {
                    if (u.roles) {
                      if (Array.isArray(u.roles)) return !u.roles.includes("Admin") && !u.roles.includes("Club");
                      return u.roles?.toLowerCase() === "student";
                    }
                    return true;
                  }).length || 0}</span>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-slate-500">Club: {adminData.users?.filter(u => {
                    if (u.roles) {
                      if (Array.isArray(u.roles)) return u.roles.includes("Club");
                      return u.roles?.toLowerCase() === "club";
                    }
                    return false;
                  }).length || 0}</span>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-slate-500">Admin: {adminData.users?.filter(u => {
                    if (u.roles) {
                      if (Array.isArray(u.roles)) return u.roles.includes("Admin");
                      return u.roles?.toLowerCase() === "admin";
                    }
                    return false;
                  }).length || 0}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;