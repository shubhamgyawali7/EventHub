import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const RoleSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelection = (type) => {
    if (type === "Club") {
      // If they want to be an organizer, send them to the Club Registration form
      navigate("/register-club");
    } else {
      // If they just want to be a student, send them home
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-500 mb-8">How do you plan to use EventHub?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Option */}
          <div 
            onClick={() => handleSelection("Student")}
            className="border-2 border-gray-100 p-6 rounded-xl hover:border-[#4F46E5] cursor-pointer transition group"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="font-bold text-xl mb-2">I am a Student</h3>
            <p className="text-sm text-gray-500">I want to find and attend college events.</p>
          </div>

          {/* Organizer Option */}
          <div 
            onClick={() => handleSelection("Club")}
            className="border-2 border-gray-100 p-6 rounded-xl hover:border-[#7C3AED] cursor-pointer transition group"
          >
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="font-bold text-xl mb-2">I am an Organizer</h3>
            <p className="text-sm text-gray-500">I want to register my club and host events.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;