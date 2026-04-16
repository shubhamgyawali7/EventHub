import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Clock, CheckCircle, XCircle, Building2, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const VerificationStatusHub = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [clubStatus, setClubStatus] = useState(null);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (user?.club && !redirected) {
      setClubStatus(user.club.status);
      
      // Redirect if already approved
      if (user.club.isVerified) {
        setRedirected(true);
        navigate("/club/dashboard");
      }
    }
  }, [user, navigate, redirected]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If no club data, show loading or redirect to register
  if (!user?.club) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-slate-600 mb-4">No club registration found.</p>
            <Link
              to="/club/register"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold"
            >
              Register Your Club
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-slate-50 to-indigo-50/30">
        <div className="max-w-2xl w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-all duration-300 mb-8"
          >
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">
              Back
            </span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className={`p-8 text-center ${
              clubStatus === "Approved" 
                ? "bg-linera-to-r from-emerald-600 to-green-600"
                : clubStatus === "Rejected"
                ? "bg-linera-to-r from-red-600 to-rose-600"
                : "bg-linera-to-r from-amber-600 to-orange-600"
            }`}>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {clubStatus === "Approved" ? (
                  <CheckCircle size={40} className="text-white" />
                ) : clubStatus === "Rejected" ? (
                  <XCircle size={40} className="text-white" />
                ) : (
                  <Clock size={40} className="text-white" />
                )}
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {clubStatus === "Approved"
                  ? "Registration Approved!"
                  : clubStatus === "Rejected"
                  ? "Registration Not Approved"
                  : "Application Received"}
              </h2>
              <p className="text-white/80 text-sm">
                {clubStatus === "Approved"
                  ? "Your organization has been verified"
                  : clubStatus === "Rejected"
                  ? "We couldn't verify your organization"
                  : "Your application is under review"}
              </p>
            </div>

            <div className="p-8">
              {clubStatus === "Pending" && (
                <>
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building2 size={48} className="text-amber-600" />
                    </div>
                    <p className="text-slate-600 text-center mb-6">
                      Your club registration is currently under review by our administrators.
                      You'll receive an email notification once the review is complete.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-sm font-bold text-amber-700 mb-2">📋 What happens next?</p>
                      <ul className="text-sm text-amber-600 space-y-1">
                        <li>• Admin team reviews your application (24-48 hours)</li>
                        <li>• You'll receive email notification with the decision</li>
                        <li>• Once approved, you can start creating events</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to="/"
                      className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition text-center"
                    >
                      Return to Home
                    </Link>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                    >
                      Check Status
                    </button>
                  </div>
                </>
              )}

              {clubStatus === "Approved" && (
                <>
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={48} className="text-emerald-600" />
                    </div>
                    <p className="text-slate-600 mb-4">
                      Congratulations! Your organization has been verified. You can now:
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left">
                      <ul className="text-sm text-emerald-700 space-y-2">
                        <li>✓ Create and manage events</li>
                        <li>✓ Track registrations</li>
                        <li>✓ Access analytics dashboard</li>
                        <li>✓ Connect with attendees</li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/club/dashboard")}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                  >
                    Go to Dashboard
                  </button>
                </>
              )}

              {clubStatus === "Rejected" && (
                <>
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <XCircle size={48} className="text-red-600" />
                    </div>
                    <p className="text-slate-600 mb-4">
                      Unfortunately, your club registration was not approved at this time.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left">
                      <p className="text-sm font-bold text-red-700 mb-2">Common reasons:</p>
                      <ul className="text-sm text-red-600 space-y-1">
                        <li>• Incomplete information</li>
                        <li>• Invalid contact details</li>
                        <li>• Organization already registered</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to="/contact"
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition text-center"
                    >
                      Contact Support
                    </Link>
                    <button
                      onClick={() => navigate("/club/register")}
                      className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                    >
                      Try Again
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerificationStatusHub;