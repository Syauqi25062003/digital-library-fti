// src/layouts/AdminLayout.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser || !["admin-if", "admin-si"].includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Konten utama */}
      <div className="flex-1 p-6 md:ml-64">
        {children}
      </div>
    </div>
  );
}
