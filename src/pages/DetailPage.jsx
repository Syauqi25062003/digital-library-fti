import { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyFiles } from "../constants/files";
import PDFPreview from "../components/PDFPreview";

export default function DetailPage() {
  const { id } = useParams();
  const file = dummyFiles.find((f) => f.id === parseInt(id));
  const [openPreview, setOpenPreview] = useState(false);

  if (!file) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Dokumen tidak ditemukan.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Judul */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {file.judul}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metadata */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            Informasi Dokumen
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            <li><b>Jenis Dokumen:</b> {file.tipe}</li>
            <li><b>Penulis:</b> {file.penulis}</li>
            <li><b>NIM:</b> {file.nim}</li>
            <li><b>Program Studi:</b> {file.prodi}</li>
            <li><b>Fakultas:</b> {file.fakultas}</li>
            <li><b>Tahun:</b> {file.tahun}</li>
            <li><b>Pembimbing:</b> {file.pembimbing}</li>
            <li><b>Tanggal Upload:</b> {file.tanggalUpload}</li>
            <li><b>Kata Kunci:</b> {file.keywords?.join(", ")}</li>
          </ul>

          {/* Tombol */}
          <button
            onClick={() => setOpenPreview(true)}
            className="w-full mt-5 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Preview Dokumen
          </button>

          <a
            href={file.pdfUrl}
            download
            className="block text-center mt-3 border border-green-600 text-green-700 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Download PDF
          </a>
        </div>

        {/* Abstrak */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            Abstrak
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {file.abstrak}
          </p>
        </div>
      </div>

      {/* MODAL PREVIEW */}
      {openPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg relative flex flex-col">
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <div className="p-4 border-b font-semibold text-green-700">
              Preview Dokumen
            </div>

            <div className="flex-1 overflow-auto p-4">
              <PDFPreview url={file.pdfUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
