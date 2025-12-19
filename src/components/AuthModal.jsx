import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ open, mode: initialMode = "login", onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("IF");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setName("");
      setNim("");
      setProdi("IF");
      setMode(initialMode);
      setMessage("");
    } else setMode(initialMode);
  }, [open, initialMode]);

  if (!open) return null;

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    if (mode === "login") {
      const result = login({
        nama: name,        // 🔥 FIX
        email,
        role: "mahasiswa",
        prodi,
        nim,
      });
      if (result.success) {
        onClose();
      } else {
        setMessage(result.message);
      }
    } else {
      // REGISTER DUMMY
      const newUser = {
        id: Date.now(),       // ID unik supaya tombol Aktifkan bisa dipakai
        name,                 // pastikan sama dengan yang dipakai di KelolaAkun
        email,
        nim,
        prodi,
        role: "mahasiswa",
        isActive: false,      // wajib diaktifkan admin
        is_banned: false,
        password,             // optional kalau mau login nanti
      };

      const result = login(newUser); // panggil login untuk insert ke accounts
      setMessage(result.message || "Akun berhasil dibuat. Tunggu aktivasi admin.");
    }

    setLoading(false);
  }, 500);
};
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative mt-16">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-3xl text-green-600 font-bold text-center mb-5">
          {mode === "login" ? "Masuk" : "Daftar"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-3 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="NIM (12 digit)"
                className="w-full p-3 border rounded-lg"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
              >
                <option value="IF">Informatika</option>
                <option value="SI">Sistem Informasi</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder={mode === "register" ? "@student.unsap.ac.id" : "Email"}
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-70"
            disabled={loading}
          >
            {loading
              ? mode === "login"
                ? "Masuk..."
                : "Mendaftar..."
              : mode === "login"
              ? "Masuk"
              : "Daftar"}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-center text-red-500">{message}</p>
        )}

        <p className="mt-4 text-center text-gray-600">
          {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-green-700 font-semibold"
          >
            {mode === "login" ? "Daftar" : "Masuk"}
          </button>
        </p>
      </div>
    </div>
  );
}
