import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/Organizer/EventFormcreate-edit";
import axios from "axios";

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/events", data, { withCredentials: true });
      navigate("/my-events"); // go to your events list
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return <EventForm onSubmit={handleCreate} isEdit={false} />;
};

export default CreateEvent;