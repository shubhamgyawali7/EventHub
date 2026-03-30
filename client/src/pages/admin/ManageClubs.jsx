import React, { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Mail,
  Globe,
  XCircle,
  CheckCircle,
  User,
  Calendar,
  AlertCircle,
  Phone,
  Users,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import useAdmin from "../../hooks/useAdmin";
import Footer from "../../components/common/Footer";

const AdminManageClubs = () => {
  const { adminData, fetchClubs, approveClub, rejectClub } = useAdmin();
  const [filter, setFilter] = useState("pending");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log("=== ManageClubs Debug ===");
    console.log("Admin Data:", adminData);
    console.log("Clubs array:", adminData.clubs);
    if (adminData.clubs && adminData.clubs.length > 0) {
      console.log("Sample club data:", {
        id: adminData.clubs[0]._id,
        name: adminData.clubs[0].name,
        socialMedia: {
          facebook: adminData.clubs[0].facebook,
          instagram: adminData.clubs[0].instagram,
          twitter: adminData.clubs[0].twitter,
          linkedin: adminData.clubs[0].linkedin,
          github: adminData.clubs[0].github,
          youtube: adminData.clubs[0].youtube,
        },
      });
    }
  }, [adminData.clubs]);
  // Debug logs
  useEffect(() => {
    console.log("Admin Data State:", {
      clubs: adminData.clubs,
      loading: adminData.loading,
      error: adminData.error,
      clubsLength: adminData.clubs?.length || 0,
    });
  }, [adminData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchClubs();
    setRefreshing(false);
  };

  // Filter clubs based on status
  const filteredClubs =
    adminData.clubs?.filter((club) => {
      if (filter === "all") return true;
      if (filter === "pending") return club.status === "Pending";
      if (filter === "approved") return club.status === "Approved";
      if (filter === "rejected") return club.status === "Rejected";
      return true;
    }) || [];

  const getCategoryLabel = (category) => {
    const categories = {
      college_club: "College Club",
      national_org: "National Organization",
      international_org: "International Organization",
      niche_community: "Niche Community",
      other: "Other",
    };
    return categories[category] || category || "Not specified";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
            ✓ Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
            ✗ Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
            <AlertCircle size={10} /> Pending
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApprove = async (clubId) => {
    if (
      window.confirm(
        "Approve this club? The user will be able to access club features.",
      )
    ) {
      try {
        await approveClub(clubId);
        alert("Club approved successfully!");
      } catch (error) {
        console.error("Failed to approve club:", error);
        alert(error.message || "Failed to approve club. Please try again.");
      }
    }
  };

  const handleReject = async (clubId) => {
    if (window.confirm("Reject this club? The user will be notified.")) {
      try {
        await rejectClub(clubId);
        alert("Club rejected successfully!");
      } catch (error) {
        console.error("Failed to reject club:", error);
        alert(error.message || "Failed to reject club. Please try again.");
      }
    }
  };

  // Show loading state
  if (adminData.loading && !adminData.clubs?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading clubs...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (adminData.error && !adminData.clubs?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="text-red-400" size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">
            Error Loading Clubs
          </h2>
          <p className="text-slate-500 mb-6">{adminData.error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 mb-2">
              <AlertCircle size={12} /> Club Management
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
              Club <span className="text-amber-600">Verification</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight mt-2">
              Review and verify club registration requests before they can
              create events.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-2"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              {[
                {
                  value: "pending",
                  label: "Pending",
                  count:
                    adminData.clubs?.filter((c) => c.status === "Pending")
                      .length || 0,
                },
                {
                  value: "approved",
                  label: "Approved",
                  count:
                    adminData.clubs?.filter((c) => c.status === "Approved")
                      .length || 0,
                },
                {
                  value: "rejected",
                  label: "Rejected",
                  count:
                    adminData.clubs?.filter((c) => c.status === "Rejected")
                      .length || 0,
                },
                {
                  value: "all",
                  label: "All",
                  count: adminData.clubs?.length || 0,
                },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                    filter === tab.value
                      ? "bg-slate-900 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[10px] ${filter === tab.value ? "bg-white/20" : "bg-slate-100"} px-1.5 py-0.5 rounded-full`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <div className="bg-white rounded-3xl p-24 text-center max-w-2xl mx-auto shadow-sm border border-slate-100">
            <div className="w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Building2 className="text-amber-400" size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">
              {filter === "pending"
                ? "No Pending Club Requests"
                : "No Clubs Found"}
            </h2>
            <p className="text-slate-500">
              {filter === "pending"
                ? "All club registrations have been processed. Check back later for new requests."
                : `No ${filter} clubs found in the system.`}
            </p>
            {adminData.clubs?.length === 0 && (
              <button
                onClick={handleRefresh}
                className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition inline-flex items-center gap-2"
              >
                <RefreshCw size={18} /> Refresh Clubs
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredClubs.map((club) => (
              <div
                key={club._id || club.id}
                className={`bg-white rounded-3xl border transition-all hover:shadow-xl ${
                  club.status === "Pending"
                    ? "border-amber-200 shadow-md shadow-amber-50"
                    : club.status === "Approved"
                      ? "border-emerald-100"
                      : "border-red-100"
                }`}
              >
                <div className="p-6">
                  {/* Header with Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center overflow-hidden">
                        {club.logo ? (
                          <img
                            src={club.logo}
                            alt={club.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML =
                                '<div class="w-full h-full flex items-center justify-center"><Building2 size={32} class="text-amber-500" /></div>';
                            }}
                          />
                        ) : (
                          <Building2 size={32} className="text-amber-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800">
                          {club.name || "Unnamed Club"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail size={12} className="text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {club.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(club.status)}
                  </div>

                  {/* Key Details */}
                  <div className="space-y-2 mb-4">
                    {club.contactPerson && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-slate-600">
                          Contact:{" "}
                          <span className="font-medium">
                            {club.contactPerson}
                          </span>
                        </span>
                      </div>
                    )}

                    {club.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-slate-600">{club.phone}</span>
                      </div>
                    )}

                    {club.district && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-400" />
                        <span className="text-slate-600">
                          District:{" "}
                          <span className="font-medium">{club.district}</span>
                        </span>
                      </div>
                    )}

                    {club.establishedYear && (
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays size={14} className="text-slate-400" />
                        <span className="text-slate-600">
                          Established:{" "}
                          <span className="font-medium">
                            {club.establishedYear}
                          </span>
                        </span>
                      </div>
                    )}

                    {club.category && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 size={14} className="text-slate-400" />
                        <span className="text-slate-600">
                          Category:{" "}
                          <span className="font-medium">
                            {getCategoryLabel(club.category)}
                          </span>
                        </span>
                      </div>
                    )}

                    {club.description && (
                      <div className="flex items-start gap-2 text-sm">
                        <AlertCircle
                          size={14}
                          className="text-slate-400 mt-0.5"
                        />
                        <span className="text-slate-600 line-clamp-2">
                          {club.description}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Request Info */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <User size={12} />
                    <span>
                      Requested by: {club.createdBy?.name || "Unknown"}
                    </span>
                    <span className="mx-1">•</span>
                    <Calendar size={12} />
                    <span>{formatDate(club.createdAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  {club.status === "Pending" && (
                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleApprove(club._id || club.id)}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={18} /> Approve Club
                      </button>
                      <button
                        onClick={() => handleReject(club._id || club.id)}
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <XCircle size={18} /> Reject Club
                      </button>
                    </div>
                  )}

                  {club.status === "Approved" && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs font-medium text-center">
                        ✓ This club has been verified
                        {club.isVerified && " and can now create events"}
                      </div>
                    </div>
                  )}

                  {club.status === "Rejected" && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-medium text-center">
                        ✗ This club request was rejected
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminManageClubs;
