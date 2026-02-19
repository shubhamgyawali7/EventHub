// src/pages/CreateEvent.jsx
import React, { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    deadline: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to backend (POST /api/events)
    console.log("Event created:", formData);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Event Title"
          className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="date" name="date" className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location"
          className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="date" name="deadline" className="w-full border p-2 rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description"
          className="w-full border p-2 rounded" onChange={handleChange}></textarea>
        <input type="file" name="image" accept="image/*"
          className="w-full border p-2 rounded" onChange={handleChange} />
        <button type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
