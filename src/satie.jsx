/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Footer from "./Footer";
import {
  BookOpen,
  Music,
  Brain,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Library,
  User,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configurazione worker per PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Tab principali
const TABS = ["introduzione", "analysis", "interpreters", "glossary", "impara", "fonti"];

// Error boundary per gestire errori a livello di componente
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h1 className="text-xl font-semibold mb-3">Errore in app</h1>
            <p className="text-sm text-slate-300 mb-4">
              {String(this.state.error?.message || this.state.error || "errore sconosciuto")}
            </p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              onClick={() => window.location.reload()}
              type="button"
            >
              ricarica
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Componente per i tooltip
const Tooltip = ({ text, children }) => {
  return (
    <span className="relative group cursor-help">
      <span className="underline decoration-dotted decoration-slate-400">
        {children}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[260px] rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
        {text}
      </span>
    </span>
  );
};

// Pulsante per i tab
const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap",
      active
        ? "bg-blue-600 text-white border-blue-500"
        : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800",
    ].join(" ")}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

// Viewer PDF con navigazione e zoom
const PdfScoreViewer = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setPageNumber(1);
  };
  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
  };
  const canPrev = pageNumber > 1;
  const canNext = numPages ? pageNumber < numPages : false;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-100">{title}</h3>
          <p className="text-xs text-slate-400">pdf locale: {pdfUrl}</p>
        </div>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-4 h-4" />
          apri
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={!canPrev}
          className={[
            "inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold",
            !canPrev && "opacity-40 cursor-not-allowed",
          ].join(" ")}
        >
          <ChevronLeft className="w-4 h-4" />
          prev
        </button>
        <button
          type="button"
          onClick={() => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p))}
          disabled={!canNext}
          className={[
            "inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold",
            !canNext && "opacity-40 cursor-not-allowed",
          ].join(" ")}
        >
          next
          <ChevronRight className="w-4 h-4" />
        </button>
        <span className="text-xs text-slate-300 ml-1">
          pagina {pageNumber}
          {numPages ? ` / ${numPages}` : ""}
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setScale((s) => Math.max(0.7, +(s - 0.1).toFixed(2)))}
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
        >
          <ZoomOut className="w-4 h-4" />
          zoom -
        </button>
        <button
          type="button"
          onClick={() => setScale((s) => Math.min(2.0, +(s + 0.1).toFixed(2)))}
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
        >
          <ZoomIn className="w-4 h-4" />
          zoom +
        </button>
        <span className="text-xs text-slate-300">x{scale.toFixed(2)}</span>
      </div>
      <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-3 overflow-auto">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
};

/* ----------------------------------
   Contenuti specifici: Gymnopédie n. 1
----------------------------------- */

// Glossario: definizioni brevi per termini e contesto
const glossaryData = [
  {
    category: "Termini musicali",
    items: [
      {
        term: "Gymnopédie",
        definition:
          "Titolo volutamente enigmatico. Evoca la gymnopaedia greca, festa con danze rituali; in Satie il riferimento rimane deliberatamente ambiguo.",
      },
      {
        term: "Lent et douloureux",
        definition:
          "Indicazione di tempo e carattere della n. 1: lento e doloroso. Suggerisce un andamento misurato e un colore ambrato del suono.",
      },
      {
        term: "3/4",
        definition:
          "Metro ternario con tre pulsazioni per battuta. Nella Gymnopédie occorre evitare un effetto valzeristico mantenendo la pulsazione regolare.",
      },
      {
        term: "Ostinato",
        definition:
          "Figura ripetuta nella mano sinistra (basso) che stabilizza il flusso e crea un senso di ipnosi controllata.",
      },
      {
        term: "Accordi planati",
        definition:
          "Accordi che si muovono in blocco, spesso in parallelo, privilegiando il colore timbrico piuttosto che la funzione armonica tradizionale.",
      },
      {
        term: "Ambiguità tonale",
        definition:
          "La percezione di tonalità e di arrivo è attenuata: la pagina tende a un equilibrio sospeso più che a una direzione teleologica.",
      },
      {
        term: "Pedale di risonanza",
        definition:
          "Uso misurato del pedale destro per unire le frasi e creare un alone sonoro. È necessario evitare impasti confusi.",
      },
      {
        term: "Rubato sobrio",
        definition:
          "Micro-flessioni del tempo per far respirare le frasi senza trasformare il brano in un gesto romantico espansivo.",
      },
    ],
  },
  {
    category: "Contesto",
    items: [
      {
        term: "Montmartre",
        definition:
          "Quartiere parigino dei café-cabaret dove Satie lavorò come pianista e trovò ispirazione per il suo stile sobrio.",
      },
      {
        term: "Debussy",
        definition:
          "Claude Debussy orchestrò le Gymnopédies n. 1 e n. 3, favorendone la circolazione concertistica e la diffusione internazionale.",
      },
      {
        term: "Arcueil",
        definition:
          "Luogo in cui Satie si ritirò negli ultimi anni. La sua stanza, trovata alla sua morte nel 1925, testimonia la vita povera e disciplinata dell'autore.",
      },
    ],
  },
];

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
      "Pedale continuo che impasta le voci e cancella le dissonanze.",
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

// Flashcards: domande e risposte per memorizzare fatti chiave
const flashcardsData = [
  {
    q: "Chi è l'autore delle Gymnopédies?",
    a: "Erik Satie",
    level: "base",
    details: "Compositore e pianista francese, nato nel 1866 e morto nel 1925.",
  },
  {
    q: "Quando fu completata la Gymnopédie n. 1?",
    a: "1888",
    level: "base",
    details: "Le tre pagine furono completate entro la primavera del 1888 e pubblicate separatamente negli anni seguenti.",
  },
  {
    q: "Qual è l'indicazione di carattere della n. 1?",
    a: "Lent et douloureux",
    level: "base",
    details: "Tempo lento e doloroso: guida l'esecuzione e il colore timbrico del brano.",
  },
  {
    q: "In quale metro è scritta la n. 1?",
    a: "3/4",
    level: "base",
    details: "Metro ternario con tre pulsazioni per battuta; l'effetto deve essere cullante ma non valzeristico.",
  },
  {
    q: "Quale compositore orchestrò due Gymnopédies?",
    a: "Claude Debussy",
    level: "intermedio",
    details: "Debussy orchestrò le Gymnopédies n. 1 e n. 3 dopo averle sentite suonate da Satie nel 1896; l'esecuzione avvenne nel febbraio 1897.",
  },
  {
    q: "Quando ebbero una prima esecuzione pubblica rilevante le orchestrazioni?",
    a: "20 febbraio 1897",
    level: "intermedio",
    details: "Le orchestrazioni di Debussy furono presentate in un concerto della Société Nationale a Parigi il 20 febbraio 1897.",
  },
  {
    q: "Cosa significa il titolo Gymnopédie?",
    a: "Rimanda alla gymnopaedia, festa con danze dell'antica Grecia",
    level: "intermedio",
    details: "Il termine indica una festa spartana con danze rituali; Satie lo usa come suggestione poetica senza spiegarne l'origine.",
  },
  {
    q: "Qual è la principale difficoltà nell'esecuzione della n. 1?",
    a: "Controllo del suono e del pedale",
    level: "avanzato",
    details: "La sfida non è la velocità ma la qualità timbrica: equilibrio tra le voci, gestione del pedale e sospensione del tempo.",
  },
];

// Fonti: link a spartiti, registrazioni e note contestuali
const sourcesData = [
  {
    group: "Spartito e dominio pubblico",
    items: [
      {
        title: "IMSLP – 3 Gymnopédies (PDF)",
        url: "https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie,_Erik)",
        note: "Partitura e riferimenti editoriali delle tre Gymnopédies.",
      },
      {
        title: "Musopen – Gymnopédies (Audio e spartiti)",
        url: "https://musopen.org/music/8010-3-gymnopedies/",
        note: "Pagina con registrazioni e spartiti in pubblico dominio.",
      },
    ],
  },
  {
    group: "Contesto e cronologia",
    items: [
      {
        title: "Wikipedia – Gymnopédies",
        url: "https://en.wikipedia.org/wiki/Gymnop%C3%A9dies",
        note: "Panoramica generale su titolo, pubblicazione, metro e ricezione.",
      },
      {
        title: "Hyperion – note discografiche (Debussy orchestrazioni)",
        url: "https://www.hyperion-records.co.uk/dw.asp?dc=W408_GBAJY8936508",
        note: "Approfondimento sulle orchestrazioni di Debussy e la loro prima esecuzione.",
      },
    ],
  },
];

/* ----------------------------------
   Componenti di sezione
----------------------------------- */

// Sezione Introduzione
const IntroduzioneSection = ({ onNavigateToFonti }) => {
  const [openCuriosita, setOpenCuriosita] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, content) => setModalContent({ title, content });
  const closeModal = () => setModalContent(null);
  const handleFontiNavigation = () => {
    closeModal();
    if (onNavigateToFonti) onNavigateToFonti();
  };

  // Timeline sintetica della vita di Satie
  const satieLifeTimeline = [
    { year: "1866", event: "Nascita a Honfleur, Normandia." },
    { year: "Anni 1880", event: "Attività a Montmartre come pianista e compositore." },
    { year: "1888", event: "Completamento e prima pubblicazione delle Gymnopédies." },
    { year: "1896–1897", event: "Debussy ascolta Satie e orchestra due numeri." },
    { year: "1925", event: "Morte a Parigi/Arcueil." },
  ];

  // Modal con timeline biografica
  const LifeModal = () => (
    <div className="space-y-4">
      <div className="mb-3 rounded-lg overflow-hidden">
        <img
          src="/images/satie-portrait-hero.jpg"
          alt="Erik Satie - ritratto"
          className="w-full h-64 object-cover rounded-lg"
        />
        <p className="text-sm text-slate-400 mt-2 italic text-center">
          Erik Satie (1866–1925).
        </p>
      </div>
      <div className="space-y-2.5">
        {satieLifeTimeline.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-start p-3 rounded-lg bg-slate-700 border-l-2 border-blue-600 shadow-sm"
          >
            <span className="font-semibold text-slate-200 text-sm w-32 shrink-0">
              {item.year}
            </span>
            <span className="text-slate-200 text-sm leading-relaxed">
              {item.event}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/50 p-3 rounded border-l-4 border-blue-500">
        <p className="text-sm text-slate-200 leading-relaxed">
          Per ulteriori approfondimenti e riferimenti, consulta la sezione{' '}
          <button
            type="button"
            className="text-blue-300 underline decoration-dotted hover:text-blue-200"
            onClick={handleFontiNavigation}
          >
            Fonti
          </button>.
        </p>
      </div>
    </div>
  );

  // Modal con cronologia del brano e della ricezione
  const GymnopedieTimelineModal = () => (
    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
      <div className="mb-3 rounded-lg overflow-hidden">
        <img
          src="/images/gymnopedie-score.jpg"
          alt="Gymnopédie n. 1 - spartito"
          className="w-full h-56 object-cover rounded-lg"
        />
        <p className="text-sm text-slate-400 mt-2 italic text-center">
          Gymnopédie n. 1: sintesi visiva dell'incipit e dell'accompagnamento.
        </p>
      </div>
      <p>
        Il ciclo delle <strong>Gymnopédies</strong> si colloca nel periodo giovanile di Satie. La prima pagina
        venne pubblicata nell'estate del <strong>1888</strong> con l'indicazione
        <em> Lent et douloureux</em> e con un estratto della poesia <em>Les Antiques</em>.
      </p>
      <p>
        Nel <strong>1896–1897</strong> Claude Debussy, dopo aver ascoltato Satie suonare le tre pagine, decise di
        orchestrare i numeri <strong>1</strong> e <strong>3</strong>. La prima esecuzione orchestrale si tenne il
        <strong>20 febbraio 1897</strong> in un concerto della Société Nationale.
      </p>
      <p>
        La seconda Gymnopédie venne pubblicata solo nel <strong>1895</strong>, mentre l'edizione integrale dei tre
        pezzi uscì nel <strong>1898</strong>. La ricezione fu lenta ma costante: dalla metà del XX secolo, la
        n. 1 divenne un'icona del minimalismo e fu oggetto di innumerevoli arrangiamenti.
      </p>
      <div className="bg-slate-900/50 p-3 rounded border-l-4 border-blue-500">
        <p>
          Per link precisi e riferimenti, rimanda alla sezione{' '}
          <button
            type="button"
            className="text-blue-300 underline decoration-dotted hover:text-blue-200"
            onClick={handleFontiNavigation}
          >
            Fonti
          </button>.
        </p>
      </div>
    </div>
  );

  // Modal con indicazioni esecutive
  const InterpretazioneModal = () => (
    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
      <div className="bg-slate-900/50 p-3 rounded border-l-4 border-amber-500">
        <p className="text-slate-200">
          Obiettivo: mantenere <strong>semplicità controllata</strong>. La difficoltà risiede nella gestione di tempo,
          suono e pedale più che nella quantità di note.
        </p>
      </div>
      <ul className="space-y-2 ml-1">
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <span>
            <strong>Pulsazione:</strong> 3/4 stabile, senza accenti marcati da danza.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <span>
            <strong>Voce superiore:</strong> canto semplice, leggero e continuo senza pesantezza.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <span>
            <strong>Pedale:</strong> cambi frequenti per evitare impasti; usare il pedale come filtro timbrico.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <span>
            <strong>Dinamica:</strong> curva breve con crescendi e diminuendi contenuti; evitare forti improvvisi.
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Modale principale */}
      {modalContent && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                {modalContent.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-slate-300 hover:text-white text-sm font-semibold"
              >
                chiudi
              </button>
            </div>
            <div className="p-5">{modalContent.content}</div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-8 rounded-2xl shadow-2xl border border-slate-600">
        <h2 className="text-center text-3xl font-[family:'Cinzel',serif] font-bold tracking-[0.14em] mb-6 text-blue-300 leading-tight">
          Gymnopédie n. 1 <br /> (Trois Gymnopédies)
        </h2>
        <div className="mb-6 rounded-lg overflow-hidden shadow-2xl">
          <img
            src="/images/satie-portrait-hero.jpg"
            alt="Ritratto di Erik Satie"
            className="w-full h-52 sm:h-96 object-cover max-h-[60vh]"
          />
        </div>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            La <strong>Gymnopédie n. 1</strong> è la prima di tre pagine per pianoforte composte da Erik Satie e
            completate entro la primavera del <strong>1888</strong>. L'autore le definì "danze lente", costruite
            con pochi elementi ripetuti e dissonanze controllate.
          </p>
          <p>
            Il titolo{' '}
            <Tooltip text="Richiama la gymnopaedia: festa con danze rituali nell'antica Grecia. In Satie il riferimento rimane un enigma poetico.">
              Gymnopédie
            </Tooltip>{' '}
            suggerisce un contesto arcaico senza chiarirlo. Secondo alcune testimonianze, Satie trasse
            spunto da romanzi di <em>Gustave Flaubert</em> e dalla poesia <em>Les Antiques</em> di J. P. Contamine de
            Latour, pubblicata insieme alla n. 1.
          </p>
          <p>
            La pagina uscì nell'estate del 1888 con l'indicazione{' '}
            <Tooltip text="Tempo lento e doloroso: guida l'espressione e la qualità timbrica.">
              Lent et douloureux
            </Tooltip>{' '}
            e rimase quasi sconosciuta fino a quando <strong>Claude Debussy</strong> non orchestrò due numeri e li
            presentò il 20 febbraio 1897. Oggi la n. 1 è considerata un prototipo del minimalismo musicale e
            continua a ispirare arrangiamenti in ogni genere.
          </p>
        </div>
        {/* Quattro card principali */}
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <User className="w-5 h-5 text-blue-400 mr-2" />
              Satie in breve
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              Coordinate biografiche essenziali per inquadrare il contesto dell'autore e del brano.
            </p>
            <button
              onClick={() => openModal("Erik Satie: cronologia essenziale", <LifeModal />)}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center group"
            >
              Apri
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <Library className="w-5 h-5 text-blue-400 mr-2" />
              Cronologia e ricezione
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              1888 (pubblicazione iniziale) → 1896–1897 (orchestrazioni di Debussy) → 1898 (edizione integrale).
            </p>
            <button
              onClick={() => openModal("Gymnopédie n. 1: cronologia sintetica", <GymnopedieTimelineModal />)}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center group"
            >
              Apri
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <Brain className="w-5 h-5 text-blue-400 mr-2" />
              Linguaggio musicale
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              Ostinato, accordi planati, ambiguità tonale: il centro del discorso è il colore, non lo sviluppo
              tematico.
            </p>
            <p className="text-xs text-slate-400 italic">
              Suggerimento: per i dettagli consulta il glossario.
            </p>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <Music className="w-5 h-5 text-blue-400 mr-2" />
              Indicazioni di studio
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              La difficoltà non è la velocità ma il controllo del suono, del respiro e del pedale.
            </p>
            <button
              onClick={() => openModal("Gymnopédie n. 1: impostazione esecutiva", <InterpretazioneModal />)}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center group"
            >
              Apri
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        {/* Curiosità espandibile */}
        <div className="bg-slate-800 rounded-lg shadow overflow-hidden border border-slate-700 mt-6">
          <button
            onClick={() => setOpenCuriosita(!openCuriosita)}
            className={`w-full p-5 flex justify-between items-center transition-all ${
              openCuriosita
                ? "sticky top-20 z-10 bg-slate-700 text-white"
                : "bg-slate-800 text-slate-100 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <div className="text-left">
                <h3 className="text-lg font-semibold">Curiosità: Debussy e la svolta</h3>
                <span className="text-sm opacity-90">Orchestrazioni e ricezione</span>
              </div>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${openCuriosita ? "rotate-180" : ""}`} />
          </button>
          {openCuriosita && (
            <div className="p-6 pt-24 bg-slate-900 space-y-4 text-sm text-slate-300 leading-relaxed">
              <p className="text-base text-slate-200">
                Debussy orchestrò le Gymnopédies n. 1 e n. 3 e ne favorì la diffusione. Le esecuzioni del
                febbraio 1897 sono considerate un punto di svolta per la circolazione pubblica dei brani.
              </p>
              <div className="bg-slate-900/50 p-4 rounded-lg border-l-2 border-blue-500">
                <p>
                  Per link e riferimenti precisi (spartiti, date, edizioni), rimanda alla sezione{' '}
                  <button
                    type="button"
                    className="text-blue-300 underline decoration-dotted hover:text-blue-200"
                    onClick={handleFontiNavigation}
                  >
                    Fonti
                  </button>.
                </p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-500/30 mt-2">
                <h4 className="text-base font-semibold text-slate-100 mb-2 flex items-center">
                  <span className="mr-2">🎵</span>
                  Ascolto e spartito
                </h4>
                <p className="text-sm text-slate-300 mb-3">
                  Spartito e materiali pubblici: IMSLP (pagina "3 Gymnopédies").
                </p>
                <a
                  href="https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie,_Erik)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Apri IMSLP
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sezione Analisi: utilizza le schede definite sopra e il viewer PDF
const AnalysisSection = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Brain className="w-5 h-5 text-blue-400" />
          Analisi operativa
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Obiettivo: trasformare le informazioni in scelte esecutive (tempo, suono, pedale).
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {analysisCards.map((c, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-100 font-semibold">
                <c.icon className="w-4 h-4 text-blue-400" />
                {c.title}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
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
      </div>
      <PdfScoreViewer pdfUrl="/spartito-gymnopedie-1.pdf" title="Spartito: Gymnopédie n. 1" />
    </div>
  );
};

// Sezione Interpreti: struttura pronta per incollare link e note
const InterpretersSection = () => {
  // dati predefiniti: il front-end rimane vuoto se nessun link è fornito
  const interpretersData = [
    {
      name: "piano solo",
      items: [
        {
          label: "Registrazioni (selezione personale)",
          note:
            "Inserisci qui i link che preferisci. Struttura pronta per incollare URL e note.",
          links: [
            { title: "Link 1", url: "" },
            { title: "Link 2", url: "" },
          ],
        },
      ],
    },
    {
      name: "orchestrazioni (Debussy)",
      items: [
        {
          label: "Gymnopédies orchestrate",
          note:
            "Debussy orchestrò due numeri (1 e 3). Utile per confrontare tinta e bilanciamento.",
          links: [
            { title: "Link 1", url: "" },
            { title: "Link 2", url: "" },
          ],
        },
      ],
    },
  ];
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Music className="w-5 h-5 text-blue-400" />
          Interpreti e ascolti
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Struttura pronta: incolla link e note. Nessun link è obbligatorio.
        </p>
        <div className="mt-5 space-y-4">
          {interpretersData.map((block, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
              <div className="text-slate-100 font-semibold">{block.name}</div>
              <div className="mt-3 space-y-4">
                {block.items.map((it, j) => (
                  <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                    <div className="text-sm text-slate-100 font-semibold">{it.label}</div>
                    <div className="text-xs text-slate-300 mt-1">{it.note}</div>
                    <div className="mt-3 space-y-2">
                      {it.links.map((l, k) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-200">{l.title}</span>
                          {l.url ? (
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-xs font-semibold"
                            >
                              apri <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-500">URL vuoto</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sezione Glossario
const GlossarySection = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Library className="w-5 h-5 text-blue-400" />
          Glossario
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Definizioni brevi per uso nell'applicazione (tooltip, schede, spiegazioni).
        </p>
        <div className="mt-5 space-y-5">
          {glossaryData.map((cat, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
              <div className="text-slate-100 font-semibold">{cat.category}</div>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {cat.items.map((it, j) => (
                  <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                    <div className="text-sm text-slate-100 font-semibold">{it.term}</div>
                    <div className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {it.definition}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sezione Impara: flashcards per memorizzare
const ImparaSection = () => {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const card = flashcardsData[idx];
  const next = () => {
    setShow(false);
    setIdx((i) => (i + 1) % flashcardsData.length);
  };
  const prev = () => {
    setShow(false);
    setIdx((i) => (i - 1 + flashcardsData.length) % flashcardsData.length);
  };
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          Impara
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Flashcard essenziali per fissare i dati principali.
        </p>
        <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Carta {idx + 1} / {flashcardsData.length} · livello: <span className="text-slate-200 font-semibold">{card.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                prev
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
              >
                next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-slate-100 font-semibold">Domanda</div>
            <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.q}</div>
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              {show ? "Nascondi risposta" : "Mostra risposta"}
              <ChevronDown className={`w-4 h-4 transition-transform ${show ? "rotate-180" : ""}`} />
            </button>
            {show && (
              <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                <div className="text-slate-100 font-semibold">Risposta</div>
                <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.a}</div>
                {card.details && (
                  <div className="mt-1 text-xs text-slate-400">{card.details}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sezione Fonti: elenco dei link e note
const FontiSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Fonti
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Link per spartiti, audio e note di contesto.
        </p>
        <div className="mt-6 space-y-4">
          {sourcesData.map((g, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex((v) => (v === i ? null : i))}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <Library className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-slate-100 font-semibold">{g.group}</div>
                    <div className="text-xs text-slate-400">{g.items.length} elementi</div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-200 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pt-1 space-y-3">
                  {g.items.map((it, j) => (
                    <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm text-slate-100 font-semibold">{it.title}</div>
                          <div className="text-xs text-slate-300 mt-1">{it.note}</div>
                        </div>
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-xs font-semibold"
                        >
                          apri <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="mt-2 text-xs text-slate-500 break-all">{it.url}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   App principale
----------------------------------- */

export default function SatieApp() {
  const [activeTab, setActiveTab] = useState("introduzione");
  const tabIndex = useMemo(() => TABS.indexOf(activeTab), [activeTab]);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = Math.min(TABS.length - 1, tabIndex + 1);
      setActiveTab(TABS[nextIndex]);
    },
    onSwipedRight: () => {
      const prevIndex = Math.max(0, tabIndex - 1);
      setActiveTab(TABS[prevIndex]);
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });
  useEffect(() => {
    // Impedisce tab non validi
    if (!TABS.includes(activeTab)) setActiveTab("introduzione");
  }, [activeTab]);
  const tabMeta = {
    introduzione: { label: "introduzione", icon: BookOpen },
    analysis: { label: "analisi", icon: Brain },
    interpreters: { label: "interpreti", icon: Music },
    glossary: { label: "glossario", icon: Library },
    impara: { label: "impara", icon: GraduationCap },
    fonti: { label: "fonti", icon: FileText },
  };
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100" {...swipeHandlers}>
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-slate-400">satie</div>
                <div className="text-lg sm:text-xl font-bold text-slate-100 truncate">
                  Gymnopédie n. 1
                </div>
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap">satie.jsx</div>
            </div>
            <nav className="flex gap-2 overflow-x-auto pb-1">
              {TABS.map((t) => (
                <TabButton
                  key={t}
                  active={activeTab === t}
                  label={tabMeta[t].label}
                  icon={tabMeta[t].icon}
                  onClick={() => setActiveTab(t)}
                />
              ))}
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-7">
          {activeTab === "introduzione" && (
            <IntroduzioneSection onNavigateToFonti={() => setActiveTab("fonti")} />
          )}
          {activeTab === "analysis" && <AnalysisSection />}
          {activeTab === "interpreters" && <InterpretersSection />}
          {activeTab === "glossary" && <GlossarySection />}
          {activeTab === "impara" && <ImparaSection />}
          {activeTab === "fonti" && <FontiSection />}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
