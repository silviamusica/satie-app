import React, { useState } from "react";
import { Library, ChevronDown } from "lucide-react";
import { glossaryData } from "../data/glossary";

const GlossarySection = () => {
  const [openItem, setOpenItem] = useState({});
  const toggleItem = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItem((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="glossary" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Library className="w-5 h-5 text-blue-400" />
          Glossario
        </h2>

        <div className="mt-5 space-y-6">
          {glossaryData.map((cat, i) => (
            <React.Fragment key={i}>
              <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
                <div className="text-slate-100 font-semibold mb-4">{cat.category}</div>
                <div className="space-y-2">
                  {[...cat.items]
                    .sort((a, b) => a.term.localeCompare(b.term, "it", { sensitivity: "base" }))
                    .map((it, j) => {
                    const key = `${i}-${j}`;
                    return (
                      <div key={key} className="bg-slate-900/60 border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleItem(i, j)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-900/80"
                        >
                          <span className="text-sm text-slate-100 font-semibold">{it.term}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${openItem[key] ? "rotate-180" : ""}`} />
                        </button>
                        {openItem[key] && (
                          <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">
                            {it.definition}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Immagini per arricchire visivamente il glossario */}
              {cat.category === "Tecnica" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
                    <img
                      src="/images/diteggiatura-gymnopedies.jpg"
                      alt="Esempio di diteggiatura pianistica"
                      className="w-full h-64 object-contain bg-slate-950 p-3"
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-slate-200 mb-1">Esempio di diteggiatura pianistica</p>
                      <p className="text-sm text-slate-400 italic">Spartito con indicazioni tecniche</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
                    <img
                      src="/images/diagramma-accordi-settima.jpg"
                      alt="Diagramma accordi di settima"
                      className="w-full h-64 object-contain bg-slate-950 p-3"
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-slate-200 mb-1">Diagramma accordi di settima</p>
                      <p className="text-sm text-slate-400 italic">Visualizzazione armonica</p>
                    </div>
                  </div>
                </div>
              )}

              {cat.category === "Estetica" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                    <img
                      src="/images/puvis-de-chavannes-jeunes-filles.jpg"
                      alt="Dipinto di Puvis de Chavannes"
                      className="w-full h-64 object-contain p-2"
                    />
                    <div className="p-3 bg-slate-800/50">
                      <p className="text-sm font-semibold text-slate-200 mb-1">Dipinto di Puvis de Chavannes</p>
                      <p className="text-sm text-slate-400 italic">"Jeunes filles au bord de la mer" (1879)</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
                    <img
                      src="/images/salammbo-flaubert-copertina-1862.jpg"
                      alt="Copertina Salammbô di Flaubert"
                      className="w-full h-64 object-contain bg-slate-950 p-3"
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-slate-200 mb-1">Copertina "Salammbô" di Flaubert</p>
                      <p className="text-sm text-slate-400 italic">Edizione originale (1862)</p>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlossarySection;
