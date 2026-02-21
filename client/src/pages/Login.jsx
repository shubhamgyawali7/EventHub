// // // src/pages/Login.jsx
// // import React, { useState } from "react";
// // import useAuth from "../hooks/useAuth";

// // const Login = () => {
// //   const { login } = useAuth();
// //   const [formData, setFormData] = useState({ email: "", password: "" });

// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     login(formData);
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500">
// //       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Welcome Back
// //         </h2>
// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           <div>
// //             <label className="block text-gray-700 mb-2">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
// //               placeholder="Enter your email"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 mb-2">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
// //               placeholder="Enter your password"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         <p className="text-center text-gray-600 mt-4">
// //           Don’t have an account?{" "}
// //           <a href="/signup" className="text-pink-500 hover:underline">
// //             Sign up
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// // src/pages/Login.jsx
// import React from "react";
// import useAuth from "../hooks/useAuth";

// const Login = () => {
//   const { loginAsRole } = useAuth();

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview Roles</h2>
//         <div className="space-y-4">
//           <button
//             onClick={() => loginAsRole("admin")}
//             className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             Login as Admin
//           </button>
//           <button
//             onClick={() => loginAsRole("organizer")}
//             className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
//           >
//             Login as Organizer
//           </button>
//           <button
//             onClick={() => loginAsRole("student")}
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login as Student
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
