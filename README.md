# Digital Library - Prototipe Interaktif

Proyek **Digital Library** ini adalah prototipe aplikasi manajemen laporan KP & Skripsi untuk mahasiswa dan admin.  
Fitur utama meliputi unggah laporan, pantau status, preview PDF, manajemen akun, serta role-based akses.

---

## Fitur

### Mahasiswa
- Daftar & login (akun harus diaktifkan admin sesuai prodi)
- Unggah laporan KP / Skripsi (dengan template watermark resmi)
- Lihat status laporan (Pending, Revisi, Diterima, Ditolak)
- Preview PDF sebelum download
- Profil & pengaturan akun (ubah nama/password)

### Admin
- Dashboard admin
- Review laporan mahasiswa
- Unggal laporan manual
- Kelola arsip laporan
- Kelola akun mahasiswa (aktivasi, tolak, ban/unban)
- Profil & pengaturan admin

---

## Struktur Folder

```text
digital-library/
│
├── node_modules/
├── public/               # File statis (favicon, gambar, PDF)
├── src/
│   ├── assets/           # Gambar, logo, watermark template
│   ├── components/       # Komponen reusable (Navbar, AuthModal, PDFPreview, dsb.)
│   ├── constants/        # Data dummy, status, roles, dsb.
│   ├── context/          # AuthContext
│   ├── layouts/          # Layouts: Main, Mahasiswa, Admin
│   ├── pages/            # Halaman utama, Mahasiswa & Admin
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css / App.css
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md

Persiapan & Instalasi (lokal)

Pastikan Node.js sudah terinstal
Cek dengan:

node -v
npm -v

Install dependencies

npm install


Jalankan development server

npm run dev


Buka aplikasi di browser
Biasanya di http://localhost:5173

Catatan Penting

Semua akun dummy tersimpan di src/constants/dummyAccounts.js.

Akun mahasiswa baru harus diaktivasi admin agar bisa login.

File PDF yang diunggah disimpan di public/ untuk prototipe ini.

Watermark resmi tersedia di public/watermark_template.pdf.

Role-based access diterapkan: mahasiswa & admin memiliki halaman dan fitur berbeda.

Perubahan profil di halaman Pengaturan akan langsung tercermin di halaman Profil.

Teknologi

React + Vite

Tailwind CSS

Context API untuk state global (auth & accounts)

PDF.js untuk preview PDF