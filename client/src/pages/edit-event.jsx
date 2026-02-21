import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/Organizer/EventFormcreate-edit";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`, { withCredentials: true });
        setEventData(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, data, { withCredentials: true });
      navigate("/my-events");
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return eventData ? (
    <EventForm initialData={eventData} onSubmit={handleUpdate} isEdit={true} />
  ) : (
    <p className="p-6 text-center">Loading event...</p>
  );
};

export default EditEvent;