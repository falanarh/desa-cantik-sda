/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login-simoanginangin" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik

    if (decodedToken.exp < currentTime) {
      // Token sudah kadaluarsa
      return <Navigate to="/login-simoanginangin" replace />;
    }
  } catch (error) {
    // Jika ada kesalahan saat mendekode token, anggap token tidak valid
    console.error("Invalid token:", error);
    return <Navigate to="/login-simoanginangin" replace />;
  }

  return children;
};

export default ProtectedRoute;
