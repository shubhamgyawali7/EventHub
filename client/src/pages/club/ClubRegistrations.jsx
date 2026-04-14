import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Mail,
  Phone,
  Building2,
  ChevronLeft,
  Search,
  Download,
  UserCheck,
  MapPin,
  ExternalLink,
} from "lucide-react";
import ClubSidebar from "./ClubSidebar";
import useOrganizer from "../../hooks/useOrganizer";
import useEvents from "../../hooks/useEvents";
import { toast } from "react-hot-toast";

const ClubRegistrations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [registrationMode, setRegistrationMode] = useState("portal");
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [currentResponseEvent, setCurrentResponseEvent] = useState(null);
  const [temporaryResponseUrl, setTemporaryResponseUrl] = useState("");

  const {
    fetchClubRegistrations,
    fetchOrganizerEvents,
    registrations,
    orgEvents,
    loading,
    error,
  } = useOrganizer();

  const { updateEvent } = useEvents();

  useEffect(() => {
    fetchClubRegistrations();
    fetchOrganizerEvents();
  }, [fetchClubRegistrations, fetchOrganizerEvents]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Get unique events for filter dropdown
  const uniqueEvents = [
    ...new Set(
      registrations
        .filter((reg) => reg.event && reg.event._id)
        .map((reg) => reg.event._id),
    ),
  ].map((eventId) => {
    const reg = registrations.find((r) => r.event && r.event._id === eventId);
    return { id: eventId, title: reg.event.title };
  });

  // Filter registrations based on search and event filter
  const filteredRegistrations = registrations.filter((reg) => {
    // Skip registrations without valid event data
    if (!reg.event || !reg.event._id) return false;

    const matchesSearch =
      searchTerm === "" ||
      reg.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.user.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.event.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEvent =
      selectedEvent === "all" || reg.event._id === selectedEvent;

    return matchesSearch && matchesEvent;
  });

  // Get events using Google Forms
  const googleFormEvents = orgEvents.filter(
    (event) => event.registrationType === "google_form",
  );

  const portalRegistrations = filteredRegistrations.filter(
    (reg) => reg.event?.registrationType !== "google_form",
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGoogleFormResponseUrl = (urls) => {
    if (!urls) return "";
    const normalized = Array.isArray(urls) ? urls : [urls];
    if (normalized[1] && normalized[1].trim()) return normalized[1].trim();
    const formUrl = normalized[0];
    if (!formUrl) return "";
    const trimmed = formUrl.trim();
    if (
      trimmed.includes("edit#responses") ||
      trimmed.includes("viewanalytics") ||
      trimmed.includes("spreadsheets")
    ) {
      return trimmed;
    }
    const match = trimmed.match(/\/forms\/d\/([^\/]+)/);
    if (match && match[1]) {
      return `https://docs.google.com/forms/d/${match[1]}/edit#responses`;
    }
    return trimmed;
  };

  const openResponseModal = async (event) => {
    const urls =
      event.googleFormUrls ||
      (event.googleFormUrl ? [event.googleFormUrl] : []);
    if (urls[1] && urls[1].trim()) {
      window.open(getGoogleFormResponseUrl(urls), "_blank");
      return;
    }
    setCurrentResponseEvent(event);
    setTemporaryResponseUrl("");
    setResponseModalOpen(true);
  };

  const saveResponseUrl = async () => {
    if (!temporaryResponseUrl.trim()) {
      toast.error("Please enter the response sheet URL.");
      return;
    }

    const event = currentResponseEvent;
    if (!event) return;

    const existingUrls =
      event.googleFormUrls ||
      (event.googleFormUrl ? [event.googleFormUrl] : [""]);
    const updatedUrls = [existingUrls[0] || "", temporaryResponseUrl.trim()];

    const result = await updateEvent({
      id: event._id,
      data: { googleFormUrls: updatedUrls },
    });

    if (result.success) {
      toast.success("Response sheet URL saved successfully.");
      setResponseModalOpen(false);
      setCurrentResponseEvent(null);
      setTemporaryResponseUrl("");
      fetchOrganizerEvents();
    } else {
      toast.error(result.message || "Failed to save response URL.");
    }
  };

  const exportToCSV = () => {
    const csvData = filteredRegistrations.map((reg) => ({
      "Event Title": reg.event?.title || "Unknown Event",
      "Event Date": reg.event?.eventDate
        ? formatDate(reg.event.eventDate)
        : "N/A",
      "Student Name": reg.user.name,
      Email: reg.user.email,
      Phone: reg.phone || "N/A",
      College: reg.user.college || "N/A",
      "Registration Date": formatDate(reg.createdAt),
      Status: reg.status,
    }));

    const csvString = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event-registrations.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-[#F8F9FD]">
        <ClubSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex bg-[#F8F9FD]">
        <ClubSidebar />
        <main className="flex-1 p-10 flex items-center justify-center">
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-12 max-w-2xl text-center">
            <div className="text-rose-500 mb-4 flex justify-center">
              <Users size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Error Loading Registrations
            </h3>
            <p className="text-slate-600 font-bold mb-6">{error}</p>
            <button
              onClick={() => navigate("/club/dashboard")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8F9FD]">
      <ClubSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/club/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold"
          >
            <ChevronLeft size={20} /> Back to Dashboard
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Title and Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Event <span className="text-indigo-600">Registrations</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Total Registrations
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {registrations.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <Calendar size={24} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Events with Registrations
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {uniqueEvents.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <UserCheck size={24} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Confirmed
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {
                      registrations.filter((r) => r.status === "Confirmed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setRegistrationMode("portal")}
              className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
                registrationMode === "portal"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-600 hover:text-indigo-700"
              }`}
            >
              Portal Registration
            </button>
            <button
              type="button"
              onClick={() => setRegistrationMode("google_form")}
              className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
                registrationMode === "google_form"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >
              Google Forms
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-white px-4 py-3 text-sm font-medium text-slate-500 border border-slate-200">
              {registrationMode === "portal"
                ? "Manage portal registrations"
                : "Review external Google Form registrations"}
            </div>
          </div>
        </div>

        {registrationMode === "google_form" ? (
          <div className="mb-8">
            {googleFormEvents.length > 0 ? (
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                  Events Using{" "}
                  <span className="text-blue-600">Google Forms</span>
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        External Registration Notice
                      </h3>
                      <p className="text-slate-600 font-medium mb-4">
                        The following events use Google Forms for registration.
                        Registration data is managed externally and cannot be
                        viewed or imported automatically in this system.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {googleFormEvents.map((event) => (
                      <div
                        key={event._id}
                        className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 mb-1">
                              {event.title}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {formatDate(event.eventDate)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={
                                event.googleFormUrls?.[0] ||
                                event.googleFormUrl ||
                                "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-xl font-bold hover:bg-blue-700 transition-colors"
                            >
                              View Form
                            </a>
                            <button
                              type="button"
                              onClick={() => openResponseModal(event)}
                              className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                            >
                              Responses
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">
                          Registration data is collected via Google Forms. Check
                          the responses link to view registered participants.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center">
                <p className="text-slate-600 font-medium">
                  No Google Forms events are currently configured for your club.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, college, or event..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none font-medium"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="all">All Events</option>
                {uniqueEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>

            {portalRegistrations.length > 0 ? (
              <div className="space-y-4">
                {portalRegistrations.map((registration) => (
                  <div
                    key={registration._id}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 font-black text-lg">
                            {registration.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-black text-slate-900 mb-1">
                            {registration.user.name}
                          </h3>
                          <div className="space-y-1 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Mail size={14} />
                              <span>{registration.user.email}</span>
                            </div>
                            {registration.phone && (
                              <div className="flex items-center gap-2">
                                <Phone size={14} />
                                <span>{registration.phone}</span>
                              </div>
                            )}
                            {(registration.user.college ||
                              registration.college) && (
                              <div className="flex items-center gap-2">
                                <Building2 size={14} />
                                <span>
                                  {registration.user.college ||
                                    registration.college}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="bg-slate-50 rounded-2xl p-4">
                          <h4 className="font-bold text-slate-900 mb-2">
                            {registration.event?.title || "Unknown Event"}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {registration.event?.eventDate
                                  ? formatDate(registration.event.eventDate)
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>
                                {registration.event?.district || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                            registration.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : registration.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {registration.status}
                        </span>
                        <div className="text-xs text-slate-500 font-medium">
                          Registered: {formatDate(registration.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Users size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  No Registrations Found
                </h3>
                <p className="text-slate-600 font-medium">
                  {searchTerm || selectedEvent !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No students have registered for your events yet"}
                </p>
              </div>
            )}
          </>
        )}

        {responseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8">
            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4">
                Enter the Response Google Sheet
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Add the response sheet URL for this event. This is only required
                the first time the response button is clicked.
              </p>
              <input
                type="url"
                value={temporaryResponseUrl}
                onChange={(e) => setTemporaryResponseUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-4 px-5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setResponseModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-300 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveResponseUrl}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClubRegistrations;
