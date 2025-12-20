import React, { useState } from "react";
import { User, Users, Music, BookOpen, GraduationCap, Sparkles, ChevronDown, XCircle, Home } from "lucide-react";
import Tooltip from "../components/Tooltip";
import Modal from "../components/Modal";
import { satieLifeTimeline } from "../data/timeline";
import StramberieSection from "./StramberieSection";
import IndicazioniSection from "./IndicazioniSection";

const SatieSection = ({ goTo }) => {
  const [satieTab, setSatieTab] = useState("vita");
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const [showFilsModal, setShowFilsModal] = useState(false);
  const [showParadeTranscript, setShowParadeTranscript] = useState(false);
  const [showScholaModal, setShowScholaModal] = useState(false);
  const [showPeladanModal, setShowPeladanModal] = useState(false);
  const [showSixModal, setShowSixModal] = useState(false);
  const satieTabs = [
    { key: "vita", label: "La vita" },
    { key: "amicizie", label: "Amicizie" },
    { key: "stramberie", label: "Stramberie" },
  ];

  const scrollToTop = () => {
    const main = document.querySelector("main");
    if (main && typeof main.scrollTo === "function") {
      main.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Timeline ora importata da ./data/timeline.js

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <User className="w-7 h-7 text-blue-400" />
          Erik Satie: il bohémien
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
      <p className="text-sm text-slate-400">
        Tre sezioni da esplorare: la vita, le amicizie, le stramberie.
      </p>

      <Modal
        isOpen={showSixModal}
        onClose={() => setShowSixModal(false)}
        title="Il Gruppo dei Sei: sintesi"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Il Gruppo dei Sei nacque spontaneamente a Parigi attorno al 1920: Milhaud, Honegger, Poulenc,
            Tailleferre, Auric e Durey. La loro musica oggettiva reagiva all'impressionismo di Debussy e al
            wagnerismo, con uno spirito nazionale francese che raccoglieva l'eredita di Satie.
          </p>
          <p>
            Il rapporto con Satie non si chiuse con uno strappo unico, ma con un logoramento progressivo: il maestro
            detestava l'idea di una scuola e, quando i Sei iniziarono a consolidare una voce autonoma e più istituzionale,
            percepì che la spinta anticonformista si stava diluendo.
          </p>
          <ul className="space-y-2">
            <li>
              • <strong>Allontanamento artistico:</strong> il "padre spirituale" non voleva seguaci; il successo del gruppo
              lo convinse che stava diventando parte dell'accademia che lui rifiutava.
            </li>
            <li>
              • <strong>Rotture personali:</strong> Satie interruppe i rapporti con <strong>Georges Auric</strong>, accusandolo
              di essersi "venduto" al gusto borghese; con <strong>Francis Poulenc</strong> ci furono tensioni e lunghi silenzi.
            </li>
            <li>
              • <strong>Scuola di Arcueil:</strong> nel 1923 adottò un nuovo gruppo di giovani (tra cui <strong>Henri Sauguet</strong>),
              segnale del definitivo distacco dai Sei ormai affermati.
            </li>
            <li>
              • <strong>Morte e riconciliazione:</strong> Satie morì nel 1925 per cirrosi epatica; negli ultimi giorni alcuni
              membri cercarono di riavvicinarsi e, nonostante i dissapori, Milhaud e Poulenc rimasero legati alla sua memoria.
            </li>
          </ul>
          <p>
            Jean Cocteau fu il principale sostenitore: nel 1918 pubblicò <em>Le Coq et l'Arlequin</em>, manifesto
            che esaltava Satie come ispiratore di una musica chiara, urbana e anti-retorica.
          </p>
          <p>
            Pur amici tra loro, i Sei non erano un gruppo compatto: Auric puntò al cinema e alla canzone,
            Durey restò legato alla musica vocale, Honegger guardava alla tradizione tedesca, Milhaud assorbì
            ritmi sudamericani, Poulenc privilegiò il lirismo melodico, Tailleferre fu la voce più eclettica.
          </p>
        </div>
      </Modal>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex flex-wrap gap-2">
        {satieTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setSatieTab(tab.key)}
            className={[
              "px-4 py-2 rounded-lg text-sm font-semibold border transition-colors",
              satieTab === tab.key
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {satieTab === "vita" && (
        <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
          <img
            src="/images/Satie con occhiali.jpg"
            alt="Erik Satie con occhiali"
            className="w-full object-contain p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
            Erik Satie: il bohémien che rifiuta le convenzioni accademiche
          </p>
        </div>
      )}
      {satieTab === "amicizie" && (
        <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
          <img
            src="/images/3. Debussy - Satie .jpeg"
            alt="Claude Debussy e Erik Satie"
            className="w-full object-contain p-2"
          />
        </div>
      )}
      {satieTab === "stramberie" && (
        <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
          <img
            src="/images/Busto-satie-stramberie.jpg"
            alt="Busto di Erik Satie"
            className="w-full object-contain p-2"
          />
        </div>
      )}
      {satieTab === "vita" && (
      <>
      {/* Il giovane ribelle */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-red-400" />
          Il giovane ribelle (1866-1887)
        </h2>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Honfleur.jpg"
                alt="Honfleur, città natale"
                className="w-full object-contain bg-slate-950"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Honfleur, Normandia: porto pittoresco dove nacque Erik Satie nel 1866
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-100">Honfleur, 17 maggio 1866</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Erik Alfred Leslie Satie</strong> nasce a <strong>Honfleur</strong>, pittoresca cittadina portuale
                in Normandia. Il padre Alfred è agente marittimo, la madre Jane Leslie Anton è di origini scozzesi.
              </p>

              <h3 className="text-base font-semibold text-slate-100 mt-4">1870 (4 anni): trasferimento a Parigi</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Durante la{" "}
                <Tooltip text="Conflitto tra Francia e Prussia (1870-1871) che portò alla caduta di Napoleone III">
                  <span>guerra Franco-Prussiana</span>
                </Tooltip>, la famiglia si trasferisce a <strong>Parigi</strong>.
                Ma nel <strong>1872</strong>, quando Erik ha appena <strong>sei anni</strong>, la madre <strong>muore</strong>.
                Il padre, incapace di occuparsi dei tre figli superstiti, li manda dai nonni paterni a Honfleur.
                I nonni materni, di origine scozzese, vivevano a Londra.
              </p>

              <h3 className="text-base font-semibold text-slate-100 mt-4">1872-1878 (6-12 anni): ritorno a Honfleur</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Erik cresce dai nonni in Normandia. La nonna gli dà le <strong>prime lezioni di pianoforte</strong>,
                alimentando il suo talento musicale. Ma nel <strong>1878</strong>, quando ha <strong>12 anni</strong>,
                anche la <strong>nonna muore</strong>.
              </p>

              <h3 className="text-base font-semibold text-slate-100 mt-4">1878 (12 anni): di nuovo a Parigi</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Erik torna definitivamente a <strong>Parigi</strong> dal padre, che pochi mesi dopo si risposerà
                con Eugénie Barnetche, una <strong>pianista</strong> che diventa la sua prima vera insegnante di musica.
                È lei a prepararlo per l'ingresso al Conservatorio l'anno seguente.
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
                Nel <strong>1879 (13 anni)</strong>, entra al <strong>Conservatorio di Parigi</strong>.
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
                Nel <strong>1882 (16 anni)</strong>, dopo un'esecuzione mediocre del <em>Finale della Sonata Op. 26</em> di Beethoven,
                viene giudicato <strong>incapace</strong> e non ammesso alle classi superiori. Tenta un rientro nel <strong>1885 (19 anni)</strong>,
                ma abbandona definitivamente nel <strong>1887 (21 anni)</strong>.
              </p>
            </div>

            <div className="mt-4 grid md:grid-cols-[1fr_1.3fr] gap-4 items-start">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/Conservatorio di Parigi.jpg"
                  alt="Conservatoire de Paris"
                  className="w-full h-56 object-contain p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Conservatoire de Paris: l'istituzione che giudicò Satie "il più pigro studente"
                </p>
              </div>
            <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
              <h3 className="text-base font-semibold text-slate-100 mb-2">Appunti dai registri</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                I giudizi sul talento pianistico di Satie erano durissimi, ma l'esperienza al Conservatorio
                diventa il primo grande attrito con l'accademia: un rifiuto che plasmerà la sua estetica
                anti-retorica e indipendente.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                Le annotazioni dei docenti parlano di un allievo "dotato ma indolente" e "privo di valore".
                Il verdetto del 1882 dopo l'Op. 26 di Beethoven sancì di fatto la sua uscita dalle classi superiori,
                trasformando la frustrazione in un motore creativo fuori dai canoni ufficiali.
              </p>
            </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-3">Gli anni di formazione autodidatta</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Tra il 1882 e il 1883, fuori dal Conservatorio, Satie si dedica alle <strong>letture</strong>:
              Voltaire, Dumas, Andersen. Sviluppa preferenze musicali personali per <strong>Bach, Chopin e Schumann</strong>.
              Rifiuta il wagnerismo dominante e cerca una strada alternativa.
            </p>
            <h3 className="text-base font-semibold text-slate-100 mb-2 mt-4">1884: il primo brano, <em>Allegro</em></h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              La prima composizione nota per pianoforte è l'<strong><em>Allegro</em></strong>, scritta nel <strong>1884</strong> a 18 anni.
              Seguono altre opere giovanili come la <em>Valse-Ballet</em> e la <em>Fantaisie-Valse</em> (<strong>1885-1887</strong>, 19-21 anni).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/allegro-satie-1884.jpeg"
                  alt="Spartito dell'Allegro di Erik Satie"
                  className="w-full h-56 object-contain bg-slate-950 p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  "Allegro" (1884): la prima composizione ufficiale di Erik Satie
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/Erik_Satie_1884.jpg"
                  alt="Erik Satie nel 1884"
                  className="w-full h-56 object-contain bg-slate-950 p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Erik Satie nel 1884 (18 anni), a Parigi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Montmartre e Gymnopédies */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Music className="w-6 h-6 text-blue-400" />
          Montmartre e le Gymnopédies (1887-1888, 21-22 anni)
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
              dove poeti, pittori e musicisti si mescolano, discutono, collaborano. Vi passano{" "}
              <Tooltip text="Compositore francese (1862-1918), padre dell'impressionismo musicale.">
                <strong>Claude Debussy</strong>
              </Tooltip>,{" "}
              <Tooltip text="Poeta simbolista francese (1844-1896).">
                <strong>Paul Verlaine</strong>
              </Tooltip>{" "}
              e{" "}
              <Tooltip text="Pittore e illustratore (1864-1901), celebre per la vita notturna di Montmartre.">
                <strong>Toulouse-Lautrec</strong>
              </Tooltip>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Qui Satie incontra <strong>J. P. Contamine de Latour</strong>, <span>poeta simbolista</span>,
              la cui poesia <em>Les Antiques</em> sarà pubblicata con le <em>Gymnopédie</em>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/The bohemien SATIE.jpg"
                alt="Erik Satie in abito bohémien"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Erik Satie in abito bohémien: ritratto del compositore negli anni di Montmartre.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/erik-satie-son-of-stars_u-l-q1nt8j80.jpg"
                alt="Citazione di Erik Satie"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Dedica manoscritta per <em>Le Fils des etoiles</em>: invoca la misericordia del Padre e la protezione
                della Madre Augusta, firmata con una croce a doppio braccio.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/jean-cocteau---erik-satie--arcueil--mais-JKLTD-570.webp"
                alt="Schizzo di Jean Cocteau su Erik Satie"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  <Tooltip text="Poeta, scrittore e artista d'avanguardia (1889-1963), collaboratore di Satie in Parade.">
                    <span>Jean Cocteau</span>
                  </Tooltip>
                  , poeta e artista d'avanguardia, ritrae Satie con un tratto affettuoso.
                </p>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Febbraio-aprile 1888: la composizione
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              In questo ambiente di libertà artistica, Satie compone le <strong>tre Gymnopédies</strong>.
              Pagine brevi, apparentemente semplici, ma rivoluzionarie: armonie sospese, forme svuotate di drammaticità,
              un suono "bianco" che oppone al wagnerismo dominante un'<strong>estetica dell'essenziale</strong>.
            </p>

            <div className="grid md:grid-cols-[1fr_1.2fr] gap-4 items-start">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/SATIE SCHIZZO AL PIANO.jpg"
                  alt="Ritratto di Erik Satie all'armonium"
                  className="w-full h-56 object-contain bg-slate-950 p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Ritratto di Erik Satie che suona l'armonium (
                  <Tooltip text="Pittore e scrittore catalano (1861-1931), vicino al simbolismo.">
                    <span>Santiago Rusiñol</span>
                  </Tooltip>
                  , senza data)
                </p>
              </div>
              <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-100 mb-2">L'estetica della semplicità</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Rusiñol descriveva Satie come un musicista che cercava la stessa semplicità austera dei quadri di
                  Puvis de Chavannes. L'immagine all'armonium rende bene questa idea di suono contenuto e rituale.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  In queste pagine non c'è enfasi romantica: c'è una lentezza deliberata, un gesto minimo che lascia
                  spazio al silenzio e alla risonanza. È il modo con cui Satie scolpisce il tempo, più che riempirlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Periodo rosacrociano */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          Il periodo rosacrociano (1891-1893, 25-27 anni)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Nel <strong>1891</strong> Satie entra nell'Ordine della{" "}
          <Tooltip text="Ordine mistico-esoterico fondato da Joséphin Péladan nel 1891.">
            <strong>Rosa-Croce</strong>
          </Tooltip>{" "}
          del "Sâr" <strong>Joséphin Péladan</strong>, diventandone
          compositore ufficiale e maestro di cappella. È una fase di misticismo, simbolismo e disciplina estetica,
          in cui cerca una musica essenziale e rituale.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/Peladan.jpg"
              alt="Joséphin Péladan"
              className="w-full h-56 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Joséphin Péladan, fondatore dell'Ordine della Rosa-Croce
            </p>
            <div className="pb-4 text-center">
              <button
                type="button"
                onClick={() => setShowPeladanModal(true)}
                className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
              >
                Approfondisci
              </button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/Le-Fils-des-etoiles.jpg"
              alt="Manoscritto di Le Fils des Étoiles"
              className="w-full h-56 object-contain bg-slate-950 p-2"
            />
            <div className="p-3 bg-slate-900/50 text-center">
              <p className="text-sm text-slate-400 italic min-h-[3.5rem]">
                Manoscritto originale di Erik Satie con la dedica per "Le Fils des Étoiles" (1891).
              </p>
              <button
                type="button"
                onClick={() => setShowFilsModal(true)}
                className="mt-2 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
              >
                Leggi di più
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950 mt-4">
          <img
            src="/images/Trois-Sonneries-de-la-RoseCroix.jpg"
            alt="Trois Sonneries de la Rose-Croix"
            className="w-full h-64 object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
            "Trois Sonneries de la Rose+Croix": musica ieratica del periodo rosacrociano
          </p>
        </div>
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4 mt-4">
          <h3 className="text-base font-semibold text-slate-100 mb-2">Joséphin Péladan e il misticismo estetico</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Il periodo rosacrociano è una delle fasi più mistiche e visivamente affascinanti di Satie, dominata dalla figura
            ingombrante di <strong>Joséphin Péladan</strong>, che amava farsi chiamare <strong>Sâr Péladan</strong>. Vestito con abiti
            di velluto e pizzo, predicava l'arte come via di salvezza spirituale e nel 1891 fondò l'Ordine della
            Rose-Croix Catholique du Temple et du Graal, nominando Satie compositore ufficiale.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Il sodalizio fu breve perché le loro visioni erano opposte: Péladan era un wagneriano convinto, mentre Satie
            cercava di depurare la musica francese da ogni influenza germanica. Nel 1892 ruppe pubblicamente con il Sâr,
            definendolo un ridicolo istrione, e questa separazione lo spinse a fondare la sua chiesa personale per non
            rispondere più ad altre autorità.
          </p>
          <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-2">Punti chiave del sodalizio Péladan-Satie</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Il ruolo: Satie agiva come maestro di cappella, scrivendo fanfare e preludi per le cerimonie esoteriche;</li>
              <li>• L'estetica: musica statica, ieratica, con rifiuto dello sviluppo melodico tradizionale;</li>
              <li>• La rottura: insofferenza verso il culto della personalità di Péladan e la sua ossessione wagneriana.</li>
            </ul>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mt-3">
            Lo sapevi? Satie era così immerso in questo clima da farsi crescere i capelli e adottare un abbigliamento
            sacerdotale già prima di fondare la sua Église Métropolitaine d'Art.
          </p>
        </div>

        <Modal
          isOpen={showFilsModal}
          onClose={() => setShowFilsModal(false)}
          title="Erik Satie e la dedica di “Le Fils des Étoiles”"
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Il manoscritto è una dedica scritta a mano in francese per l'opera <em>Le Fils des Étoiles</em> (1891),
              una “Wagnérie” in tre atti su testo di Joséphin Péladan. È un frammento emblematico del periodo rosacrociano
              di Satie, in cui misticismo e teatralità si intrecciano con una vena di ironia personale.
            </p>
            <p>
              Il testo è solenne e rituale, ma contiene anche un tono provocatorio tipico di Satie. Invoca benedizioni
              sui “convitati” e sulla famiglia, per poi concludere con una formula severa contro i superbi e gli indecenti.
            </p>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-slate-100 mb-2">Traduzione della dedica</div>
              <p className="whitespace-pre-line text-slate-300">
                Senza pregiudizio delle pratiche dei grandi imprecatori, miei cugini, offro questo cuore ai miei cari.{"\n"}
                Perciò, e per la precedenza degli esempi, non chiedo l'esaltazione. Invoco. Invoco sui miei commensali
                la misericordia del Padre, creatore delle cose visibili e invisibili; la protezione della Madre Augusta
                del Redentore, Regina degli Angeli; come le preghiere del glorioso coro degli Apostoli e dei Santi Ordini
                degli Spiriti beati.{"\n"}
                Che la giusta infiammazione di Dio schiacci i superbi e gli indecenti!{"\n"}
                [Firma:] Erik Satie
              </p>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showPeladanModal}
          onClose={() => setShowPeladanModal(false)}
          title="Joséphin Péladan: il Sâr dell'occultismo"
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Joséphin Péladan, noto come il Sâr Péladan, fu una delle figure più stravaganti e magnetiche del simbolismo
              francese di fine Ottocento. Scrittore, critico e occultista, nel 1891 fondò l'Ordine della Rosa-Croce
              Cattolica del Tempio e del Graal, un'organizzazione mistico-estetica contro il materialismo dell'epoca.
            </p>
            <p>
              Con vesti cerimoniali babilonesi e una capigliatura stravagante, esercitò una forte influenza su Satie,
              nominandolo compositore ufficiale dell'ordine e commissionandogli opere ieratiche come le
              <em> Sonneries de la Rose+Croix</em>.
            </p>
            <p>
              Il sodalizio fu breve: l'autoritarismo di Péladan e la sua devozione per Wagner portarono Satie, in cerca
              di una musica francese spogliata dalla retorica germanica, a rompere pubblicamente nel 1892 e a fondare una
              propria chiesa indipendente.
            </p>
          </div>
        </Modal>

        <div className="mt-4 space-y-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">"Esoterik Satie"</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A Montmartre, lo scrittore Alphonse Allais lo soprannominò <em>"Esoterik Satie"</em>, un gioco di parole
              che univa il suo nome ai suoi interessi mistici. L'aspetto caratteristico: cappello a cilindro, lunghi capelli,
              mantello nero.
            </p>
          </div>

          <div className="bg-red-950/20 border border-red-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-red-200 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              1892 (26 anni): rottura con Péladan
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nel <strong>1892 (26 anni)</strong>, dopo appena un anno, Satie rompe i rapporti con l'Ordine della Rosa-Croce
              per divergenze estetiche e per la sua natura iconoclasta. Non sopporta l'autorità di Péladan
              e decide di fondare una sua personale "chiesa".
            </p>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">
              1893 (27 anni): l'Église Métropolitaine d'Art de Jésus Conducteur
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Nel <strong>1893 (27 anni)</strong> fonda la <strong>Église Métropolitaine d'Art de Jésus Conducteur</strong>
              (Chiesa Metropolitana d'Arte di Gesù Conduttore). Satie ne è l'<strong>unico membro</strong> e Gran Sacerdote,
              e utilizza questa "istituzione" principalmente per lanciare feroci attacchi ai critici musicali
              attraverso bollettini e pamphlet (il <em>Cartulaire</em>).
            </p>

            <div className="rounded-lg overflow-hidden border border-amber-700/50 bg-slate-950">
              <img
                src="/images/Erik_Satie_eglise.jpeg"
                alt="Erik Satie come leader della Chiesa"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Erik Satie (1866-1925): ritratti e documenti. Editore sconosciuto, 1900-1975.
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
      )}

      {satieTab === "amicizie" && (
      <>
      {/* Debussy: un'amicizia fraterna e complessa */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Music className="w-6 h-6 text-blue-400" />
          Claude Debussy: un'amicizia fraterna e complessa (1891-1925)
        </h2>

        <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center mb-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>Claude Debussy (1862-1918)</strong> è il compositore che ha ridefinito il suono francese moderno:
              colore timbrico, armonie sospese, attenzione all'atmosfera più che allo sviluppo drammatico. Il legame con
              Satie nacque nel <strong>1891 all'Auberge du Clou</strong> a Montmartre e fu uno dei più significativi della
              musica moderna. Debussy, già avviato verso il successo, riconobbe in Satie un <strong>"precursore"</strong>
              capace di indicare nuove strade oltre il wagnerismo imperante. Nel 1892 lo definì
              «<em>un musicista medievale e dolce smarrito in questo secolo</em>».
            </p>
            <div className="mt-3 bg-slate-950/40 border border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-100 mb-2">«Senza crauti, se possibile»</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Satie raccontò che, al loro primo incontro, invitò Debussy a creare una musica francese libera
                dall'ombra wagneriana. Con "crauti" alludeva ironicamente alla cultura tedesca e proponeva di guardare
                ai pittori francesi (Monet, Cézanne, Toulouse-Lautrec) per trovare un linguaggio più chiaro e visivo.
              </p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mt-3">
              Negli anni Dieci il rapporto si incrina: divergenze estetiche, risentimenti e l'episodio di <em>Parade</em>.
              Dopo una lettera offensiva di Satie nel 1917, Debussy, già gravemente malato, non rispose più.
              Satie affermò di aver tentato una riconciliazione nel 1918, ma non ci fu risposta e non partecipò
              al funerale dell'amico (Debussy morì il 25 marzo 1918).
            </p>
        </div>

        <div className="space-y-4">

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">1896-1897: Il gesto decisivo</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">
              Nel 1896, a casa del direttore d'orchestra <strong>Gustave Doret</strong>, Satie eseguì le Gymnopédies al pianoforte,
              ma la sua esecuzione risultò incerta. Debussy intervenne dicendo «vieni, ti mostro come suona la tua musica»,
              rivelando il vero potenziale timbrico dei brani. Doret suggerì subito l'orchestrazione e Debussy accettò.
            </p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Debussy orchestrò la <strong>n.1</strong> e la <strong>n.3</strong>, invertendo la numerazione;</li>
              <li>• prima esecuzione il <strong>20 febbraio 1897</strong> alla Société Nationale;</li>
              <li>• fu l'unica volta in cui Debussy orchestrò l'opera di un altro compositore.</li>
            </ul>
          </div>

          <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-2">Tensioni e divergenze</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tuttavia, il rapporto fu segnato da tensioni. Satie soffriva l'<strong>ombra del genio di Debussy</strong> e temeva
              che la propria originalità venisse scambiata per un sottoprodotto dell'Impressionismo. Un episodio celebre: Debussy
              disse a Satie che la sua musica peccava di <em>mancanza di forma</em>. Per tutta risposta, Satie compose i{" "}
              <strong><em>Trois morceaux en forme de poire</em></strong> (Tre pezzi in forma di pera) per dimostrare, con ironia,
              di possedere una propria concezione formale.
            </p>
            <div className="mt-3 rounded-lg overflow-hidden border border-blue-700/40 bg-slate-950">
              <img
                src="/images/3-pezzi-a-forma-di-pera.jpg"
                alt="Trois morceaux en forme de poire"
                className="w-full object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                "Trois morceaux en forme de poire": risposta ironica alla critica di Debussy.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed italic">
            Nonostante un progressivo raffreddamento dovuto alle diverse visioni estetiche, la loro influenza reciproca
            resta un <strong>pilastro del passaggio dal Simbolismo al Modernismo francese</strong>.
          </p>
        </div>
      </div>

      {/* Maurice Ravel: il promotore della riscoperta */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Music className="w-6 h-6 text-emerald-400" />
          Maurice Ravel: il promotore della riscoperta (1911)
        </h2>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-4 items-stretch mb-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/maurice_ravel.jpg"
              alt="Maurice Ravel"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Maurice Ravel (1875-1937), figura chiave della musica francese
            </p>
          </div>
          <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>Maurice Ravel (1875-1937)</strong> è celebre per la precisione formale, l'orchestrazione luminosa
              e uno stile nitido, quasi architettonico. Nel <strong>1911</strong>, a più di vent'anni dalla composizione
              delle Gymnopédies, decise di far eseguire la <strong>Gymnopédie n. 3</strong> in pubblico, rilanciando
              l'interesse per Satie in un momento di relativo oblio.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-3">
              In quell'epoca Ravel era già un punto di riferimento della musica francese e il suo gesto
              ebbe un forte peso simbolico: riportò Satie al centro del dibattito e aprì la strada alla sua
              consacrazione come maestro di una modernità sobria e anti-retorica.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-emerald-200 mb-2">Un riconoscimento ambivalente</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              L'iniziativa di Ravel riportò Satie alla ribalta, ma la reazione del compositore fu <strong>ambivalente</strong>:
              pur grato per l'attenzione, Satie mostrava <strong>irritazione</strong> verso chi lo trattava come un
              "maestro dimenticato" da riscoprire, rivendicando la propria <strong>continua rilevanza artistica</strong>.
              Questa tensione rifletteva la difficoltà di Satie nel conciliare il riconoscimento postumo con il bisogno
              di affermazione contemporanea.
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed italic">
            Grazie a Ravel, le Gymnopédies tornarono al centro del dibattito musicale francese, preparando il terreno
            per la consacrazione definitiva di Satie negli anni '20 come patriarca delle avanguardie.
          </p>
        </div>
      </div>

      </>
      )}

      {satieTab === "vita" && (
      <>
      {/* Suzanne Valadon */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <User className="w-6 h-6 text-blue-400" />
          Suzanne Valadon (1893, 27 anni)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Nel 1893 Satie vive una relazione intensa con <strong>Suzanne Valadon</strong>, pittrice e madre di Maurice
          Utrillo. È l'unico amore documentato della sua vita: lui la chiama affettuosamente <em>"Biqui"</em>, lui le
          dedica una minuscola canzone di quattro battute come regalo di Pasqua. Quando la relazione si interrompe,
          Satie ne rimane profondamente segnato.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          In quegli stessi mesi si scambiano ritratti: Valadon dipinge Satie, mentre lui la ritrae su carta da musica.
          Due immagini complementari che raccontano un momento intimo e raro nella biografia del compositore.
        </p>
        <div className="space-y-4 mt-4">
          {/* Immagini principali in layout bilanciato */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Ritratto di Satie (verticale piccola) */}
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/valadon-satie-1892-ritratto.jpg"
                alt="Ritratto di Erik Satie di Suzanne Valadon"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Suzanne Valadon (1865-1938), <em>Ritratto di Erik Satie</em>, 1892-93, olio su tela.
              </p>
            </div>

            {/* Foto satie-valadon (quadrata) */}
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/satie-e-valadon.jpg"
                alt="Erik Satie e Suzanne Valadon"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Santiago Rusiñol (1861-1931), <em>A Romance</em>, 1894, olio su tela.
              </p>
            </div>

            {/* Disegno di Satie (verticale) */}
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Satie_portret_Valadon_1893.jpg"
                alt="Ritratto di Suzanne Valadon disegnato da Erik Satie"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Erik Satie (1866-1925), <em>Ritratto di Suzanne Valadon</em>, 1893, disegno.
              </p>
            </div>
          </div>

          {/* Spartito Bonjour Biqui centrato */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Bonjour-Biquii.jpg"
                alt="Spartito di Bonjour Biqui, Bonjour!"
                className="w-full object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                "Bonjour Biqui, Bonjour!" (1893): canzone-regalo di 4 battute per Valadon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Arcueil */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Home className="w-6 h-6 text-blue-400" />
          Arcueil e l'"Armadio" (1898-1925, 32-59 anni)
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/6_Rue_Cortot -.jpeg"
                alt="6 Rue Cortot, Montmartre"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                6 Rue Cortot, Montmartre: abitazione di Satie durante gli anni delle Gymnopédies.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/2015-Arcueil-Erik-Satie-house.jpg"
                alt="Casa di Erik Satie ad Arcueil"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Arcueil: la casa di Satie per gli ultimi 27 anni della sua vita (1898-1925).
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
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
                la sua estetica della <strong>purezza sonora</strong>. È improbabile che seguisse davvero una
                dieta così rigida: i suoi scritti sono ironici e vanno letti con cautela, più come giochi
                letterari che come cronache affidabili.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schola Cantorum */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-blue-400" />
          Ritorno a scuola (1905-1908, 39-42 anni)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Nel <strong>1905</strong>, a <strong>39 anni</strong>, Satie decide di tornare a studiare.
          Si iscrive alla <strong>Schola Cantorum</strong> di Vincent d'Indy, dove studia contrappunto e fuga
          per tre anni. Un gesto umile per chi era già considerato un innovatore, ma che dimostra
          la sua ricerca costante di rigore e perfezionamento tecnico.
        </p>
        <button
          type="button"
          onClick={() => setShowScholaModal(true)}
          className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
        >
          Approfondisci <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <Modal
        isOpen={showScholaModal}
        onClose={() => setShowScholaModal(false)}
        title="Il ritorno allo studio: Schola Cantorum (1905-1908)"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            L'iscrizione alla <strong>Schola Cantorum</strong> a quasi quarant'anni non fu un gesto accademico, ma
            un atto di ribellione verso l'immagine del "dilettante da cabaret" che la critica gli aveva cucito addosso.
            Satie voleva dimostrare di conoscere le regole così bene da poterle infrangere con piena consapevolezza.
          </p>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">La crisi e la decisione</h3>
            <p>
              Nei primi anni del Novecento si sentiva in stallo, oscurato dal prestigio accademico di Debussy.
              Tornare sui banchi significava sottrarsi all'etichetta di intrattenitore e rivendicare un rigore
              tecnico spesso negato ai suoi lavori.
            </p>
          </div>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">L'umiltà del "vecchio" studente</h3>
            <p>
              Nel 1905 si presentò alla scuola di <strong>Vincent d'Indy</strong>, ambiente severo e anti-bohémien,
              studiando con docenti più giovani, tra cui <strong>Albert Roussel</strong>. Camminava ogni giorno
              da Arcueil per non mancare alle lezioni, con quaderni di esercizi scritti in modo quasi maniacale.
            </p>
          </div>
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Il risultato e le conseguenze</h3>
            <p>
              Nel 1908 ottenne il <strong>Diplôme de Contrepoint</strong> con menzione "Très Bien". Lo studio non
              spense la sua originalità, al contrario la rese più secca e limpida: nasce il Satie delle opere
              umoristiche, capace di parodiare l'accademismo con strumenti tecnici impeccabili.
            </p>
          </div>
          <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-2">In sintesi</h3>
            <ul className="space-y-2">
              <li>• iscrizione: ottobre 1905, a 39 anni;</li>
              <li>• scuola: Schola Cantorum di Parigi;</li>
              <li>• docente chiave: Albert Roussel (contrappunto);</li>
              <li>• diploma: 1908, menzione "Très Bien";</li>
              <li>• effetto: musica più lineare, ironica, anti-impressionista.</li>
            </ul>
          </div>
        </div>
      </Modal>
      </>
      )}

      {satieTab === "amicizie" && (
      <>
      {/* Parade e avanguardie */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          Parade e le avanguardie (1915-1917, 49-51 anni)
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Nel <strong>1915 (49 anni)</strong> inizia la collaborazione con <strong>Jean Cocteau</strong>, poeta e artista d'avanguardia.
            Insieme a <strong>Pablo Picasso</strong> (scene e costumi) e <strong>Léonide Massine</strong> (coreografia),
            creano il balletto <strong><em>Parade</em></strong>, che debutta il <strong>18 maggio 1917</strong> (Satie ha 51 anni) al Théâtre du Châtelet.
          </p>

          <div className="grid md:grid-cols-[1.05fr_1.35fr] gap-4 items-stretch">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/parade-theredlist.jpg"
              alt="Locandina di Parade"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              "Parade" (1917): l'incontro tra musica, danza e cubismo
            </p>
          </div>
            <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center">
              <h3 className="text-base font-semibold text-slate-100 mb-2">Il "dream team" delle avanguardie</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cocteau immagina un balletto che porti la strada in teatro. Satie compone una partitura asciutta,
                Picasso costruisce costumi cubisti monumentali, Diaghilev produce con i Ballets Russes e Massine
                inventa movimenti meccanici e spezzati.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                La trama è minimale: una troupe di artisti di strada prova a convincere il pubblico a entrare
                nello spettacolo, ma resta fuori a recitare il suo stesso richiamo.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/jean-cocteau---erik-satie--arcueil--mais-JKLTD-570.webp"
                alt="Schizzo di Jean Cocteau su Erik Satie"
                className="w-full h-56 object-contain p-2"
              />
              <div className="p-3 bg-slate-900/50 text-center">
                <p className="text-sm text-slate-300">
                  Jean Cocteau, scrittore e regista, è il regista concettuale dell'operazione Parade.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/pARADE SATIE FRONTE.jpg"
                alt="Spartito di Parade"
                className="w-full h-56 object-contain p-2"
              />
              <div className="p-3 bg-slate-900/50 text-center">
                <p className="text-sm text-slate-300">
                  Lo spartito integra rumori quotidiani e ritmi popolari, rompendo con l'idea di musica “pura”.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Cocteau schizzo Satie.jpg"
                alt="Schizzo di Cocteau su Satie"
                className="w-full h-64 object-contain bg-slate-950 p-2"
              />
              <div className="p-3 bg-slate-900/50 text-center">
                <p className="text-sm text-slate-300">
                  Jean Cocteau ritrae Satie con un segno rapido e ironico.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/SAtie adulto.jpg"
                alt="Erik Satie in eta adulta"
                className="w-full h-64 object-contain bg-slate-950 p-2"
              />
              <div className="p-3 bg-slate-900/50 text-center">
                <p className="text-sm text-slate-300">
                  Erik Satie in eta adulta: il volto del compositore tra rigore e ironia.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1.1fr_1fr] gap-4 items-stretch">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/RAGTIME PARADE.jpg"
                alt="Spartito del Ragtime da Parade"
                className="w-full h-56 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                Ragtime da "Parade": ritmo americano e contaminazione con il music-hall
              </p>
            </div>
            <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center">
              <h3 className="text-base font-semibold text-slate-100 mb-2">Ragtime e suoni moderni</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Satie inserisce sirene, macchine da scrivere e suoni “non musicali” per evocare la città moderna.
                Il risultato è un linguaggio ibrido che anticipa il jazz e rende la partitura un manifesto della
                modernità urbana.
              </p>
              <a
                href="https://www.youtube.com/watch?v=ia1AAZzNzB4"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
              >
                Guarda la rappresentazione originale (1917)
              </a>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">Accoglienza e polemiche</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">
              La prima del 1917 provocò uno <strong>scandalo</strong> in piena guerra: il pubblico fu diviso
              e la critica reagì con durezza. Satie rispose a un recensore con la celebre cartolina
              «vous n'êtes qu'un cul, mais un cul sans musique», cioè{" "}
              <em>"non siete che un sedere, ma un sedere senza musica"</em>.
              La cartolina era leggibile da chiunque, e proprio per questo finì in tribunale per ingiuria.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nel programma di sala, Guillaume Apollinaire usò per la prima volta la parola
              <strong> surrealismo</strong> per descrivere lo spettacolo.
            </p>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4 mt-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                satie fu condannato a <strong>8 giorni di prigione</strong> (pena poi sospesa). durante il processo,
                jean cocteau venne arrestato perché continuava a urlare «sedere!» in aula per difendere l'amico.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Video d'archivio e testimonianze</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Un documento storico con Jean Cocteau che racconta la genesi di <em>Parade</em> e una ripresa dello
              spettacolo originale del 1917.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-900/60">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Cz-0vf2Br-U"
                    title="Jean Cocteau raconte - ballet PARADE (1917)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-300">Jean Cocteau racconta Parade (documento d'epoca)</p>
                  <button
                    type="button"
                    onClick={() => setShowParadeTranscript(true)}
                    className="text-blue-300 hover:text-blue-200 text-sm font-semibold shrink-0"
                  >
                    Leggi la trascrizione
                  </button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-900/60">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ia1AAZzNzB4"
                    title="Parade - rappresentazione originale (1917)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-slate-300">Parade, rappresentazione originale del 1917</p>
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={showParadeTranscript}
            onClose={() => setShowParadeTranscript(false)}
            title="Trascrizione: Jean Cocteau raconte - ballet PARADE (1917)"
            maxWidth="max-w-4xl"
          >
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              (00:00) alors ce canal de parader comme très intéressant parce que erik satie lorsqu'on a parlé de lui à propos de parade il peut pas jouer musiseine faut pas oublier qu'il était né en 1866 était un homme donc arriver et c'était un solitaire bien entendu c'était le match d'arcueil on a que mazda recueilli les atari un peu en bohême on se demandait un peu qui était ce personnage étrange brusquement et bien il est associé à cette oeuvre parade qui est une oeuvre table pirouette qui associe erik satie jean cocteau et picasso
              (00:35) j'ai pensé qu'il fallait avec ça qu'ils aillent voir picasso c'est alors que j'ai demandé à picasso de collaborer avec nous je lui ai demandé entre la rotonde et le dôme au milieu de la russe de dire qu'il fait pas beaucoup de voitures et il m'a dit veille puisque nous allons faire un rayon à rome rejoint diaghilev puisque nous allons faire un voyage de noces nous allons aller a annoncé le voyage de noces à gertrude stein nous avons été chez gertrude stein rue de fleurus et nuit av on l'y voit là nous partons en voyage de noces nous
              (01:06) avons acquis à rome et nous avons avait aidé par les faits le ballet parade mais satie les fait pas avec nous et pourquoi ce bar accès scandale c'est parce que c'est une oeuvre qui est une de dérision et qui est produite par par diaghilev stationnement pendant la guerre c'est à dire 1917 les gens meurent au combat sont au front et pendant ce temps à paris eh bien on accepte de persifler on accepte de se moquer de tous de se moquer des valeurs établies et rien de mieux qu'un vrai scandale pour qu'on parle de quelqu'un ça qui avait fait ses
              (01:42) études à la schola cantorum et il était tard ils vivaient parmi les impressionnistes mais il sa musique s'opposait à la musique impressionniste parce que au lieu d'être floués et frissonnante et et en sourdine sa musique que tu est linéaire et sans sauce sans sauce sans voile au point que quand les musiciens d'orchestre et belle parade il croyait répétées de la musique de baston j'étais au but est d'aller chercher ravel d'amener ravel pour qu'ils leur disent que cette musique était une manière de shader et là il
              (02:23) s'est passé ce serait drôle un flûtiste s'est levé et a dit assati monsieur satie il paraît que vous me prouvez idiot est répond non non je ne trouve pas lyon maintenant je peux me tromper
            </div>
          </Modal>

        </div>
      </div>

      {/* Francis Poulenc e il Gruppo dei Sei */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <Users className="w-6 h-6 text-purple-400" />
          Francis Poulenc e il "Gruppo dei Sei": "Le Bon Maître" (1920-1925)
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Negli <strong>anni '20</strong>, <strong>Francis Poulenc</strong> e gli altri membri del <strong>Groupe des Six</strong>
            guardavano a Satie come al loro <strong>"Bon Maître"</strong> (il Buon Maestro), un mentore spirituale che incarnava
            l'ideale di una <strong>musica francese moderna</strong>, liberata tanto dal wagnerismo quanto dall'impressionismo debussyano.
          </p>

          <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-2">Il Gruppo dei Sei</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dopo <em>Parade</em>, Satie diventa il <strong>patriarca spirituale</strong> del{" "}
              <strong>Groupe des Six</strong> (Gruppo dei Sei), collettivo di sei giovani compositori francesi:{" "}
              <strong>Francis Poulenc</strong>, <strong>Darius Milhaud</strong>, <strong>Arthur Honegger</strong>,{" "}
              <strong>Georges Auric</strong>, <strong>Louis Durey</strong> e <strong>Germaine Tailleferre</strong>,
              che negli anni '20 rifiutavano tanto il wagnerismo quanto l'impressionismo, cercando una musica moderna, urbana, ironica.
            </p>
            <div className="rounded-lg overflow-hidden border border-blue-700/40 bg-slate-950 mt-4">
              <img
                src="/images/les_six -.jpeg"
                alt="Les Six"
                className="w-full h-72 sm:h-80 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                I Sei in una fotografia di gruppo del primo dopoguerra.
              </p>
              <div className="pb-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowSixModal(true)}
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                >
                  Approfondisci
                </button>
              </div>
            </div>
          </div>

          <div className="bg-purple-950/20 border border-purple-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-purple-200 mb-2">L'<em>esprit nouveau</em> e Jean Cocteau</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Il poeta <strong>Jean Cocteau</strong> teorizzò questo nuovo spirito nel pamphlet <em><strong>Le Coq et l'Arlequin</strong></em> (1918),
              in cui esaltava Satie come modello di <strong>chiarezza, semplicità e antiretoricalità</strong>.
              I Sei (Poulenc, Milhaud, Honegger, Auric, Durey e Tailleferre) si riconoscevano in questa visione:
              musica urbana, ironica, diretta, che rifiutava gli eccessi romantici e abbracciava il <strong>music-hall</strong>,
              il <strong>jazz</strong> e la <strong>quotidianità</strong>.
            </p>
          </div>

          <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-2">Il mentore riluttante</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Satie accettò con <strong>ironico distacco</strong> il ruolo di patriarca. Non amava essere trattato come
              una "reliquia vivente", ma apprezzava che i giovani compositori riconoscessero in lui un <strong>innovatore autentico</strong>,
              non un mero precursore dimenticato. Il rapporto con Poulenc in particolare fu affettuoso e reciprocamente rispettoso.
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed italic">
            Attraverso il Gruppo dei Sei, Satie influenzò profondamente la musica francese del Novecento, incarnando
            un <strong>modernismo alternativo</strong>: né accademico né impressionista, ma lucido, essenziale, antieroico.
          </p>
        </div>
      </div>
      </>
      )}

      {satieTab === "vita" && (
      <>
      {/* La vita di Satie - Timeline espandibile */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-400" />
            La vita di Erik Satie (1866-1925)
          </h2>
        </div>

        {!showFullTimeline ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              Questa sezione è una cronologia: per leggere tutti gli eventi in ordine basta cliccare su{" "}
              <strong>Mostra timeline completa</strong>. Il pulsante apre la sequenza completa dalla nascita
              agli ultimi anni, così puoi scorrere l'intera vita di Satie senza salti.
            </p>
            <button
              type="button"
              onClick={() => setShowFullTimeline(!showFullTimeline)}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              {showFullTimeline ? "Riduci" : "Mostra timeline completa"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFullTimeline ? "rotate-180" : ""}`} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowFullTimeline(!showFullTimeline)}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              {showFullTimeline ? "Riduci" : "Mostra timeline completa"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFullTimeline ? "rotate-180" : ""}`} />
            </button>
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
      </>
      )}

      {satieTab === "stramberie" && (
        <div className="space-y-6">
          <StramberieSection />
          <IndicazioniSection />
        </div>
      )}

      {satieTab === "vita" && (
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-3">
            Quando vuoi, prosegui con le amicizie e le collaborazioni.
          </p>
          <button
            type="button"
            onClick={() => {
              setSatieTab("amicizie");
              scrollToTop();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Amicizie
          </button>
        </div>
      )}
      {satieTab === "amicizie" && (
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-3">
            Ora puoi passare alle stramberie e alle indicazioni sugli spartiti.
          </p>
          <button
            type="button"
            onClick={() => {
              setSatieTab("stramberie");
              scrollToTop();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Stramberie
          </button>
        </div>
      )}
      {satieTab === "stramberie" && (
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-3">
            Ora che conosci il contesto e l'uomo, scopriamo come nacque il capolavoro.
          </p>
          <button
            type="button"
            onClick={() => goTo?.("brano")}
            onTouchEnd={(e) => {
              e.preventDefault();
              goTo?.("brano");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold transition-colors"
          >
            Prosegui
          </button>
        </div>
      )}
    </div>
  );
};

export default SatieSection;
