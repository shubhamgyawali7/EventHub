import { Shield, CheckCircle, Lock, Eye, Share2, UserCheck, Cookie, Database } from "lucide-react";

const PRIVACY_SECTIONS = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you register, we collect your full name, email address, college name, district, and role (student or organizer). Organizers additionally provide club credentials for verification purposes.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with the platform — pages visited, events viewed, searches performed, and registration actions. This data is used solely to improve our recommendation algorithm and user experience.",
      },
      {
        subtitle: "Device & Technical Data",
        text: "We log your IP address, browser type, operating system, and device identifiers to maintain security and diagnose technical issues. This data is retained for 90 days.",
      },
      {
        subtitle: "Communications",
        text: "If you contact us for support, we retain the content of your messages to resolve your query and improve our service.",
      },
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Platform Operation",
        text: "Your account data enables authentication, event registration, personalized dashboards, and deadline notifications. Location data (district) powers our location-based event filtering.",
      },
      {
        subtitle: "Event Prioritization",
        text: "Aggregated registration counts (not personal data) feed our rule-based prioritization algorithm that calculates 'Trending' and 'Urgent' scores for events.",
      },
      {
        subtitle: "Communications",
        text: "We send transactional emails including registration confirmations, event reminders, deadline alerts, and account security notifications. You cannot opt out of security-related emails.",
      },
      {
        subtitle: "Platform Improvement",
        text: "Anonymized, aggregated usage data helps us understand how students discover events and improve the platform experience. We do not run advertising or sell this data.",
      },
    ],
  },
  {
    icon: Share2,
    title: "Data Sharing",
    content: [
      {
        subtitle: "With Organizers",
        text: "When you register for an event, the organizing club receives your name, college, email address, and registration timestamp for logistical purposes. This is disclosed at the point of registration.",
      },
      {
        subtitle: "With Service Providers",
        text: "We use MongoDB Atlas (database hosting), Nodemailer with a trusted SMTP provider (email delivery), and cloud storage for uploaded event posters. These providers process data only as necessary to deliver their service.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose personal data if required by Nepalese law, court order, or to protect the safety of our users.",
      },
      {
        subtitle: "No Sale of Data",
        text: "EventHub does not sell, rent, or trade personal information to any third party for marketing or commercial purposes, ever.",
      },
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You may view and update your profile information at any time from your account settings. If you believe any data we hold is inaccurate, contact us for correction.",
      },
      {
        subtitle: "Account Deletion",
        text: "You may request deletion of your account and associated personal data by emailing support@eventhub.com.np. We will process your request within 14 days. Note that registration records shared with organizers may remain in their systems.",
      },
      {
        subtitle: "Data Portability",
        text: "You may request a copy of your personal data in a structured, machine-readable format by contacting our support team.",
      },
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use HTTP-only cookies exclusively for authentication session management (JWT tokens). These cookies are strictly necessary for the platform to function and cannot be disabled.",
      },
      {
        subtitle: "No Third-Party Tracking",
        text: "EventHub does not embed third-party advertising trackers, Facebook pixels, or Google Analytics on the platform. We use self-hosted analytics with anonymized data only.",
      },
    ],
  },
  {
    icon: Database,
    title: "Data Retention & Security",
    content: [
      {
        subtitle: "Retention Period",
        text: "Active account data is retained for the duration of your account. Inactive accounts (no login for 24 months) may be deactivated with prior notice. Event registration records are retained for 3 years for organizer reporting purposes.",
      },
      {
        subtitle: "Security Measures",
        text: "All passwords are hashed with bcryptjs. API communications use HTTPS/TLS. Database access is restricted by IP allowlisting. We conduct periodic security reviews. However, no system is completely immune to breaches — we will notify affected users promptly if a breach occurs.",
      },
    ],
  },
];

const TRUST_BADGES = [
  "We never sell your data",
  "No third-party ad tracking",
  "HTTPS encrypted",
  "Bcrypt password hashing",
];

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .privacy-root { font-family: 'DM Sans', sans-serif; background: #f5f7fa; min-height: 100vh; }
        h1, h2, h3, .brand { font-family: 'Sora', sans-serif; }
        .section-card { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div className="privacy-root">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-700 pt-16 pb-28 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at top left, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 border border-white/25 rounded-2xl mb-5 backdrop-blur-sm">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Privacy Policy</h1>
            <p className="text-teal-100 text-sm mb-2">Last revised: January 2026</p>
            <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
              We're committed to protecting your privacy. Here's exactly what we collect, why, and how.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {TRUST_BADGES.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} className="text-emerald-300" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-10 pb-16 space-y-4">
          {/* Intro card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-sm text-slate-600 leading-relaxed">
            EventHub ('we', 'our', 'us') is committed to protecting the privacy of students, organizers, and visitors who use our platform. This Privacy Policy explains what personal information we collect, why we collect it, how it is used and protected, and your rights. By using EventHub, you consent to the practices described below.
          </div>

          {/* Sections */}
          {PRIVACY_SECTIONS.map((section, si) => {
            const Icon = section.icon;
            return (
              <div
                key={si}
                className="section-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                style={{ animationDelay: `${si * 80}ms` }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Icon size={15} className="text-emerald-700" />
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-sm">{section.title}</h2>
                </div>
                {/* Content */}
                <div className="px-6 py-5 space-y-4">
                  {section.content.map((item, ii) => (
                    <div key={ii} className={ii > 0 ? "pt-4 border-t border-slate-50" : ""}>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">{item.subtitle}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Contact */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-7">
            <p className="text-white font-bold text-base mb-1">Questions about this policy?</p>
            <p className="text-slate-400 text-sm mb-4">We're happy to explain anything in plain language.</p>
            <div className="space-y-1 text-sm">
              <p className="text-slate-300">
                Email:{" "}
                <a href="mailto:support@eventhub.com.np" className="text-emerald-400 font-semibold hover:underline">
                  support@eventhub.com.np
                </a>
              </p>
              <p className="text-slate-400 text-xs">Dept. of CSIT, Butwal Multiple Campus, Butwal-3, Rupandehi, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}