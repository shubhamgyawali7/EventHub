// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ title, date, location, deadline, image, direction = "left" }) => {
  const animationClass = direction === "left" ? "animate-slideInLeft" : "animate-slideInRight";

  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300 ${animationClass}`}>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">📍 {location}</p>
      <p className="text-gray-600">📅 {date}</p>
      <p className="text-red-500 font-medium">Deadline: {deadline}</p>
    </div>
  );
};

export default EventCard;
