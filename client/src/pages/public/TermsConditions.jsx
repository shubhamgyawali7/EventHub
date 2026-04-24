import { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";

const TERMS_SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the EventHub platform ('Service') operated by the EventHub team ('we', 'us', 'our') as a final-year project submitted to the Department of Computer Science and Information Technology, Butwal Multiple Campus, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Service. These terms apply to all visitors, students, organizers, and administrators who access the platform.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 16 years of age to create a student account. Organizer accounts require you to represent a legitimately registered IT club or professional organization based in Nepal. By registering, you represent that all information you provide is accurate, truthful, and kept up to date. Providing false credentials is grounds for immediate account termination.",
  },
  {
    title: "User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at support@eventhub.com.np if you suspect unauthorized access to your account. You are responsible for all activity that occurs under your account. EventHub reserves the right to suspend or terminate accounts that violate these terms, provide false information, engage in disruptive behavior, or remain inactive for an extended period.",
  },
  {
    title: "Organizer Responsibilities",
    body: "Organizers granted posting privileges agree to: (1) post only accurate and truthful event information; (2) honor stated registration deadlines and seat limits; (3) promptly update or remove events that are cancelled or materially changed; (4) handle participant data obtained through EventHub in compliance with applicable privacy obligations; (5) not use EventHub to advertise events unrelated to IT, technology, or professional development. EventHub reserves the right to revoke organizer privileges for non-compliance without prior notice.",
  },
  {
    title: "Acceptable Use",
    body: "You agree not to: use the platform for any unlawful purpose or in violation of any Nepalese law; scrape, crawl, or systematically extract data without written permission; attempt to gain unauthorized access to any part of the system; upload malicious code, viruses, or harmful content; impersonate another person or organization; post spam, misleading, or defamatory content; use the platform to harass, threaten, or harm other users. Violation of these rules may result in immediate account suspension and, where applicable, reporting to relevant authorities.",
  },
  {
    title: "Intellectual Property",
    body: "The EventHub name, logo, platform design, source code, and original content are the intellectual property of the EventHub development team and are protected under applicable copyright law. Event posters and content uploaded by organizers remain the property of their respective creators — by uploading content, organizers grant EventHub a non-exclusive, royalty-free license to display that content on the platform for the purpose of event promotion.",
  },
  {
    title: "Third-Party Events & Registration",
    body: "EventHub acts as an information platform and facilitator. We are not the organizer of listed events and are not responsible for the quality, safety, or conduct of any event. For events using external Google Forms or third-party payment gateways, you interact directly with the organizer. EventHub is not liable for any disputes between students and organizers, including refund requests for paid events.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, EventHub and its developers shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to: missed event deadlines due to platform unavailability; incorrect event information posted by organizers; loss of registration data; or unauthorized access to your account resulting from your own failure to protect credentials. The platform is provided on an 'as is' and 'as available' basis during its academic project lifecycle.",
  },
  {
    title: "Platform Availability",
    body: "EventHub is currently deployed as part of an academic project. We make reasonable efforts to maintain availability but do not guarantee uninterrupted service. Scheduled and unscheduled maintenance may temporarily affect access. We will communicate significant downtime in advance when possible.",
  },
  {
    title: "Modifications to Terms",
    body: "We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated 'Last Revised' date. For material changes, we will notify registered users by email. Your continued use of the platform after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "Governing Law",
    body: "These Terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms or your use of EventHub shall be subject to the jurisdiction of the courts located in Butwal, Rupandehi, Nepal.",
  },
  {
    title: "Contact",
    body: "For any questions regarding these Terms and Conditions, please contact the EventHub team at: support@eventhub.com.np | Department of Computer Science & IT, Butwal Multiple Campus, Butwal-3, Goalpark, Rupandehi, Nepal.",
  },
];

// Sections user can collapse
const TermsItem = ({ section, index }) => {
  const [open, setOpen] = useState(index < 3);

  return (
    <div
      className="terms-item bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        className="w-full flex items-center gap-4 px-6 py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <div className="shrink-0 w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-xs font-black">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <span className="flex-1 font-bold text-slate-800 text-sm group-hover:text-amber-700 transition-colors">
          {section.title}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-slate-400 transition-transform duration-250 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-sm text-slate-600 leading-relaxed px-6 pb-5 pt-1 border-t border-slate-50">
          {section.body}
        </p>
      </div>
    </div>
  );
};

export default function TermsConditions() {
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .terms-root { font-family: 'DM Sans', sans-serif; background: #f5f7fa; min-height: 100vh; }
        h1, h2, h3, .brand { font-family: 'Sora', sans-serif; }
        .terms-item { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div className="terms-root">
        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-600 via-orange-500 to-rose-600 pt-16 pb-28 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(255,255,255,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 border border-white/25 rounded-2xl mb-5 backdrop-blur-sm">
              <FileText size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Terms & Conditions</h1>
            <p className="text-orange-100 text-sm">Effective date: January 2026 · Last revised: January 2026</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-10 pb-16 space-y-3">
          {/* Warning banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 items-start">
            <span className="text-amber-500 text-lg shrink-0 mt-0.5">⚠</span>
            <div>
              <p className="text-sm font-bold text-amber-900 mb-0.5">Please read carefully</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                By creating an account or using any feature of EventHub, you agree to these terms in full. Click any section to read its details.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Sections", value: TERMS_SECTIONS.length },
              { label: "Min. Age", value: "16+" },
              { label: "Jurisdiction", value: "Nepal" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 px-4 py-3 text-center shadow-sm">
                <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Terms items */}
          {TERMS_SECTIONS.map((section, i) => (
            <TermsItem key={i} section={section} index={i} />
          ))}

          {/* Footer */}
          <div className="bg-slate-900 rounded-2xl p-7 text-center mt-2">
            <p className="text-slate-400 text-xs mb-1">EventHub is a final-year project by students of</p>
            <p className="text-white font-bold text-sm">Butwal Multiple Campus, Butwal, Nepal</p>
            <p className="text-slate-500 text-xs mt-2">Ujjal Pandey · Shubham Gyawali · Nirmal Bashyal</p>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <a
                href="mailto:support@eventhub.com.np"
                className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
              >
                support@eventhub.com.np
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}