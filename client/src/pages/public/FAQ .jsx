import { useState } from "react";
import { HelpCircle, ChevronDown, ExternalLink, Search } from "lucide-react";

const FAQ_DATA = [
  {
    category: "General",
    items: [
      {
        q: "What is EventHub?",
        a: "EventHub is a centralized platform designed for Nepal's IT community. It connects students with verified technical events — hackathons, workshops, bootcamps, and seminars — organized by IT clubs and professional organizations across the country.",
      },
      {
        q: "Who can use EventHub?",
        a: "EventHub is open to students enrolled in any college or university in Nepal, IT clubs and organizations seeking to publish their events, and administrators who oversee platform integrity. Anyone can browse public event listings without an account.",
      },
      {
        q: "Is EventHub free to use?",
        a: "Yes. Creating a student account, browsing events, and registering for free events costs nothing. Some events organized by third-party clubs may have their own registration fees set by the organizer — EventHub is not responsible for those charges.",
      },
      {
        q: "Which districts does EventHub cover?",
        a: "Currently EventHub focuses on major IT hubs including Butwal (Rupandehi), Kathmandu, Pokhara, and Chitwan. We are actively expanding coverage to all 77 districts of Nepal.",
      },
    ],
  },
  {
    category: "For Students",
    items: [
      {
        q: "How do I register for an event?",
        a: "Log in to your student account, navigate to the event listing, and click the 'Register' button. You will receive a confirmation email. For events that use external Google Form registration, you will be redirected to the organizer's form.",
      },
      {
        q: "Can I cancel my registration?",
        a: "Yes. Visit your User Dashboard, go to 'My Registrations', and cancel before the event's registration deadline. Cancellations after the deadline may not be honoured depending on the organizer's policy.",
      },
      {
        q: "What do 'Trending' and 'Urgent' badges mean?",
        a: "'Trending' indicates an event with a high registration count relative to its seat capacity — it is popular among students. 'Urgent' means the registration deadline is approaching within 48 hours. These badges are assigned automatically by our prioritization algorithm.",
      },
      {
        q: "How do I sync events to Google Calendar?",
        a: "After registering for an event, click the 'Add to Google Calendar' button on the event detail page. You will be prompted to authorize EventHub once, after which events sync automatically.",
      },
    ],
  },
  {
    category: "For Organizers",
    items: [
      {
        q: "How does my club get verified?",
        a: "Register an organizer account and submit your club's official credentials (college affiliation letter, club registration document, or organizational ID). Our admin team reviews submissions within 2–5 business days. Once approved, you can post events immediately.",
      },
      {
        q: "Can I edit or delete an event after publishing?",
        a: "Yes. From your Organizer Dashboard you can edit event details at any time before the event date. Deleting an event will automatically notify all registered students via email.",
      },
      {
        q: "How do I export participant data?",
        a: "In your Organizer Dashboard, open the event and click 'Export Registrations'. Data is downloaded as a CSV file containing student names, college affiliations, email addresses, and registration timestamps.",
      },
    ],
  },
  {
    category: "Account & Security",
    items: [
      {
        q: "What information is required to sign up?",
        a: "Students must provide their real full name, an official Gmail address, current college/university, and district. This ensures platform integrity and helps deliver location-relevant event recommendations.",
      },
      {
        q: "How is my data protected?",
        a: "All passwords are hashed using bcryptjs. Authentication sessions are managed via HTTP-only JWT cookies to prevent XSS attacks. Data is stored in a secured MongoDB Atlas cluster with access controls. We never sell your personal data.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Forgot Password' on the login page and enter your registered email. You will receive a secure password-reset link valid for 30 minutes. If you don't receive the email, check your spam folder or contact support.",
      },
    ],
  },
];

const CATEGORY_COLORS = {
  General: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    active: "bg-violet-600",
  },
  "For Students": {
    bg: "bg-sky-100",
    text: "text-sky-700",
    active: "bg-sky-600",
  },
  "For Organizers": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    active: "bg-emerald-600",
  },
  "Account & Security": {
    bg: "bg-amber-100",
    text: "text-amber-700",
    active: "bg-amber-600",
  },
};

const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className="faq-item border-b border-slate-100 last:border-0"
    >
      <button
        className="w-full flex items-start justify-between py-5 text-left gap-6 group"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`font-semibold text-[15px] leading-snug transition-colors ${open ? "text-blue-700" : "text-slate-800 group-hover:text-blue-600"}`}
        >
          {q}
        </span>
        <span
          className={`shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-blue-600 rotate-180" : "bg-slate-100 group-hover:bg-slate-200"}`}
        >
          <ChevronDown
            size={14}
            className={open ? "text-white" : "text-slate-500"}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm text-slate-500 leading-relaxed pb-5 pr-12">{a}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [search, setSearch] = useState("");

  const filtered = FAQ_DATA.map((g) => ({
    ...g,
    items: g.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((g) => g.items.length > 0);

  const displayData = search
    ? filtered
    : FAQ_DATA.filter((g) => g.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .faq-root { font-family: 'DM Sans', sans-serif; background: #f6f7fb; min-height: 100vh; }
        h1, h2, .brand { font-family: 'Sora', sans-serif; }
        .faq-item { animation: fadeUp 0.3s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .cat-btn { transition: all 0.18s; }
        .cat-btn:hover { transform: translateY(-1px); }
      `}</style>
      <div className="faq-root">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 pt-16 pb-24 px-4 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <HelpCircle size={12} /> Help Center
            </span>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-blue-100 text-sm max-w-md mx-auto leading-relaxed">
              Everything you need to know about EventHub. Still stuck?{" "}
              <a
                href="mailto:support@eventhub.com.np"
                className="text-white font-semibold underline underline-offset-2"
              >
                Email us
              </a>
              .
            </p>
            {/* Search */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm text-slate-700 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-6 pb-16">
          {/* Category pills */}
          {!search && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {FAQ_DATA.map(({ category }) => {
                const c = CATEGORY_COLORS[category];
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`cat-btn px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isActive
                        ? `${c.active} text-white shadow-md`
                        : `bg-white ${c.text} border border-slate-200 hover:border-current`
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {/* FAQ Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 divide-y-0">
            {displayData.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                No results found for "{search}"
              </div>
            ) : (
              displayData.map((group) => (
                <div key={group.category}>
                  {search && (
                    <p className="text-xs font-black uppercase tracking-widest text-blue-500 pt-5 pb-1">
                      {group.category}
                    </p>
                  )}
                  {group.items.map((item, i) => (
                    <FAQItem key={i} index={i} {...item} />
                  ))}
                </div>
              ))
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-base">
                Still have questions?
              </p>
              <p className="text-slate-400 text-sm mt-0.5">
                We reply within 24 hours.
              </p>
            </div>
            <a
              href="mailto:support@eventhub.com.np"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Email Support <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
