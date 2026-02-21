// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ title, eventDate, district, deadline, poster, direction = "left" }) => {
  const animationClass = direction === "left" ? "animate-slideInLeft" : "animate-slideInRight";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300 ${animationClass}`}>
      {poster && (
        <img
          src={poster}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">📍 {district}</p>
      <p className="text-gray-600">📅 {formatDate(eventDate)}</p>
      <p className="text-red-500 font-medium">Deadline:  {formatDate(deadline)}</p>
    </div>
  );
};

export default EventCard;
