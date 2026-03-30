import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, MapPin, Clock, Users, Globe, ExternalLink, 
  ChevronLeft, Share2, Info, Building2, Mail, CheckCircle2 
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import CountdownTimer from "../../components/common/CountdownTimer";
import useEvents from "../../hooks/useEvents";

const EventDetails = () => {
  const { id } = useParams();
  const { fetchEventById, events } = useEvents();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // First try to find the event in the existing events array
        let foundEvent = events?.find(e => e._id === id || e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
          setLoading(false);
          return;
        }
        
        // If not found, fetch from API
        const result = await fetchEventById(id);
        if (result.success) {
          setEvent(result.data);
        } else {
          setError(result.message || "Failed to load event details");
        }
      } catch (err) {
        setError(err.message || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
    window.scrollTo(0, 0);
  }, [id, fetchEventById, events]);

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 font-medium">
        {error}
      </div>
      <button 
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
      >
        <ChevronLeft size={20} /> Back to Events
      </button>
    </div>
  );

  if (!event) return null;

  const totalCapacity = event.capacity || event.participantCount || 100;
  const currentParticipants = event.currentParticipants || 0;
  const availableSeats = totalCapacity - currentParticipants;
  const occupancyPercent = totalCapacity ? Math.round((currentParticipants / totalCapacity) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* Hero / Header Section */}
        <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-6">
            <button 
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
            >
              <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
                <ChevronLeft size={18} />
              </div>
              <span className="font-medium text-sm">Back to all events</span>
            </button>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Image and Main Info */}
              <div className="lg:col-span-8 space-y-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={event.poster} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                      <CountdownTimer targetDate={event.eventDate} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                      {event.category}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      event.isPaid && event.price > 0 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {event.isPaid && event.price > 0 ? `Rs. ${event.price}` : "Free Event"}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {event.title}
                  </h1>

                  <div className="grid sm:grid-cols-2 gap-6 pb-8 border-b border-slate-50">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 mt-1">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Date & Time</p>
                        <p className="text-slate-700 font-semibold">{formatDate(event.eventDate)}</p>
                        <p className="text-slate-500 text-sm italic">Starting at {formatTime(event.eventDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 mt-1">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Location</p>
                        <p className="text-slate-700 font-semibold">{event.district}</p>
                        <p className="text-slate-500 text-sm">{event.venue || "To be announced"}</p>
                        {event.googleMapUrl && (
                          <a 
                            href={event.googleMapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-xs font-medium hover:underline mt-1 inline-block"
                          >
                            View on Maps →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Info size={20} className="text-indigo-600" /> Description
                    </h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                      {event.description || "No description provided for this event."}
                    </div>
                  </div>

                  {/* Tags Section */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="pt-8">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Actions and Organizer */}
              <div className="lg:col-span-4 space-y-8 sticky top-24">
                {/* Registration Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Users size={20} className="text-indigo-600" />
                        <div>
                          <p className="text-lg font-bold text-slate-800">{availableSeats}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Seats</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800">{totalCapacity}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 rounded-full ${
                            occupancyPercent > 90 ? 'bg-red-500' : 
                            occupancyPercent > 70 ? 'bg-orange-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${occupancyPercent}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-center text-slate-500 font-medium">
                        {occupancyPercent}% of seats already reserved
                      </p>
                    </div>

                    {event.deadline && (
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                        <Clock size={18} className="text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-amber-600">Registration Deadline</p>
                          <p className="text-xs text-amber-500 font-medium">{formatDate(event.deadline)}</p>
                        </div>
                      </div>
                    )}

                    <button 
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => navigate(`/register-for-event/${event._id}`)}
                      disabled={availableSeats <= 0}
                    >
                      {availableSeats > 0 ? "Book My Spot Now" : "Event Full"}
                    </button>

                    <div className="flex justify-center gap-6">
                      <button 
                        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Event link copied to clipboard!");
                        }}
                      >
                        <Share2 size={16} /> Share Event
                      </button>
                    </div>
                  </div>
                </div>

                {/* Organizer Card */}
                {event.organizer && (
                  <div className="bg-indigo-600 rounded-3xl p-8 shadow-xl text-white">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-80">Organized By</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                        <Building2 size={32} />
                      </div>
                      <div>
                        <h4 className="text-xl font-extrabold leading-tight mb-1">{event.organizer.name || "Event Organizer"}</h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-white/70 uppercase tracking-wider">
                          <CheckCircle2 size={12} className="text-green-400" /> Verified Club
                        </div>
                      </div>
                    </div>

                    {event.organizer.email && (
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail size={16} className="opacity-60" />
                          <span>{event.organizer.email}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 whitespace-nowrap rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                      onClick={() => navigate(`/organizer/${event.organizer._id}`)}
                    >
                      Visit Profile <ExternalLink size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;