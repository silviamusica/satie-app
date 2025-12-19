import { useState } from "react";
import { Music, Brain, XCircle, CheckCircle2 } from "lucide-react";
import Tooltip from "../components/Tooltip";
import PdfScoreViewer from "../components/PdfScoreViewer";

// Schede di analisi: punti chiave per lo studio
const analysisCards = [
  {
    title: "Struttura e materiali",
    icon: Music,
    bullets: [
      "Pezzo breve per pianoforte solo con andamento ternario.",
      "Ostinato regolare e melodia spoglia: la mano sinistra mantiene una pulsazione costante mentre la destra canta frasi essenziali.",
      "Tre sezioni percepite (A–B–A′) con micro variazioni che evitano uno sviluppo tradizionale.",
      "Uso di accordi planati e movimenti paralleli che creano un senso di sospensione.",
    ],
  },
  {
    title: "Focali esecutivi",
    icon: Brain,
    bullets: [
      "Controllo del tempo: stabile ma non rigido; il ritmo non deve diventare da valzer.",
      "Gestione del pedale a finestre per mantenere trasparenza fra le voci.",
      "Separazione delle voci: il basso sostiene, gli accordi colorano e la melodia canta con semplicità.",
      "Dinamica contenuta con curve brevi e respirate; l'espressività risiede nel timbro.",
    ],
  },
  {
    title: "Cosa evitare",
    icon: XCircle,
    bullets: [
      "Trasformare il 3/4 in un valzer caricaturale.",
      "Rubato ampio e romantico che appesantisce la linea.",
      "Pedale continuo che impasta le voci e toglie purezza.",
      "Sottolineare eccessivamente la progressione armonica: il brano vive di sospensioni.",
    ],
  },
  {
    title: "Cosa cercare",
    icon: CheckCircle2,
    bullets: [
      "Sospensione e ambiguità tonale: la sensazione di percorso è attenuata.",
      "Uniformità timbrica: ogni registro deve fondersi come in un'orchestrazione.",
      "Legato omogeneo con piccole variazioni di respiro.",
      "Colore e risonanza come elementi narrativi principali.",
    ],
  },
];

const BranoSection = () => {
  const [showScore, setShowScore] = useState(false);
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
    {/* Header */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h1 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
        <Music className="w-7 h-7 text-blue-400" />
        Il brano
      </h1>
      <p className="text-sm text-slate-300 leading-relaxed">
        Genesi, linguaggio musicale e segreti esecutivi della Gymnopédie n. 1
      </p>
    </div>

    {/* 1. La Nascita (1888) */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        La nascita (1888)
      </h2>

      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Nella primavera del <strong>1888</strong>, Erik Satie — a soli 21 anni, pianista di{" "}
          <Tooltip text="Locali parigini che combinavano caffè, spettacolo e arte, frequentati da artisti bohémien">
            <span>cabaret</span>
          </Tooltip>{" "}
          a Montmartre — compone le{" "}
          <Tooltip text="Serie di tre brevi composizioni per pianoforte caratterizzate da armonie sospese e atmosfera meditativa">
            <strong>tre Gymnopédies</strong>
          </Tooltip>.
          Pagine apparentemente semplici, ma rivoluzionarie per il loro tempo.
        </p>

        {/* Origine del nome */}
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">
            Origine del nome "Gymnopédie"
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Il titolo deriva dalle{" "}
            <Tooltip text="Antiche feste spartane in onore di Apollo, con danze rituali eseguite da giovani nudi">
              <strong>gymnopédies</strong>
            </Tooltip>, danze cerimoniali dell'antica Sparta dove giovani danzavano nudi in onore di Apollo.
            L'ispirazione viene dal poema <em>Les Antiques</em> di{" "}
            <Tooltip text="Poeta simbolista francese, amico di Satie a Montmartre">
              <span>J.P. Contamine de Latour</span>
            </Tooltip>, amico di Satie a Montmartre, pubblicato insieme alla Gymnopédie n. 1 nell'estate del 1888.
          </p>
          <img
            src="/images/Gymnopedie greche.jpeg"
            alt="Danzatori antichi greci"
            className="w-full object-contain rounded-lg border border-slate-600 bg-slate-950"
          />
        </div>

        {/* Prima pubblicazione */}
        <div className="rounded-lg overflow-hidden border border-slate-600">
          {/* Immagine rimossa su richiesta: Bonjour Biqui non pertinente alle Gymnopédies */}
        </div>

        {/* Immagine Puvis de Chavannes */}
        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
          <img
            src="/images/puvis-de-chavannes-jeunes-filles.jpg"
            alt="Jeunes filles au bord de la mer di Puvis de Chavannes"
            className="w-full h-80 object-contain p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
            Pierre Puvis de Chavannes, "Jeunes filles au bord de la mer" (1879).
            Le fonti parlano di un evidente parallelo tra questa staticità pittorica e le strutture ternarie
            delle Gymnopédies, più che di un'unica fonte esclusiva.
          </p>
        </div>

        {/* Contesto compositivo */}
        <div className="bg-linear-to-br from-amber-950/20 to-slate-950/40 border border-amber-700/30 rounded-xl p-4">
          <h3 className="text-base font-semibold text-amber-200 mb-3">Il contesto rivoluzionario</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Mentre <strong>Wagner</strong> dominava l'Europa con tensioni drammatiche e{" "}
            <Tooltip text="Risoluzione di una dissonanza o tensione armonica">
              <span>risoluzioni</span>
            </Tooltip>{" "}
            potenti, Satie oppone <strong>armonie sospese</strong>, <strong>forme svuotate di drammaticità</strong>,
            un suono "bianco" che anticipa l'{" "}
            <Tooltip text="Stile musicale francese che privilegia il colore e l'atmosfera rispetto allo sviluppo tematico">
              <span>impressionismo</span>
            </Tooltip>, il{" "}
            <Tooltip text="Movimento musicale caratterizzato da ripetizioni, armonie statiche e processi graduali">
              <span>minimalismo</span>
            </Tooltip>{" "}
            e la{" "}
            <Tooltip text="Genere musicale atmosferico creato da Brian Eno negli anni '70, influenzato da Satie">
              <span>musica ambient</span>
            </Tooltip>.
          </p>
        </div>
      </div>
    </div>

    {/* 2. Linguaggio Musicale */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        Linguaggio musicale
      </h2>

      {/* Il segreto del Fa# - BOX HERO */}
      <div className="bg-linear-to-br from-amber-900/20 via-slate-900 to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-3">
          <span className="text-2xl">💎</span>
          Il segreto armonico
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Perché la Gymnopédie n.1 suona così <strong>fluida e sospesa</strong>?
          Il segreto risiede in una singola nota, il <strong className="text-amber-300">Fa#</strong>.
          Questa nota appartiene <em>contemporaneamente</em> sia all'accordo di{" "}
          <Tooltip text="Accordo di quattro note: Sol-Si-Re-Fa#">
            <strong>Sol maggiore settima</strong>
          </Tooltip>{" "}
          (Sol-Si-Re-Fa#) sia all'accordo di{" "}
          <Tooltip text="Accordo di quattro note: Re-Fa#-La-Do#">
            <strong>Re maggiore settima</strong>
          </Tooltip>{" "}
          (Re-Fa#-La-Do#).
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Il Fa# funge da <strong className="text-amber-200">collante armonico</strong>, permettendo all'{" "}
          <Tooltip text="Alternanza tra due accordi senza vera progressione tonale">
            <span>altalena armonica</span>
          </Tooltip>{" "}
          di oscillare senza mai toccare terra, creando quella sensazione di <em>galleggiamento senza tempo</em> che caratterizza il brano.
        </p>

        {/* Immagine analisi Fa# */}
        <div className="rounded-lg overflow-hidden border border-amber-500/20">
          <img
            src="/images/nota ricorrente-Fa-diesis-gymnopedie-.jpeg"
            alt="Analisi del Fa# collante armonico"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50">
            Il Fa# come "collante armonico"
          </p>
        </div>

        <p className="text-sm text-slate-400 mt-3 italic">
          💡 Questo stile era già stato abbozzato nelle <em>Sarabandes</em> (1887), composte l'anno precedente.
        </p>
      </div>

      {/* Diagramma accordi */}
      <div className="mt-6 rounded-lg overflow-hidden border border-slate-600">
        <img
          src="/images/diagramma-accordi-settima.jpg"
          alt="Diagramma accordi di settima maggiore"
          className="w-full object-contain bg-slate-950 p-2"
        />
        <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
          Oscillazione tra Sol7+ e Re7+
        </p>
      </div>

      {/* Caratteristiche musicali */}
      <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-xl p-4">
        <h3 className="text-base font-semibold text-slate-100 mb-3">Caratteristiche chiave</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Metro 3/4</strong> con{" "}
              <Tooltip text="Figura ritmica ripetuta costantemente">
                <span>ostinato</span>
              </Tooltip>{" "}
              regolare alla mano sinistra
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Forma tripartita</strong> (A–B–A′) con micro-variazioni
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <Tooltip text="Accordi che si muovono parallelamente mantenendo la stessa struttura intervallare">
                <strong>Accordi planati</strong>
              </Tooltip>{" "}
              e movimenti paralleli
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              Indicazione <strong>"Lent et douloureux"</strong> (lento e doloroso)
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* 3. Come Suonarlo */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        Come suonarlo
      </h2>

      <p className="text-sm text-slate-300 mb-4">
        Trasformare le informazioni in scelte esecutive (tempo, suono, pedale).
      </p>

      {/* Analisi operativa - da analysisCards */}
      <div className="grid md:grid-cols-2 gap-4">
        {analysisCards.map((c, i) => (
          <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-2 text-slate-100 font-semibold mb-3">
              <c.icon className="w-4 h-4 text-blue-400" />
              {c.title}
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
              {c.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">→</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Immagini tecniche */}
      <div className="space-y-4 mt-6">
        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
          <img
            src="/images/diteggiatura-gymnopedies.jpg"
            alt="Spartito annotato con diteggiatura consigliata"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <div className="p-3">
            <p className="text-sm font-semibold text-slate-200 mb-1">
              Spartito annotato e diteggiatura
            </p>
            <p className="text-sm text-slate-400 italic">
              Indicazioni tecniche
            </p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
          <img
            src="/images/IMMAGINE MANI.jpg"
            alt="Posizione delle mani"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <div className="p-3">
            <p className="text-sm font-semibold text-slate-200 mb-1">
              Posizione mani
            </p>
            <p className="text-sm text-slate-400 italic">
              Le dita della mano sono tutte all'interno della tastiera e sono vicine ai testi neri, la mano è curva e il polso è all'altezza dei tasti.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setShowScore((prev) => !prev)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          {showScore ? "Nascondi lo spartito completo" : "Mostra lo spartito completo"}
          <ChevronDown className={`w-4 h-4 transition-transform ${showScore ? "rotate-180" : ""}`} />
        </button>
      </div>
      {showScore && <PdfScoreViewer />}
    </div>

    {/* CTA */}
    <div className="text-center">
      <p className="text-sm text-slate-400 mb-3">
        Ora che conosci il brano, scopriamo la sua eredità nella musica moderna
      </p>
    </div>
    </div>
  );
};

export default BranoSection;
