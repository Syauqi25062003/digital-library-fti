import { useState } from "react";
import { STATUS } from "../../constants/status";

export default function UploadLaporan() {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [tipe, setTipe] = useState("Skripsi");
  const [tahun, setTahun] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [kataKunci, setKataKunci] = useState([]); // array
  const [inputKeyword, setInputKeyword] = useState("");
  const [abstrak, setAbstrak] = useState("");
  const [file, setFile] = useState(null);

const handleKeywordKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const value = inputKeyword.trim();
    if (!value) return;

    // hindari duplikat
    if (kataKunci.includes(value)) return;

    setKataKunci([...kataKunci, value]);
    setInputKeyword("");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      judul,
      penulis,
      nim,
      prodi,
      tipe,
      tahun,
      pembimbing,
      status: STATUS.PENDING,
      tanggalUpload: new Date().toISOString(),
      kataKunci,
      abstrak,
      file,
    };

    console.log("UPLOAD:", payload);
    alert("Laporan berhasil dikirim (dummy). Menunggu review admin.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Unggah Laporan</h1>
        <p className="text-gray-600 text-sm">
          Unggah laporan KP atau Skripsi sesuai template resmi
        </p>
      </div>

      {/* Watermark Template */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <img
          src="/watermark.jpg"
          alt="Template Watermark"
          className="w-40 h-40 object-contain border rounded-lg shadow-sm"
        />
        <div className="flex-1 space-y-2">
          <p className="text-yellow-900 font-semibold text-lg">
            Template Watermark Dokumen
          </p>
          <p className="text-sm text-yellow-800">
            Gunakan template ini untuk menandai dokumen yang diupload agar konsisten dengan branding.
          </p>
          <a
            href="/watermark.jpg"
            download
            className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300 font-semibold transition"
          >
            Download Template
          </a>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Judul Laporan" value={judul} onChange={setJudul} />
          <InputField label="Penulis" value={penulis} onChange={setPenulis} />
          <InputField label="NIM" value={nim} onChange={setNim} type="number" />
          <SelectField
            label="Program Studi"
            value={prodi}
            onChange={setProdi}
            options={["Informatika", "Sistem Informasi"]}
          />
          <SelectField
            label="Jenis Dokumen"
            value={tipe}
            onChange={setTipe}
            options={["Skripsi", "Laporan KP"]}
          />
          <InputField label="Tahun" value={tahun} onChange={setTahun} type="number" />
          <InputField label="Pembimbing" value={pembimbing} onChange={setPembimbing} />
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kata Kunci
          </label>

          <div className="flex flex-wrap gap-2 border rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
            {kataKunci.map((kw, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {kw}
                <button
                  type="button"
                  onClick={() =>
                    setKataKunci(kataKunci.filter((_, i) => i !== index))
                  }
                  className="text-green-600 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}

            <input
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="Ketik keyword lalu tekan Enter"
              className="flex-1 outline-none text-sm"
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Tekan Enter untuk menambahkan keyword
          </p>
        </div>
        </div>

        <TextAreaField label="Abstrak" value={abstrak} onChange={setAbstrak} />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload File PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-lg p-2"
          />
          {file && (
            <p className="text-gray-600 text-sm mt-1">File terpilih: {file.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

/* ===================== Components kecil ===================== */
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg p-3"
      >
        <option value="">Pilih {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="mt-1 w-full border rounded-lg p-3 h-32 focus:ring-2 focus:ring-green-500"
      ></textarea>
    </div>
  );
}
