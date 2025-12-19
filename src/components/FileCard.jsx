import { Link } from "react-router-dom";

export default function FileCard({ file }) {
  const shortAbstrak =
    file.abstrak.length > 120
      ? file.abstrak.slice(0, 120) + "..."
      : file.abstrak;

  return (
    <div className="group border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Header */}
      <div>
        {/* Tipe Dokumen */}
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          {file.tipe}
        </span>

        {/* Judul */}
        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-green-700 transition">
          {file.judul}
        </h3>

        {/* Meta */}
        <p className="text-gray-600 text-sm mb-3">
          {file.penulis} • {file.prodi} • {file.tahun}
        </p>

        {/* Abstrak */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {shortAbstrak}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5">
        <Link
          to={`/detail/${file.id}`}
          className="inline-flex items-center justify-center w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
