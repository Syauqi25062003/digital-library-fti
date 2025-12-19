import { useState } from "react";
import { dummyFiles } from "../../constants/files";
import FileCard from "../../components/FileCard";
import { STATUS } from "../../constants/status";

export default function KelolaArsip() {
  const [files, setFiles] = useState(dummyFiles);
  const [filterProdi, setFilterProdi] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus dokumen ini?")) {
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const handleEdit = (id) => {
    const fileToEdit = files.find((f) => f.id === id);
    const newJudul = prompt("Ubah judul dokumen:", fileToEdit.judul);
    if (newJudul) {
      setFiles(
        files.map((f) =>
          f.id === id ? { ...f, judul: newJudul } : f
        )
      );
    }
  };

  // Hanya arsip final
  const arsipFiles = files.filter(
    (f) => f.status === STATUS.DITERIMA || f.status === STATUS.DITOLAK
  );

  // Filter
  const filteredFiles = arsipFiles.filter((f) => {
    const prodiMatch = filterProdi ? f.prodi === filterProdi : true;
    const statusMatch = filterStatus ? f.status === filterStatus : true;
    return prodiMatch && statusMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Kelola Arsip
      </h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Prodi
          </label>
          <select
            className="border rounded px-3 py-1"
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
          >
            <option value="">Semua</option>
            <option value="IF">Informatika</option>
            <option value="SI">Sistem Informasi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Status
          </label>
          <select
            className="border rounded px-3 py-1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua</option>
            <option value={STATUS.DITERIMA}>Diterima</option>
            <option value={STATUS.DITOLAK}>Ditolak</option>
          </select>
        </div>
      </div>

      {/* File Grid */}
      {filteredFiles.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada dokumen arsip.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
            <div key={file.id} className="relative group">
              <FileCard file={file} />

              {/* Aksi */}
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(file.id)}
                  className="bg-yellow-400 text-green-900 px-2 py-1 rounded hover:bg-yellow-300 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
