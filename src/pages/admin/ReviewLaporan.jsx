import { useState } from "react";
import { dummyFiles } from "../../constants/files";
import PDFPreview from "../../components/PDFPreview";
import { STATUS } from "../../constants/status";

export default function ReviewLaporan() {
  const [files, setFiles] = useState(dummyFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  // Admin hanya mereview laporan yang statusnya PENDING
  const reviewFiles = files.filter((f) => f.status === STATUS.PENDING);

  const handleTerima = (fileId) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: STATUS.DITERIMA } : f
      )
    );
    if (selectedFile?.id === fileId) {
      setSelectedFile({ ...selectedFile, status: STATUS.DITERIMA });
    }
    alert("Dokumen diterima.");
  };

  const handleTolak = (fileId) => {
    const alasan = prompt("Masukkan alasan penolakan:");
    if (!alasan) return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? { ...f, status: STATUS.DITOLAK, alasanPenolakan: alasan }
          : f
      )
    );
    if (selectedFile?.id === fileId) {
      setSelectedFile({
        ...selectedFile,
        status: STATUS.DITOLAK,
        alasanPenolakan: alasan,
      });
    }
    alert("Dokumen ditolak.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-600 mb-2">
      Review Laporan
      </h1>
      <p className="text-gray-600 text-sm mb-5">
        Lihat dan verifikasi laporan KP/Skripsi mahasiswa. Pastikan dokumen sesuai pedoman sebelum diterima.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daftar laporan */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            Daftar Laporan Pending
          </h2>

          {reviewFiles.length === 0 ? (
            <p className="text-gray-500">Tidak ada laporan untuk direview.</p>
          ) : (
            <ul className="space-y-3">
              {reviewFiles.map((file) => (
                <li
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className="cursor-pointer border rounded p-3 hover:bg-green-50"
                >
                  <p className="font-semibold">{file.judul}</p>
                  <p className="text-sm text-gray-600">
                    {file.penulis} | {file.prodi} | {file.tahun}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail laporan */}
        <div className="lg:col-span-2 bg-white shadow rounded-xl p-5">
          {selectedFile ? (
            <>
              <h2 className="text-lg font-semibold text-green-700 mb-4">
                {selectedFile.judul}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p><b>Penulis:</b> {selectedFile.penulis}</p>
                  <p><b>NIM:</b> {selectedFile.nim}</p>
                  <p><b>Program Studi:</b> {selectedFile.prodi}</p>
                  <p><b>Tahun:</b> {selectedFile.tahun}</p>
                </div>
                <div>
                  <p><b>Status:</b> {selectedFile.status}</p>
                  <p><b>Tanggal Upload:</b> {selectedFile.tanggalUpload}</p>
                  <p><b>Keywords:</b> {selectedFile.keywords.join(", ")}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-green-700 mb-1">Abstrak</h3>
                <p className="text-gray-600">{selectedFile.abstrak}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setOpenPreview(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Preview Dokumen
                </button>

                <button
                  onClick={() => handleTerima(selectedFile.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Terima
                </button>

                <button
                  onClick={() => handleTolak(selectedFile.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Tolak
                </button>
              </div>

              {selectedFile.status === STATUS.DITOLAK &&
                selectedFile.alasanPenolakan && (
                  <p className="mt-4 text-red-600">
                    <b>Alasan Penolakan:</b> {selectedFile.alasanPenolakan}
                  </p>
                )}
            </>
          ) : (
            <p className="text-gray-500">
              Pilih laporan untuk melihat detail.
            </p>
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {openPreview && selectedFile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg relative">
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-4 text-2xl"
            >
              ✕
            </button>

            <div className="p-4 border-b font-semibold text-green-700">
              Preview Dokumen
            </div>

            <div className="p-4 h-full overflow-auto">
              <PDFPreview url={selectedFile.pdfUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
