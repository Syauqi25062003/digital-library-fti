// src/components/MahasiswaSidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UploadIcon,
  FileTextIcon,
  UserIcon,
  CogIcon,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/mahasiswa/dashboard", icon: <HomeIcon size={18} /> },
  { name: "Unggah Laporan", path: "/mahasiswa/upload", icon: <UploadIcon size={18} /> },
  { name: "Status Unggahan", path: "/mahasiswa/status", icon: <FileTextIcon size={18} /> },
  { name: "Profil", path: "/mahasiswa/profil", icon: <UserIcon size={18} /> },
  { name: "Pengaturan", path: "/mahasiswa/pengaturan", icon: <CogIcon size={18} /> },
];

export default function MahasiswaSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar untuk desktop & mobile */}
      <aside
        className={`
          bg-white shadow-md rounded-xl p-5 space-y-6
          fixed top-24 left-0 h-[calc(100vh-6rem)] w-64
          transform transition-transform duration-300
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-40
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xl font-bold text-green-900">Dashboard Mahasiswa</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition ${
                  isActive ? "bg-green-100 text-green-700" : ""
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Floating toggle button untuk mobile */}
      <button
        className="fixed left-4 top-28 z-50 md:hidden bg-green-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay saat sidebar muncul (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
