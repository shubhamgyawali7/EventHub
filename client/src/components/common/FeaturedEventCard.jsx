import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

/**
 * A more prominent, "Featured" card for the Home Page. 
 * Focuses on a cleaner layout with a larger emphasis on the poster and brand.
 */
const FeaturedEventCard = ({
    _id,
    title,
    eventDate,
    district,
    poster,
    category,
    organizer
}) => {
    const formatDate = (dateString) => {
        if (!dateString) return "TBD";
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="group relative bg-white overscroll-none rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50">

            {/* Poster with Gradient Overlay */}
            <div className="relative h-64 md:h-80">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-8">
                    {/* Category / Date floating tag */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/30">
                            {category}
                        </span>
                        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                            {formatDate(eventDate)}
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight line-clamp-2 drop-shadow-lg">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Footer Info */}
            <div className="p-8 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                        {organizer?.logo ? (
                            <img src={organizer.logo} alt={organizer.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs font-bold text-indigo-600">{organizer?.name?.charAt(0) || "C"}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hosted by</span>
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[120px]">{organizer?.name || "Official Club"}</span>
                    </div>
                </div>

                <Link
                    to={`/event/${_id}`}
                    className="w-12 h-12 bg-slate-900 flex items-center justify-center rounded-2xl text-white hover:bg-indigo-600 transition-colors shadow-lg"
                >
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

export default FeaturedEventCard;
