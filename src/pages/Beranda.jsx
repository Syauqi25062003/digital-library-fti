import { useState } from "react";
import { dummyFiles } from "../constants/files";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FileCard from "../components/FileCard";

export default function Beranda() {
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterTipe, setFilterTipe] = useState("");

  const filteredFiles = dummyFiles.filter(file =>
    file.status === "Diterima" &&
    file.judul.toLowerCase().includes(search.toLowerCase()) &&
    (filterProdi ? file.prodi === filterProdi : true) &&
    (filterTahun ? file.tahun === parseInt(filterTahun) : true) &&
    (filterTipe ? file.tipe === filterTipe : true)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Search */}
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

      {/* Filter Card */}
      <FilterBar
        filterProdi={filterProdi}
        setFilterProdi={setFilterProdi}
        filterTahun={filterTahun}
        setFilterTahun={setFilterTahun}
        filterTipe={filterTipe}
        setFilterTipe={setFilterTipe}
      />

      {/* File Grid */}
      {filteredFiles.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Dokumen tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
