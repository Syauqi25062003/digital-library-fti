# Digital Library - Prototipe Interaktif

Prototype Digital Library Fakultas Teknologi Informasi (FTI) yang dikembangkan sebagai bagian dari Kerja Praktik (KP).

Aplikasi ini berfokus pada perancangan antarmuka (UI/UX) dan alur sistem untuk pengelolaan laporan Kerja Praktik (KP) dan Skripsi, menggunakan data dummy tanpa backend.

🎯 Tujuan Proyek

Menyediakan prototype sistem perpustakaan digital FTI

Memudahkan mahasiswa dalam mengunggah dan memantau status laporan KP/Skripsi

Memudahkan admin prodi dalam melakukan review dan pengelolaan arsip laporan

Menyediakan fitur pencarian dan preview dokumen bagi publik

🛠️ Teknologi yang Digunakan

Frontend: React JS

Build Tool: Vite

Styling: Tailwind CSS

State Management: React Hooks & Context API

PDF Preview: PDF.js

Data: Dummy data (tanpa backend)

👥 Role & Hak Akses
👤 Publik (Tanpa Login)

Melihat daftar dokumen yang sudah diterima

Pencarian & filter dokumen

Melihat detail dokumen

Preview & download PDF

🎓 Mahasiswa

Login (akun harus diaktifkan admin)

Mengunggah laporan KP/Skripsi

Melihat status unggahan (Pending / Diterima / Ditolak)

Melihat alasan penolakan

Mengunggah ulang laporan jika ditolak

Download dokumen yang sudah diterima

🛠️ Admin Prodi (Admin IF & Admin SI)

Review laporan sesuai prodi

Preview dokumen PDF

Menerima atau menolak laporan

Mengelola arsip laporan

Mengelola akun mahasiswa

Catatan: Admin IF hanya dapat mengelola dokumen Prodi Informatika, dan Admin SI hanya Prodi Sistem Informasi.

🔄 Alur Sistem (Ringkas)

Mahasiswa mengunggah laporan → status Pending

Admin prodi melakukan review

Admin memilih:

Diterima → dokumen muncul di beranda & dapat diakses publik

Ditolak → mahasiswa melihat alasan dan dapat upload ulang

Semua alur disimulasikan menggunakan state lokal dan data dummy.

🧪 Catatan Penting

Proyek ini tidak menggunakan backend

Tidak ada database atau autentikasi real

Semua data disimpan dalam file constants sebagai simulasi

Fokus utama pada desain UI, UX, dan flow sistem

🚀 Cara Menjalankan Project
Prasyarat

Node.js (disarankan v18+)

npm / yarn

Langkah Menjalankan
git clone https://github.com/Syauqi25062003/digital-library-fti.git
cd digital-library-fti
npm install
npm run dev

Akses aplikasi di browser:

http://localhost:5173
📂 Struktur Folder Utama
src/
 ├── components/     # Komponen reusable
 ├── pages/          # Halaman aplikasi
 ├── layouts/        # Layout role-based
 ├── context/        # Auth context (dummy)
 ├── constants/      # Data dummy & enum
 └── assets/         # Gambar & file statis
📌 Status Pengembangan

✔ Prototype frontend selesai ✔ Alur utama sistem tersedia ✔ Siap untuk demonstrasi & laporan KP

👨‍🎓 Kontributor

Kelompok 1
220660121001 - M Reksa Aji Winangun
220660121022 - Syauqi Zainun Nauval
220660121033 - Rifan Warosy Sirojudin
220660121036 - Muhammad Fajar Lutfiana
220660121054 - Virzan Pasa Nugraha
220660121066 - Siti Rachmania Putri

Program Studi: Fakultas Teknologi Informasi

Kegiatan: Kerja Praktik (KP)

📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pembelajaran.