import { useAuth } from "../../context/AuthContext";
import { dummyFiles } from "../../constants/files";
import { STATUS } from "../../constants/status";
import { Link } from "react-router-dom";

export default function DashboardMahasiswa() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Silakan login untuk melihat dashboard.
      </p>
    );
  }

  const user = currentUser;

  // dummy: laporan milik mahasiswa login
  const myFiles = dummyFiles.filter((f) => f.penulis === user.name);

  const total = myFiles.length;
  const diterima = myFiles.filter((f) => f.status === STATUS.DITERIMA).length;
  const pending = myFiles.filter((f) => f.status === STATUS.PENDING).length;
  const ditolak = myFiles.filter((f) => f.status === STATUS.DITOLAK).length;

  const latestFile = myFiles[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Mahasiswa
        </h1>
        <p className="text-gray-600 text-sm">
          Selamat datang, <span className="font-semibold">{user.name}</span>
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Laporan" value={total} color="gray" />
        <StatCard title="Diterima" value={diterima} color="green" />
        <StatCard title="Pending" value={pending} color="yellow" />
        <StatCard title="Ditolak" value={ditolak} color="red" />
      </div>

      {/* Status Terakhir */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Status Laporan Terakhir
        </h2>

        {!latestFile ? (
          <p className="text-gray-500 text-sm">
            Belum ada laporan yang diunggah.
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-semibold text-gray-900">
                {latestFile.judul}
              </p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-semibold ${
                  latestFile.status === STATUS.DITERIMA
                    ? "bg-green-100 text-green-700"
                    : latestFile.status === STATUS.DITOLAK
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {latestFile.status}
              </span>
            </div>

            <Link
              to="/mahasiswa/status"
              className="text-green-700 font-semibold hover:underline text-sm"
            >
              Lihat Detail
            </Link>
          </div>
        )}
      </div>

      {/* CTA Upload */}
      <div className="bg-green-600 rounded-xl p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
        <div>
          <h3 className="text-xl font-bold">Unggah Laporan Baru</h3>
          <p className="text-green-100 text-sm">
            Pastikan menggunakan template watermark resmi
          </p>
        </div>

        <Link
          to="/mahasiswa/upload"
          className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Upload Sekarang
        </Link>
      </div>
    </div>
  );
}

/* ===================== Komponen Statistik ===================== */
function StatCard({ title, value, color = "green" }) {
  const colorMap = {
    green: "text-green-700",
    yellow: "text-yellow-700",
    gray: "text-gray-700",
    red: "text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-center items-center">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>
        {value}
      </p>
    </div>
  );
}
