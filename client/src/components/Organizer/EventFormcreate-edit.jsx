// src/components/EventForm.jsx
import React, { useState, useEffect } from "react";
import { FaCalendarPlus } from "react-icons/fa";

const EventForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    district: "",
    venue: "",
    eventDate: "",
    deadline: "",
    poster: "",
    category: "",
  });

  // Only update formData when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        district: initialData.district || "",
        venue: initialData.venue || "",
        eventDate: initialData.eventDate ? initialData.eventDate.split("T")[0] : "",
        deadline: initialData.deadline ? initialData.deadline.split("T")[0] : "",
        poster: initialData.poster || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <FaCalendarPlus className="text-pink-500 text-4xl mb-2" />
          <h1 className="text-2xl font-extrabold text-pink-600">
            {isEdit ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEdit
              ? "Update the details below"
              : "Fill in the details below to add your event"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Competition">Competition</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          {/* District + Venue */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Poster */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Poster URL</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            {isEdit ? "Update Event" : "Save Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;