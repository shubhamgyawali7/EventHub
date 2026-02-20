// src/components/EventCard.jsx
import React from "react";

<<<<<<< HEAD
const EventCard = ({ title, date, location, deadline, image, direction = "left" }) => {
  const animationClass = direction === "left" ? "animate-slideInLeft" : "animate-slideInRight";

  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300 ${animationClass}`}>
      {image && (
        <img
          src={image}
=======
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
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
<<<<<<< HEAD
      <p className="text-gray-600">📍 {location}</p>
      <p className="text-gray-600">📅 {date}</p>
      <p className="text-red-500 font-medium">Deadline: {deadline}</p>
=======
      <p className="text-gray-600">📍 {district}</p>
      <p className="text-gray-600">📅 {formatDate(eventDate)}</p>
      <p className="text-red-500 font-medium">Deadline:  {formatDate(deadline)}</p>
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
    </div>
  );
};

export default EventCard;
