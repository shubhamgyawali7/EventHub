import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import api from "../../api/axios";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

const RegistrationForm = ({ eventId, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    college: user?.college || "",
    remarks: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post(`/api/registrations/${eventId}`, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Registration request rejected by the server.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, name: "Bio Data" },
    { id: 2, name: "Education" },
    { id: 3, name: "Confirm" },
  ];

  return (
    <div className="bg-white rounded-[3rem] p-6 md:p-10 max-w-xl w-full mx-auto border border-slate-100 shadow-2xl overflow-hidden mt-8 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
      
      {/* Horizontal Stepper Bar */}
      <div className="flex items-center justify-between mb-12 px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center group">
            <div
              className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center font-black text-sm transition-all duration-500 transform ${
                step >= s.id
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110"
                  : "bg-white text-slate-300 border-2 border-slate-100 group-hover:border-slate-200"
              }`}
            >
              {step > s.id ? <CheckCircle size={20} className="animate-in fade-in zoom-in" /> : s.id}
            </div>
            <span
              className={`text-[9px] uppercase tracking-[0.2em] font-black mt-3 transition-colors duration-300 ${step >= s.id ? "text-indigo-600" : "text-slate-400"}`}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl text-sm mb-8 flex items-start gap-4 shadow-sm animate-in slide-in-from-top-2">
          <span className="text-xl">⚠️</span> 
          <div>
              <p className="font-bold uppercase tracking-wider text-[10px] text-rose-400 mb-1">System Error</p>
              <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-[300px] relative">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Identity Verification</h3>
                <p className="text-slate-500 font-medium italic mt-2 text-sm border-l-4 border-slate-100 pl-4">Please confirm your core biographic details for the registration registry.</p>
            </div>
            
            <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 font-medium placeholder-slate-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 font-medium placeholder-slate-300"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 font-medium placeholder-slate-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Academic Profile</h3>
                <p className="text-slate-500 font-medium italic mt-2 text-sm border-l-4 border-slate-100 pl-4">Provide details regarding your current institutional affiliation.</p>
            </div>

            <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Institution / Organization
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 font-medium placeholder-slate-300"
                    placeholder="University of Science"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 font-medium placeholder-slate-300 resize-none"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 items-center flex gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                     <CheckCircle size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Final Verification</h3>
                    <p className="text-slate-500 font-medium mt-1 text-sm">Please review your submission data before finalizing.</p>
                 </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
              {[
                  { label: "Legal Name", value: formData.name },
                  { label: "Email Route", value: formData.email },
                  { label: "Comm Link", value: formData.phone },
                  { label: "Institution", value: formData.college }
              ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-slate-200/50 last:border-0 last:pb-0">
                      <span className="font-bold text-slate-400 uppercase text-[10px] tracking-[0.2em] mb-1 sm:mb-0">
                        {item.label}
                      </span>
                      <span className="text-slate-800 font-medium bg-white px-3 py-1 rounded-lg border border-slate-100">
                        {item.value || <span className="text-slate-300 italic">Not provided</span>}
                      </span>
                  </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex gap-4 pt-6 border-t border-slate-50">
        {step > 1 && (
          <button
            onClick={handlePrev}
            className="w-16 md:w-auto md:px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-400 border border-slate-100 hover:bg-slate-50 hover:text-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={18} className="md:mr-1" /> <span className="hidden md:inline">Reverse</span>
          </button>
        )}
        
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={step === 1 && (!formData.name || !formData.phone)}
            className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50 disabled:active:scale-100 group"
          >
            Proceed Forward <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 disabled:opacity-70 disabled:active:scale-100 relative overflow-hidden"
          >
            {loading ? (
                <>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Executing...
                </>
            ) : "Initialize Registration 🚀"}
          </button>
        )}
      </div>

      <div className="text-center mt-6">
        <button
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-rose-500 transition-colors"
        >
            Abort Process
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
