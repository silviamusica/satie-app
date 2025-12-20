import { Sparkles } from "lucide-react";

const StramberieSection = () => {
  const curiosi = [
    { titolo: "Trois morceaux en forme de poire", traduzione: "Tre pezzi a forma di pera", data: "1903", strumento: "Pianoforte a 4 mani" },
    { titolo: "Véritables préludes flasques (pour un chien)", traduzione: "Veri preludi flaccidi (per un cane)", data: "1912", strumento: "Pianoforte" },
    { titolo: "Embryons desséchés", traduzione: "Embrioni essiccati", data: "1913", strumento: "Pianoforte" },
    { titolo: "Croquis et agaceries d'un gros bonhomme en bois", traduzione: "Schizzi e esasperazioni di un grosso uomo di legno", data: "1913", strumento: "Pianoforte" },
    { titolo: "Vieux sequins et vieilles cuirasses", traduzione: "Vecchi zecchini e vecchie corazze", data: "1913", strumento: "Pianoforte" },
    { titolo: "Chapitres tournés en tous sens", traduzione: "Capitoli voltati in tutti i sensi", data: "1913", strumento: "Pianoforte" },
    { titolo: "Choses vues à droite et à gauche (sans lunettes)", traduzione: "Cose viste a destra e a sinistra (senza occhiali)", data: "1914", strumento: "Violino e pianoforte" },
    { titolo: "Trois Valses distinguées du précieux dégoûté", traduzione: "Tre valzer distinti del prezioso disgustato", data: "1914", strumento: "Pianoforte" },
    { titolo: "Aperçus désagréables", traduzione: "Sguardi sgradevoli", data: "1908-1912", strumento: "Pianoforte a 4 mani" },
    { titolo: "Sonatine bureaucratique", traduzione: "Sonatina burocratica", data: "1917", strumento: "Pianoforte" },
    { titolo: "Pièces froides (include Airs à faire fuir)", traduzione: "Pezzi freddi (include Arie per far scappare)", data: "1897", strumento: "Pianoforte" },
  ];

  return (
    <div id="stramberie" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-400" />
          Stramberie
        </h2>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Selezione di titoli eccentrici e umoristici: il lato ironico di Satie, tra parodie e giochi linguistici.
          </p>
        </div>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4 mt-4">
          <h3 className="text-base font-semibold text-slate-100 mb-2">Curiosità</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Il gentiluomo di velluto: acquistò sette abiti identici di velluto a coste color castagna per evitare la scelta quotidiana.</li>
            <li>• Il fonometrografo: rifiutava la parola “musicista” e preferiva definirsi misuratore di suoni.</li>
            <li>• Il paradosso dell'ombrello: amava così tanto i suoi ombrelli che, se pioveva, li proteggeva sotto il cappotto.</li>
            <li>• Il martello da difesa: camminava di notte fino ad Arcueil portando un martello pesante in tasca.</li>
            <li>• Castelli di piombo: disegnava planimetrie di edifici medievali e pubblicava annunci finti per venderli.</li>
            <li>• Odio per il sole: preferiva uscire con il tempo cupo o sotto la pioggia.</li>
            <li>• Bollitura del vino: raccontava di bollire il vino e berlo freddo con succo di fucsia.</li>
          </ul>
        </div>
        <div className="mt-5 space-y-3">
          {curiosi.map((c) => (
            <div key={c.titolo} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-100 font-semibold">{c.titolo}</div>
              <div className="text-sm text-slate-300 mt-1">{c.traduzione}</div>
              <div className="text-xs text-slate-400 mt-2">{c.data} · {c.strumento}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed mt-6">
          <p>
            Molti di questi titoli appartengono al periodo "umoristico" di Satie (1912-1915), quando usa l'ironia per
            prendere le distanze dal romanticismo e dall'impressionismo.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-blue-500">
            <p>
              <strong>La "pera" e Debussy:</strong> <em>Trois morceaux en forme de poire</em> nasce come risposta ironica
              alla critica di Debussy sulla "forma". In francese <em>poire</em> può significare anche "sciocco".
            </p>
          </div>
          <p>
            Le partiture contengono annotazioni assurde (da non leggere ad alta voce), come "aprite la testa" o
            "come un usignolo con il mal di denti".
          </p>
          <p>
            Molti brani sono parodie: la <em>Sonatine bureaucratique</em> ironizza sulla sonatina di Clementi, mentre
            <em>Embryons desséchés</em> prende in giro le code enfatiche romantiche.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StramberieSection;
