import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Settings,
  ShieldCheck,
  Activity,
  LogOut,
  ChevronRight,
  Globe,
  Fingerprint,
  Zap,
  Camera,
  Save,
  X,
  Code,
  Building,
  Map,
  BookOpen,
  Award,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Profile = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000';

  // Form State
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    district: "",
    college: "",
    bio: "",
    interestedSkills: [],
  });
  
  const [newSkill, setNewSkill] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Sync editData with user data
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        address: user.address || "",
        district: user.district || "",
        college: user.college || "",
        bio: user.bio || "",
        interestedSkills: user.interestedSkills || [],
      });
      if (user.profilePicture) {
        setPreviewImage(`${VITE_BASE_API_URL}${user.profilePicture}`);
      }
    }
  }, [user, VITE_BASE_API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.interestedSkills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        interestedSkills: [...prev.interestedSkills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditData(prev => ({
      ...prev,
      interestedSkills: prev.interestedSkills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("address", editData.address);
    formData.append("district", editData.district);
    formData.append("college", editData.college);
    formData.append("bio", editData.bio);
    formData.append("interestedSkills", JSON.stringify(editData.interestedSkills));
    
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    const res = await updateProfile(formData);
    if (res.success) {
      setIsEditing(false);
      setSelectedFile(null);
      alert("Profile updated successfully!");
    } else {
      alert(res.message);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: User Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm text-center relative overflow-hidden group">
              {/* Background Decorative Element */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors"></div>

              <div className="relative">
                <div 
                  onClick={() => isEditing && fileInputRef.current.click()}
                  className={`w-36 h-36 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white font-black text-5xl shadow-2xl shadow-indigo-200 mx-auto mb-6 border-4 border-white transition-all overflow-hidden relative ${isEditing ? 'cursor-pointer hover:opacity-80 scale-105' : 'group-hover:scale-105 group-hover:rotate-2'}`}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                  
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs">
                      <Camera className="text-white" size={32} />
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    onChange={handleFileChange} 
                    accept="image/*"
                  />
                </div>
                {/* Online Status */}
                {!isEditing && (
                  <div className="absolute top-28 right-24 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full animate-pulse shadow-sm"></div>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="w-full text-center text-2xl font-black text-slate-800 tracking-tighter bg-slate-50 border-none rounded-xl py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
                    placeholder="Enter Full Name"
                  />
                ) : (
                  <h2 className="text-2xl font-black text-slate-800 tracking-tighter">
                    {user.name}
                  </h2>
                )}
                
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6 mt-2">
                  EventHub Enthusiast
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {user.roles?.map((role) => (
                  <span
                    key={role}
                    className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-800"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all group/btn"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Edit Profile
                    </span>
                    <Edit3
                      size={16}
                      className="text-slate-400 group-hover/btn:text-white"
                    />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-2xl transition-all hover:bg-indigo-700 font-black uppercase tracking-widest text-[10px]"
                    >
                      {loading ? "Saving..." : "Save Profile"}
                      <Save size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setPreviewImage(user.profilePicture ? `${VITE_BASE_API_URL}${user.profilePicture}` : null);
                      }}
                      className="p-4 bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {!isEditing && (
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-between p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all group/btn"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Sign Out
                    </span>
                    <LogOut
                      size={16}
                      className="text-red-300 group-hover/btn:text-white"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Achievement / Stats Card */}
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Community Reputation
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck size={28} className="text-indigo-200" />
                <div className="flex-1 h-3 bg-white/20 backdrop-blur-md rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </div>
                <span className="text-xs font-black">85%</span>
              </div>
              <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest leading-relaxed">
                You are a highly active member of EventHub.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: General Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <Award className="text-indigo-600" size={24} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Primary Profile Settings
                  </h3>
                </div>
              </div>

              {/* About Me Section */}
              <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                  About Me / Biography
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    placeholder="Write a few words about yourself..."
                    className="w-full bg-white border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none resize-none min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {user.bio || "No description provided yet. Click edit to tell us about yourself!"}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Email (Read Only) */}
                  <div className="group cursor-default opacity-60">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                      Your Email (Locked)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-400 rounded-2xl">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-400 tracking-tight">
                          {user.email}
                        </p>
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                          Contact Info
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* College */}
                  <div className="group">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                      College / University
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 rounded-2xl transition-all">
                        <Building size={20} />
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="college"
                            value={editData.college}
                            onChange={handleInputChange}
                            placeholder="College Name"
                            className="w-full bg-slate-50 border-none rounded-xl py-1 px-3 text-sm font-black text-slate-800 outline-none focus:ring-1 focus:ring-indigo-200"
                          />
                        ) : (
                          <p className="text-sm font-black text-slate-900 tracking-tight">
                            {user.college || "N/A"}
                          </p>
                        )}
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          Academic Info
                        </p>
                      </div>
                    </div>
                  </div>

                   {/* District */}
                   <div className="group">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                      Current District
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 rounded-2xl transition-all">
                        <Map size={20} />
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="district"
                            value={editData.district}
                            onChange={handleInputChange}
                            placeholder="District"
                            className="w-full bg-slate-50 border-none rounded-xl py-1 px-3 text-sm font-black text-slate-800 outline-none focus:ring-1 focus:ring-indigo-200"
                          />
                        ) : (
                          <p className="text-sm font-black text-slate-900 tracking-tight">
                            {user.district || "Nepal"}
                          </p>
                        )}
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          Location Details
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="group cursor-default">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">
                      Member Since
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 rounded-2xl transition-all">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 tracking-tight">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Present"}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          Registration Date
                        </p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Skills Section */}
              <div className="mt-12 pt-10 border-t border-slate-50">
                   <div className="flex items-center gap-4 mb-6">
                    <Code className="text-indigo-600" size={20} />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                      My Tech Skills
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {editData.interestedSkills.map((skill, index) => (
                      <span key={index} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-indigo-100">
                        {skill}
                        {isEditing && (
                          <X 
                            size={12} 
                            className="cursor-pointer hover:text-red-500" 
                            onClick={() => removeSkill(skill)}
                          />
                        )}
                      </span>
                    ))}
                    {!isEditing && user.interestedSkills?.length === 0 && (
                      <p className="text-xs text-slate-400 font-medium italic">No skills listed yet.</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="e.g. Graphic Design"
                        className="flex-1 bg-slate-50 border-none rounded-xl py-2 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button 
                        onClick={addSkill}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition-all font-bold"
                      >
                        Add
                      </button>
                    </div>
                  )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] group hover:border-indigo-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Activity size={20} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 tracking-tight">
                  Past Events
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  View events you have attended.
                </p>
              </div>

              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] group hover:border-emerald-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                    <Globe size={20} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 tracking-tight">
                  Network Access
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Manage your public visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
