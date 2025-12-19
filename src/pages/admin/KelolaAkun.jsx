import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function KelolaAkun() {
  const { accounts, setAccounts } = useAuth(); // pakai state global

  const [filterProdi, setFilterProdi] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleAktifkan = (id) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, isActive: true } : acc));
  };

  const handleTolak = (id) => {
    if (confirm("Yakin ingin menolak / menghapus akun ini?")) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const handleBanToggle = (id) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, is_banned: !acc.is_banned } : acc));
  };

  const filteredAccounts = accounts.filter(acc => {
    const matchProdi = filterProdi ? acc.prodi === filterProdi : true;
    const matchStatus =
      filterStatus === "Aktif" ? acc.isActive && !acc.is_banned :
      filterStatus === "Banned" ? acc.is_banned :
      filterStatus === "Belum Aktif" ? !acc.isActive :
      true;
    return matchProdi && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Kelola Akun Mahasiswa
      </h1>
      <p className="text-gray-600 text-sm mb-5">
        Tambah, ubah, atau hapus akun mahasiswa. Pastikan data mahasiswa selalu terupdate.
      </p>

      {/* FILTER */}
      <div className="flex flex-wrap gap-4">
        <FilterSelect label="Filter Prodi" value={filterProdi} onChange={setFilterProdi} options={[
          { label: "Semua", value: "" },
          { label: "Informatika (IF)", value: "IF" },
          { label: "Sistem Informasi (SI)", value: "SI" },
        ]} />
        <FilterSelect label="Filter Status" value={filterStatus} onChange={setFilterStatus} options={[
          { label: "Semua", value: "" },
          { label: "Aktif", value: "Aktif" },
          { label: "Banned", value: "Banned" },
          { label: "Belum Aktif", value: "Belum Aktif" },
        ]} />
      </div>

      {/* TABLE */}
      {filteredAccounts.length === 0 ? (
        <p className="text-center text-gray-500 py-6">Tidak ada akun mahasiswa.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nama</th>
                <th className="py-3 px-4 text-left">NIM</th>
                <th className="py-3 px-4 text-left">Prodi</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map(acc => (
                <tr key={acc.id} className="border-b hover:bg-green-50 transition">
                  <td className="py-2 px-4">{acc.name}</td>
                  <td className="py-2 px-4">{acc.nim || "N/A"}</td>
                  <td className="py-2 px-4">{acc.prodi}</td>
                  <td className="py-2 px-4">{acc.email}</td>
                  <td className="py-2 px-4 font-semibold">
                    {!acc.isActive ? (
                      <span className="text-yellow-500">Belum Aktif</span>
                    ) : acc.is_banned ? (
                      <span className="text-red-500">Banned</span>
                    ) : (
                      <span className="text-green-500">Aktif</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex flex-wrap gap-2">
                    {!acc.isActive && (
                      <>
                        <button
                          onClick={() => handleAktifkan(acc.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                        >
                          Aktifkan
                        </button>
                        <button
                          onClick={() => handleTolak(acc.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {acc.isActive && (
                      <button
                        onClick={() => handleBanToggle(acc.id)}
                        className={`px-3 py-1 rounded text-xs ${
                          acc.is_banned
                            ? "bg-yellow-400 text-green-900 hover:bg-yellow-300"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {acc.is_banned ? "Unban" : "Ban"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select className="border rounded px-3 py-1" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
