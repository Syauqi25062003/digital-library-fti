import { createContext, useContext, useState } from "react";
import { dummyAccounts } from "../constants/dummyAccounts";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState(
    dummyAccounts.map(acc => ({
      ...acc,
      id: acc.id || Date.now() + Math.random(), // pastikan semua punya id
      isActive: acc.isActive ?? true,
      is_banned: acc.is_banned ?? false,
      name: acc.name // samain property
    }))
  );

  const login = (userData) => {
    const user = accounts.find(
      acc => acc.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (user) {
      if (!user.isActive) return { success: false, message: "Akun belum diaktifkan admin." };
      if (user.is_banned) return { success: false, message: "Akun diblokir." };
      setCurrentUser(user);
      return { success: true };
    }

    // Jika user baru daftar
    const newUser = {
      id: Date.now(), // id unik
      name: userData.name,
      email: userData.email,
      nim: userData.nim || "",
      prodi: userData.prodi || "",
      role: userData.role || "mahasiswa",
      isActive: false,  // harus diaktifkan admin
      is_banned: false,
      password: userData.password || "",
    };

    setAccounts(prev => [...prev, newUser]);

    return { success: true, message: "Akun berhasil dibuat. Tunggu aktivasi admin." };
  };

  const logout = () => setCurrentUser(null);

  // AuthContext.jsx
const updateProfile = ({ name, password }) => {
  setAccounts(prev =>
    prev.map(acc =>
      acc.email === currentUser.email
        ? { ...acc, name: name ?? acc.name, password: password ?? acc.password }
        : acc
    )
  );

  setCurrentUser(prev => ({
    ...prev,
    name: name ?? prev.name,
    password: password ?? prev.password,
  }));
};
  const isLoggedIn = !!currentUser;

  return (
  <AuthContext.Provider
    value={{
      currentUser,
      isLoggedIn,
      login,
      logout,
      accounts,
      setAccounts,   // 🔥 WAJIB
      updateProfile
    }}
  >
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
