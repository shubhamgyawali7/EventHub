// src/pages/AdminPage.jsx
import React, { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";

const AdminPage = () => {
  const { adminData, fetchEvents, fetchUsers, approveEvent, removeUser } =
    useAdmin();

  useEffect(() => {
    // Load data when page mounts
    fetchEvents();
    fetchUsers();
  }, [fetchEvents, fetchUsers]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Events Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
        {adminData.loading && <p>Loading events...</p>}
        {adminData.error && <p className="text-red-500">{adminData.error}</p>}
        <div className="space-y-4">
          {adminData.events.map((event) => (
            <div
              key={event.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">📅 {event.date}</p>
              </div>
              <button
                onClick={() => approveEvent(event.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        {adminData.loading && <p>Loading users...</p>}
        {adminData.error && <p className="text-red-500">{adminData.error}</p>}
        <div className="space-y-4">
          {adminData.users.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => removeUser(user.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
