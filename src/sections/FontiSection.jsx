import { BookOpen, ExternalLink } from "lucide-react";
import { bibliographyData } from "../data/bibliography";

const FontiSection = () => {
  return (
    <div id="fonti" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Bibliografia essenziale
        </h2>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4 mt-4">
          <div className="text-sm text-slate-100 font-semibold mb-2">Spartito (IMSLP)</div>
          <a
            href="https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie,_Erik)"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
          >
            apri <ExternalLink className="w-3 h-3" />
          </a>
          <div className="mt-2 text-xs text-slate-500 break-all">
            https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie,_Erik)
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {bibliographyData.map((row) => (
            <div key={row.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
              <div className="text-sm text-slate-100 font-semibold mb-1">{row.title}</div>
              <div className="text-xs text-slate-400">{row.author}</div>
              <div className="text-xs text-slate-400 mt-1">{row.publication}</div>
              <div className="text-xs text-slate-400 mt-1">{row.length}</div>
              <p className="text-sm text-slate-300 mt-2">{row.relevance}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300 border border-slate-700">
            <thead className="bg-slate-950/60 text-slate-200">
              <tr>
                <th className="px-3 py-2 border-b border-slate-700">Titolo</th>
                <th className="px-3 py-2 border-b border-slate-700">Autore</th>
                <th className="px-3 py-2 border-b border-slate-700">Pubblicazione (Editore/Anno)</th>
                <th className="px-3 py-2 border-b border-slate-700">Lunghezza</th>
                <th className="px-3 py-2 border-b border-slate-700">Rilevanza</th>
              </tr>
            </thead>
            <tbody>
              {bibliographyData.map((row) => (
                <tr key={row.title} className="odd:bg-slate-950/40">
                  <td className="px-3 py-2 border-b border-slate-800 font-semibold text-slate-100">
                    {row.title}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-800">{row.author}</td>
                  <td className="px-3 py-2 border-b border-slate-800">{row.publication}</td>
                  <td className="px-3 py-2 border-b border-slate-800">{row.length}</td>
                  <td className="px-3 py-2 border-b border-slate-800">{row.relevance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FontiSection;
