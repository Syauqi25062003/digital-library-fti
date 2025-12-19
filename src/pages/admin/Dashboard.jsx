import { useState } from "react";
import { dummyFiles } from "../../constants/files";
import { STATUS } from "../../constants/status";
import { FiFileText, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import DashboardHeader from "../../components/DashboardHeader";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [filterProdi, setFilterProdi] = useState("");

  const filteredFiles = dummyFiles.filter((file) =>
    filterProdi ? file.prodi === filterProdi : true
  );

  const total = filteredFiles.length;
  const diterima = filteredFiles.filter((f) => f.status === STATUS.DITERIMA).length;
  const pending = filteredFiles.filter((f) => f.status === STATUS.PENDING).length;
  const ditolak = filteredFiles.filter((f) => f.status === STATUS.DITOLAK).length;

  const stats = [
    { title: "Total Dokumen", value: total, color: "green", icon: <FiFileText size={28} /> },
    { title: "Menunggu Verifikasi", value: pending, color: "yellow", icon: <FiClock size={28} /> },
    { title: "Diterima", value: diterima, color: "green", icon: <FiCheckCircle size={28} /> },
    { title: "Ditolak", value: ditolak, color: "red", icon: <FiXCircle size={28} /> },
  ];

  const colorMap = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <DashboardHeader title="Dashboard Admin" user={currentUser} />

      {/* Filter Prodi */}
      <div className="mb-8 flex items-center gap-4">
        <span className="font-semibold text-gray-700">Filter Prodi:</span>
        <select
          className="border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 transition"
          value={filterProdi}
          onChange={(e) => setFilterProdi(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="IF">Informatika (IF)</option>
          <option value="SI">Sistem Informasi (SI)</option>
        </select>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-6 rounded-xl shadow hover:shadow-lg transition ${colorMap[stat.color]}`}
          >
            <div className="p-3 bg-white rounded-full flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
