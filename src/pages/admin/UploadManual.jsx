import { useState } from "react";
import { STATUS } from "../../constants/status";

export default function UploadManual() {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("")
  const [tahun, setTahun] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [kataKunci, setKataKunci] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [abstrak, setAbstrak] = useState("");
  const [filePdf, setFilePdf] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

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

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFilePdf(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Harap pilih file PDF!");
      setFilePdf(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul || !penulis || !prodi || !tahun || !filePdf) {
      alert("Isi semua field yang wajib!");
      return;
    }

    const newFile = {
      id: Date.now(),
      tipe: "Laporan / Skripsi",
      judul,
      penulis,
      nim: nim || "N/A",
      prodi,
      tahun: parseInt(tahun),
      pembimbing,
      abstrak,
      keywords: kataKunci.split(",").map(k => k.trim()),
      status: STATUS.DITERIMA,
      tanggalUpload: new Date().toISOString().split("T")[0],
      versi: 1,
      pdfUrl: URL.createObjectURL(filePdf),
    };

    console.log("Dokumen baru (admin):", newFile);
    alert("Dokumen berhasil ditambahkan (dummy) dan diterima langsung!");

    // Reset form
    setJudul("");
    setPenulis("");
    setNim("");
    setProdi("");
    setTahun("");
    setPembimbing("");
    setKataKunci("");
    setAbstrak("");
    setFilePdf(null);
    setPreviewUrl("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-900">Unggah Laporan Admin</h1>

      {/* Watermark Template */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <img
          src="/watermark.jpg"
          alt="Template Watermark"
          className="w-40 h-40 object-contain border rounded-lg shadow-sm"
        />
        <div className="flex-1 space-y-2">
          <p className="text-black font-semibold text-lg">
            Template Watermark Dokumen
          </p>
          <p className="text-sm text-black">
            Gunakan template ini untuk menandai dokumen yang diupload agar konsisten dengan branding.
          </p>
          <a
            href="/watermark.jpg"
            download
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-semibold transition"
          >
            Download Template
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* Grid Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Judul" value={judul} onChange={setJudul} />
          <InputField label="Penulis" value={penulis} onChange={setPenulis} />
          <InputField label="NIM" value={nim} onChange={setNim} />
          <SelectField label="Program Studi" value={prodi} onChange={setProdi} options={["IF", "SI"]} />
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

        {/* Upload PDF */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            required
            onChange={handlePdfChange}
            className="block w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
          {filePdf && <p className="mt-2 text-sm text-gray-500">File dipilih: {filePdf.name}</p>}
        </div>

        {/* Preview PDF */}
        {previewUrl && (
          <div className="border rounded-lg overflow-hidden mt-4">
            <p className="bg-green-100 text-green-700 p-2 text-sm font-semibold">Preview PDF</p>
            <iframe
              src={previewUrl}
              title="Preview PDF"
              className="w-full h-64"
            ></iframe>
          </div>
        )}

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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
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
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg p-3 h-32 focus:ring-2 focus:ring-green-500"
      ></textarea>
    </div>
  );
}
