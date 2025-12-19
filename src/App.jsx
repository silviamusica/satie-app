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
  Home,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configurazione worker per PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Tab principali - Nuova struttura in 7 sezioni
const TABS = ["benvenuto", "parigi1888", "satie", "brano", "eredita", "impara", "fonti"];

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
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[260px] rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
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

// Componente PDF Score Viewer con scroll continuo
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
            File PDF non trovato. Aggiungi il file <code className="bg-slate-700 px-2 py-1 rounded text-blue-400">spartito-primo-movimento.pdf</code> nella cartella <code className="bg-slate-700 px-2 py-1 rounded text-blue-400">public/</code>
          </p>
          <p className="text-slate-400 text-sm">
            Il file deve essere nella cartella <code className="bg-slate-700 px-1 rounded">beethoven-app/public/</code>
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
          "Neologismo francese dal greco Γυμνοπαιδίαι (Gymnopaedia), festività spartana annuale. 'Gymnos' significa 'nudo' o 'disarmato': giovani uomini danzavano nudi eseguendo esercizi ginnici e canti corali. Satie scelse questo titolo influenzato da: 1) il poema 'Les Antiques' di Contamine de Latour; 2) 'Salammbô' di Flaubert; 3) i dipinti simbolisti di Puvis de Chavannes, in particolare 'Jeunes filles au bord de la mer' (1879). La prima Gymnopédie fu originariamente intitolata 'Danse antique'.",
      },
      {
        term: "Lent et douloureux",
        definition:
          "Indicazione di tempo e carattere della n. 1: lento e doloroso. Insolita perché Satie usa il francese invece dei termini italiani tradizionali (Adagio, Andante), aggiungendo una dimensione emotiva. Le tre Gymnopédies hanno indicazioni diverse: n.1 'Lent et douloureux' (Re maggiore), n.2 'Lent et triste' (Do maggiore), n.3 'Lent et grave' (La minore). Il critico Constant Lambert le paragonò a 'camminare attorno a una scultura, osservandola da angolazioni diverse'.",
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
          "Quartiere parigino dei café-cabaret (Le Chat Noir, L'Auberge du Clou) dove Satie lavorò come pianista a 21 anni e trovò ispirazione per il suo stile sobrio. Ambiente frequentato da simbolisti e poeti come Contamine de Latour.",
      },
      {
        term: "Debussy",
        definition:
          "Claude Debussy orchestrò le Gymnopédies n. 1 e n. 3 nel 1896-1897 (invertendo la numerazione), favorendone la circolazione concertistica. Prima esecuzione: 20 febbraio 1897, Société Nationale.",
      },
      {
        term: "Conservatorio di Parigi",
        definition:
          "Istituzione frequentata da Satie in due periodi (1879–1882 e 1885–1887) con risultati disastrosi. Giudicato 'dotato ma indolente', 'il più pigro', 'privo di valore'. Espulso nel 1882 dopo un'esecuzione mediocre di Beethoven.",
      },
      {
        term: "Contamine de Latour",
        definition:
          "J. P. Contamine de Latour, poeta simbolista amico di Satie. La sua poesia Les Antiques accompagnò la prima pubblicazione della Gymnopédie n. 1 nell'estate 1888 sulla rivista La Musique des familles.",
      },
      {
        term: "Arcueil",
        definition:
          "Luogo in cui Satie si ritirò negli ultimi anni. La sua stanza chiamata 'l'Armadio', trovata alla sua morte nel 1925, testimonia la vita povera e disciplinata dell'autore. Visse lì per 27 anni.",
      },
      {
        term: "Le Chat Noir",
        definition:
          "Celebre café-cabaret di Montmartre fondato nel 1881 da Rodolphe Salis. Satie vi lavorò come secondo pianista negli anni 1887-1888. Ambiente bohémien che ospitava artisti, poeti simbolisti e musicisti (Debussy, Verlaine, Toulouse-Lautrec). Luogo di sperimentazione dove l'arte 'alta' si mescolava con la cultura popolare.",
      },
      {
        term: "Belle Époque",
        definition:
          "Periodo compreso tra fine Ottocento e l'inizio della Prima guerra mondiale, caratterizzato da ottimismo tecnologico, salotti artistici e fermenti culturali parigini. Qui nasce il contesto di Satie e delle Gymnopédies.",
      },
      {
        term: "Bohémien",
        definition:
          "Artista o intellettuale che vive al margine delle regole sociali, predilige libertà creativa, movimento e rifiuto delle istituzioni: uno spirito che alimenta Chat Noir e Satie stesso.",
      },
      {
        term: "Suzanne Valadon",
        definition:
          "Pittrice francese (1865-1938). Ebbe nel 1893 un breve ma intenso amore con Satie, l'unico documentato della sua vita. Quando lei lo lasciò, Satie ne rimase segnato profondamente. Fu madre del pittore Maurice Utrillo.",
      },
      {
        term: "Dieta Bianca",
        definition:
          "Nelle Memorie di un Amnesico (1912) Satie descrive una dieta surreale: 'uova, ossa grattugiate, grasso di animali morti, vitello, pollo cotto in acqua bianca, frutta ammuffita, pasta, formaggio bianco'. Provocazione artistica che rivela l'ossessione per il bianco come simbolo di purezza, silenzio e assenza di 'colore' emotivo. Le Gymnopédies sono 'musica bianca': prive di ornamenti, trasparenti, essenziali.",
      },
      {
        term: "Rosa-Croce",
        definition:
          "Ordine mistico-esoterico (Rosa-Croce Cattolica del Tempio e del Graal) fondato da Joséphin Péladan (Sâr Mérodack). Satie ne divenne compositore ufficiale (1891) ma ruppe con Péladan nel 1892, irritato dalla sua devozione wagneriana. Fondò poi la propria 'Chiesa Metropolitana d'Arte di Gesù Conduttore', di cui fu l'unico membro.",
      },
      {
        term: "Esoterik Satie",
        definition:
          "Soprannome affettuoso dato a Satie dallo scrittore Alphonse Allais a Montmartre negli anni '90 dell'Ottocento. Il gioco di parole univa 'Erik' con 'esoterico', riferendosi ai suoi interessi mistici (Rosa-Croce, esoterismo) e al suo aspetto caratteristico: cappello a cilindro, lunghi capelli, mantello nero. Il soprannome cattura perfettamente la doppia natura di Satie: bohémien ironico e ricercatore mistico, pianista di cabaret e compositore di musica 'metafisica'.",
      },
      {
        term: "L'ossessione per il numero 3",
        definition:
          "Satie aveva un'ossessione mistica per il numero tre, probabilmente derivata dal simbolismo trinitario dei Rosa-Croce. Non è un caso che compose TRE Gymnopédies, TRE Sarabandes (1887), TRE Gnossiennes iniziali (1890). Anche i titoli spesso richiamano trinità: 'Trois morceaux en forme de poire' (Tre pezzi a forma di pera, 1903). Questa ossessione numerologica rivela l'influenza dell'esoterismo sulla sua estetica compositiva.",
      },
      {
        term: "Maurice Ravel e la riscoperta (1911)",
        definition:
          "Oltre a Debussy (che orchestrò la n.1 e n.3 nel 1897), anche Maurice Ravel fu fondamentale per la fama delle Gymnopédies. Nel 1911, Ravel eseguì pubblicamente la Gymnopédie n.3, contribuendo alla 'riscoperta' di Satie dopo anni di relativo oblio. Questo evento segnò l'inizio del riconoscimento di Satie presso i giovani compositori (Groupe des Six), che lo acclamarono come 'maestro' e precursore dell'anti-romanticismo.",
      },
      {
        term: "Puvis de Chavannes",
        definition:
          "Pierre Puvis de Chavannes (1824-1898), pittore simbolista francese. I suoi dipinti, in particolare 'Jeunes filles au bord de la mer' (1879), potrebbero aver ispirato Satie per le Gymnopédies. Satie aspirava a comporre musica 'decorativa' come gli affreschi del pittore.",
      },
      {
        term: "Forme ternarie (ABA')",
        definition:
          "Struttura musicale dove una sezione iniziale (A) è seguita da una sezione contrastante (B) e poi dalla ripresa della prima (A). La Gymnopédie n.1 segue questa forma modificata: Introduzione (batt. 1-4), Sezione A (batt. 5-15), Sezione A' estesa (batt. 16-39), Ripresa A, Coda. Satie usa questa forma ma la svuota di contrasto drammatico.",
      },
      {
        term: "Settima maggiore",
        definition:
          "Accordo formato da quattro note invece di tre. La quarta nota aggiunge 'colore' e tensione. Di solito un accordo di settima chiede di 'risolvere' su un altro accordo. Nella Gymnopédie n.1, Satie alterna Sol maggiore con settima e Re maggiore con settima senza mai risolvere, creando un effetto fluttuante privo del tipico movimento armonico. È come dondolarsi su un'altalena che non tocca mai terra.",
      },
      {
        term: "Il segreto del Fa# (collante armonico)",
        definition:
          "La nota Fa# è il 'collante' armonico che rende la Gymnopédie n.1 così fluida e sospesa. Questa singola nota appartiene CONTEMPORANEAMENTE sia all'accordo di Sol maggiore settima (Sol-Si-Re-Fa#) sia all'accordo di Re maggiore settima (Re-Fa#-La-Do#). Il Fa# funge da ponte armonico tra i due accordi, permettendo all'altalena armonica di oscillare senza mai toccare terra, creando quella sensazione di galleggiamento senza tempo che caratterizza il brano.",
      },
      {
        term: "Gnossiennes",
        definition:
          "Altro ciclo pianistico di Satie (1889-1897), spesso confuso con le Gymnopédies ma profondamente diverso. Differenze principali: le Gnossiennes sono scritte senza stanghette di battuta (metro 'libero'), hanno atmosfere più arcane ed esotiche (ispirate alla gnosi e all'esoterismo), contengono indicazioni comportamentali bizzarre ('con stupore', 'non essere orgogliosi'). Le Gymnopédies mantengono invece metro regolare (3/4), atmosfera dolce e malinconica, e un'eleganza austera e rituale. Lambert disse: le Gymnopédies sono come 'camminare attorno a una scultura', le Gnossiennes come 'entrare in un tempio sconosciuto'.",
      },
      {
        term: "Musique d'ameublement",
        definition:
          "Musica d'arredamento: concetto sviluppato da Satie nel 1917. Composizioni pensate per non essere ascoltate attentamente, ma per far parte dell'ambiente. Satie scrisse: 'Immagino una musica melodiosa che attenui il rumore di coltelli e forchette a cena, senza dominarli, senza imporsi'. Precorre la musica ambient di Brian Eno (Ambient 1: Music for Airports, 1978) che definì l'ambient come qualcosa che 'deve poter essere ignorata quanto ascoltata'.",
      },
      {
        term: "John Cage",
        definition:
          "Compositore americano (1912-1992), grande riscopritore di Satie nel dopoguerra. Trovò in Satie un precursore: rifiuto della narrazione musicale, interesse per silenzio e spazio, musica come processo. 'Satie è indispensabile' (John Cage). Nel 1963 organizzò la prima esecuzione integrale di Vexations (tema ripetuto 840 volte, circa 18 ore), anticipando il minimalismo.",
      },
      {
        term: "Minimalismo",
        definition:
          "Movimento musicale nato negli anni '60 (Steve Reich, Philip Glass, Terry Riley) che riconosce Satie come antenato. Caratteristiche: ripetizione di pattern, armonia statica o lentamente cangiante, rifiuto del climax drammatico, economia di mezzi. Le Gymnopédies anticipano tutte queste caratteristiche.",
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

// Flashcards: domande e risposte per memorizzare fatti chiave
const flashcardsData = [

  {
    q: "Quando fu completata la Gymnopédie n. 1?",
    a: "1888",
    level: "base",
    details: "Le tre pagine furono completate entro la primavera del 1888 e pubblicate separatamente negli anni seguenti. Satie aveva 21 anni e lavorava come pianista cabaret a Montmartre.",
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
    details: "Debussy orchestrò le Gymnopédies n. 1 e n. 3 dopo averle sentite suonate da Satie nel 1896; l'esecuzione avvenne nel febbraio 1897. Invertì la numerazione.",
  },
  {
    q: "Dove lavorava Satie quando compose le Gymnopédies?",
    a: "Come pianista cabaret a Montmartre",
    level: "intermedio",
    details: "Satie lavorava in locali come Le Chat Noir e L'Auberge du Clou, frequentati da simbolisti e poeti. Aveva 21 anni e aveva appena abbandonato il Conservatorio.",
  },
  {
    q: "Perché Satie venne espulso dal Conservatorio di Parigi?",
    a: "Per scarsi risultati e mancanza di impegno",
    level: "intermedio",
    details: "Nel 1882, a 16 anni, venne espulso dopo un'esecuzione mediocre del Finale della Sonata Op. 26 di Beethoven. Fu giudicato 'dotato ma indolente', 'il più pigro del Conservatorio', 'privo di valore'.",
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
    details: "Il termine indica una festa spartana con danze rituali; Satie lo usa come suggestione poetica senza spiegarne l'origine. Si ispirò anche ai modi greci e a romanzi di Flaubert.",
  },
  {
    q: "Con quale poeta collaborò Satie per la prima pubblicazione?",
    a: "J. P. Contamine de Latour",
    level: "avanzato",
    details: "La Gymnopédie n. 1 fu pubblicata nell'estate 1888 sulla rivista La Musique des familles accompagnata da un estratto della poesia Les Antiques di Contamine de Latour, amico simbolista di Satie.",
  },
  {
    q: "Chi fu Suzanne Valadon per Satie?",
    a: "L'unico amore documentato della sua vita",
    level: "avanzato",
    details: "Pittrice francese. Ebbero un breve ma intenso amore nel 1893. Quando lei lo lasciò, Satie ne rimase segnato profondamente. Fu madre del pittore Maurice Utrillo.",
  },
  {
    q: "Cosa trovarono gli amici nella stanza di Satie dopo la sua morte?",
    a: "Due pianoforti sovrapposti, oltre 100 ombrelli, spartiti nascosti",
    level: "avanzato",
    details: "Nella stanza chiamata 'l'Armadio' ad Arcueil trovarono: due pianoforti a coda uno sopra l'altro, oltre 100 ombrelli, sette abiti di velluto identici, spartiti inediti nascosti, collezioni di oggetti bizzarri. Nessuno era entrato per 27 anni.",
  },
  {
    q: "Cos'era la 'dieta bianca' di Satie?",
    a: "Una provocazione artistica descritta nelle Memorie di un Amnesico",
    level: "avanzato",
    details: "Nel 1912 Satie descrisse una dieta surreale di soli cibi bianchi (uova, ossa grattugiate, pollo in acqua bianca, ecc.). Era una provocazione che rivelava l'ossessione per il bianco come simbolo di purezza e silenzio. Le Gymnopédies sono 'musica bianca': prive di ornamenti, trasparenti, essenziali.",
  },
  {
    q: "Quando furono composte le tre Gymnopédies?",
    a: "Tra febbraio e aprile 1888",
    level: "intermedio",
    details: "Satie le completò entro il 2 aprile 1888. Aveva 21 anni, era appena uscito dal Conservatorio e lavorava come pianista al Chat Noir. Un aneddoto racconta che nel dicembre 1887, un amico presentò Satie a Rodolphe Salis (proprietario del Chat Noir) annunciandolo come 'Erik Satie, gymnopediste'. Salis, colto di sorpresa, commentò sarcastico: 'Davvero una bella professione!'. Satie si sentì quindi in dovere di produrre effettivamente queste composizioni due mesi dopo.",
  },
  {
    q: "Qual era il titolo originale della prima Gymnopédie?",
    a: "Danse antique",
    level: "avanzato",
    details: "Fu pubblicata il 18 agosto 1888 nel supplemento di 'La Musique des familles' (rivista diretta dal padre Alfred Satie) con il titolo 'Danse antique', dedicata a Jeanne de Bret. La terza fu pubblicata nel novembre 1888, la seconda solo nel 1895. La serie completa uscì nel 1898.",
  },
  {
    q: "Chi fu Debussy a orchestrare le Gymnopédies e perché?",
    a: "Nel 1896, per aiutare l'amico Satie",
    level: "avanzato",
    details: "Nel 1896 Satie eseguì le Gymnopédies a casa del direttore Gustave Doret. Debussy ne fu colpito e le orchestrò per aiutare Satie, che era in difficoltà finanziarie. Fu l'unica volta che Debussy orchestrò l'opera di un altro compositore. Orchestrò solo la n.1 e n.3 (invertendo la numerazione), ritenendo che la n.2 'non si prestasse all'orchestrazione'. Prima esecuzione: 20 febbraio 1897.",
  },
  {
    q: "Qual è il legame tra Satie e la musica ambient?",
    a: "Satie anticipò l'ambient con la 'Musique d'ameublement'",
    level: "avanzato",
    details: "Nel 1917 Satie concepì la 'musica d'arredamento': composizioni pensate per non essere ascoltate attentamente ma per far parte dell'ambiente. Brian Eno riconobbe il debito nel 1978 con 'Ambient 1: Music for Airports', definendo l'ambient come qualcosa che 'deve poter essere ignorata quanto ascoltata'. Le Gymnopédies condividono questa estetica.",
  },
  {
    q: "Chi fu John Cage e quale ruolo ebbe per Satie?",
    a: "Il grande riscopritore di Satie nel dopoguerra",
    level: "avanzato",
    details: "Compositore americano (1912-1992). Trovò in Satie un precursore: rifiuto della narrazione musicale, interesse per silenzio e spazio. 'Satie è indispensabile' (Cage). Nel 1963 organizzò la prima esecuzione integrale di Vexations (840 ripetizioni, 18 ore), anticipando il minimalismo.",
  },
  {
    q: "In quali film famosi è stata usata la Gymnopédie n.1?",
    a: "Fuoco fatuo, I Tenenbaum, Man on Wire, Hugo Cabret",
    level: "intermedio",
    details: "Film principali: Fuoco fatuo (1963, Louis Malle, sequenza iconica con Maurice Ronet), I Tenenbaum (2001, Wes Anderson), Man on Wire (2008, documentario su Philippe Petit), Un'altra donna (1988, Woody Allen), Hugo Cabret (2011, Scorsese), About Schmidt (2002), Chocolat (2000). Usata anche in spot pubblicitari e videogiochi (Mother 3, Zelda: Ocarina of Time).",
  },
  {
    q: "Qual è la principale difficoltà nell'esecuzione della n. 1?",
    a: "Controllo del suono e del pedale",
    level: "avanzato",
    details: "La sfida non è la velocità ma la qualità timbrica: equilibrio tra le voci, gestione del pedale e sospensione del tempo.",
  },
  {
    q: "Qual è il 'segreto armonico' della Gymnopédie n.1?",
    a: "La nota Fa# come collante tra gli accordi",
    level: "avanzato",
    details: "Il Fa# è il 'collante' armonico che rende il brano così fluido e sospeso. Questa nota appartiene CONTEMPORANEAMENTE sia all'accordo di Sol maggiore settima (Sol-Si-Re-Fa#) sia all'accordo di Re maggiore settima (Re-Fa#-La-Do#). Il Fa# funge da ponte armonico tra i due accordi, permettendo all'altalena armonica di oscillare senza mai toccare terra, creando quella sensazione di galleggiamento senza tempo.",
  },
  {
    q: "Perché Satie fu soprannominato 'Esoterik Satie'?",
    a: "Per i suoi interessi mistici e il suo aspetto",
    level: "avanzato",
    details: "A Montmartre negli anni '90, lo scrittore Alphonse Allais soprannominò Satie 'Esoterik Satie' – un gioco di parole che univa 'Erik' con 'esoterico'. Il soprannome si riferiva ai suoi interessi mistici (Rosa-Croce, esoterismo) e al suo aspetto caratteristico: cappello a cilindro, lunghi capelli, mantello nero. Cattura perfettamente la doppia natura di Satie: bohémien ironico e ricercatore mistico.",
  },
  {
    q: "Qual è la differenza principale tra Gymnopédies e Gnossiennes?",
    a: "Le Gymnopédies hanno metro regolare, le Gnossiennes no",
    level: "avanzato",
    details: "Differenze cruciali: le Gnossiennes sono scritte SENZA stanghette di battuta (metro 'libero'), hanno atmosfere più arcane ed esotiche (ispirate alla gnosi), contengono indicazioni comportamentali bizzarre ('con stupore', 'non essere orgogliosi'). Le Gymnopédies mantengono metro regolare (3/4), atmosfera dolce e malinconica, eleganza austera e rituale. Lambert: le Gymnopédies sono come 'camminare attorno a una scultura', le Gnossiennes come 'entrare in un tempio sconosciuto'.",
  },
  {
    q: "Quale ruolo ebbe Maurice Ravel nella riscoperta di Satie?",
    a: "Eseguì la Gymnopédie n.3 nel 1911",
    level: "avanzato",
    details: "Oltre a Debussy (che orchestrò la n.1 e n.3 nel 1897), anche Maurice Ravel fu fondamentale. Nel 1911, Ravel eseguì pubblicamente la Gymnopédie n.3, contribuendo alla 'riscoperta' di Satie dopo anni di relativo oblio. Questo evento segnò l'inizio del riconoscimento presso i giovani compositori del Groupe des Six, che acclamarono Satie come 'maestro' e precursore dell'anti-romanticismo.",
  },
  {
    q: "Perché Satie scrisse TRE Gymnopédies?",
    a: "Per la sua ossessione mistica per il numero 3",
    level: "avanzato",
    details: "Satie aveva un'ossessione mistica per il numero tre, derivata dal simbolismo trinitario dei Rosa-Croce. Compose TRE Gymnopédies, TRE Sarabandes (1887), TRE Gnossiennes iniziali (1890). Anche altri titoli richiamano trinità: 'Trois morceaux en forme de poire' (1903). Questa ossessione numerologica rivela l'influenza profonda dell'esoterismo sulla sua estetica compositiva.",
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

const indiceBlocks = [
  {
    key: "introduzione",
    title: "Introduzione",
    summary:
      "Esplora la nascita del brano a Montmartre, gli incontri con Debussy e Contamine de Latour e la ricezione simbolista.",
      bullets: [
        { label: "Contesto parigino e Montmartre", tooltip: "Riprendo l’atmosfera bohèmien del Chat Noir e il Simbolismo che ispira la scelta della gymnopédie come immagine sensoriale, mettendo in evidenza il contrasto con il wagnerismo e l’idea di ‘musica bianca’ di Satie." },
        { label: "Timeline biografica", tooltip: "Racconto la traiettoria personale e pubblica: origini normanne, Conservatorio fallimentare, Rosa-Croce, il legame con Valadon, il ritiro ad Arcueil e la ricezione postuma da Cage a Eno." },
        { label: "Approfondimenti esecutivi", tooltip: "Elenco ciò che studente e docente devono sapere: Debussy, la dieta bianca come manifesto, i pedali di Fa# e le curiosità pratiche che si celano dietro le note." },
      ],
  },
  {
    key: "analysis",
    title: "Analisi operativa",
    summary:
      "Indica come leggere la forma, le tensioni armoniche e il controllo di tempo/pedale attraverso schede interattive e supporti visivi.",
      bullets: [
        { label: "Schede operative e Pdf", tooltip: "Ogni scheda è guida all’azione (struttura, controllo, errori da evitare, obiettivi tonal-ritmici) e il PdfScoreViewer mostra le pagine e i controlli di zoom utili alla lettura." },
        { label: "Visuali e Fa#", tooltip: "Uso degli asset (spartiti annotati, diteggiature, Fa# come pedale interno, posizione mani) per coltivare l’attenzione timbrica e l’armonia sospesa." },
      ],
  },
  {
    key: "interpreters",
    title: "Interpreti e ascolti",
    summary:
      "Dialoga su versioni emblematiche per piano e orchestra, suggerendo ciò che ascoltare per capire l'interpretazione.",
      bullets: [
        { label: "Piano solo", tooltip: "Parlo dei registri di Buniatishvili e Ciccolini: fraseggio contemporaneo, sviluppo dinamico e il tocco morbido della tradizione francese." },
        { label: "Orchestrazioni Debussy", tooltip: "Menziono le due orchestrazioni, la scelta dei timbri (oboe, corni, arpe) e come l’adattamento amplia la tessitura pur mantenendo la leggerezza iniziale." },
      ],
  },
  {
    key: "glossary",
    title: "Glossario",
    summary:
      "Chiude i termini chiave (Gymnopédie, lent et douloureux, settime maggiori) e i riferimenti culturali utili alla spiegazione.",
      bullets: [
        { label: "Termini musicali", tooltip: "Definisco Gymnopédie, lent et douloureux, ostinato, accordi planati, ambiguità tonale, pedale di risonanza e rubato sobrio per sostenere la narrazione video." },
        { label: "Contesto storico", tooltip: "Racconto perché Montmartre era centrale, il ruolo di Debussy, la Rosa-Croce, la dieta bianca e il filo che porta dalle Gymnopédies all’ambient." },
      ],
  },
  {
    key: "impara",
    title: "Impara",
    summary:
      "Flashcard interattive per fissare cronologia, titoli, significati e aneddoti legati al brano e al compositore.",
      bullets: [
        { label: "Flashcard", tooltip: "Le 20 flashcard servono a chiudere il video con richiami rapidi su date, titoli, persone e chiavi interpretative." },
      ],
  },
  {
    key: "fonti",
    title: "Fonti",
    summary:
      "Organizza i collegamenti a spartiti, audio e note discografiche per riprodurre il percorso documentale.",
      bullets: [
        { label: "Spartito e dominio pubblico", tooltip: "Indico IMSLP e Musopen come sorgenti (PDF, audio) per scaricare e replicare il ragionamento del video." },
        { label: "Contesto e cronologia", tooltip: "Segnalo Wikipedia e Hyperion per verificare date, titoli e orchestrazioni citate nella scaletta." },
      ],
  },
];

// ============================================
// NUOVE SEZIONI - STRUTTURA RIORGANIZZATA
// ============================================

// Sezione 1: Benvenuto
const BenvenutoSection = ({ goTo }) => (
  <div className="space-y-6 max-w-5xl mx-auto">
    {/* Hero */}
    <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
      <h1 className="text-4xl font-bold text-slate-100 mb-3">
        Gymnopédie n. 1
      </h1>
      <p className="text-lg text-slate-300 mb-6">
        Un viaggio nella Parigi del 1888, nella vita di Erik Satie e nella nascita di un capolavoro che ha cambiato la musica
      </p>
      <div className="flex items-center justify-center gap-3">
        <Music className="w-6 h-6 text-blue-400" />
        <span className="text-sm text-slate-400">Un percorso in 6 tappe</span>
      </div>
    </div>

    {/* Hero Image - Manoscritto */}
    <div className="rounded-2xl overflow-hidden border border-slate-700">
      <img
        src="/images/Manoscritto-di-Erik-Satie-della-prima-Gymnopedie.jpg"
        alt="Manoscritto autografo della Gymnopédie n. 1 di Erik Satie"
        className="w-full object-contain bg-slate-950"
      />
      <div className="bg-slate-900 p-4 text-center">
        <p className="text-sm text-slate-300 italic">
          Manoscritto autografo di Erik Satie — tre pagine che hanno cambiato il corso della musica moderna
        </p>
      </div>
    </div>

    {/* Cosa scoprirai */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-blue-400" />
        Cosa scoprirai
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Parigi 1888", desc: "La Belle Époque, Montmartre e il clima bohémien", icon: MapPin, tab: "parigi1888" },
          { title: "Erik Satie", desc: "Il giovane outsider che rivoluzionò la musica", icon: User, tab: "satie" },
          { title: "Il Brano", desc: "Genesi, linguaggio musicale e come suonarlo", icon: Music, tab: "brano" },
          { title: "L'Eredità", desc: "Dal minimalismo all'ambient: l'impatto di Satie", icon: Sparkles, tab: "eredita" },
          { title: "Impara", desc: "Quiz interattivo e glossario completo", icon: GraduationCap, tab: "impara" },
          { title: "Fonti", desc: "Spartiti, registrazioni e approfondimenti", icon: FileText, tab: "fonti" },
        ].map((item) => (
          <button
            key={item.tab}
            type="button"
            onClick={() => goTo(item.tab)}
            className="bg-slate-950/40 border border-slate-700 rounded-xl p-4 text-left hover:bg-slate-800 hover:border-blue-500 transition-all group"
          >
            <div className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-slate-100 mb-1">{item.title}</div>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Perché questo brano */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-3">
        Perché Gymnopédie n. 1?
      </h2>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        Nel 1888, un giovane pianista di 21 anni che lavorava nei café-cabaret di Montmartre compose tre brevi pagine per pianoforte.
        Semplici in apparenza, nascondevano una rivoluzione: armonie sospese, forme svuotate di drammaticità, un suono "bianco" che
        anticipava l'impressionismo, il minimalismo e la musica ambient.
      </p>
      <p className="text-sm text-slate-300 leading-relaxed">
        Questa app ti guida alla scoperta di un brano che ha cambiato il corso della musica, della persona che lo compose e del
        contesto storico che lo rese possibile.
      </p>
    </div>

    {/* CTA */}
    <div className="text-center">
      <button
        type="button"
        onClick={() => goTo("parigi1888")}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
      >
        Inizia il viaggio
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// Sezione 2: Parigi 1888
const Parigi1888Section = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    {/* Header */}
    <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
      <h1 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
        <MapPin className="w-7 h-7 text-blue-400" />
        Parigi 1888: la scena
      </h1>
      <p className="text-sm text-slate-300 leading-relaxed">
        Per capire le Gymnopédies, dobbiamo prima immergerci nella Parigi di fine Ottocento: una città in fermento,
        dove scienza e arte si rinnovavano, dove i café-cabaret di Montmartre erano laboratori di sperimentazione
        e dove un giovane pianista stava per cambiare il corso della musica.
      </p>
    </div>
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
      <img
        src="/images/paris-10-place-de-la-republique-et-magasins-reunis.jpg"
        alt="Place de la Republique a Parigi"
        className="w-full h-72 md:h-96 object-cover"
      />
      <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
        Place de la Republique e Magasins Reunis: la Parigi urbana di fine Ottocento
      </p>
    </div>

    {/* La Belle Époque */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-amber-400" />
        La Belle Époque
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Il <strong className="text-slate-100">1888</strong> è un anno simbolo della Belle Époque, periodo di ottimismo
          tecnologico e fermento culturale che caratterizzò la Francia tra la fine dell'Ottocento e la Prima Guerra Mondiale.
        </p>

        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">Cosa succede nel 1888:</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>La <strong>Torre Eiffel</strong> è in costruzione per l'Esposizione Universale del 1889</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Louis Pasteur</strong> fonda l'Istituto Pasteur, rivoluzionando la medicina</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Heinrich Hertz</strong> dimostra l'esistenza delle onde elettromagnetiche</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>George Eastman</strong> brevetta la prima fotocamera portatile Kodak</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>L'arte si libera dal <strong>romanticismo</strong> e dalle regole accademiche</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In musica, <strong className="text-slate-100">Wagner</strong> domina l'Europa con le sue opere monumentali
          e le tensioni armoniche drammatiche. Ma a Parigi, nei café-cabaret di Montmartre, sta nascendo qualcosa
          di completamente diverso.
        </p>

        {/* Immagine Belle Époque */}
        <div className="rounded-lg overflow-hidden border border-slate-600">
          <img
            src="/images/parigi-belle-epoque-1888.jpg"
            alt="Costruzione Torre Eiffel"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
            Costruzione della Torre Eiffel (1887-1889)
          </p>
        </div>

        {/* Cartoline Parigi Belle Époque */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/499-paris-paris-e-boulevard-montmartre.jpg"
              alt="Boulevard Montmartre"
              className="w-full h-48 object-cover"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Boulevard Montmartre dall'alto
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/paris-11-cafe-leroy-angle-rue-fontaine-au-roi-et-avenue-parmentier-1916.jpg"
              alt="Café Leroy 1916"
              className="w-full h-48 object-cover"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Café Leroy (1916)
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Montmartre: il quartiere bohémien */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
        <MapPin className="w-6 h-6 text-blue-400" />
        Montmartre: il quartiere bohémien
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          <Tooltip text="Quartiere parigino dei café-cabaret dove Satie lavorò come pianista e trovò ispirazione per il suo stile sobrio">
            <strong className="text-slate-100">Montmartre</strong>
          </Tooltip>,
          sulla collina a nord di Parigi, era il cuore della vita artistica bohémien.
          Qui si mescolavano pittori, poeti, musicisti e intellettuali in un'atmosfera di libertà e sperimentazione.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Le Chat Noir */}
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4">
              <h3 className="text-base font-semibold text-slate-100 mb-2 flex items-center gap-2">
                <Music className="w-4 h-4 text-blue-400" />
                Le Chat Noir
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Fondato nel 1881 da <strong>Rodolphe Salis</strong>, era il cabaret più celebre di Montmartre.
                Non un semplice locale, ma un vero laboratorio artistico dove Satie lavorò come secondo pianista
                tra il 1887 e il 1888.
              </p>
            </div>
            <img
              src="/images/Le chat noir.jpg"
              alt="Le Chat Noir cabaret"
              className="w-full h-64 object-contain bg-slate-950 p-2"
            />
          </div>

          {/* Auberge du Clou */}
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4">
              <h3 className="text-base font-semibold text-slate-100 mb-2 flex items-center gap-2">
                <Music className="w-4 h-4 text-blue-400" />
                Auberge du Clou
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Altro celebre cabaret dove Satie suonò successivamente. Frequentato da artisti bohémien,
                offriva lo stesso clima di libertà creativa del Chat Noir.
              </p>
            </div>
            <img
              src="/images/Auberge du clou.jpg"
              alt="Auberge du Clou"
              className="w-full h-56 object-cover"
            />
          </div>
        </div>

        {/* L'atmosfera */}
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">L'atmosfera dei café-cabaret</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Nei cabaret di Montmartre, l'<strong>arte "alta"</strong> si mescolava con la <strong>cultura popolare</strong>.
            La musica non era un rito religioso da sala da concerto, ma accompagnamento alla vita quotidiana:
            conversazioni, fumo, alcol, poesia.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vi passarono <strong>Claude Debussy</strong>, <strong>Paul Verlaine</strong>, <strong>Toulouse-Lautrec</strong>
            e molti altri artisti che avrebbero segnato l'epoca.
          </p>
        </div>

        {/* Mappa Montmartre */}
        <div className="rounded-lg overflow-hidden border border-slate-600">
          <img
            src="/images/mappa-montmartre-1880-1900.jpg"
            alt="Mappa di Montmartre"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
            Mappa di Montmartre (1880-1900)
          </p>
        </div>

        {/* El bohemi - layout a due colonne */}
        <div className="grid md:grid-cols-[0.6fr_1.4fr] gap-4 items-stretch">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/El_bohemi_by_Ramon_Casas-1.jpg"
              alt="El bohemi di Ramon Casas"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                "El bohemi" (Ramon Casas, 1891)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Il ritratto di Casas coglie l'essenza della bohème di fine Ottocento: artisti, poeti e musicisti
                che vivevano tra caffè, cabaret e atelier, lontani dalle regole accademiche. È lo stesso clima
                di Montmartre in cui Satie suonava al Chat Noir, circondato da figure che mescolavano arte,
                ironia e sperimentazione.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                La bohème non era solo uno stile, ma un modo di stare al mondo: precarietà economica,
                notti passate a discutere di estetica, amicizie e rivalità tra pittori e musicisti, gusto per
                l'ironia e il paradosso. In questo ambiente, la musica smette di essere cerimonia ufficiale
                e diventa linguaggio quotidiano, vicino alle persone e alle loro vite. Satie assorbe questa
                libertà: scrive pagine essenziali, senza retorica, capaci di parlare con voce semplice e moderna.
              </p>
            </div>
            <p className="text-sm text-slate-400 italic mt-3">
              Un'icona visiva della libertà creativa che caratterizzava il quartiere.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Il clima artistico: simbolismo */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-purple-400" />
        Il simbolismo
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Montmartre era il centro del{" "}
          <Tooltip text="Movimento artistico e letterario che predilige simboli ed evocazioni rispetto alla rappresentazione diretta della realtà">
            <strong className="text-slate-100">movimento simbolista</strong>
          </Tooltip>,
          che rifiutava il{" "}
          <Tooltip text="Rappresentazione fedele e oggettiva della realtà">
            <span>realismo</span>
          </Tooltip>{" "}
          e l'accademismo in favore dell'evocazione, del sogno, dell'immagine
          e della suggestione.
        </p>

        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">Principi del simbolismo musicale</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span><strong>Evocazione</strong> invece di descrizione</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                <Tooltip text="Uso di accordi e progressioni che non seguono le regole tonali tradizionali, creando incertezza">
                  <strong>Ambiguità armonica</strong>
                </Tooltip>{" "}
                invece di progressioni chiare
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                <Tooltip text="Timbro e atmosfera sonora come elementi principali della composizione">
                  <strong>Colore</strong>
                </Tooltip>{" "}
                invece di{" "}
                <Tooltip text="Elaborazione e variazione di un tema musicale attraverso diverse sezioni del brano">
                  <span>sviluppo tematico</span>
                </Tooltip>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>L'idea di <strong>"musica bianca"</strong> senza ornamenti, essenziale</span>
            </li>
          </ul>
        </div>

        {/* Personaggi chiave */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">J. P. Contamine de Latour</h3>
            <p className="text-sm text-slate-300">
              <Tooltip text="Movimento artistico e letterario che predilige simboli ed evocazioni rispetto alla rappresentazione diretta della realtà">
                <span>Poeta simbolista</span>
              </Tooltip>, amico di Satie. La sua poesia <em>Les Antiques</em> fu pubblicata insieme
              alla Gymnopédie n. 1 nell'estate del 1888 e ispirò il titolo arcaico.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Puvis de Chavannes</h3>
            <p className="text-sm text-slate-300">
              Pittore simbolista le cui opere evocavano atmosfere antiche e sognanti.
              Il suo quadro <em>The Arts and the Muses</em> influenzò l'immaginario di Satie.
            </p>
          </div>
        </div>

        {/* Quadro Puvis de Chavannes */}
        <div className="rounded-lg overflow-hidden border border-slate-600 mt-4">
          <img
            src="/images/Arts_and_the_Muses_by_Pierre_Puvis_de_Chavannes.jpg"
            alt="The Arts and the Muses"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
            "The Arts and the Muses" di Puvis de Chavannes
          </p>
        </div>

        {/* Contrasto con Wagner */}
        <div className="bg-linear-to-br from-amber-950/20 to-slate-950/40 border border-amber-700/30 rounded-xl p-4">
          <h3 className="text-base font-semibold text-amber-200 mb-3">La rivoluzione silenziosa di Satie</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Mentre <strong>Wagner</strong> dominava l'Europa con{" "}
            <Tooltip text="Tensioni create da dissonanze che richiedono risoluzione">
              <span>tensioni armoniche drammatiche</span>
            </Tooltip>{" "}
            e risoluzioni potenti, Satie — a 21 anni, pianista di cabaret — oppone{" "}
            <Tooltip text="Accordi che non si risolvono secondo le regole tonali tradizionali, creando un senso di galleggiamento">
              <strong>armonie sospese</strong>
            </Tooltip>,{" "}
            <Tooltip text="Alternanza tra accordi di Sol maggiore settima e Re maggiore settima, collegati dal Fa#">
              <strong>oscillazioni di settime maggiori</strong>
            </Tooltip>{" "}
            e un <strong>futuro che non arriva mai</strong>.
            Non cerca il{" "}
            <Tooltip text="Punto culminante di massima tensione drammatica in una composizione">
              <span>climax</span>
            </Tooltip>, ma la <em>sospensione</em>. Non il dramma, ma il <em>colore</em>.
          </p>
        </div>
      </div>
    </div>

    {/* CTA prossima sezione */}
    <div className="text-center">
      <p className="text-sm text-slate-400 mb-3">
        Ora che conosci il contesto, scopriamo chi era l'uomo dietro questa rivoluzione
      </p>
    </div>
  </div>
);

// Sezione 3: Erik Satie
const SatieSection = () => {
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const satieLifeTimeline = [
    { year: "1866", event: "Nascita a Honfleur, Normandia" },
    { year: "1870", event: "Trasferimento a Parigi durante la guerra Franco-Prussiana" },
    { year: "1872", event: "Morte della madre. Erik ha 6 anni, viene mandato dai nonni a Honfleur" },
    { year: "1878", event: "Morte della nonna. Torna a Parigi dal padre" },
    { year: "1879", event: "Entra al Conservatorio di Parigi. Viene giudicato 'dotato ma indolente'" },
    { year: "1882", event: "Espulso dal Conservatorio dopo esecuzione mediocre di Beethoven" },
    { year: "1885", event: "Rientro al Conservatorio. Giudizi continuano negativi" },
    { year: "1886", event: "Servizio militare nel 33º Reggimento di Fanteria" },
    { year: "1887", event: "Abbandona definitivamente il Conservatorio. Inizia a lavorare al Chat Noir" },
    { year: "1888", event: "Compone le tre Gymnopédies a 21 anni" },
    { year: "1891-1893", event: "Periodo Rosa-Croce. Compositore ufficiale dell'Ordine" },
    { year: "1893", event: "Breve relazione con Suzanne Valadon, unico amore documentato" },
    { year: "1896-1897", event: "Debussy orchestra le Gymnopédies n. 1 e n. 3" },
    { year: "1898", event: "Trasferimento ad Arcueil nella stanza 'l'Armadio'" },
    { year: "1905", event: "Ritorna a studiare alla Schola Cantorum a 39 anni" },
    { year: "1917", event: "Successo con il balletto 'Parade' (Cocteau, Picasso, Massine)" },
    { year: "1925", event: "Morte a Parigi a 59 anni per cirrosi epatica" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <User className="w-7 h-7 text-blue-400" />
          Erik Satie: l'outsider
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-slate-400">1866 - 1925</span>
          <span className="text-slate-600">•</span>
          <span className="text-sm text-slate-400">Honfleur - Parigi - Arcueil</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed italic">
          «Sono venuto al mondo molto giovane in un tempo molto vecchio»
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
        <img
          src="/images/Satie con occhiali.jpg"
          alt="Erik Satie con occhiali"
          className="w-full h-72 md:h-96 object-cover"
        />
        <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
          Erik Satie con occhiali: l'outsider che rifiuta le convenzioni accademiche
        </p>
      </div>
      {/* Il giovane ribelle */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-red-400" />
          Il giovane ribelle (1866-1887)
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-[200px_1fr] gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/Honfleur.jpg"
                alt="Honfleur, città natale"
                className="w-full h-32 sm:h-40 object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">Honfleur, 17 maggio 1866</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Erik Alfred Leslie Satie nasce a <strong>Honfleur</strong>, pittoresca cittadina portuale
                in Normandia. La madre muore quando ha quattro anni. Il padre, agente marittimo,
                si risposa con una pianista che gli dà le prime lezioni di musica.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Il fallimento al Conservatorio
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                Nel <strong>1879</strong>, a 13 anni, entra al <strong>Conservatorio di Parigi</strong>.
                Ma l'esperienza è un disastro. I professori lo giudicano:
              </p>
              <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-3">
                <ul className="space-y-1 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><em>"Dotato ma indolente"</em></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><em>"Il più pigro del Conservatorio"</em></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><em>"Privo di valore"</em></span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nel <strong>1882</strong>, dopo un'esecuzione mediocre del <em>Finale della Sonata Op. 26</em> di Beethoven,
                viene <strong>espulso</strong>. Tenta un rientro nel 1885, ma abbandona definitivamente nel 1887.
              </p>
            </div>

            <div className="mt-4 rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/Conservatorio di Parigi.jpg"
                alt="Conservatoire de Paris"
                className="w-full h-48 object-cover"
              />
              <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
                Conservatoire de Paris: l'istituzione che giudicò Satie "il più pigro studente"
              </p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Gli anni di formazione autodidatta</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tra il 1882 e il 1883, fuori dal Conservatorio, Satie si dedica alle <strong>letture</strong>:
              Voltaire, Dumas, Andersen. Sviluppa preferenze musicali personali per <strong>Bach, Chopin e Schumann</strong>.
              Rifiuta il wagnerismo dominante e cerca una strada alternativa.
            </p>
          </div>
        </div>
      </div>

      {/* Montmartre e Gymnopédies */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Music className="w-6 h-6 text-blue-400" />
          Montmartre e le Gymnopédies (1887-1888)
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            A <strong>21 anni</strong>, dopo un breve servizio militare, Satie trova lavoro come <strong>secondo pianista</strong> al
            <Tooltip text="Celebre café-cabaret di Montmartre fondato nel 1881 da Rodolphe Salis">
              <strong className="text-slate-100">Chat Noir</strong>
            </Tooltip>.
          </p>

          <div className="bg-linear-to-br from-blue-950/20 to-slate-950/40 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-3">L'ambiente che cambierà tutto</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Il Chat Noir non è solo un locale dove bere, è un <strong>laboratorio di sperimentazione</strong>
              dove poeti, pittori e musicisti si mescolano, discutono, collaborano. Vi passano
              <strong> Claude Debussy</strong>, <strong>Paul Verlaine</strong>, <strong>Toulouse-Lautrec</strong>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Qui Satie incontra <strong>J. P. Contamine de Latour</strong>,{" "}
              <Tooltip text="Movimento artistico e letterario che predilige simboli ed evocazioni rispetto alla rappresentazione diretta della realtà">
                <span>poeta simbolista</span>
              </Tooltip>{" "}
              la cui poesia <em>Les Antiques</em> ispirerà il titolo <em>Gymnopédie</em>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/6_Rue_Cortot -.jpeg"
                alt="6 Rue Cortot, Montmartre"
                className="w-full h-72 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
                6 Rue Cortot, Montmartre: abitazione di Satie durante gli anni delle Gymnopédies.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/The bohemien SATIE.jpg"
                alt="Erik Satie in abito bohémien"
                className="w-full h-72 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
                Erik Satie in abito bohémien: ritratto del compositore negli anni di Montmartre.
              </p>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Febbraio-aprile 1888 — la composizione
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In questo ambiente di libertà artistica, Satie compone le <strong>tre Gymnopédies</strong>.
              Pagine brevi, apparentemente semplici, ma rivoluzionarie: armonie sospese, forme svuotate di drammaticità,
              un suono "bianco" che oppone al wagnerismo dominante un'<strong>estetica dell'essenziale</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Periodo rosacrociano */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          Il periodo rosacrociano (1891-1893)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          In questi anni Satie entra nell'Ordine della Rosa-Croce di <strong>Joséphin Péladan</strong>, diventandone
          compositore ufficiale e maestro di cappella. È una fase di misticismo, simbolismo e disciplina estetica,
          in cui cerca una musica essenziale e rituale.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/Peladan.jpg"
              alt="Joséphin Péladan"
              className="w-full h-80 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Joséphin Péladan, fondatore dell'Ordine della Rosa-Croce
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/erik-satie-son-of-stars_u-l-q1nt8j80.jpg"
              alt="Manoscritto Le Fils des Étoiles"
              className="w-full h-80 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Manoscritto "Le Fils des Étoiles" (1891)
            </p>
          </div>
        </div>
        <div className="mt-4 bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-2">"Esoterik Satie"</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            A Montmartre, lo scrittore Alphonse Allais lo soprannominò <em>"Esoterik Satie"</em> — un gioco di parole
            che univa il suo nome ai suoi interessi mistici. L'aspetto caratteristico: cappello a cilindro, lunghi capelli,
            mantello nero.
          </p>
        </div>
      </div>

      {/* Suzanne Valadon */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <User className="w-6 h-6 text-blue-400" />
          Suzanne Valadon (1893)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Nel 1893 Satie vive una relazione intensa con <strong>Suzanne Valadon</strong>, pittrice e madre di Maurice
          Utrillo. È l'unico amore documentato della sua vita: lei lo chiama affettuosamente <em>"Biqui"</em>, lui le
          dedica una minuscola canzone di quattro battute come regalo di Pasqua. Quando la relazione si interrompe,
          Satie ne rimane profondamente segnato.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          In quegli stessi mesi si scambiano ritratti: Valadon dipinge Satie, mentre lui la ritrae su carta da musica.
          Due immagini complementari che raccontano un momento intimo e raro nella biografia del compositore.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/valadon-satie-1892-ritratto.jpg"
              alt="Ritratto di Erik Satie di Suzanne Valadon"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Suzanne Valadon, "Ritratto di Erik Satie" (1892-93)
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/Bonjour-Biquii.jpg"
              alt="Spartito di Bonjour Biqui, Bonjour!"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              "Bonjour Biqui, Bonjour!" (1893): canzone-regalo per Valadon
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/Satie_portret_Valadon_1893.jpg"
              alt="Ritratto di Suzanne Valadon disegnato da Erik Satie"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Disegno originale di Erik Satie raffigurante Suzanne Valadon (1893)
            </p>
          </div>
        </div>
      </div>

      {/* Arcueil */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Home className="w-6 h-6 text-blue-400" />
          Arcueil e l'"Armadio" (1898-1925)
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 items-stretch">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/2015-Arcueil-Erik-Satie-house.jpg"
              alt="Casa di Erik Satie ad Arcueil"
              className="w-full h-80 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
              Arcueil: la casa di Satie per gli ultimi 27 anni della sua vita (1898-1925).
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
              <h3 className="text-base font-semibold text-slate-100 mb-2">La stanza "l'Armadio"</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dal 1898 visse ad <strong>Arcueil</strong> in una stanza chiamata "l'Armadio". Nessuno vi entrò mai
                fino alla sua morte nel 1925. Gli amici trovarono: due pianoforti sovrapposti, oltre 100 ombrelli
                e spartiti nascosti ovunque.
              </p>
            </div>
            <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
              <h3 className="text-base font-semibold text-slate-100 mb-2">La "dieta bianca"</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nelle sue <em>Memorie di un Amnesico</em> (1912), Satie affermò di nutrirsi solo di cibi bianchi:
                uova, zucchero, ossa grattugiate, sale, cocco. Una provocazione artistica che rifletteva
                la sua estetica della <strong>purezza sonora</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Parade e avanguardie */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          Parade e avanguardie (1917)
        </h2>
        <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-4 items-stretch">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/jean-cocteau---erik-satie--arcueil--mais-JKLTD-570.webp"
              alt="Schizzo di Jean Cocteau su Erik Satie"
              className="w-full h-72 object-contain bg-slate-950 p-2"
            />
          </div>
          <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Jean Cocteau</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Poeta, drammaturgo, artista e cineasta francese. Collaborò con Satie nel balletto <em>Parade</em> (1917),
              insieme a Picasso e Massine. Fu una figura chiave dell'avanguardia parigina e un interprete precoce
              dell'estetica essenziale di Satie.
            </p>
            <p className="text-sm text-slate-400 italic mt-3">
              Schizzo di Cocteau dedicato a Satie.
            </p>
          </div>
        </div>
      </div>

      {/* La vita di Satie - Timeline espandibile */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-400" />
            La vita di Erik Satie (1866-1925)
          </h2>
          <button
            type="button"
            onClick={() => setShowFullTimeline(!showFullTimeline)}
            className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {showFullTimeline ? "Riduci" : "Mostra timeline completa"}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFullTimeline ? "rotate-180" : ""}`} />
          </button>
        </div>

        {!showFullTimeline ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              Dopo le Gymnopédies, la vita di Satie continua tra alti e bassi, incontri straordinari
              e scelte eccentriche. Scopri la timeline completa per conoscere:
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>L'incontro con <strong>Suzanne Valadon</strong>, l'unico amore documentato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Il periodo della <strong>Rosa-Croce</strong> e dell'esoterismo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Il trasferimento ad <strong>Arcueil</strong> e la stanza "l'Armadio"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Le scoperte dopo la morte: pianoforti sovrapposti, 100+ ombrelli, spartiti nascosti</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-y-3">
            {satieLifeTimeline.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-start p-3 rounded-lg bg-slate-800 border-l-2 border-blue-500"
              >
                <span className="font-semibold text-blue-300 text-sm w-32 shrink-0">
                  {item.year}
                </span>
                <span className="text-slate-200 text-sm leading-relaxed">
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-slate-400 mb-3">
          Ora che conosci il contesto e l'uomo, scopriamo come nacque il capolavoro
        </p>
      </div>
    </div>
  );
};

// Sezione 4: Il Brano
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
          <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
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
        <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
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

// Sezione 5: Eredità
const EreditaSection = () => {
  const debussyOrchestrations = [
    {
      title: "Orchestrazione Debussy – versione classica (YouTube)",
      url: "https://www.youtube.com/watch?v=YqKpAHvrOjw",
      description:
        "Debussy orchestrò le Gymnopédies n.1 e n.3 (1896-1897), ampliando il colore timbrico senza perdere la trasparenza originaria.",
    },
    {
      title: "Orchestrazione Debussy – hr-Sinfonieorchester (YouTube)",
      url: "https://www.youtube.com/watch?v=wxWx0GCc5CA",
      description:
        "Esecuzione moderna che mette in luce la delicatezza delle orchestrazioni debussiane.",
    },
  ];

  const modernInterpreters = [
    {
      title: "Khatia Buniatishvili (YouTube)",
      url: "https://www.youtube.com/watch?v=TL0xzp4zzBE",
      description:
        "Interpretazione contemporanea molto ascoltata: fraseggio fluido e dinamiche controllate.",
    },
    {
      title: "Aldo Ciccolini (YouTube)",
      url: "https://www.youtube.com/watch?v=2WfaotSK3mI",
      description:
        "Lettura storica della scuola pianistica francese, morbida e contemplativa.",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-blue-400" />
          L'eredità di Satie
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Dalle orchestrazioni di Debussy al minimalismo, dalla musica ambient alla cultura pop: come una pagina di tre minuti
          ha cambiato il modo di ascoltare il silenzio.
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
        <img
          src="/images/john_cage_playing_vexations.jpeg"
          alt="John Cage durante la maratona di Vexations"
          className="w-full h-80 md:h-96 object-cover"
        />
        <p className="text-sm text-slate-400 p-3 italic bg-slate-900/50">
          John Cage durante la maratona di "Vexations" (New York, 1963)
        </p>
      </div>

      {/* 1. I contemporanei */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">I contemporanei (1890-1925)</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          <strong>Claude Debussy</strong> intuì la forza di queste pagine e le orchestrò tra il 1896 e il 1897, rendendo
          la Gymnopédie n.1 un simbolo dell'estetica impressionista. <strong>Maurice Ravel</strong> ne ammirava la chiarezza
          formale, mentre il <strong>Gruppo dei Sei</strong> lo considerava un padre spirituale: musica essenziale, quotidiana,
          anti-wagneriana.
        </p>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-100 font-semibold mb-3">
            <Music className="w-4 h-4 text-blue-400" />
            Orchestrazioni di riferimento
          </div>
          <div className="space-y-3">
            {debussyOrchestrations.map((item, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-100 font-semibold mb-1">{item.title}</div>
                <p className="text-sm text-slate-300 mb-3">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                >
                  apri <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Eredi del Novecento */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">Eredi del Novecento</h3>
        <div className="space-y-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">John Cage e l'avanguardia americana</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>John Cage</strong> (1912-1992) è il compositore di <em>4'33"</em>, il celebre brano in cui il silenzio
              diventa musica: il pubblico ascolta l'ambiente e scopre che ogni suono casuale fa parte dell'opera. Figura
              eccentrica e radicale, sperimentò il <em>pianoforte preparato</em>, il caso e l'indeterminazione, mettendo in
              discussione l'idea stessa di composizione. Cage definì Satie “indispensabile” e lo riscoprì nel dopoguerra.
              Nel 1963 organizzò la prima esecuzione integrale di <em>Vexations</em> (840 ripetizioni, circa 18 ore),
              anticipando la logica del processo e della ripetizione che diventerà centrale nel minimalismo.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-600 mt-3 bg-slate-950">
              <img
                src="/images/Vexations.jpg"
                alt="Manoscritto di Vexations"
                className="w-full h-72 object-contain p-2"
              />
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Minimalismo</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              I minimalisti americani (Steve Reich, Philip Glass, Terry Riley) riconoscono in Satie un antenato:{" "}
              <strong>ripetizione di pattern</strong>, <strong>armonia statica</strong>, rifiuto del climax e{" "}
              <strong>economia di mezzi</strong> sono già presenti nella Gymnopédie n.1.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Musica ambient</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nel 1917 Satie concepì la <em>Musique d'ameublement</em> (musica d'arredamento), pensata per accompagnare senza
              invadere. Nel 1978 <strong>Brian Eno</strong> pubblicò <em>Ambient 1: Music for Airports</em>, definendo l'ambient
              come musica che “può essere ignorata quanto ascoltata”: la stessa idea di Satie, un secolo prima.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-100 font-semibold mb-3">
            <Library className="w-4 h-4 text-blue-400" />
            Interpreti moderni
          </div>
          <div className="space-y-3">
            {modernInterpreters.map((item, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-100 font-semibold mb-1">{item.title}</div>
                <p className="text-sm text-slate-300 mb-3">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                >
                  apri <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Cultura pop */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">Cultura pop</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          La Gymnopédie n.1 è tra le musiche classiche più usate nei media: riconoscibile, emotivamente neutra, non invasiva
          e in pubblico dominio. Per questo accompagna cinema, TV, spot e videogiochi senza mai rubare la scena.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Cinema</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Fuoco fatuo (1963), La mia cena con Andrè (1981), Un'altra donna (1988), I Tenenbaum (2001), Man on Wire (2008),
              About Schmidt (2002), Hugo Cabret (2011), Chocolat (2000).
            </p>
          </div>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">TV e pubblicità</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Usata in spot di profumi e auto di lusso; compare in serie come <strong>22.11.63</strong> (tratto da Stephen King)
              nei momenti più introspettivi.
            </p>
          </div>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Videogiochi</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>Mother 3</strong> (2006) con la traccia “Leder's Gymnopedie” e <strong>The Legend of Zelda: Ocarina of Time</strong>,
              il cui tema della schermata titolo richiama la Gymnopédie.
            </p>
          </div>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Arrangiamenti celebri</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Blood, Sweat &amp; Tears (1968, Grammy), Sky (1979), Gary Numan (1980), 12 Violoncellisti di Berlino (2007),
              Branford Marsalis (1990).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// VECCHIE SEZIONI (da riutilizzare/riorganizzare)
// ============================================

const IndiceSection = ({ goTo }) => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-400" />
        Indice dei contenuti
      </h2>
      <p className="text-sm text-slate-400 mt-1">
        Naviga le sezioni principali con una piccola sinossi e raggiungi subito il capitolo desiderato.
      </p>
      <div className="mt-5 space-y-4">
        {indiceBlocks.map((block) => (
          <div key={block.key} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-slate-100">{block.title}</div>
                <p className="text-xs text-slate-400 mt-1">{block.summary}</p>
                <ul className="mt-3 space-y-1 text-xs text-slate-400 list-disc list-inside">
                  {block.bullets.map((bullet) => (
                    <li key={`${block.key}-${bullet.label}`}>
                      <Tooltip text={bullet.tooltip}>
                        <span>{bullet.label}</span>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => goTo(block.key)}
                className="text-sm px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
              >
                Vai alla sezione
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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

  // Timeline dettagliata della vita di Satie
  const satieLifeTimeline = [
    {
      year: "1866",
      event: "Nascita a Honfleur, Normandia. Eric Alfred Leslie Satie nasce da madre scozzese e padre francese. Adotterà poi la grafia «Erik» con la k, in omaggio alle sue origini vichinghe."
    },
    {
      year: "1870",
      event: "Trasferimento a Parigi. Il padre viene arruolato nella Guardia Nazionale per la guerra Franco-Prussiana. La famiglia si trasferisce a Parigi nel 1871."
    },
    {
      year: "1872",
      event: "Morte della madre. Erik ha appena 6 anni. Viene mandato dai nonni paterni a Honfleur insieme al fratello Conrad, mentre la sorella Olga viene separata e mandata a Le Havre. La nonna Eulalie lo iscrive al Collège de Honfleur come pensionante. Inizia le prime lezioni di musica serie con Gustave Vinot, organista della chiesa di Saint-Léonard (pianoforte, organo, solfeggio, canto gregoriano)."
    },
    {
      year: "1878",
      event: "Morte della nonna. La nonna annega misteriosamente durante una nuotata quotidiana. I ragazzi tornano a Parigi dal padre che, pochi mesi dopo, nel 1879 si sposa con Eugénie, pianista e compositrice da salotto. Erik detesta la matrigna, lei, la sua musica, i suoi modi e sua madre."
    },
    {
      year: "1879",
      event: "Conservatorio di Parigi. La matrigna iscrive Erik al Conservatorio. L'esperienza sarà disastrosa. Studia pianoforte con un allievo di Chopin, ma viene giudicato 'dotato ma indolente' (1880), poi 'lo studente più pigro del Conservatorio' (1881)."
    },
    {
      year: "1882",
      event: "Espulsione dal Conservatorio. A 16 anni viene espulso dopo un'esecuzione mediocre del Finale della Sonata Op. 26 di Beethoven. I rapporti ufficiali parlano di esecuzione 'passabile' ma 'senza colore'. Tra il 1882 e il 1883 si dedica a letture voraci (Voltaire, Dumas, Andersen) e sviluppa le sue preferenze musicali: Bach sopra tutto, seguito da Chopin e Schumann."
    },
    {
      year: "1885",
      event: "Rientro al Conservatorio. Viene riammesso nella classe di pianoforte intermedio ma i giudizi restano duri: 'insignificante e laborioso', 'privo di valore'. Impiegava tre mesi per imparare un pezzo e non sapeva leggere a prima vista."
    },
    {
      year: "1886",
      event: "Servizio militare. Per sfuggire al Conservatorio e ridurre il servizio di leva da 5 anni a 1 anno, si arruola volontariamente nel 33º Reggimento di Fanteria ad Arras. Si espone deliberatamente al freddo contraendo una grave bronchite che gli permette di essere congedato nel 1887."
    },
    {
      year: "1887",
      event: "Abbandona definitivamente il Conservatorio. A 21 anni lascia per sempre l'istituzione. Uno dei suoi biografi, Orledge, parla di dislessia e resistenza alla tecnica virtuosistica e alla complessità contrappuntistica."
    },
    {
      year: "1887–1888",
      event: "Montmartre e le Gymnopédies. Entra nella vita bohémien del Montmartre di fine secolo. Lavora come secondo pianista al Chat Noir (Il Gatto Nero), cabaret artistico fondato nel 1881 da Rodolphe Salis, ritrovo di poeti, pittori, musicisti e scrittori d'avanguardia (Debussy, Verlaine, Toulouse-Lautrec). È in questo ambiente che stringe amicizia con Claude Debussy e incontra il poeta Patrice Contamine de Latour. Compone le tre Gymnopédies, brani che diventeranno le basi per musica impressionista, minimalista e d'ambiente."
    },
    {
      year: "1888",
      event: "Prima pubblicazione. Le tre Gymnopédies vengono completate. In questa epoca la Parigi della Belle Époque vive trasformazioni politiche e l'arte si spoglia da romanticismo e regole accademiche. Wagner domina l'Europa, Satie oppone un'armonia che crea vuoti, oscillazioni di settime maggiori e un futuro sospeso."
    },
    {
      year: "1891-1893",
      event: "Rosa-Croce e amori. Entra nell'Ordine della Rosa-Croce Cattolica del Tempio e del Graal, setta occultista fondata da Joséphin Péladan (Sâr Mérodack). Diventa compositore ufficiale e maestro di cappella. Nel 1892 rompe con Péladan (irritato dalla sua devozione wagneriana) e fonda la 'Chiesa Metropolitana d'Arte di Gesù Conduttore', di cui sarà l'unico membro. Nel 1893 ha un breve ma intenso amore con la pittrice Suzanne Valadon, l'unico documentato della sua vita. Quando lei lo lascia, Satie ne rimane segnato profondamente."
    },
    {
      year: "1896–1897",
      event: "Debussy orchestra due Gymnopédies. Dopo averle sentite suonare da Satie nel 1896, Debussy orchestra la n. 1 e n. 3 e le presenta alla Société Nationale il 20 febbraio 1897."
    },
    {
      year: "1898",
      event: "Trasferimento ad Arcueil. Si trasferisce ad Arcueil, sobborgo industriale a sud di Parigi. Affitta una stanzetta minuscola che chiama 'l'Armadio'. Non farà entrare nessuno per 27 anni, fino alla sua morte. Veste sempre di grigio o nero, con abiti di velluto identici (gli valsero i soprannomi 'Monsieur le Pauvre' e 'Velvet Gentleman')."
    },
    {
      year: "1925",
      event: "Morte a Parigi. Muore a 59 anni di cirrosi epatica. Gli amici entrano finalmente nella stanza chiamata 'l'Armadio' ad Arcueil e trovano: due pianoforti a coda uno sopra l'altro (quello sopra usato come deposito per la posta non aperta), oltre 100 ombrelli, sette abiti di velluto identici, spartiti inediti nascosti ovunque, dozzine di fazzoletti e collezioni di oggetti bizzarri."
    },
  ];

  // Modal con timeline biografica
  const LifeModal = () => (
    <div className="space-y-4">
      <div className="space-y-2.5">
        {satieLifeTimeline.map((item, idx) => (
          <React.Fragment key={idx}>
            <div
              className="flex flex-col sm:flex-row sm:items-start p-3 rounded-lg bg-slate-700 border-l-2 border-blue-600 shadow-sm"
            >
              <span className="font-semibold text-slate-200 text-sm w-32 shrink-0">
                {item.year}
              </span>
              <span className="text-slate-200 text-sm leading-relaxed">
                {item.event}
              </span>
            </div>
            {/* Immagini contestuali dopo eventi specifici */}
            {item.year === "1866" && (
              <div className="ml-4 rounded-lg overflow-hidden border border-slate-600">
                <img
                  src="/images/Honfleur.jpg"
                  alt="Honfleur, città natale di Erik Satie"
                  className="w-full h-48 object-cover"
                />
                <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                  Honfleur, Normandia: città natale di Satie sul porto della Senna
                </p>
              </div>
            )}
            {item.year === "1887" && (
              <div className="ml-4 rounded-lg overflow-hidden border border-slate-600">
                <img
                  src="/images/Conservatorio di Parigi.jpg"
                  alt="Conservatoire de Paris"
                  className="w-full h-48 object-cover"
                />
                <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                  Conservatoire de Paris: istituzione che giudicò Satie "il più pigro studente" e da cui fu espulso nel 1882, riammesso nel 1885, e abbandonato definitivamente nel 1887
                </p>
              </div>
            )}
            {item.year === "1887–1888" && (
              <div className="ml-4 rounded-lg overflow-hidden border border-slate-600">
                <img
                  src="/images/Auberge du clou.jpg"
                  alt="Auberge du Clou cabaret"
                  className="w-full max-h-80 object-cover"
                />
                <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                  Auberge du Clou: celebre cabaret di Montmartre dove Satie suonò dopo il Chat Noir
                </p>
              </div>
            )}
            {item.year === "1888" && (
              <div className="ml-4 grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden border border-slate-600">
                  <img
                    src="/images/6_Rue_Cortot -.jpeg"
                    alt="6 Rue Cortot, Montmartre"
                    className="w-full max-h-80 object-cover"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                    6 Rue Cortot, Montmartre: abitazione di Satie durante la composizione delle Gymnopédies
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                  <img
                    src="/images/El_bohemi_by_Ramon_Casas-1.jpg"
                    alt="El bohemi di Ramon Casas"
                    className="w-full max-h-80 object-contain mx-auto"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                    "El bohemi" (Ramon Casas, 1891): ritratto della vita bohémien a Montmartre
                  </p>
                </div>
              </div>
            )}
            {item.year === "1891-1893" && (
              <div className="ml-4 grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                  <img
                    src="/images/Peladan.jpg"
                    alt="Joséphin Péladan, Sâr Mérodack"
                    className="w-full max-h-80 object-contain mx-auto"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                    Joséphin Péladan (Sâr Mérodack): fondatore della Rosa-Croce Cattolica del Tempio e del Graal
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-600">
                  <img
                    src="/images/satie-e-valadon.jpg"
                    alt="Erik Satie e Suzanne Valadon"
                    className="w-full max-h-80 object-cover"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                    Erik Satie e Suzanne Valadon: l'unico amore documentato della sua vita (1893)
                  </p>
                </div>
              </div>
            )}
            {item.year === "1896–1897" && (
              <div className="ml-4 rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/Bonjour-Biquii.jpg"
                  alt="Spartito di Bonjour Biqui, Bonjour!"
                  className="w-full max-h-80 object-contain mx-auto"
                />
                <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                  "Bonjour Biqui, Bonjour!" (2 aprile 1893): brevissima canzone (4 battute) composta da Satie come regalo pasquale per Suzanne Valadon, soprannominata affettuosamente "Biqui"
                </p>
              </div>
            )}
            {item.year === "1898" && (
              <div className="ml-4 rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/valadon-satie-1892-ritratto.jpg"
                  alt="Ritratto di Erik Satie di Suzanne Valadon"
                  className="w-full max-h-80 object-contain mx-auto"
                />
                <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
                  "Ritratto di Erik Satie" (1892-93) di Suzanne Valadon, olio su tela, 41 x 22 cm, Centre Pompidou, Parigi. Uno dei primi oli di Valadon, ritrae Satie con binocoli, capelli lunghi e barba rossastra
                </p>
              </div>
            )}
          </React.Fragment>
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
          src="/images/Manoscritto-di-Erik-Satie-della-prima-Gymnopedie.jpg"
          alt="Manoscritto autografo della Gymnopédie n. 1"
          className="w-full h-56 object-cover rounded-lg"
        />
        <p className="text-sm text-slate-400 mt-2 italic text-center">
          Manoscritto autografo di Erik Satie della prima Gymnopédie (1888)
        </p>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-amber-500 mb-3">
        <h5 className="text-base font-semibold text-slate-100 mb-2">Composizione (febbraio-aprile 1888)</h5>
        <p className="mb-2">
          Satie compose le tre Gymnopédies tra <strong>febbraio e aprile 1888</strong>, completandole entro il <strong>2 aprile</strong>. Aveva 21 anni, era appena uscito dal Conservatorio e lavorava come pianista al Chat Noir.
        </p>
        <p className="text-sm text-slate-300 italic bg-slate-900/40 p-3 rounded border-l-2 border-blue-400">
          <strong>L'aneddoto del dicembre 1887:</strong> Un amico di Satie lo presentò a Rodolphe Salis (proprietario del Chat Noir) annunciandolo come <em>«Erik Satie, gymnopediste»</em>. Salis, colto di sorpresa, commentò sarcastico: <em>«Davvero una bella professione!»</em> Due mesi dopo, Satie si sentì in dovere di produrre effettivamente queste composizioni.
        </p>
      </div>

      {/* Box dedicato all'origine del titolo "Gymnopédie" */}
      <div className="bg-linear-to-br from-blue-900/30 via-slate-800 to-slate-800 border-2 border-blue-500/40 rounded-xl p-6 mb-4">
        <h5 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
          📜 L'origine del titolo "Gymnopédie"
        </h5>

        <div className="mb-4">
          <p className="text-sm text-slate-300 mb-3">
            Il termine <strong className="text-blue-200">Gymnopédie</strong> deriva dal greco antico <strong>Γυμνοπαιδίαι (Gymnopaedia)</strong>,
            una festività spartana annuale in cui giovani danzavano nudi (<em>gymnos</em> = nudo) eseguendo esercizi ginnici e canti corali in onore di Apollo.
          </p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-500/20 mb-4">
          <h6 className="text-sm font-bold text-blue-200 mb-3">Da dove Satie conobbe questo termine?</h6>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              <div>
                <strong className="text-blue-200">Il poema di Contamine de Latour:</strong> La prima Gymnopédie fu pubblicata nell'estate 1888
                insieme a un estratto del poema <em>Les Antiques</em> del suo amico poeta J. P. Contamine de Latour, dove il termine appare esplicitamente.
                La prima Gymnopédie aveva il titolo iniziale <em>Danse antique</em>.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              <div>
                <strong className="text-blue-200">Dizionari musicali francesi:</strong> Il termine "gymnopédie" era presente nel <em>Dictionnaire de Musique</em>
                di Jean-Jacques Rousseau (1775), dove è descritta come "un'aria o canto su cui giovani lacedemoni danzavano nudi".
                Anche il <em>Grand Dictionnaire universel du XIXe siècle de Larousse</em> riporta il termine.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              <div>
                <strong className="text-blue-200">Salammbô di Flaubert:</strong> Satie stesso e il suo amico Alexis Roland-Manuel sostennero
                che il titolo fu ispirato dalla lettura del romanzo <em>Salammbô</em> (1862) di Gustave Flaubert, ambientato nell'antica Cartagine.
                <span className="block mt-1.5 text-sm text-amber-300 italic">
                  ⚠️ Nota importante: Il termine "gymnopédie" NON appare nel testo di Salammbô. L'ispirazione fu probabilmente l'atmosfera arcaica e rituale del romanzo.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              <div>
                <strong className="text-blue-200">Puvis de Chavannes:</strong> I dipinti simbolisti del pittore Pierre Puvis de Chavannes,
                in particolare <em>Jeunes filles au bord de la mer</em> (1879), potrebbero aver ispirato Satie.
                Egli aspirava a comporre musica "decorativa" come gli affreschi del pittore: serena, atemporale, contemplativa.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-sm text-slate-400 italic">
          L'origine esatta rimane dibattuta tra gli studiosi, ma è probabile una combinazione di queste influenze:
          il poema di Latour, i dizionari musicali, l'atmosfera di Salammbô e i dipinti simbolisti.
        </p>
      </div>

      {/* Immagini contestuali per il titolo */}
      <div className="grid sm:grid-cols-2 gap-3 my-4">
        <div className="rounded-lg overflow-hidden border border-slate-600">
          <img
            src="/images/Gymnopedie greche.jpeg"
            alt="Rappresentazione delle gymnopédie dell'antica Grecia"
            className="w-full max-h-64 object-cover"
          />
          <p className="text-sm text-slate-400 p-2 italic bg-slate-800">
            Gymnopédie spartane: danze rituali dell'antica Grecia con giovani guerrieri
          </p>
        </div>
        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
          <img
            src="/images/PatriceContamine.jpg"
            alt="J. P. Contamine de Latour"
            className="w-full max-h-64 object-contain mx-auto"
          />
          <p className="text-sm text-slate-400 p-2 italic bg-slate-900">
            J. P. Contamine de Latour: poeta simbolista, autore di "Les Antiques" pubblicata con la prima Gymnopédie
          </p>
        </div>
        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950 sm:col-span-2">
          <img
            src="/images/Arts_and_the_Muses_by_Pierre_Puvis_de_Chavannes.jpg"
            alt="The Arts and the Muses di Pierre Puvis de Chavannes"
            className="w-full max-h-64 object-contain mx-auto"
          />
          <p className="text-sm text-slate-400 p-2 italic bg-slate-900">
            "The Arts and the Muses" (Pierre Puvis de Chavannes): pittura simbolista che ispirò Satie
          </p>
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-blue-500 mb-3">
        <h5 className="text-base font-semibold text-slate-100 mb-2">Storia editoriale complessa</h5>
        <p className="mb-2 text-sm">
          <strong>Prima Gymnopédie:</strong> Pubblicata il <strong>18 agosto 1888</strong> nel secondo supplemento di <em>La Musique des familles</em> (rivista diretta dal padre Alfred Satie). Originariamente intitolata <strong>«Danse antique»</strong>, dedicata a Jeanne de Bret. Accompagnata da un estratto della poesia <em>Les Antiques</em> di Contamine de Latour.
        </p>
        <p className="mb-2 text-sm">
          <strong>Terza Gymnopédie:</strong> Pubblicata nel <strong>novembre 1888</strong>, dedicata al compositore Charles Levadé.
        </p>
        <p className="mb-2 text-sm">
          <strong>Seconda Gymnopédie:</strong> Pubblicata solo nel <strong>1895</strong>, dedicata al fratello Conrad.
        </p>
        <p className="mb-2 text-sm">
          <strong>Serie completa:</strong> Pubblicata nel <strong>1898</strong>, in coincidenza con l'orchestrazione di Debussy.
        </p>
        <p className="text-sm text-slate-400 italic">
          L'accoglienza iniziale fu tiepida. I brani erano considerati avanguardistici: «infrangevano praticamente ogni regola musicale» dell'epoca. Solo vent'anni dopo, quando l'arte d'avanguardia divenne più accettata, le Gymnopédies iniziarono a godere di successo.
        </p>
      </div>

      <p>
        Il titolo richiama la <strong>gymnopaedia</strong>, festa spartana con danze rituali dell'antica Grecia. Questo binomio lega l'ancestrale (gymnopaedia) al nuovo minimalismo francese, costruendo un immaginario arcaico e volutamente enigmatico.
      </p>
      <p>
        Nel <strong>1896–1897</strong> Claude Debussy, dopo aver ascoltato Satie suonare le tre pagine, decise di
        orchestrare i numeri <strong>1</strong> e <strong>3</strong> (invertendo la numerazione). La prima esecuzione orchestrale si tenne il
        <strong> 20 febbraio 1897</strong> in un concerto della Société Nationale, svelando a Parigi quanto la trasparenza di Satie potesse viaggiare oltre il pianoforte.
      </p>
      <p>
        La seconda Gymnopédie venne pubblicata solo nel <strong>1895</strong>, mentre l'edizione integrale dei tre
        pezzi uscì nel <strong>1898</strong>. La ricezione fu lenta ma costante: dalla metà del XX secolo, la
        n. 1 divenne un'icona del minimalismo e fu oggetto di innumerevoli arrangiamenti, campionamenti (Blood, Sweat & Tears, Janet Jackson, PinkPantheress), e utilizzi in film, serie TV e videogiochi.
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
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
          <span>
            <strong>Pulsazione:</strong> 3/4 stabile, senza accenti marcati da danza.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
          <span>
            <strong>Voce superiore:</strong> canto semplice, leggero e continuo senza pesantezza.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
          <span>
            <strong>Pedale:</strong> cambi frequenti per evitare impasti; usare il pedale come filtro timbrico.
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <ChevronRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
          <span>
            <strong>Dinamica:</strong> curva breve con crescendi e diminuendi contenuti; evitare forti improvvisi.
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <div id="introduzione" className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Modale principale */}
      {modalContent && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalContent(null)}
        >
          <div
            className="w-full max-w-4xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                {modalContent.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-slate-300 hover:text-white text-sm font-semibold px-3 py-1 rounded hover:bg-slate-800"
              >
                chiudi
              </button>
            </div>
            <div className="p-5 max-h-[calc(90vh-8rem)] overflow-y-auto">{modalContent.content}</div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-linear-to-br from-slate-800 to-slate-900 text-slate-100 p-8 rounded-2xl shadow-2xl border border-slate-600">
        <h2 className="text-center text-3xl font-[family:'Cinzel',serif] font-bold tracking-[0.14em] mb-6 text-blue-300 leading-tight">
          Gymnopédie n. 1 <br /> (Trois Gymnopédies)
        </h2>
        <div className="mb-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-slate-900 p-3">
            <img
              src="/images/Manoscritto-di-Erik-Satie-hero.jpg"
              alt="Manoscritto autografo di Erik Satie - Gymnopédie n. 1"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            La <strong>Gymnopédie n. 1</strong> è la prima di tre pagine per pianoforte composte da Erik Satie e
            completate entro la primavera del <strong>1888</strong>. L'autore le definì "danze lente", costruite
            con pochi elementi ripetuti e dissonanze controllate. Satie stesso scrisse: <em>«Sono venuto al mondo molto giovane in un tempo molto vecchio»</em>, una frase che riassume la sua posizione di outsider in un'epoca dominata dal wagnerismo.
          </p>
          <p>
            Nel <strong>1888</strong> Parigi vive le trasformazioni della <Tooltip text="Periodo di grande fermento artistico, scientifico e culturale (fine Ottocento – 1914), con grandi saloni, progresso e fiducia nel futuro.">Belle Époque</Tooltip>: la Torre Eiffel si costruisce, Pasteur e Hertz rompono paradigmi scientifici, e l'arte si spoglia dal romanticismo e dalle regole accademiche. In questo contesto, Satie — un ragazzo di 21 anni, pianista cabaret a <Tooltip text="Quartiere parigino dei café-cabaret dove Satie lavorò come pianista e trovò ispirazione per il suo stile sobrio.">Montmartre</Tooltip> — compone tre piccoli brani che diventano le basi per la musica impressionista, minimalista e d'ambiente. Quanti pianisti principianti e non hanno desiderato suonarle, scoprendo poi che non era poi così semplice!
          </p>
          <p>
            Il titolo{' '}
            <Tooltip text="Richiama la gymnopaedia: festa con danze rituali dell'antica Grecia (festa spartana con danze rituali). In Satie il riferimento rimane un enigma poetico.">
              Gymnopédie
            </Tooltip>{' '}
            suggerisce un contesto arcaico senza chiarirlo. Secondo alcune testimonianze, Satie trasse
            spunto dai <em>modi greci</em>, da romanzi di <em>Gustave Flaubert</em> e dalla poesia <em>Les Antiques</em> di J. P. Contamine de
            Latour (amico simbolista), pubblicata insieme alla n. 1 nell'estate del 1888.
          </p>
          <p>
            La pagina uscì con l'indicazione{' '}
            <Tooltip text="Tempo lento e doloroso: guida l'espressione e la qualità timbrica.">
              Lent et douloureux
            </Tooltip>{' '}
            e rimase quasi sconosciuta fino a quando <strong>Claude Debussy</strong> non orchestrò due numeri (1 e 3, invertendo la numerazione) e li
            presentò il 20 febbraio 1897 alla Société Nationale. Oggi la n. 1 è considerata un prototipo del minimalismo musicale e
            continua a ispirare arrangiamenti in ogni genere.
          </p>
        </div>
        {/* Quattro card principali */}
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <User className="w-5 h-5 text-blue-400 mr-2" />
              Biografia: Erik Satie
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              La vita del compositore (1866-1925): da Honfleur a Montmartre, fino ad Arcueil.
            </p>
            <button
              onClick={() => openModal("La vita di Erik Satie (1866-1925)", <LifeModal />)}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center group"
            >
              Apri timeline
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center">
              <Library className="w-5 h-5 text-blue-400 mr-2" />
              Storia del brano
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              Dalla composizione (1888) alle orchestrazioni di Debussy (1897) e oltre.
            </p>
            <button
              onClick={() => openModal("Storia della Gymnopédie n.1", <GymnopedieTimelineModal />)}
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
            <p className="text-sm text-slate-400 italic">
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
                <h3 className="text-lg font-semibold">Curiosità: contesto e ricezione</h3>
              </div>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${openCuriosita ? "rotate-180" : ""}`} />
          </button>
          {openCuriosita && (
            <div className="p-6 pt-24 bg-slate-900 space-y-4 text-sm text-slate-300 leading-relaxed">
              <h4 className="text-lg font-semibold text-slate-100 mb-3">
                Contesto biografico e compositivo
              </h4>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-amber-500">
                <h5 className="text-base font-semibold text-slate-100 mb-2">Il Conservatorio di Parigi: disillusione e resistenza</h5>
                <p className="mb-2">
                  Satie frequentò il Conservatorio in due periodi (1879–1882 e 1885–1887) con risultati disastrosi.
                  Fu giudicato "dotato ma indolente" (1880), "lo studente più pigro del Conservatorio" (1881),
                  "insignificante e laborioso" (1885), e "privo di valore". Nel 1882, a 16 anni, venne espulso dopo
                  un'esecuzione mediocre del Finale della Sonata Op. 26 di Beethoven.
                </p>
                <p className="text-sm text-slate-400 italic">
                  Tra il 1882 e il 1883, fuori dal Conservatorio, si dedicò a letture voraci (Voltaire, Dumas, Andersen)
                  e sviluppò le sue preferenze musicali: Bach sopra tutto, seguito da Chopin e Schumann. Orledge, uno dei
                  suoi biografi, parla di dislessia e resistenza alla tecnica virtuosistica.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-blue-500">
                <h5 className="text-base font-semibold text-slate-100 mb-2">Montmartre 1887–1888: il pianista cabaret</h5>
                <p className="mb-2">
                  A 21 anni, dopo aver abbandonato definitivamente il Conservatorio e dopo un breve servizio militare
                  (dal quale uscì dopo essersi procurato deliberatamente una bronchite), Satie trova lavoro come <strong>secondo pianista</strong> al <strong>Chat Noir</strong>, cabaret artistico fondato nel 1881 da Rodolphe Salis. Non è solo un locale dove bere: è un luogo di sperimentazione dove poeti, pittori e musicisti si mescolano, discutono, collaborano. Vi passarono Claude Debussy, Paul Verlaine, Toulouse-Lautrec.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 my-3">
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                    <img
                      src="/images/Le chat noir.jpg"
                      alt="Le Chat Noir cabaret"
                      className="w-full h-64 object-contain bg-slate-900 p-2"
                    />
                    <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                      Le Chat Noir: celebre cabaret di Montmartre fondato da Rodolphe Salis (1881), dove Satie lavorò come secondo pianista
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                    <img
                      src="/images/Auberge du clou.jpg"
                      alt="Auberge du Clou cabaret"
                      className="w-full h-64 object-contain bg-slate-900 p-2"
                    />
                    <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                      Auberge du Clou: altro celebre cabaret di Montmartre frequentato da artisti bohémien
                    </p>
                  </div>
                </div>
                <p className="mb-2">
                  È in questo <Tooltip text="Spirito libero, anti-accademico e nomade delle arti, che abbraccia irriverenza, performance e libertà espressiva.">ambiente bohémien</Tooltip> che Satie stringe amicizia con Claude Debussy e incontra il poeta <strong>Patrice Contamine de Latour</strong>, la cui influenza sarà determinante per la genesi delle Gymnopédies. La poesia <em>Les Antiques</em> di Contamine accompagnerà la prima pubblicazione della Gymnopédie n. 1 nell'estate 1888.
                </p>
                <p className="text-sm text-slate-400 italic">
                  L'ambiente di Montmartre, con i suoi café-cabarets, il simbolismo e l'esoterismo, gli offre una libertà
                  artistica che il Conservatorio gli aveva negato. La musica non è un rito religioso da sala da concerto, ma accompagnamento alla vita, al fumo, all'alcol, alla poesia. L'arte 'alta' si mescola con la cultura popolare. Satie oppone a Wagner — che domina l'Europa — un'armonia
                  che crea vuoti, oscillazioni di settime maggiori e un futuro sospeso invece di tensioni drammatiche.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-emerald-500 mt-4">
                <h5 className="text-base font-semibold text-slate-100 mb-2">La Francia del 1888: Belle Époque e fermento</h5>
                <p className="mb-2">
                  Il 1888 è un anno di fermento culturale e scientifico. La <strong>Torre Eiffel</strong> è in costruzione per l'Esposizione Universale del 1889 (sarà inaugurata il 31 marzo 1889). <strong>Louis Pasteur</strong> fonda l'Istituto Pasteur (teoria dei germi che rivoluziona la medicina). <strong>Heinrich Hertz</strong> dimostra l'esistenza delle onde elettromagnetiche, aprendo la strada alla radio. <strong>George Eastman</strong> brevetta la prima fotocamera portatile Kodak.
                </p>
                <p className="mb-2 text-sm">
                  In questo contesto di trasformazione, Parigi è la capitale mondiale dell'arte. L'Impressionismo ha già rivoluzionato la pittura, ma ora nascono nuove correnti. Il <strong>Simbolismo</strong> domina la letteratura e si infiltra nelle arti visive: i simbolisti rifiutano il realismo descrittivo in favore dell'evocazione, del sogno, della corrispondenza tra i sensi (sinestesia). Satie associa la sua musica al colore bianco, creando quello che definirà 'musica bianca': priva di ornamenti, trasparente, essenziale.
                </p>
                {/* Immagine Belle Époque */}
                <div className="mt-4 rounded-lg overflow-hidden border border-emerald-500/30">
                  <img
                    src="/images/parigi-belle-epoque-1888.jpg"
                    alt="Parigi Belle Époque 1888"
                    className="w-full h-56 object-contain bg-slate-900 p-2"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                    Parigi 1888: Torre Eiffel in costruzione, Esposizione Universale
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-purple-500 mt-4">
                <h5 className="text-base font-semibold text-slate-100 mb-2">La rivoluzione armonica: l'altalena che non tocca mai terra</h5>
                <p className="mb-2">
                  Le prime quattro battute della Gymnopédie n.1 sono tra le più innovative della storia della musica. Il brano non inizia sul Re (la 'casa' tonale), ma su un <strong>accordo di Sol maggiore</strong> (la sottodominante). Poi alterna continuamente:
                </p>
                <ul className="text-sm list-disc list-inside space-y-1 mb-2">
                  <li><strong>Battuta 1:</strong> Sol maggiore con settima (Sol-Si-Re-Fa#)</li>
                  <li><strong>Battuta 2:</strong> Re maggiore con settima (Re-Fa#-La-Do#)</li>
                  <li><strong>Battute 3-4:</strong> ripetizione</li>
                </ul>
                <p className="text-sm text-slate-400 italic">
                  Questa alternanza a pendolo crea un effetto fluttuante, privo del tipico movimento armonico. È come dondolarsi su un'altalena che non tocca mai terra. Le note Fa# e Do# funzionano da 'collante' tra i due accordi. Nella musica tradizionale, l'armonia funziona come una storia: c'è tensione (la dominante) che si risolve nella calma (la tonica). <strong>Satie elimina questa narrazione.</strong> Non c'è climax, non c'è conclusione. Solo contemplazione.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-rose-500 mt-4">
                <h5 className="text-base font-semibold text-slate-100 mb-2">Debussy e la svolta orchestrale: aiutare l'amico</h5>
                <p className="mb-2">
                  Nel 1896, a casa del direttore d'orchestra <strong>Gustave Doret</strong>, Satie eseguì le Gymnopédies al pianoforte. Secondo le cronache, non le suonò particolarmente bene. Ma Doret ne rimase così colpito da commissionare a Claude Debussy l'orchestrazione. L'intervento di Debussy aveva anche motivazioni pratiche: nel 1896 la popolarità e la situazione finanziaria di Satie erano in declino, mentre Debussy godeva di crescente successo.
                </p>
                <p className="mb-2 text-sm">
                  <em>«Questa fu l'unica occasione in cui Debussy orchestrò l'opera di un altro compositore.»</em> — Robert Orledge, musicologo
                </p>
                <p className="mb-2">
                  Debussy orchestrò solo la n.1 e n.3, ritenendo che la n.2 «non si prestasse all'orchestrazione». Curiosamente, <strong>invertì la numerazione</strong> nella pubblicazione: la Prima di Satie divenne la «Terza» orchestrale, e viceversa.
                </p>
                <p className="text-sm text-slate-400 italic">
                  <strong>Scelte timbriche:</strong> Debussy scelse un organico contenuto per preservare il carattere intimo: 2 flauti, 1 oboe, 4 corni, 2 arpe, archi con sordina. L'oboe porta la linea melodica malinconica, le arpe ricreano le figure accompagnamentali gentili del pianoforte, gli archi con sordina forniscono supporto armonico mantenendo la trasparenza. Prima esecuzione: 20 febbraio 1897 alla Société Nationale. Riproposta il 25 marzo 1911 con la direzione dello stesso Debussy.
                </p>
                <p className="text-sm text-slate-400 italic">
                  Placeholder: contenuti aggiuntivi sulla ricezione orchestrale.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-cyan-500 mt-4">
                <h5 className="text-base font-semibold text-slate-100 mb-2">Eredità e influenze: da Cage all'ambient</h5>
                <p className="mb-2">
                  L'influenza di Satie sulla musica del Novecento è enorme. <strong>Claude Debussy</strong> fu profondamente influenzato dall'amico. <strong>Maurice Ravel</strong> ammirava Satie ed eseguì le sue opere in concerto. Il <strong>Gruppo dei Sei</strong> (Poulenc, Milhaud, Honegger, Auric, Durey, Tailleferre) considerava Satie un padre spirituale: rifiutavano wagnerismo e impressionismo, cercando una musica più diretta e quotidiana.
                </p>
                <p className="mb-2 text-sm">
                  <strong>John Cage</strong> (1912-1992) fu il grande riscopritore di Satie nel dopoguerra. <em>«Satie è indispensabile»</em> — trovò in lui un precursore: rifiuto della narrazione musicale, interesse per silenzio e spazio, musica come processo. Nel 1963 organizzò la prima esecuzione integrale di <em>Vexations</em> (tema ripetuto 840 volte, circa 18 ore), anticipando il minimalismo.
                </p>
                <div className="rounded-lg overflow-hidden border border-slate-600 my-3 bg-slate-950">
                  <img
                    src="/images/Commento su esecuzione vexations.jpg"
                    alt="Commento su esecuzione di Vexations"
                    className="w-full h-24 object-contain"
                  />
                  <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                    Placeholder: commento su un'esecuzione di Vexations.
                  </p>
                </div>
                <p className="mb-2 text-sm">
                  I <strong>minimalisti americani</strong> (Steve Reich, Philip Glass, Terry Riley) riconoscono in Satie un antenato. Le Gymnopédies anticipano: ripetizione di pattern, armonia statica, rifiuto del climax, economia di mezzi.
                </p>
                <p className="text-sm text-slate-400 italic">
                  <strong>Brian Eno e la musica ambient:</strong> Nel 1917 Satie concepì la <em>Musique d'ameublement</em> (musica d'arredamento): composizioni pensate per far parte dell'ambiente, non per essere ascoltate attentamente. Nel 1978 Eno pubblicò <em>Ambient 1: Music for Airports</em>, riconoscendo il debito: <em>«La musica ambiente deve poter ospitare molti livelli di attenzione d'ascolto senza imporne uno in particolare»</em>. Le Gymnopédies, sebbene non pensate come musica d'arredamento, ne condividono l'estetica. Le playlist «Lo-fi beats to study to» che spopolano oggi devono molto a Satie.
                </p>
                <p className="text-sm text-slate-400 italic">
                  Placeholder: approfondimento Cage & ambient.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-fuchsia-500 mt-4">
                <h5 className="text-base font-semibold text-slate-100 mb-2">Cinema, TV e cultura pop: l'onnipresenza della Gymnopédie</h5>
                <p className="mb-2">
                  La Gymnopédie n.1 è una delle musiche classiche più utilizzate nei media. Perché funziona così bene? <strong>Riconoscibilità</strong> (bastano le prime note), <strong>neutralità emotiva</strong> (né troppo allegra né troppo triste), <strong>non invasività</strong> (accompagna senza sovrastare, perfetta per la «musica d'arredamento»), <strong>pubblico dominio</strong> (libera da copyright).
                </p>
                <div className="grid sm:grid-cols-2 gap-2 mb-2 text-sm">
                  <div className="bg-slate-900/50 p-2 rounded">
                    <strong>Film:</strong> Fuoco fatuo (1963, Louis Malle - sequenza iconica), I Tenenbaum (2001, Wes Anderson), Man on Wire (2008, Philippe Petit), Un'altra donna (1988, Woody Allen), Hugo Cabret (2011, Scorsese), About Schmidt (2002), Chocolat (2000)
                  </div>
                  <div className="bg-slate-900/50 p-2 rounded">
                    <strong>TV & Videogiochi:</strong> Serie 22.11.63 (Stephen King), spot pubblicitari (profumi, auto di lusso), Mother 3 (2006, «Leder's Gymnopedie»), The Legend of Zelda: Ocarina of Time (tema schermata titolo)
                  </div>
                </div>
                <p className="text-sm text-slate-400 italic">
                  <strong>Arrangiamenti celebri:</strong> Blood, Sweat & Tears (1968, «Variations on a Theme by Erik Satie», Grammy Award), Sky (1979, album debutto), Gary Numan (1980), 12 Violoncellisti di Berlino (2007, arrangiamento Kaiser-Lindemann), Branford Marsalis (1990, sassofono jazz).
                </p>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-lg border-l-2 border-blue-500/30 mt-2">
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
    <div id="analysis" className="space-y-6 max-w-5xl mx-auto">
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

        {/* Immagini esemplificative tecniche */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/spartito-annotato-gymnopedies.jpg"
              alt="Spartito annotato con indicazioni esecutive"
              className="w-full h-64 object-contain"
            />
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-200 mb-1">Spartito annotato con indicazioni</p>
              <p className="text-sm text-slate-400 italic">Esempi di pedale, fraseggio, dinamiche (placeholder)</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/IMMAGINE MANI.jpg"
              alt="Posizione delle mani al pianoforte"
              className="w-full h-64 object-contain"
            />
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-200 mb-1">Posizione delle mani</p>
              <p className="text-sm text-slate-400 italic">Tecnica pianistica per Gymnopédies (placeholder)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Box Curiosità per intenditori */}
      <div className="bg-linear-to-br from-amber-900/20 via-slate-900 to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-3">
          <span className="text-2xl">💎</span>
          Curiosità per intenditori
        </h3>
        <div className="space-y-5">
          <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-5">
            <h4 className="text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
              🎹 Il segreto armonico: la nota Fa#
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Perché la Gymnopédie n.1 suona così <strong>fluida e sospesa</strong>? Il segreto risiede in una singola nota: il <strong className="text-amber-300">Fa#</strong>.
              Questa nota appartiene <em>contemporaneamente</em> sia all'accordo di <strong>Sol maggiore settima</strong> (Sol-Si-Re-Fa#)
              sia all'accordo di <strong>Re maggiore settima</strong> (Re-Fa#-La-Do#).
              Il Fa# funge da <strong className="text-amber-200">collante armonico</strong>, permettendo all'altalena armonica di oscillare
              senza mai toccare terra, creando quella sensazione di <em>galleggiamento senza tempo</em> che caratterizza il brano.
            </p>
            <p className="text-sm text-slate-400 mt-3 italic">
              💡 Questo stile era già stato abbozzato nelle <em>Sarabandes</em> (1887), composte l'anno precedente.
            </p>
            {/* Immagine esemplificativa */}
            <div className="mt-4 rounded-lg overflow-hidden border border-amber-500/20">
              <img
                src="/images/nota ricorrente-Fa-diesis-gymnopedie-.jpeg"
                alt="Analisi armonica del Fa# collante"
                className="w-full h-48 object-contain bg-slate-900 p-2"
              />
              <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                Visualizzazione grafica del Fa# come ponte tra Sol maj7 e Re maj7 (placeholder)
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-5">
            <h4 className="text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
              🎭 "Esoterik Satie" e l'ossessione per il numero 3
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              A Montmartre negli anni '90, lo scrittore <strong>Alphonse Allais</strong> soprannominò Satie <strong className="text-amber-300">"Esoterik Satie"</strong>
              – un gioco di parole che univa il suo nome ai suoi interessi mistici (Rosa-Croce, esoterismo) e al suo aspetto caratteristico:
              cappello a cilindro, lunghi capelli, mantello nero.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Satie aveva un'<strong>ossessione mistica per il numero tre</strong>, derivata dal simbolismo trinitario dei Rosa-Croce.
              Non è casuale che compose <strong className="text-amber-200">TRE</strong> Gymnopédies, <strong>TRE</strong> Sarabandes (1887),
              <strong>TRE</strong> Gnossiennes iniziali (1890). Questa ossessione numerologica rivela l'influenza profonda
              dell'esoterismo sulla sua estetica compositiva.
            </p>
            {/* Immagine esemplificativa */}
            <div className="mt-4 rounded-lg overflow-hidden border border-amber-500/20">
              <img
                src="/images/satie-ritratto-giovane.jpg"
                alt="Ritratto di Erik Satie giovane"
                className="w-full h-56 object-contain bg-slate-900 p-2"
              />
              <p className="text-sm text-slate-400 p-2 italic bg-slate-900/50">
                Erik Satie in gioventù: cappello a cilindro e aspetto bohémien (placeholder)
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-5">
            <h4 className="text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
              🎼 Gymnopédies vs Gnossiennes: differenze cruciali
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold text-amber-300 mb-2">GYMNOPÉDIES</p>
                <ul className="text-sm text-slate-300 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Metro regolare (3/4) con stanghette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Atmosfera dolce e malinconica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Eleganza austera e rituale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Indicazioni francesi tradizionali</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-300 mb-2">GNOSSIENNES</p>
                <ul className="text-sm text-slate-300 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Senza stanghette (metro "libero")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Atmosfere arcane ed esotiche</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Mistero e gnosi orientaleggiante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Indicazioni bizzarre ("con stupore")</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4 italic">
              💬 Il critico Constant Lambert: le Gymnopédies sono come "camminare attorno a una scultura",
              le Gnossiennes come "entrare in un tempio sconosciuto".
            </p>
          </div>

          <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-5">
            <h4 className="text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
              🌟 La riscoperta: Debussy (1897) e Ravel (1911)
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              <strong>Claude Debussy</strong> orchestrò le Gymnopédies n.1 e n.3 nel <strong className="text-amber-300">1897</strong>
              per aiutare l'amico Satie in difficoltà finanziarie. Fu l'unica volta che Debussy orchestrò l'opera di un altro compositore.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ma fu <strong>Maurice Ravel</strong> a dare l'impulso decisivo alla popolarità di Satie. Nel <strong className="text-amber-300">1911</strong>,
              Ravel eseguì pubblicamente la Gymnopédie n.3, contribuendo alla "riscoperta" dopo anni di oblio.
              Questo evento segnò l'inizio del riconoscimento di Satie presso i giovani compositori del <em>Groupe des Six</em>,
              che lo acclamarono come "maestro" e precursore dell'anti-romanticismo.
            </p>
          </div>
        </div>
      </div>

      {/* Immagini di supporto analitico */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-400" />
          Materiali di studio e analisi
        </h3>
        <div className="grid sm:grid-cols-1 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/Modi greci.jpg"
              alt="Schema dei modi greci e rappresentazione del Fa diesis"
              className="w-full h-48 object-contain bg-slate-950 p-3"
            />
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-200 mb-1">Schema dei modi greci e Fa diesis</p>
              <p className="text-sm text-slate-400 italic">
                Dorico, frigio, lidio: i modi della Grecia antica che ispirarono Satie fungono da cornice per il pedale interno di Fa diesis.
                La nota Fa# attraversa simultaneamente gli accordi di Sol maggiore settima e Re maggiore settima, mantenendo il brano sospeso come un'altalena che non tocca mai terra.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PdfScoreViewer />
    </div>
  );
};

// Sezione Interpreti: struttura pronta per incollare link e note
const InterpretersSection = () => {
  // dati predefiniti: il front-end rimane vuoto se nessun link è fornito
  const interpretersData = [
    {
      name: "Piano solo",
      artistDescription: "Khatia Buniatishvili: pianista georgiana di fama internazionale, nota per la sua espressività e il repertorio romantico e impressionista. • Aldo Ciccolini: pianista italo-francese, celebre interprete della musica francese, in particolare di Satie, e figura di riferimento per la scuola pianistica europea del Novecento.",
      items: [
        {
          label: "Esecuzioni pianistiche celebri",
          note:
            "Due interpretazioni di riferimento per la Gymnopédie n.1: una moderna e una storica.",
          links: [
            {
              title: "Khatia Buniatishvili (YouTube)",
              url: "https://www.youtube.com/watch?v=TL0xzp4zzBE",
              description:
                "Interpretazione pianistica recente e molto ascoltata di Gymnopédie No.1 da parte di Khatia Buniatishvili. La performance si distingue per fraseggio fluido e attenzione alla dinamica, proponendo un equilibrio tra chiarezza e introspezione, adatto a un pubblico moderno."
            },
            {
              title: "Aldo Ciccolini (YouTube)",
              url: "https://www.youtube.com/watch?v=2WfaotSK3mI",
              description:
                "Registrazione storica di Aldo Ciccolini, pianista noto per il suo repertorio francese. La lettura è caratterizzata da un tocco morbido e tempi ponderati, che riflettono la tradizione interpretativa del Novecento francese."
            },
          ],
        },
      ],
    },
    {
      name: "Orchestrazioni (Debussy)",
      artistDescription: "Claude Debussy: compositore francese, massimo esponente dell'impressionismo musicale. Le sue orchestrazioni delle Gymnopédies hanno reso celebre Satie in tutto il mondo. • hr-Sinfonieorchester: orchestra sinfonica tedesca di Francoforte, nota per la qualità delle sue esecuzioni e per la valorizzazione del repertorio classico e moderno.",
      items: [
        {
          label: "Orchestrazioni celebri di Gymnopédie n.1 (Claude Debussy)",
          note:
            "Due versioni orchestrali di riferimento: la classica e una moderna con hr-Sinfonieorchester.",
          links: [
            {
              title: "Orchestrazione Debussy – versione classica (YouTube)",
              url: "https://www.youtube.com/watch?v=YqKpAHvrOjw",
              description:
                "Versione orchestrale delle Gymnopédies orchestrate da Claude Debussy, includendo la No.1. Debussy riveste la partitura di Satie con colori orchestrali impressionisti che amplificano l’atmosfera meditativa originaria."
            },
            {
              title: "Orchestrazione Debussy – hr-Sinfonieorchester (YouTube)",
              url: "https://www.youtube.com/watch?v=wxWx0GCc5CA",
              description:
                "Esecuzione orchestrale condotta dall’hr-Sinfonieorchester (alternanza di Gymnopédie n.1 e n.3). Questa versione evidenzia la delicatezza timbrica e la trasparenza orchestrale tipica delle orchestrazioni debussiane, mostrando come l’adattamento amplia la tessitura rispetto alla versione per piano."
            },
          ],
        },
      ],
    },
  ];
  return (
    <div id="interpreters" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <Music className="w-5 h-5 text-blue-400" />
          Interpreti e ascolti
        </h2>
        <p className="text-sm text-slate-300 mt-2">
        </p>
        <div className="mt-5 space-y-4">
          {interpretersData.map((block, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-700 rounded-xl p-5">
              <div className="text-base text-slate-100 font-semibold mb-2">{block.name}</div>
              <div className="text-sm text-slate-300 mb-3 leading-relaxed">{block.artistDescription}</div>
              <div className="mt-3 space-y-4">
                {block.items.map((it, j) => (
                  <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                    <div className="text-sm text-slate-100 font-semibold">{it.label}</div>
                    <div className="text-sm text-slate-300 mt-1">{it.note}</div>
                    <div className="mt-3 space-y-2">
                      {it.links.map((l, k) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-200">{l.title}</span>
                          {l.url ? (
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                            >
                              apri <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-sm text-slate-500">URL vuoto</span>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {cat.items.slice(0, Math.ceil(cat.items.length / 2)).map((it, j) => (
                      <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                        <div className="text-sm text-slate-100 font-semibold">{it.term}</div>
                        <div className="text-sm text-slate-300 mt-2 leading-relaxed">
                          {it.definition}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {cat.items.slice(Math.ceil(cat.items.length / 2)).map((it, j) => (
                      <div key={j} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                        <div className="text-sm text-slate-100 font-semibold">{it.term}</div>
                        <div className="text-sm text-slate-300 mt-2 leading-relaxed">
                          {it.definition}
                        </div>
                      </div>
                    ))}
                  </div>
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

              {cat.category === "Contesto" && (
                <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
                  <img
                    src="/images/mappa-montmartre-1880-1900.jpg"
                    alt="Mappa di Montmartre (1880-1900)"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-200 mb-1">Mappa di Montmartre (1880-1900)</p>
                    <p className="text-sm text-slate-400 italic">Localizzazione dei cabaret: Chat Noir, Auberge du Clou</p>
                  </div>
                </div>
              )}

              {cat.category === "Estetica" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
                    <img
                      src="/images/puvis-de-chavannes-jeunes-filles.jpg"
                      alt="Dipinto di Puvis de Chavannes"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-3">
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
    <div id="impara" className="space-y-6 max-w-5xl mx-auto">
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
            <div className="text-sm text-slate-400">
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
                  <div className="mt-1 text-sm text-slate-400">{card.details}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Materiali di supporto allo studio */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Materiali di supporto allo studio
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/scheda-riassuntiva-gymnopedies.svg"
              alt="Scheda riassuntiva PDF"
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-200 mb-1">Scheda riassuntiva PDF</p>
              <p className="text-sm text-slate-400 italic">Download stampabile (placeholder)</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/video-tutorial-gymnopedies.svg"
              alt="Video tutorial esecuzione"
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-200 mb-1">Video tutorial esecuzione</p>
              <p className="text-sm text-slate-400 italic">Guida passo-passo (placeholder)</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-800/50">
            <img
              src="/images/podcast-gymnopedies-cover.svg"
              alt="Podcast storia delle Gymnopédies"
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-200 mb-1">Podcast: storia delle Gymnopédies</p>
              <p className="text-sm text-slate-400 italic">Episodio dedicato (placeholder)</p>
            </div>
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
    <div id="fonti" className="space-y-6 max-w-5xl mx-auto">
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
                    <div className="text-sm text-slate-400">{g.items.length} elementi</div>
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
                          <div className="text-sm text-slate-300 mt-1">{it.note}</div>
                        </div>
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                        >
                          apri <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="mt-2 text-sm text-slate-500 break-all">{it.url}</div>
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

export default function App() {
  const [activeTab, setActiveTab] = useState("indice");
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
    if (!TABS.includes(activeTab)) setActiveTab("benvenuto");
  }, [activeTab]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeTab]);

  const tabMeta = {
    benvenuto: { label: "Benvenuto", icon: Home },
    parigi1888: { label: "Parigi 1888", icon: MapPin },
    satie: { label: "Erik Satie", icon: User },
    brano: { label: "Il Brano", icon: Music },
    eredita: { label: "Eredità", icon: Sparkles },
    impara: { label: "Impara", icon: GraduationCap },
    fonti: { label: "Fonti", icon: FileText },
  };
  const handleIndiceNavigate = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };
  const handleNextTab = () => {
    const nextIndex = Math.min(TABS.length - 1, tabIndex + 1);
    if (nextIndex !== tabIndex) setActiveTab(TABS[nextIndex]);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100" {...swipeHandlers}>
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-slate-100 truncate">
                  Gymnopédie n. 1
                </div>
              </div>
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
        <main className="max-w-6xl mx-auto px-4 py-7 space-y-10">
          {activeTab === "benvenuto" && <BenvenutoSection goTo={setActiveTab} />}
          {activeTab === "parigi1888" && <Parigi1888Section />}
          {activeTab === "satie" && <SatieSection />}
          {activeTab === "brano" && <BranoSection />}
          {activeTab === "eredita" && <EreditaSection />}
          {activeTab === "impara" && <ImparaSection />}
          {activeTab === "fonti" && <FontiSection />}
          {activeTab !== "benvenuto" && tabIndex < TABS.length - 1 && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleNextTab}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Prosegui
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </main>
        <Footer setActiveTab={setActiveTab} />
      </div>
    </ErrorBoundary>
  );
}
