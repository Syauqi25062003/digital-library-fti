import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Pengaturan() {
  const { currentUser, updateProfile } = useAuth();

  if (!currentUser)
    return (
      <p className="text-center text-gray-500 mt-10">
        Silakan login untuk mengatur profil.
      </p>
    );

  const [name, setName] = useState(currentUser.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    updateProfile({ name }); // <-- pakai 'nama' dari state form
    setLoading(false);
    alert("Nama berhasil diperbarui!");
  }, 500);
};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Akun</h1>
        <p className="text-gray-600 mt-1">
          Kelola informasi dasar akun Anda
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* Nama */}
        <FieldEditable
          label="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Read-only fields */}
        <FieldReadOnly label="NIM" value={currentUser.nim || "-"} />
        <FieldReadOnly label="Program Studi" value={currentUser.prodi || "-"} />
        <FieldReadOnly label="Email" value={currentUser.email} />

        {/* Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700 text-sm">
          NIM, Program Studi, dan Email tidak dapat diubah.
          <br />
          Hubungi admin prodi jika terjadi kesalahan data.
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Components */
function FieldEditable({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
        required
      />
    </div>
  );
}

function FieldReadOnly({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        disabled
        className="w-full bg-gray-100 border rounded-lg px-4 py-2 text-gray-700 cursor-not-allowed"
      />
    </div>
  );
}
