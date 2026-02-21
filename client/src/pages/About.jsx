import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Gradient Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-white to-[#F3E8FF]">
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-purple-200 text-[#7C3AED] text-sm font-medium shadow-sm">
              <span>About EventHub</span>
            </div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 text-4xl md:text-5xl font-bold text-gray-900"
            >
              Discover Opportunities.
              <span className="text-[#7C3AED]"> Never Miss One.</span>
            </motion.h1>

            {/* Subtext */}
            <p className="mt-6 text-[#475569] text-lg max-w-3xl mx-auto leading-relaxed">
              EventHub centralizes IT and student events across Nepal — making it easier to discover, filter by
              location, and stay updated without tracking multiple social media pages.
            </p>

            {/* Stats Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="px-5 py-3 rounded-full bg-white shadow-sm border border-gray-200 text-sm font-medium text-gray-700">
                🌍 Nationwide Platform
              </div>
              <div className="px-5 py-3 rounded-full bg-white shadow-sm border border-gray-200 text-sm font-medium text-gray-700">
                📍 Location Filtering
              </div>
              <div className="px-5 py-3 rounded-full bg-white shadow-sm border border-gray-200 text-sm font-medium text-gray-700">
                🎓 Built for Students
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Card Section */}
        <section className="relative -mt-16 pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-14"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
              </div>

              <div className="space-y-6 text-[#475569] leading-relaxed text-lg">
                <p>
                  In our early semesters, we believed we were actively involved in the tech community. We attended
                  events organized by our own college IT club and assumed we were staying updated.
                </p>

                <p>
                  Later, we discovered something surprising — IT clubs and student associations across Nepal were
                  organizing hackathons, workshops, webinars, and competitions regularly. Opportunities were everywhere.
                </p>

                <p>
                  The real problem wasn’t the lack of events. It was the lack of visibility. Information was scattered
                  across multiple social media pages, and students had to manually check each one just to stay informed.
                </p>

                <p>Because of this fragmented system, we missed deadlines and discovered events too late.</p>

                <p className="font-medium text-gray-900">
                  That frustration became the foundation of EventHub — a centralized platform built so students across
                  Nepal can discover events in one place and never miss an opportunity again.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        {/* What Makes EventHub Different */}
        <section className="pb-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-[#7C3AED] text-sm font-medium mb-4">
                Why EventHub
              </div>

              <h2 className="text-3xl font-semibold text-gray-900">What Makes EventHub Different</h2>

              <p className="mt-4 text-[#475569] max-w-2xl mx-auto">
                Built specifically to solve the fragmented event discovery problem faced by students across Nepal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🌍 Nationwide Reach</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Events from multiple cities and institutions across Nepal — all centralized in one platform.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Smart Location Filtering</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Students can filter events by location to quickly find relevant opportunities near them.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🧑‍💼 Organizer Dashboard</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Dedicated tools for organizers to create, manage, and monitor events efficiently.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
