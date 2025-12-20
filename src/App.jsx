/* eslint-disable no-irregular-whitespace */
import React, { Suspense, useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import {
  GraduationCap,
  ChevronRight,
  Library,
  User,
  FileText,
  Home,
  MapPin,
  Sparkles,
  Music,
  Menu,
  X,
} from "lucide-react";

// Import sezioni (lazy)
const BenvenutoSection = React.lazy(() => import("./sections/BenvenutoSection"));
const Parigi1888Section = React.lazy(() => import("./sections/Parigi1888Section"));
const SatieSection = React.lazy(() => import("./sections/SatieSection"));
const BranoSection = React.lazy(() => import("./sections/BranoSection"));
const EreditaSection = React.lazy(() => import("./sections/EreditaSection"));
const GlossarySection = React.lazy(() => import("./sections/GlossarySection"));
const ImparaSection = React.lazy(() => import("./sections/ImparaSection"));
const FontiSection = React.lazy(() => import("./sections/FontiSection"));

// Tab principali
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



// Flashcards: domande e risposte per memorizzare fatti chiave

/* ----------------------------------
   App principale
----------------------------------- */

const getTabFromHash = () => {
  if (typeof window === "undefined") return "benvenuto";
  const raw = window.location.hash.replace("#", "");
  return TABS.includes(raw) ? raw : null;
};

export default function App() {
  const [activeTab, setActiveTab] = useState(() => getTabFromHash() || "benvenuto");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabIndex = useMemo(() => TABS.indexOf(activeTab), [activeTab]);
  useEffect(() => {
    // Impedisce tab non validi
    if (!TABS.includes(activeTab)) setActiveTab("benvenuto");
  }, [activeTab]);
  useEffect(() => {
    const handleHashChange = () => {
      const nextTab = getTabFromHash();
      if (nextTab && nextTab !== activeTab) setActiveTab(nextTab);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeTab]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const desiredHash = `#${activeTab}`;
    if (window.location.hash !== desiredHash) window.location.hash = desiredHash;
  }, [activeTab]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeTab]);
  useEffect(() => {
    if (!lightboxImage) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [lightboxImage]);

  const handleImageClick = (event) => {
    const target = event.target;
    if (!target || target.tagName !== "IMG") return;
    const src = target.getAttribute("src");
    if (!src) return;
    const alt = target.getAttribute("alt") || "Immagine";
    setLightboxImage({ src, alt });
  };

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-slate-100 truncate">
                  Gymnopédie n. 1
                </div>
              </div>

              {/* Hamburger button - visible only on mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-100" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-100" />
                )}
              </button>
            </div>

            {/* Desktop navigation - horizontal scroll */}
            <nav className="hidden md:flex gap-2 overflow-x-auto pb-1 mt-3">
              {TABS.map((t) => (
                <TabButton
                  key={t}
                  active={activeTab === t}
                  label={tabMeta[t].label}
                  onClick={() => setActiveTab(t)}
                />
              ))}
            </nav>

            {/* Mobile navigation - dropdown menu */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-3 flex flex-col gap-2 bg-slate-900 rounded-lg border border-slate-700 p-3">
                {TABS.map((t) => {
                  const Icon = tabMeta[t].icon;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTabChange(t)}
                      className={[
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-left",
                        activeTab === t
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                      ].join(" ")}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{tabMeta[t].label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
        </header>
        <main
          className="max-w-6xl mx-auto px-4 py-7 space-y-10 lightbox-scope"
          onClick={handleImageClick}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
                <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-blue-400 animate-spin" />
                <span>Caricamento sezione...</span>
              </div>
            }
          >
            {activeTab === "benvenuto" && <BenvenutoSection goTo={setActiveTab} />}
            {activeTab === "parigi1888" && <Parigi1888Section />}
            {activeTab === "satie" && <SatieSection goTo={setActiveTab} />}
            {activeTab === "brano" && <BranoSection />}
            {activeTab === "eredita" && <EreditaSection />}
            {activeTab === "glossario" && <GlossarySection />}
            {activeTab === "impara" && <ImparaSection />}
            {activeTab === "fonti" && <FontiSection />}
          </Suspense>
          {activeTab !== "benvenuto" && activeTab !== "satie" && tabIndex < TABS.length - 1 && (
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
        {lightboxImage && (
          <div
            className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Visualizzazione immagine a schermo intero"
            onClick={() => setLightboxImage(null)}
          >
            <div className="max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[90vh] w-auto max-w-full object-contain bg-slate-950/20"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </div>
        )}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </ErrorBoundary>
  );
}
