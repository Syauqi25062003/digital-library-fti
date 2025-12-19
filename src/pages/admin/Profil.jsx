import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profil() {
  const { currentUser } = useAuth();

  const fields = [
    { label: "Nama", value: currentUser?.name || "N/A" },
    { label: "Email", value: currentUser?.email || "N/A" },
    { label: "Role", value: currentUser?.role || "N/A" },
    { label: "Program Studi", value: currentUser?.prodi || "N/A" },
    { label: "NIM", value: currentUser?.nim || "N/A" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Profil Admin</h1>
        <Link
          to="/admin/pengaturan"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-semibold"
        >
          Edit Profil
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.label} className="p-4 border rounded-lg bg-green-50">
            <p className="text-gray-500 text-sm">{f.label}</p>
            <p className="text-gray-900 font-semibold">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
