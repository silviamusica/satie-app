import { useState } from "react";
import { ZoomIn, ZoomOut, FileText } from "lucide-react";
import { Document, Page } from "react-pdf";

const PdfScoreViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [pdfError, setPdfError] = useState(false);

  // Percorso del PDF
  const pdfUrl = '/gymnopedie-1-annotata.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPdfError(false);
  }

  function onDocumentLoadError(error) {
    console.error('Errore caricamento PDF:', error);
    setPdfError(true);
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-700">
      <div className="flex items-center justify-between mb-4">
        {/* Titolo rimosso su richiesta */}
      </div>

      {pdfError ? (
        <div className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-300 mb-2">
            File PDF non trovato. Aggiungi il file <code className="bg-slate-700 px-2 py-1 rounded text-blue-400">gymnopedie-1-annotata.pdf</code> nella cartella <code className="bg-slate-700 px-2 py-1 rounded text-blue-400">public/</code>
          </p>
          <p className="text-slate-400 text-sm">
            Il file deve essere nella cartella <code className="bg-slate-700 px-1 rounded">public/</code>
          </p>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          {/* Controlli */}
          <div className="bg-slate-700 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-slate-200 text-sm font-medium">
              {numPages ? `${numPages} pagine` : 'Caricamento...'}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={zoomOut}
                className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                title="Riduci zoom"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-slate-200 text-sm font-medium px-2">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                title="Aumenta zoom"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visualizzatore PDF con scroll continuo */}
          <div className="bg-slate-900 p-4 max-h-200 overflow-y-auto">
            <div className="flex flex-col items-center gap-6">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="text-slate-400 text-center py-12">
                    <FileText className="w-12 h-12 mx-auto mb-3 animate-pulse" />
                    Caricamento spartito...
                  </div>
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} className="shadow-lg mb-4">
                    <Page
                      pageNumber={index + 1}
                      scale={scale}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfScoreViewer;
