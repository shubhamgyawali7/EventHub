import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const RegisterClub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for logic handling
  const [checking, setChecking] = useState(true);
  const [existingClub, setExistingClub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      website: ""
    }
  });
console .log("Current User in RegisterClub:", user);
  // 1. Check for existing registration on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // This endpoint should find a club where createdBy === req.user.id
        
        if (user.club) {
          setExistingClub(user.club);
          
          // If the admin has already approved them (Role changed to Club)
          // redirect them straight to the Dashboard
          if (user?.roles?.includes("Club")) {
            navigate("/club/dashboard");
          }
        }
      } catch (err) {
        console.log("No pending registration found, showing form.");
      } finally {
        setChecking(false);
      }
    };
    checkStatus();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/register-club", formData);
      setSuccess(true);
      // Refresh or redirect after success
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  // UI: Loading state while checking DB
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // UI: Show "Pending" screen if they already registered but aren't approved yet
  if (existingClub && !user?.roles?.includes("Club")) {
    return (
      <div className="pt-32 flex justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-indigo-50">
          <div className="text-6xl mb-6">⏳</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Application Pending</h2>
          <p className="text-slate-600 mb-6">
            You have already submitted a request for <span className="font-bold text-indigo-600">{existingClub.name}</span>. 
            Our admin is currently reviewing your details.
          </p>
          <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-sm mb-6">
            Status: <b>Waiting for Admin Verification</b>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  // UI: Show the actual Registration Form
  return (
    <div className="pt-24 pb-12 flex justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Register Your Club</h2>
          <p className="text-slate-500">Apply to become an official organizer on EventHub.</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 border border-red-100">{error}</div>}
        {success && <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-6 border border-green-100">Application submitted successfully!</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Official Club Name</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. IT Students Club" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Club Contact Email</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="contact@club.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" required onChange={handleChange} rows="4" className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="What does your club do?"></textarea>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 border-b pb-2">Social Presence (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="url" name="socialLinks.facebook" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl outline-none" placeholder="Facebook URL" />
              <input type="url" name="socialLinks.instagram" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl outline-none" placeholder="Instagram URL" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg disabled:bg-indigo-300"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClub;
