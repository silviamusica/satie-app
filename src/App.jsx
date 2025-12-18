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
  ChevronDown,
  ChevronLeft,
  ExternalLink,
  Library,
  User,
  FileText,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Globe,
  History,
  Film,
  Sparkles,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const TABS = [
  "introduzione",
  "contesto",
  "biografia",
  "analysis",
  "interpreters",
  "glossary",
  "impara",
  "eredita",
  "fonti",
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
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
              <RefreshCw className="w-4 h-4" />
              ricarica
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const cx = (...parts) => parts.filter(Boolean).join(" ");

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <h3 className="text-base sm:text-lg font-semibold text-slate-100">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white text-sm font-semibold"
            aria-label="Chiudi"
          >
            chiudi
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const Tooltip = ({ text, children }) => {
  return (
    <span className="relative group cursor-help">
      <span className="underline decoration-dotted decoration-slate-400">{children}</span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[260px] rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
        {text}
      </span>
    </span>
  );
};

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap",
      active
        ? "bg-blue-600 text-white border-blue-500"
        : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
    )}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const PdfScoreViewer = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error) => {
    // eslint-disable-next-line no-console
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
          className={cx(
            "inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold",
            !canPrev && "opacity-40 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          prev
        </button>

        <button
          type="button"
          onClick={() => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p))}
          disabled={!canNext}
          className={cx(
            "inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold",
            !canNext && "opacity-40 cursor-not-allowed"
          )}
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

/* -----------------------------
   contenuti: gymnopédie n. 1
----------------------------- */

const glossaryData = [
  {
    category: "Termini musicali",
    items: [
      {
        term: "Gymnopédie",
        definition:
          "Titolo volutamente enigmatico. Richiama la gymnopaedia (festa/danza dell’antica Grecia), ma l’origine precisa del riferimento resta discussa.",
      },
      {
        term: "Lent et douloureux",
        definition: "Indicazione di tempo e carattere del n. 1: lento e doloroso.",
      },
      {
        term: "3/4",
        definition:
          "Metro ternario regolare. L’effetto può risultare cullante, ma conviene evitare un carattere da valzer.",
      },
      {
        term: "Ostinato",
        definition:
          "Figura ripetuta che stabilizza il flusso (spesso nel basso) e sostiene la percezione di immobilità controllata.",
      },
      {
        term: "Accordi planati",
        definition:
          "Accordi che si muovono in blocco, privilegiando tinta e timbro più che funzione armonica tradizionale.",
      },
      {
        term: "Ambiguità tonale",
        definition:
          "La sensazione di tonalità e di ‘arrivo’ è attenuata: il brano tende a un equilibrio sospeso più che a una traiettoria.",
      },
      {
        term: "Pedale di risonanza",
        definition:
          "Uso misurato: mantiene continuità, ma va gestito per evitare impasti che cancellano le voci.",
      },
      {
        term: "Rubato sobrio",
        definition:
          "Micro-flessioni per respirare, senza trasformare il brano in un gesto romantico espansivo.",
      },
    ],
  },
  {
    category: "Contesto",
    items: [
      {
        term: "Montmartre",
        definition:
          "Ambiente dei café-cabarets parigini con cui Satie ha legami nella fase giovanile (pianista e autore di brani brevi).",
      },
      {
        term: "Debussy",
        definition:
          "Orchestra due Gymnopédies (n. 1 e n. 3) e contribuisce alla loro circolazione concertistica.",
      },
      {
        term: "Arcueil",
        definition:
          "Luogo associato alla maturità di Satie e al suo immaginario biografico più noto.",
      },
    ],
  },
];

const analysisCards = [
  {
    title: "Struttura pratica",
    icon: Music,
    bullets: [
      "pezzo breve per pianoforte solo",
      "metro 3/4, passo regolare",
      "materiale ridotto: ostinato + linea cantabile",
      "ritorno percettivo dell’idea iniziale (A–B–A′ come lettura operativa)",
    ],
  },
  {
    title: "Centro del lavoro esecutivo",
    icon: Brain,
    bullets: [
      "controllo del suono più che della velocità",
      "separazione delle voci (basso, accordi, canto)",
      "pedale per ‘finestre’ e cambi frequenti",
      "dinamica contenuta, curve brevi",
    ],
  },
  {
    title: "Cosa evitare",
    icon: XCircle,
    bullets: [
      "trasformare il 3/4 in valzer",
      "pedale continuo che impasta tutto",
      "rubato ampio e romantico",
      "accenti casuali che rompono la linea",
    ],
  },
  {
    title: "Cosa cercare",
    icon: CheckCircle2,
    bullets: [
      "tempo stabile ma non rigido",
      "chiarezza timbrica e risonanza controllata",
      "fraseggi essenziali",
      "sospensione, non teatralità",
    ],
  },
  {
    title: "Armonia sospesa",
    icon: Sparkles,
    bullets: [
      "oscillazione Gmaj7 → Dmaj7 mantiene sempre la settima maggiore per eliminare arrivi definitivi",
      "la nota Fa# funge da pedale interno e mantiene il flusso compresso",
      "la ripetizione senza risoluzione anticipa ambient, jazz modale e lo-fi",
      "ogni sezione aggiunge varianti minori senza rompere la calma generale",
    ],
  },
];

const interpretersData = [
  {
    name: "piano solo",
    items: [
      {
        label: "registrazioni (selezione personale)",
        note:
          "inserisci qui i link che preferisci. struttura pronta per incollare url e note.",
        links: [
          { title: "link 1", url: "" },
          { title: "link 2", url: "" },
        ],
      },
    ],
  },
  {
    name: "orchestrazioni (debussy)",
    items: [
      {
        label: "gymnopédies orchestrate",
        note:
          "debussy orchestra due numeri (1 e 3). utile per confrontare tinta e bilanciamento.",
        links: [
          { title: "link 1", url: "" },
          { title: "link 2", url: "" },
        ],
      },
    ],
  },
];

const flashcardsData = [
  {
    q: "chi è l’autore delle gymnopédies?",
    a: "erik satie",
    level: "base",
  },
  {
    q: "qual è l’indicazione di carattere della gymnopédie n. 1?",
    a: "lent et douloureux",
    level: "base",
  },
  {
    q: "in quale metro è scritto il n. 1?",
    a: "3/4",
    level: "base",
  },
  {
    q: "qual è una difficoltà principale del brano?",
    a: "gestione del suono e del pedale (trasparenza delle voci)",
    level: "intermedio",
  },
  {
    q: "cosa significa evitare un effetto ‘valzeristico’?",
    a: "mantenere la pulsazione ternaria senza accenti da danza",
    level: "intermedio",
  },
  {
    q: "con quale poema fu pubblicata la prima gymnopédie?",
    a: "con il poema Les Antiques di Contamine de Latour",
    level: "base",
  },
  {
    q: "chi orchestrò le gymnopédies e che numerazione cambiò?",
    a: "claude debussy le orchestrò e invertì il numero 1 con il 3",
    level: "intermedio",
  },
];

const sourcesData = [
  {
    group: "spartito e dominio pubblico",
    items: [
      {
        title: "imslp – 3 gymnopédies (pdf)",
        url: "https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie,_Erik)",
        note: "spartito e riferimenti editoriali",
      },
      {
        title: "musopen – gymnopédies (audio e spartiti)",
        url: "https://musopen.org/music/8010-3-gymnopedies/",
        note: "pagina con materiali pubblici (verifica disponibilità nel tempo)",
      },
    ],
  },
  {
    group: "contesto e cronologia",
    items: [
      {
        title: "wikipedia – gymnopédies",
        url: "https://en.wikipedia.org/wiki/Gymnop%C3%A9dies",
        note: "panoramica rapida (usare solo come orientamento)",
      },
      {
        title: "hyperion – note discografiche (debussy orchestration)",
        url: "https://www.hyperion-records.co.uk/dw.asp?dc=W408_GBAJY8936508",
        note: "approfondimento su orchestrazioni e ricezione",
      },
    ],
  },
];

const contextHighlights = [
  {
    title: "Sottrazione contro il wagnerismo",
    text: "Nel 1888 Wagner dominava l’Europa. Satie oppone un’armonia che crea vuoti, oscillazioni di settime maggiori e un futuro sospeso invece di tensioni drammatiche.",
    tag: "1888",
  },
  {
    title: "Montmartre e simbolismo",
    text: "Il Chat Noir, il Simbolismo e l’amicizia con poeti come Contamine de Latour invitano Satie a pensare a una musica che sia descrizione sensoriale, non narrazione.",
    tag: "Montmartre",
  },
  {
    title: "Esoterismo e ritualità",
    text: "L’Ordine della Rosa-Croce e la «Chiesa Metropolitana» sono esercizi di ermeticità, come la musica delle Gymnopédies: silenziosa, ieratica, priva di eccessi.",
    tag: "Rosa-Croce",
  },
  {
    title: "Les Antiques e la gymnopaedia",
    text: "La prima pubblicazione (agosto 1888) accoppiava la Gymnopédie n. 1 ai versi di Contamine de Latour (Les Antiques) per accendere immagini di luce, sarabande dorate e rituali greci.",
    tag: "Les Antiques",
  },
];

const contextTimeline = [
  {
    label: "1888",
    title: "Belle Époque e fermento scientifico",
    detail:
      "La Torre Eiffel si costruisce, Pasteur e Hertz rompono paradigmi, Kodak fotografa la vita quotidiana: la Gymnopédie nasce in uno spazio in cui arte e tecnologia coesistono.",
  },
  {
    label: "1888",
    title: "Montmartre e nuove forme",
    detail:
      "Satie lavora al Chat Noir, frequenta scrittori, assiste a concerti simbolisti e trova nel titolo gymnopaedia un collegamento con l’antichità visiva.",
  },
  {
    label: "1888",
    title: "Pubblicazione con Les Antiques",
    detail:
      "La prima Gymnopédie appare su La Musique des familles accanto al poema «Les Antiques»: un binomio che lega l’ancestrale (gymnopaedia) al nuovo minimalismo francese.",
  },
  {
    label: "1891-1893",
    title: "Rituali e comunità",
    detail:
      "L’ingresso nella Rosa-Croce e la fondazione della propria chiesa ribadiscono la scelta di una pratica musicale distante dagli accademismi ufficiali.",
  },
  {
    label: "1896-1897",
    title: "Debussy e la circolazione orchestrale",
    detail:
      "Debussy orchestra la Prima e la Terza (con numerazione invertita) per la Société Nationale, svelando a Parigi quanto la trasparenza di Satie potesse viaggiare oltre il pianoforte.",
  },
];

const biographyHighlights = [
  {
    title: "Dieta Bianca",
    text: "Nelle Memorie di un Amnesico (1912) elenca cibi bianchi (uova, ossa grattugiate, pollo in acqua bianca) per costruire un manifesto della purezza e del silenzio.",
    note: "falsa autobiografia, vera indicazione estetica",
  },
  {
    title: "Signore di velluto ad Arcueil",
    text: "Per 27 anni vive in una stanza chiamata «l’Armadio», indossa abiti uguali e circonda due pianoforti uno sull’altro, accumulando ombrelli e spartiti nascosti.",
    note: "1898-1925",
  },
  {
    title: "Resistenza accademica",
    text: "Espulso a 16 anni dal Conservatorio, giudicato pigro ma capace di capire Bach, Chopin e Schumann senza inseguire la tecnica lisztiana.",
    note: "1879-1887",
  },
  {
    title: "Letture e ascolti fuori dal coro",
    text: "Tra il 1882 e il 1885 divorava Voltaire, Dumas, Andersen, odia la grand opéra e preferisce concerti sacri, seminando la base per un’arte pragmatica e anti-drammatica.",
    note: "letture e discussioni con famiglie e amici",
  },
];

const biographyTimeline = [
  {
    year: "1866",
    title: "Nascita a Honfleur",
    detail:
      "Eric Alfred Leslie Satie nasce in Normandia da madre scozzese e padre francese e adotta presto la grafia «Erik» per rimarcare le sue radici vichinghe.",
  },
  {
    year: "1870-1875",
    title: "Infanzia tra Parigi e zii eccentrici",
    detail:
      "La famiglia si trasferisce a Parigi, la madre muore, lo zio «Sea-Bird» lo avvicina al teatro e Satie inizia a studiare canto gregoriano con l’organista Vinot.",
  },
  {
    year: "1879-1887",
    title: "Conservatorio e disillusione",
    detail:
      "Bocciato come pigro, espulso e riammesso, mal sopporta l’accademia e impara soprattutto osservando concerti e leggendo i classici.",
  },
  {
    year: "1887-1888",
    title: "Montmartre e le Gymnopédies",
    detail:
      "Lavora al Chat Noir, stringe amicizie con simbolisti e compone le tre Gymnopédies, pubblicate nel 1888 con titoli ispirati all’antichità.",
  },
  {
    year: "1891-1893",
    title: "Rosa-Croce, chiesa e amori",
    detail:
      "Diventa maestro di cappella dell’Ordine della Rosa-Croce, rompe con Péladan e fonda la sua chiesa: vive anche un breve amore con Suzanne Valadon.",
  },
  {
    year: "1896-1897",
    title: "Orchestrazioni e nuova visibilità",
    detail:
      "Debussy orchestra la Prima e la Terza Gymnopédie e il gesto spinge Satie sotto i riflettori di Parigi, confermando che la sua musica può abitare anche il colore orchestrale.",
  },
  {
    year: "1917",
    title: "Parade, surrealismo e scandalo",
    detail:
      "Con Picasso e Cocteau, Satie firma Parade, balletto che inventa nuovi linguaggi scenici e anticipa il surrealismo, generando scandalo ma anche nuove alleanze.",
  },
  {
    year: "1925",
    title: "Morte e influenza postuma",
    detail:
      "Muore a 59 anni di cirrosi, lasciando una borsa di spartiti nascosti che John Cage, Brian Eno e la musica ambient celebreranno.",
  },
];

const legacyHighlights = [
  {
    title: "Debussy e l’orchestrazione sospesa",
    text: "Nel 1896 Debussy orchestra la Prima e la Terza Gymnopédie (numerazione invertita) con oboe, archi con sordina, arpe e quattro corni per mantenere la trasparenza.",
    note: "prima esecuzione 20 febbraio 1897",
  },
  {
    title: "Cinema e media",
    text: "Fuoco fatuo, Another Woman, I Tenenbaum e Man on Wire usano la Gymnopédie per accompagnare malinconia, ponderatezza e sospensione.",
    note: "modulo usato per evocare riflessione",
  },
  {
    title: "Pop, ambient e lo-fi",
    text: "Blood, Sweat & Tears, Janet Jackson e PinkPantheress riarmonizzano o campionano la melodia, mentre Brian Eno e i minimalisti espandono l’idea di spazio sonoro.",
    note: "campionamenti e riferimenti nei decenni successivi",
  },
];

const legacyMedia = [
  {
    label: "Film e documentari",
    items: [
      "Fuoco fatuo (Le feu follet, 1963)",
      "Another Woman (1988)",
      "I Tenenbaum (2001)",
      "Man on Wire (2008)",
    ],
  },
  {
    label: "Serie e pubblicità",
    items: [
      "Spot O2 «Be More Dog» (2013)",
      "Serie 22.11.63",
      "About Schmidt (2002)",
      "Hugo Cabret (2011)",
    ],
  },
  {
    label: "Videogiochi e cultura pop",
    items: [
      "Mother 3 (2006) – «Leder's Gymnopedie»",
      "The Legend of Zelda: Ocarina of Time – tema ispirato alla sospensione tonale",
    ],
  },
];

const legacyInfluences = [
  {
    title: "John Cage e il minimalismo",
    text: "Cage lo definì indispensabile e portò in scena Vexations (840 ripetizioni), ribadendo il distacco dalla narrazione romantica.",
  },
  {
    title: "Brian Eno e l’ambient d’arredamento",
    text: "Eno riprende la Musique d’ameublement e pubblica Ambient 1: Music for Airports, sottolineando quanto la musica possa convivere con il quotidiano.",
  },
  {
    title: "Jazz, pop e lo-fi contemporaneo",
    text: "La struttura modale e l’ambiguità armonica motivano riarrangiamenti jazz-rock, hit pop e sonorità lo-fi, dimostrando la versatilità del brano.",
  },
];

const ContestoSection = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
        <Globe className="w-5 h-5 text-blue-400" />
        contesto storico e culturale
      </h2>
      <p className="text-sm text-slate-300 mt-2">
        Le Gymnopédies nascono nella Parigi della Belle Époque, per mano di un artista che rifiuta la
        grande orchestra wagneriana e sceglie le stanze del cabaret, dell’esoterismo e del Simbolismo.
      </p>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {contextHighlights.map((item) => (
          <div key={item.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="text-xs text-slate-400 uppercase tracking-wide">{item.tag}</div>
            <div className="text-sm text-slate-100 font-semibold mt-1">{item.title}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-950/30 border border-slate-700 rounded-2xl p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">fatti salienti</div>
        <div className="mt-3 space-y-3">
          {contextTimeline.map((entry) => (
            <div key={entry.title} className="flex gap-3 bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="text-sm font-semibold text-blue-300">{entry.label}</div>
              <div className="min-w-0">
                <div className="text-sm text-slate-100 font-semibold">{entry.title}</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{entry.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BiographySection = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
        <History className="w-5 h-5 text-blue-400" />
        biografia e sensibilità
      </h2>
      <p className="text-sm text-slate-300 mt-2">
        La vita di Satie è fatta di rifiuti accademici, amicizie bohémien, ritualità esoteriche e un
        approccio pratico che trova nelle Gymnopédies il suo manifesto di sobrietà.
      </p>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {biographyHighlights.map((item) => (
          <div key={item.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-100 font-semibold">{item.title}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.text}</p>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">{item.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-950/30 border border-slate-700 rounded-2xl p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">cronologia selezionata</div>
        <div className="mt-3 space-y-3">
          {biographyTimeline.map((item) => (
            <div key={item.title} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-blue-300 font-semibold">{item.year}</div>
              <div className="text-sm text-slate-100 font-semibold mt-1">{item.title}</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LegacySection = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-blue-400" />
        ricezione e influenza
      </h2>
      <p className="text-sm text-slate-300 mt-2">
        La Gymnopédie n. 1 continua a essere un punto di riferimento per orchestre, cinema, ambient music e
        culture pop: il suo equilibrio riesce a convivere con media diversi senza perdere il rigore di partenza.
      </p>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {legacyHighlights.map((item) => (
          <div key={item.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
              <Sparkles className="w-4 h-4 text-blue-400" />
              {item.title}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.text}</p>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">{item.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {legacyMedia.map((entry) => (
          <div key={entry.label} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
              <Film className="w-4 h-4 text-blue-400" />
              {entry.label}
            </div>
            <ul className="mt-3 space-y-1 text-xs text-slate-300">
              {entry.items.map((it) => (
                <li key={it} className="leading-relaxed">
                  • {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {legacyInfluences.map((entry) => (
          <div key={entry.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-100 font-semibold">{entry.title}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* -----------------------------
   sezioni
----------------------------- */

const IntroduzioneSection = ({ onNavigateToFonti }) => {
  const [openCuriosita, setOpenCuriosita] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = (title, content) => setModal({ title, content });
  const closeModal = () => setModal(null);

  const handleFontiNavigation = () => {
    closeModal();
    if (onNavigateToFonti) onNavigateToFonti();
  };

  const LifeModal = () => (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-slate-700">
        <img
          src="/images/satie-portrait-hero.jpg"
          alt="Erik Satie - ritratto"
          className="w-full h-56 object-cover"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { k: "nascita", v: "17 maggio 1866, Honfleur" },
          { k: "morte", v: "1 luglio 1925" },
          { k: "ambiente", v: "parigi, montmartre; poi arcueil" },
          { k: "profilo", v: "scrittura essenziale, anti-virtuosistica" },
        ].map((x, i) => (
          <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">{x.k}</div>
            <div className="text-sm text-slate-100 font-semibold">{x.v}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-3">
        <p className="text-sm text-slate-200">
          per link e riferimenti approfonditi rimanda alla sezione{" "}
          <button
            type="button"
            className="text-blue-300 underline decoration-dotted hover:text-blue-200"
            onClick={handleFontiNavigation}
          >
            fonti
          </button>
          .
        </p>
      </div>
    </div>
  );

  const DebussyModal = () => (
      <div className="space-y-3 text-sm text-slate-200 leading-relaxed">
        <p>
          è utile per lo studio seguire la traiettoria di ricezione: il brano nasce come pagina
          pianistica essenziale, poi entra in circuiti più ampi anche grazie a orchestrazioni e
          programmazioni.
        </p>
      <p>
        per dati puntuali e link di appoggio, rimanda a{" "}
        <button
          type="button"
          className="text-blue-300 underline decoration-dotted hover:text-blue-200"
          onClick={handleFontiNavigation}
        >
          fonti
        </button>
        .
      </p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Modal isOpen={!!modal} onClose={closeModal} title={modal?.title || ""}>
        {modal?.content}
      </Modal>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl p-7 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 tracking-wide text-center">
          gymnopédie n. 1
        </h2>
        <p className="text-sm text-slate-300 text-center mt-2">
          indicazione: <span className="font-semibold text-slate-100">lent et douloureux</span>
        </p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <img
              src="/images/gymnopedie-score.jpg"
              alt="gymnopédie n. 1 - spartito"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
            <p>
              gymnopédie n. 1 è una pagina breve costruita con pochi elementi ripetuti. il passo è
              regolare (3/4) e la tensione nasce da tinta, risonanza e distanza tra le voci.
            </p>
            <p>
              il titolo{" "}
              <Tooltip text="richiamo alla gymnopaedia (danza dell’antica grecia). in satie il riferimento resta intenzionalmente ambiguo.">
                gymnopédie
              </Tooltip>{" "}
              non “spiega”: aggiunge un livello di immaginario. l’indicazione{" "}
              <Tooltip text="tempo e carattere: lento e doloroso. guida il tipo di suono e il respiro del fraseggio.">
                lent et douloureux
              </Tooltip>{" "}
              delimita l’atteggiamento esecutivo.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-100 font-semibold">
                  <User className="w-4 h-4 text-blue-400" />
                  satie in breve
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  coordinate biografiche essenziali per contesto e studio.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                  onClick={() => openModal("erik satie: dati essenziali", <LifeModal />)}
                >
                  apri <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-100 font-semibold">
                  <Library className="w-4 h-4 text-blue-400" />
                  ricezione
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  utile per spiegare come una pagina minimale diventa repertorio globale.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                  onClick={() => openModal("debussy e la circolazione", <DebussyModal />)}
                >
                  apri <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-slate-950/30 border border-slate-700 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenCuriosita((v) => !v)}
            className={cx(
              "w-full px-5 py-4 flex items-center justify-between text-left",
              openCuriosita ? "bg-slate-900" : "bg-transparent hover:bg-slate-900/60"
            )}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-slate-100 font-semibold">curiosità operative per lo studio</div>
                <div className="text-xs text-slate-400">titolo, tempo, pedale, ricezione</div>
              </div>
            </div>
            <ChevronDown className={cx("w-5 h-5 text-slate-200 transition-transform", openCuriosita && "rotate-180")} />
          </button>

          {openCuriosita && (
            <div className="px-5 pb-5 pt-3 space-y-3 text-sm text-slate-200 leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "il titolo non chiude il senso",
                    text: "‘gymnopédie’ funziona come cornice: suggerisce un altrove senza definire una storia univoca.",
                  },
                  {
                    label: "il tempo è una scelta di suono",
                    text: "lent et douloureux implica un suono controllato e un respiro sobrio: poco gesto, molta qualità timbrica.",
                  },
                  {
                    label: "pedale come filtro",
                    text: "pedale misurato, cambi frequenti. l’obiettivo è risonanza senza perdita di disegno.",
                  },
                  {
                    label: "ricezione",
                    text: "pagina breve, facilmente trascrivibile e riusabile: è un motivo della sua diffusione in media e arrangiamenti.",
                  },
                ].map((b, i) => (
                  <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-lg p-4">
                    <div className="text-slate-100 font-semibold">{b.label}</div>
                    <div className="text-xs text-slate-300 mt-2">{b.text}</div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-100 font-semibold">
                  <FileText className="w-4 h-4 text-blue-400" />
                  suggerimento pratico
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  se ti serve una frase breve per chiudere il blocco: “qui la difficoltà non è la quantità di note,
                  ma la qualità del tempo e della risonanza”.
                </p>
              </div>

              <div className="bg-slate-950/40 border border-slate-700 rounded-lg p-4">
                <p className="text-sm text-slate-200">
                  per link e documenti:{" "}
                  <button
                    type="button"
                    className="text-blue-300 underline decoration-dotted hover:text-blue-200"
                    onClick={handleFontiNavigation}
                  >
                    fonti
                  </button>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AnalysisSection = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Brain className="w-5 h-5 text-blue-400" />
          analisi operativa
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          obiettivo: trasformare informazioni in scelte esecutive (tempo, suono, pedale).
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

      <PdfScoreViewer pdfUrl="/spartito-gymnopedie-1.pdf" title="spartito: gymnopédie n. 1" />
    </div>
  );
};

const InterpretersSection = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Music className="w-5 h-5 text-blue-400" />
          interpreti e ascolti
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          struttura pronta: incolla link e note. nessun link è obbligatorio.
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
                            <span className="text-xs text-slate-500">url vuoto</span>
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

const GlossarySection = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Library className="w-5 h-5 text-blue-400" />
          glossario
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          definizioni brevi per uso in app (tooltip, schede, spiegazioni).
        </p>

        <div className="mt-5 space-y-5">
          {glossaryData.map((cat, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
              <div className="text-slate-100 font-semibold">{cat.category}</div>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {cat.items.map((it, j) => (
                  <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                    <div className="text-sm text-slate-100 font-semibold">{it.term}</div>
                    <div className="text-xs text-slate-300 mt-2 leading-relaxed">{it.definition}</div>
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
          impara
        </h2>
        <p className="text-sm text-slate-300 mt-2">flashcard essenziali per fissare i dati.</p>

        <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              carta {idx + 1} / {flashcardsData.length} · livello:{" "}
              <span className="text-slate-200 font-semibold">{card.level}</span>
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
            <div className="text-slate-100 font-semibold">domanda</div>
            <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.q}</div>

            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              {show ? "nascondi risposta" : "mostra risposta"}
              <ChevronDown className={cx("w-4 h-4 transition-transform", show && "rotate-180")} />
            </button>

            {show && (
              <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                <div className="text-slate-100 font-semibold">risposta</div>
                <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.a}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FontiSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          fonti
        </h2>
        <p className="text-sm text-slate-300 mt-2">link per spartito, audio e note di contesto.</p>

        <div className="mt-6 space-y-4">
          {sourcesData.map((g, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen((v) => (v === i ? null : i))}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <Library className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-slate-100 font-semibold">{g.group}</div>
                    <div className="text-xs text-slate-400">{g.items.length} elementi</div>
                  </div>
                </div>
                <ChevronDown className={cx("w-5 h-5 text-slate-200 transition-transform", open === i && "rotate-180")} />
              </button>

              {open === i && (
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

/* -----------------------------
   app
----------------------------- */

export default function App() {
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
    // blocco semplice per evitare tab non validi
    if (!TABS.includes(activeTab)) setActiveTab("introduzione");
  }, [activeTab]);

  const tabMeta = {
    introduzione: { label: "introduzione", icon: BookOpen },
    contesto: { label: "contesto", icon: Globe },
    biografia: { label: "biografia", icon: History },
    analysis: { label: "analisi", icon: Brain },
    interpreters: { label: "interpreti", icon: Music },
    glossary: { label: "glossario", icon: Library },
    impara: { label: "impara", icon: GraduationCap },
    eredita: { label: "eredità", icon: Sparkles },
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
                  gymnopédie n. 1
                </div>
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap">app.jsx</div>
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
          {activeTab === "contesto" && <ContestoSection />}
          {activeTab === "biografia" && <BiographySection />}
          {activeTab === "analysis" && <AnalysisSection />}
          {activeTab === "interpreters" && <InterpretersSection />}
          {activeTab === "glossary" && <GlossarySection />}
          {activeTab === "impara" && <ImparaSection />}
          {activeTab === "eredita" && <LegacySection />}
          {activeTab === "fonti" && <FontiSection />}
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
