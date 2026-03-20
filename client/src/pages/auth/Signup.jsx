import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Track if we are on details or role choice
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    district: "",
    college: "",
    address: "",
    roles: "" // This will hold the selected role (Student or Club)
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleChoice = (role) => {
    setFormData({ ...formData, roles: role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
console.log("Submitting form with data:", formData);
    // This sends the full formData including the 'selectedRole'
    const result = await signup(formData);
    
    if (result.success) {
      // Logic: If they chose Club, send to register form. Otherwise, Home.
      if (formData.selectedRole === "Club") {
        navigate("/login");
      } else {
        navigate("/");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-gray-100">
        
        {step === 1 ? (
          /* STEP 1: PERSONAL DETAILS */
          <>
            <h2 className="text-3xl font-bold text-center mb-2 text-[#0F172A]">Create Account</h2>
            <p className="text-center text-gray-500 mb-8">Step 1 of 2: Your Details</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input type="text" name="name" onChange={handleChange} required className="w-full px-4 py-2.5 border rounded-xl" placeholder="Full Name" />
              </div>
              <div className="md:col-span-2">
                <input type="email" name="email" onChange={handleChange} required className="w-full px-4 py-2.5 border rounded-xl" placeholder="Email" />
              </div>
              <input type="text" name="district" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" placeholder="District" />
              <input type="text" name="college" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" placeholder="College" />
              <input type="password" name="password" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" placeholder="Password" />
              <input type="password" name="confirmPassword" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" placeholder="Confirm Password" />
              
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
              >
                Next: Choose Role
              </button>
            </form>
          </>
        ) : (
          /* STEP 2: ROLE SELECTION */
          <>
            <h2 className="text-3xl font-bold text-center mb-2 text-[#0F172A]">Choose Your Role</h2>
            <p className="text-center text-gray-500 mb-8">Step 2 of 2: How will you use EventHub?</p>
            
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div 
                onClick={() => handleRoleChoice("Student")}
                className={`p-4 border-2 rounded-xl cursor-pointer transition ${formData.roles === "Student" ? "border-indigo-600 bg-indigo-50" : "border-gray-100"}`}
              >
                <h3 className="font-bold">🎓 Student</h3>
                <p className="text-xs text-gray-500">I want to attend events.</p>
              </div>

              <div 
                onClick={() => handleRoleChoice("Club")}
                className={`p-4 border-2 rounded-xl cursor-pointer transition ${formData.roles === "Club" ? "border-purple-600 bg-purple-50" : "border-gray-100"}`}
              >
                <h3 className="font-bold">🏛️ Organizer / Club</h3>
                <p className="text-xs text-gray-500">I want to host events.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="w-1/3 py-3 border rounded-xl font-bold">Back</button>
              <button onClick={handleSubmit} className="w-2/3 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg">
                Complete Sign Up
              </button>
            </div>
          </>
        )}

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
