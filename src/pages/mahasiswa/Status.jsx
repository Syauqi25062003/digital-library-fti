import { dummyFiles } from "../../constants/files";
import { STATUS } from "../../constants/status";

const statusColor = {
  [STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [STATUS.DITERIMA]: "bg-green-100 text-green-800",
  [STATUS.DITOLAK]: "bg-red-100 text-red-800",
};

export default function Status() {
  // simulasi: hanya file milik mahasiswa yang login
  const myFiles = dummyFiles;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Status Unggahan</h1>
        <p className="text-gray-600 text-sm">
          Pantau status laporan yang telah Anda unggah
        </p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        {myFiles.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            Belum ada laporan yang diunggah.
          </p>
        ) : (
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left">Jenis</th>
                <th className="px-4 py-3 text-left">Tahun</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {myFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{file.judul}</td>
                  <td className="px-4 py-3">{file.tipe}</td>
                  <td className="px-4 py-3">{file.tahun}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[file.status]}`}
                    >
                      {file.status}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 space-y-1">
                    {/* Jika DITOLAK */}
                    {file.status === STATUS.DITOLAK && (
                      <div className="space-y-1">
                        {file.alasanPenolakan && (
                          <p className="text-xs text-red-600">
                            <b>Alasan:</b> {file.alasanPenolakan}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 italic">
                          Silakan unggah laporan baru melalui menu <b>Unggah Laporan</b>.
                        </p>
                      </div>
                    )}
                    {/* Jika DITERIMA */}
                    {file.status === STATUS.DITERIMA && (
                      <a
                        href={file.pdfUrl}
                        download
                        className="inline-block bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-xs"
                      >
                        Download
                      </a>
                    )}

                    {/* Jika PENDING */}
                    {file.status === STATUS.PENDING && (
                      <span className="text-gray-400 italic text-xs">
                        Menunggu verifikasi admin
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
