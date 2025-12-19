import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Digital Library FTI - Universitas Sebelas April Sumedang</p>
      </div>
    </footer>
  );
}
