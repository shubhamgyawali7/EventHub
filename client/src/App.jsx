// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Events from "./pages/Events";
// import CreateEvent from "./pages/CreateEvent";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AdminPage from "./pages/AdminPage";
// import ProtectedRoute from "./components/protected/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/events" element={<Events />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected routes */}
//       <Route
//         path="/create-event"
//         element={
//           <ProtectedRoute allowedRoles={["organizer", "admin"]}>
//             <CreateEvent />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute allowedRoles={["student"]}>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={["admin"]}>
//             <AdminPage />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// // export default App;
// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Events from "./pages/Events";
// import Dashboard from "./pages/Dashboard";
// import ManageEvents from "./pages/ManageEvents";
// import MyEvents from "./pages/MyEvents";
// import RegisteredEvents from "./pages/RegisteredEvents";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ProtectedRoute from "./components/protected/ProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Admin routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manage-events"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <ManageEvents />
//             </ProtectedRoute>
//           }
//         />

//         {/* Organizer routes */}
//         <Route
//           path="/my-events"
//           element={
//             <ProtectedRoute allowedRoles={["organizer"]}>
//               <MyEvents />
//             </ProtectedRoute>
//           }
//         />

//         {/* Student routes */}
//         <Route
//           path="/registered-events"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <RegisteredEvents />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import MyEvents from "./pages/MyEvents";
import RegisteredEvents from "./pages/RegisteredEvents";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/protected/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      {/* Organizer routes */}
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <MyEvents />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/registered-events"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
