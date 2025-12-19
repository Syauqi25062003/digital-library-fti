import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PDFPreview({ url }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="flex justify-center">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Memuat PDF...</p>}
        error={<p className="text-red-500">Gagal memuat PDF</p>}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={1.2}
            renderTextLayer={false}       // ⛔ MATIKAN TEKS
            renderAnnotationLayer={false} // ⛔ MATIKAN LINK/FORM
            className="mb-6 shadow"
          />
        ))}
      </Document>
    </div>
  );
}
