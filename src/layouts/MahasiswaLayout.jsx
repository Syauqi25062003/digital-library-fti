// src/layouts/MahasiswaLayout.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MahasiswaSidebar from "../components/MahasiswaSidebar";

export default function MahasiswaLayout({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "mahasiswa") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <MahasiswaSidebar />

      {/* Konten utama */}
      <div className="flex-1 p-6 md:ml-64">
        {/* md:ml-64 → space untuk desktop sidebar, supaya konten tidak tertutup */}
        {children}
      </div>
    </div>
  );
}
