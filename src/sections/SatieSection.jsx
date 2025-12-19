import React, { useState } from "react";
import { User, Users, Music, BookOpen, GraduationCap, Sparkles, ChevronDown, XCircle, Home } from "lucide-react";
import Tooltip from "../components/Tooltip";
import { satieLifeTimeline } from "../data/timeline";
import StramberieSection from "./StramberieSection";
import IndicazioniSection from "./IndicazioniSection";

const SatieSection = () => {
  const [satieTab, setSatieTab] = useState("vita");
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const satieTabs = [
    { key: "vita", label: "La vita" },
    { key: "amicizie", label: "Amicizie" },
    { key: "stramberie", label: "Stramberie" },
  ];

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
      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
        <img
          src="/images/Satie con occhiali.jpg"
          alt="Erik Satie con occhiali"
          className="w-full h-72 md:h-96 object-contain p-2"
        />
        <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
          Erik Satie: il bohémien che rifiuta le convenzioni accademiche
        </p>
      </div>
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
      <>
      {/* Il giovane ribelle */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-red-400" />
          Il giovane ribelle (1866-1887)
        </h2>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
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

              <h3 className="text-base font-semibold text-slate-100 mt-4">1870 (4 anni) — trasferimento a Parigi</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Durante la{" "}
                <Tooltip text="Conflitto tra Francia e Prussia (1870-1871) che portò alla caduta di Napoleone III">
                  <span>guerra Franco-Prussiana</span>
                </Tooltip>, la famiglia si trasferisce a <strong>Parigi</strong>.
                Ma nel <strong>1872</strong>, quando Erik ha appena <strong>sei anni</strong>, la madre <strong>muore</strong>.
                Il padre, incapace di occuparsi dei tre figli superstiti, li manda dai nonni paterni a Honfleur.
                I nonni materni, di origine scozzese, vivevano a Londra.
              </p>

              <h3 className="text-base font-semibold text-slate-100 mt-4">1872-1878 (6-12 anni) — ritorno a Honfleur</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Erik cresce dai nonni in Normandia. La nonna gli dà le <strong>prime lezioni di pianoforte</strong>,
                alimentando il suo talento musicale. Ma nel <strong>1878</strong>, quando ha <strong>12 anni</strong>,
                anche la <strong>nonna muore</strong>.
              </p>

              <h3 className="text-base font-semibold text-slate-100 mt-4">1878 (12 anni) — di nuovo a Parigi</h3>
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

            <div className="mt-4 rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Conservatorio di Parigi.jpg"
                alt="Conservatoire de Paris"
                className="w-full h-48 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Conservatoire de Paris: l'istituzione che giudicò Satie "il più pigro studente"
              </p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-3">Gli anni di formazione autodidatta</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Tra il 1882 e il 1883, fuori dal Conservatorio, Satie si dedica alle <strong>letture</strong>:
              Voltaire, Dumas, Andersen. Sviluppa preferenze musicali personali per <strong>Bach, Chopin e Schumann</strong>.
              Rifiuta il wagnerismo dominante e cerca una strada alternativa.
            </p>

            <h3 className="text-base font-semibold text-slate-100 mb-2 mt-4">1884 — il primo brano: <em>Allegro</em></h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              La prima composizione nota per pianoforte è l'<strong><em>Allegro</em></strong>, scritta nel <strong>1884</strong> a 18 anni.
              Seguono altre opere giovanili come la <em>Valse-Ballet</em> e la <em>Fantaisie-Valse</em> (<strong>1885-1887</strong>, 19-21 anni).
            </p>

            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/allegro-satie-1884.jpeg"
                alt="Spartito dell'Allegro di Erik Satie"
                className="w-full object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                "Allegro" (1884): la prima composizione ufficiale di Erik Satie
              </p>
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
              <strong>Claude Debussy</strong>, <strong>Paul Verlaine</strong> e{" "}
              <Tooltip text="Pittore e illustratore (1864-1901), celebre per la vita notturna di Montmartre.">
                <strong>Toulouse-Lautrec</strong>
              </Tooltip>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Qui Satie incontra <strong>J. P. Contamine de Latour</strong>, <span>poeta simbolista</span>,
              la cui poesia <em>Les Antiques</em> sarà pubblicata con le <em>Gymnopédie</em>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/6_Rue_Cortot -.jpeg"
                alt="6 Rue Cortot, Montmartre"
                className="w-full h-72 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                6 Rue Cortot, Montmartre: abitazione di Satie durante gli anni delle Gymnopédies.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/The bohemien SATIE.jpg"
                alt="Erik Satie in abito bohémien"
                className="w-full h-72 object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Erik Satie in abito bohémien: ritratto del compositore negli anni di Montmartre.
              </p>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Febbraio-aprile 1888 — la composizione
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              In questo ambiente di libertà artistica, Satie compone le <strong>tre Gymnopédies</strong>.
              Pagine brevi, apparentemente semplici, ma rivoluzionarie: armonie sospese, forme svuotate di drammaticità,
              un suono "bianco" che oppone al wagnerismo dominante un'<strong>estetica dell'essenziale</strong>.
            </p>

            <div className="rounded-lg overflow-hidden border border-slate-600 mt-3">
              <img
                src="/images/SATIE SCHIZZO AL PIANO.jpg"
                alt="Ritratto di Erik Satie all'armonium"
                className="w-full object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Ritratto di Erik Satie che suona l'armonium (Santiago Rusiñol, senza data)
              </p>
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
          Nel <strong>1891</strong> Satie entra nell'Ordine della Rosa-Croce del "Sâr" <strong>Joséphin Péladan</strong>, diventandone
          compositore ufficiale e maestro di cappella. È una fase di misticismo, simbolismo e disciplina estetica,
          in cui cerca una musica essenziale e rituale.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/Peladan.jpg"
              alt="Joséphin Péladan"
              className="w-full object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
              Joséphin Péladan, fondatore dell'Ordine della Rosa-Croce
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/erik-satie-son-of-stars_u-l-q1nt8j80.jpg"
              alt="Manoscritto Le Fils des Étoiles"
              className="w-full object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
              Manoscritto "Le Fils des Étoiles" (1891)
            </p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-slate-600 mt-4">
          <img
            src="/images/Le-Fils-des-etoiles.jpg"
            alt="Spartito completo di Le Fils des Étoiles"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
            "Le Fils des Étoiles" (1891): preludio al primo atto del dramma di Péladan.
            Musica statica, contemplativa, che cerca di evocare atmosfere esoteriche attraverso
            armonie modali e un ritmo quasi inesistente
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">"Esoterik Satie"</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A Montmartre, lo scrittore Alphonse Allais lo soprannominò <em>"Esoterik Satie"</em> — un gioco di parole
              che univa il suo nome ai suoi interessi mistici. L'aspetto caratteristico: cappello a cilindro, lunghi capelli,
              mantello nero.
            </p>
          </div>

          <div className="bg-red-950/20 border border-red-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-red-200 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              1892 (26 anni) — rottura con Péladan
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nel <strong>1892 (26 anni)</strong>, dopo appena un anno, Satie rompe i rapporti con l'Ordine della Rosa-Croce
              per divergenze estetiche e per la sua natura iconoclasta. Non sopporta l'autorità di Péladan
              e decide di fondare una sua personale "chiesa".
            </p>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">
              1893 (27 anni) — l'Église Métropolitaine d'Art de Jésus Conducteur
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
                className="w-full object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Erik Satie, leader della Chiesa Metropolitana d'Arte (c. 1895)
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

        <div className="grid md:grid-cols-[1.05fr_1.35fr] gap-4 items-stretch mb-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/satie e debussy.jpg"
              alt="Erik Satie e Claude Debussy"
              className="w-full h-72 md:h-full object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
              Erik Satie e Claude Debussy: un'amicizia che definì la musica moderna francese
            </p>
          </div>
          <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-4 flex flex-col justify-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              Il legame tra Satie e <strong>Claude Debussy</strong> nacque nel <strong>1891 all'Auberge du Clou</strong> a Montmartre
              e fu uno dei più significativi della musica moderna. Debussy, già avviato verso il successo, riconobbe in Satie
              un <strong>"precursore"</strong> capace di indicare nuove strade oltre il wagnerismo imperante.
              Nel 1892 lo definì «<em>un musicista medievale e dolce smarrito in questo secolo</em>».
            </p>
          </div>
        </div>

        <div className="space-y-4">

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">1896-1897 — Il gesto decisivo</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In un gesto di profonda stima e <strong>supporto economico</strong>, Debussy orchestrò la <strong>prima e la terza Gymnopédie</strong>
              nel 1896-1897, presentandole al pubblico nel <strong>febbraio 1897</strong> e contribuendo in modo decisivo alla fama dell'amico.
              Fu l'unica volta che Debussy orchestrò l'opera di un altro compositore.
            </p>
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
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50">
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

        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Nel <strong>1911</strong>, a più di vent'anni dalla composizione delle Gymnopédies, <strong>Maurice Ravel</strong>
            — allora già affermato compositore — decise di far eseguire la <strong>Gymnopédie n. 3</strong> in pubblico,
            contribuendo a rilanciare l'interesse per la musica di Satie in un momento in cui era caduto in un relativo oblio.
          </p>

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
                className="w-full h-80 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Suzanne Valadon, "Ritratto di Erik Satie" (1892-93)
              </p>
            </div>

            {/* Foto satie-valadon (quadrata) */}
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/satie-e-valadon.jpg"
                alt="Erik Satie e Suzanne Valadon"
                className="w-full h-80 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Erik Satie e Suzanne Valadon (1893)
              </p>
            </div>

            {/* Disegno di Satie (verticale) */}
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Satie_portret_Valadon_1893.jpg"
                alt="Ritratto di Suzanne Valadon disegnato da Erik Satie"
                className="w-full h-80 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Disegno originale di Erik Satie raffigurante Suzanne Valadon (1893)
              </p>
            </div>
          </div>

          {/* Spartito Bonjour Biqui centrato */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
              <img
                src="/images/Bonjour-Biquii.jpg"
                alt="Spartito di Bonjour Biqui, Bonjour!"
                className="w-full h-48 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
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
        <div className="grid sm:grid-cols-2 gap-4 items-stretch">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/2015-Arcueil-Erik-Satie-house.jpg"
              alt="Casa di Erik Satie ad Arcueil"
              className="w-full h-80 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
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
      </div>
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/jean-cocteau---erik-satie--arcueil--mais-JKLTD-570.webp"
                alt="Schizzo di Jean Cocteau su Erik Satie"
                className="w-full object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Schizzo di Cocteau dedicato a Satie
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-600">
              <img
                src="/images/pARADE SATIE FRONTE.jpg"
                alt="Spartito di Parade"
                className="w-full object-contain bg-slate-950 p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Spartito di "Parade" (1917)
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-slate-600 mt-4">
            <img
              src="/images/RAGTIME PARADE.jpg"
              alt="Spartito del Ragtime da Parade"
              className="w-full object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
              Spartito del Ragtime da "Parade": Satie incorpora elementi di musica popolare americana
              nel linguaggio classico europeo, anticipando il jazz e la contaminazione tra generi musicali
            </p>
          </div>

          <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4 mt-4">
            <h3 className="text-base font-semibold text-amber-200 mb-2">Il successo e lo scandalo</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <em>Parade</em> fu uno <strong>scandalo</strong>: la musica incorporava rumori quotidiani
              (macchine da scrivere, sirene, pistole), le scene cubiste di Picasso sconvolgevano il pubblico,
              e Cocteau parlava di "realismo surrealista". Ma proprio questo scandalo consacrò Satie
              come patriarca delle nuove avanguardie.
            </p>
          </div>

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
            guardavano a Satie come al loro <strong>"Bon Maître"</strong> (il Buon Maestro) — un mentore spirituale che incarnava
            l'ideale di una <strong>musica francese moderna</strong>, liberata tanto dal wagnerismo quanto dall'impressionismo debussyano.
          </p>

          <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-blue-200 mb-2">Il Gruppo dei Sei</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dopo <em>Parade</em>, Satie diventa il <strong>patriarca spirituale</strong> del{" "}
              <strong>Groupe des Six</strong> (Gruppo dei Sei), collettivo di sei giovani compositori francesi —{" "}
              <strong>Francis Poulenc</strong>, <strong>Darius Milhaud</strong>, <strong>Arthur Honegger</strong>,{" "}
              <strong>Georges Auric</strong>, <strong>Louis Durey</strong> e <strong>Germaine Tailleferre</strong> —
              che negli anni '20 rifiutavano tanto il wagnerismo quanto l'impressionismo, cercando una musica moderna, urbana, ironica.
            </p>
          </div>

          <div className="bg-purple-950/20 border border-purple-700/30 rounded-xl p-4">
            <h3 className="text-base font-semibold text-purple-200 mb-2">L'<em>esprit nouveau</em> e Jean Cocteau</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Il poeta <strong>Jean Cocteau</strong> teorizzò questo nuovo spirito nel pamphlet <em><strong>Le Coq et l'Arlequin</strong></em> (1918),
              in cui esaltava Satie come modello di <strong>chiarezza, semplicità e antiretoricalità</strong>.
              I Sei — Poulenc, Milhaud, Honegger, Auric, Durey e Tailleferre — si riconoscevano in questa visione:
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
      </>
      )}

      {satieTab === "stramberie" && (
        <div className="space-y-6">
          <StramberieSection />
          <IndicazioniSection />
        </div>
      )}

      {satieTab !== "stramberie" && (
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-3">
            Ora che conosci il contesto e l'uomo, scopriamo come nacque il capolavoro
          </p>
        </div>
      )}
    </div>
  );
};

export default SatieSection;
