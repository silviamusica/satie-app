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
  Users,
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

// Import dati da file separati
import { flashcardsData, quizData } from "./data/flashcards";
import { glossaryData } from "./data/glossary";
import { bibliographyData } from "./data/bibliography";
import { satieLifeTimeline } from "./data/timeline";

// Import componenti
import Tooltip from "./components/Tooltip";

// Import sezioni
import BenvenutoSection from "./sections/BenvenutoSection";
import Parigi1888Section from "./sections/Parigi1888Section";
import SatieSection from "./sections/SatieSection";
import BranoSection from "./sections/BranoSection";
import EreditaSection from "./sections/EreditaSection";
import GlossarySection from "./sections/GlossarySection";
import ImparaSection from "./sections/ImparaSection";
import FontiSection from "./sections/FontiSection";

// Configurazione worker per PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Tab principali - Nuova struttura in 7 sezioni
const TABS = ["benvenuto", "parigi1888", "satie", "brano", "eredita", "glossario", "impara", "fonti"];

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

// Pulsante per i tab
const TabButton = ({ active, label, onClick }) => (
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
    {label}
  </button>
);

// Componente PDF Score Viewer con scroll continuo

/* ----------------------------------
   Contenuti specifici: Gymnopédie n. 1
----------------------------------- */


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
    glossario: { label: "Glossario", icon: Library },
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
          {activeTab === "glossario" && <GlossarySection />}
          {activeTab === "impara" && <ImparaSection />}
          {activeTab === "fonti" && <FontiSection />}
          {activeTab !== "benvenuto" && tabIndex < TABS.length - 1 && (
            <div className="text-center">
              {activeTab === "eredita" && (
                <p className="text-sm text-slate-400 mb-3">
                  Ora puoi passare al glossario per chiarire i termini chiave.
                </p>
              )}
              {activeTab === "glossario" && (
                <p className="text-sm text-slate-400 mb-3">
                  Ora puoi metterti alla prova con quiz e flashcard.
                </p>
              )}
              {activeTab === "impara" && (
                <p className="text-sm text-slate-400 mb-3">
                  Se vuoi approfondire, trovi tutte le fonti e i materiali di riferimento.
                </p>
              )}
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
