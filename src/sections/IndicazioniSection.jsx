import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

const IndicazioniSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const indicazioni = [
    {
      titolo: "Gnossiennes (n.1, 2, 3)",
      frasi: [
        "Con grande bontà (Avec une grande bonté)",
        "Non siate orgogliosi (Sans orgueil)",
        "Aprite la testa (Ouvrez la tête)",
        "Seppellite il suono (Enfouissez le son)",
        "Armatevi di chiaroveggenza (Munissez-vous de clairvoyance)",
      ],
      anno: "1890-1893",
      strumento: "Pianoforte",
    },
    {
      titolo: "Le Fils des étoiles (Preludi)",
      frasi: [
        "Bianco e immobile (White and motionless)",
        "Pallido e sacerdotale (Pale and priest-like)",
      ],
      anno: "1891-1892",
      strumento: "Pianoforte (o flauti e arpe)",
    },
    {
      titolo: "Descriptions automatiques",
      frasi: [
        "Non salivate troppo (Ne pas trop saliver)",
        "La barca fa una risata cattiva (The boat gives a nasty laugh)",
      ],
      anno: "1913",
      strumento: "Pianoforte",
    },
    {
      titolo: "Embryons desséchés",
      frasi: [
        "Come un usignolo con il mal di denti (Like a nightingale with a toothache)",
        "Non ho tabacco, per fortuna non fumo (I haven't any tobacco)",
        "Piccole fusa. Piccole fusa beffarde (Little purr...)",
      ],
      anno: "1913",
      strumento: "Pianoforte",
    },
    {
      titolo: "Le Piège de Méduse (Sette piccole danze)",
      frasi: [
        "Siate convenienti, per favore: una scimmia vi guarda",
        "Mettetevi nell'ombra",
        "Ridete senza farvi notare",
        "Danzate interiormente",
      ],
      anno: "1913",
      strumento: "Pianoforte (preparato)",
    },
    {
      titolo: "Peccadilles importunes (da Enfantines)",
      frasi: [
        "Essere geloso del proprio compagno che ha la testa grossa",
        "Mangiargli la tartina",
        "Approfittare dei suoi calli ai piedi per prendergli il cerchio",
      ],
      anno: "1913",
      strumento: "Pianoforte",
    },
    {
      titolo: "Sports et divertissements",
      frasi: [
        "Dedico questo corale a coloro che non mi amano. Mi ritiro.",
        "Non si veda nient'altro",
        "Il colonnello è qui! Ora fa il suo swing: il suo bastone va in pezzi!",
      ],
      anno: "1914",
      strumento: "Pianoforte",
    },
    {
      titolo: "Heures séculaires et instantanées",
      frasi: [
        "Proibisco a chiunque di leggere il testo ad alta voce durante l'esecuzione musicale",
        "A Sir William Grant-Plumot... personaggio immobile",
      ],
      anno: "1914",
      strumento: "Pianoforte",
    },
    {
      titolo: "Sonatine bureaucratique",
      frasi: [
        "Vivache (invece di Vivace)",
        "Il piano continua",
        "Ahimè! È ora di lasciare l'ufficio",
        "Il piano vicino suona un pezzo di Clementi",
      ],
      anno: "1917",
      strumento: "Pianoforte",
    },
  ];

  return (
    <div id="indicazioni" className="space-y-6 max-w-5xl mx-auto">
      {openModal && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="w-full max-w-4xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                Indicazioni sugli spartiti: note strambe
              </h3>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-slate-300 hover:text-white text-sm font-semibold px-3 py-1 rounded hover:bg-slate-800"
              >
                chiudi
              </button>
            </div>
            <div className="p-5 max-h-[calc(90vh-8rem)] overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Queste annotazioni paratestuali sono una firma di Satie: indicazioni impossibili o metaforiche,
                pensate per influenzare la psicologia dell'esecutore più che la tecnica.
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-blue-500">
                <p>
                  <strong>Doppio fondo:</strong> Satie vietava spesso di leggere queste frasi ad alta voce durante
                  l'esecuzione, creando un "segreto" tra compositore ed esecutore.
                </p>
              </div>
              <p>
                Alcune indicazioni sono apertamente ironiche; altre richiedono un'immaginazione poetica ("aprite la testa",
                "seppellite il suono") o alludono a scene teatrali.
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-emerald-500">
                <p>
                  <strong>Pianoforte preparato:</strong> Le <em>Sette piccole danze</em> di <em>Le Piège de Méduse</em>
                  sono considerate un primo esempio di pianoforte preparato, anticipando John Cage.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-400" />
          Indicazioni sugli spartiti
        </h2>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Satie inseriva frasi assurde e poetiche tra i righi: indicazioni paratestuali che guidano l'immaginazione
            dell'esecutore.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {indicazioni.map((item) => (
            <div key={item.titolo} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-100 font-semibold">{item.titolo}</div>
              <div className="mt-2 text-sm text-slate-300 space-y-1">
                {item.frasi.map((frase) => (
                  <div key={frase}>• {frase}</div>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-2">{item.anno} · {item.strumento}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="mt-5 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
        >
          Approfondisci <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default IndicazioniSection;
