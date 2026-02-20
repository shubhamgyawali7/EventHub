// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";


const Dashboard = () => {
  const { adminData, fetchEvents, fetchUsers } = useAdmin();

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const totalEvents = adminData.events.length;
  const totalUsers = adminData.users.length;
  const pendingEvents = adminData.events.filter((event) => !event.approved).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {adminData.loading && <p>Loading data...</p>}
        {adminData.error && <p className="text-red-500">{adminData.error}</p>}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6 text-center">
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="text-2xl font-bold text-indigo-600">{totalEvents}</p>
          </div>

          <div className="bg-white shadow rounded p-6 text-center">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl font-bold text-green-600">{totalUsers}</p>
          </div>

          <div className="bg-white shadow rounded p-6 text-center">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
            <p className="text-2xl font-bold text-pink-600">{pendingEvents}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
