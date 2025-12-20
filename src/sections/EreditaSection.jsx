import { useState } from "react";
import { Sparkles, Music, Library, ExternalLink, ChevronRight } from "lucide-react";
import Modal from "../components/Modal";

const EreditaSection = () => {
  const [showAmeublementModal, setShowAmeublementModal] = useState(false);
  const [showMinimalismoModal, setShowMinimalismoModal] = useState(false);
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
      <Modal
        isOpen={showAmeublementModal}
        onClose={() => setShowAmeublementModal(false)}
        title="Musique d'ameublement: la musica come arredo"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="text-slate-200">
            In sintesi: <strong>musica da ignorare</strong>, progettata per fondersi con l'ambiente.
          </p>
          <p>
            La <strong>musique d'ameublement</strong> (musica d'arredamento) è la proposta più radicale di Satie:
            la musica <strong>non deve essere ascoltata</strong> come concerto, ma deve stare in sottofondo come
            un mobile in una stanza.
          </p>

          <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-blue-500">
            <p>
              L'idea nasce (secondo Fernand Léger) in un ristorante: Satie immagina una musica capace di{" "}
              <strong>ammorbidire i rumori</strong> di coltelli e forchette, senza imporsi.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-2">In parole semplici</h4>
            <ul className="space-y-2">
              <li>• Non è “arte sacra”: è <strong>funzionale</strong>, come luce o riscaldamento.</li>
              <li>• È <strong>anti-ascolto</strong>: deve essere ignorata, non seguita con devozione.</li>
              <li>• Musicalmente usa <strong>frammenti brevi ripetuti</strong> senza sviluppo o climax.</li>
            </ul>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-2">Opere (1917–1923)</h4>
            <ul className="space-y-2">
              <li>• <strong>Tapisserie en fer forgé</strong> – per un vestibolo di ricevimento.</li>
              <li>• <strong>Carrelage phonique</strong> – per un pranzo o una firma di contratto.</li>
              <li>• <strong>Tenture de cabinet préfectoral</strong> – 12 battute da ripetere all'infinito.</li>
              <li>• <strong>Chez un bistrot</strong></li>
              <li>• <strong>Un salon</strong></li>
            </ul>
          </div>

          <p>
            L'unico esperimento pubblico (Galerie Barbazanges, 8 marzo 1920) fallì: il pubblico si sedette ad
            ascoltare. Satie gridava: <em>"Parlate! Circolate! Non ascoltate!"</em>.
          </p>

          <p>
            Il concetto torna nel cinema: per <em>Entr'acte</em> (1924) scrive musica a blocchi ripetuti, pensata
            come sfondo che accompagna le immagini.
          </p>

          <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-emerald-500">
            <p>
              Eredità: <strong>ambient</strong> (Brian Eno), <strong>minimalismo</strong>, John Cage e perfino la musica
              di sottofondo moderna (Muzak). Un'intuizione profetica su come oggi viviamo il suono.
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showMinimalismoModal}
        onClose={() => setShowMinimalismoModal(false)}
        title="Minimalismo: il filo che parte da Satie"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="text-slate-200">
            In sintesi: <strong>ripetizione, staticita e attenzione al tempo</strong> al posto dello sviluppo drammatico.
          </p>
          <p>
            Le <em>Gymnopédies</em>, le <em>Gnossiennes</em> e soprattutto <em>Vexations</em> anticipano una logica
            musicale basata su <strong>processi</strong> e <strong>durate</strong> piu che su climax narrativi.
            Satie riduce la materia, lascia spazio al silenzio e al colore timbrico: elementi che diventeranno
            centrali nel minimalismo del Novecento.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-2 border-emerald-500">
            <p>
              <strong>John Cage</strong> fece eseguire <em>Vexations</em> nel 1963 (840 ripetizioni) e riconobbe
              in Satie un precursore della musica come processo. Da qui il ponte verso <strong>Steve Reich</strong>,
              <strong>Philip Glass</strong> e l'estetica della ripetizione.
            </p>
          </div>
          <p>
            Il minimalismo, come la musica d'arredamento, nasce anche da un rifiuto dell'enfasi romantica:
            meno pathos, piu presenza. In questo senso Satie e un vero <strong>punto di origine</strong>.
          </p>
        </div>
      </Modal>

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
          className="w-full h-80 md:h-96 object-contain p-2"
        />
        <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
          John Cage durante la maratona di "Vexations" (New York, 1963)
        </p>
      </div>

      {/* 1. I contemporanei */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">I contemporanei (1890-1925)</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          <strong>Claude Debussy</strong> intuì la forza di queste pagine e le orchestrò tra il 1896 e il 1897, rendendo
          la Gymnopédie n.1 un simbolo dell'estetica impressionista. <strong>Maurice Ravel</strong> ne ammirava la chiarezza
          formale, mentre il <strong>Groupe des Six</strong> (Poulenc, Milhaud, Honegger, Auric, Durey, Tailleferre)
          lo considerava un padre spirituale: musica essenziale, quotidiana, anti-wagneriana.
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
            <button
              type="button"
              onClick={() => setShowMinimalismoModal(true)}
              className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
            >
              Approfondisci <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h4 className="text-base font-semibold text-slate-100 mb-2">Musica ambient</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nel 1917 Satie concepì la <em>Musique d'ameublement</em> (musica d'arredamento), pensata per accompagnare senza
              invadere. Nel 1978 <strong>Brian Eno</strong> pubblicò <em>Ambient 1: Music for Airports</em>, definendo l'ambient
              come musica che “può essere ignorata quanto ascoltata”: la stessa idea di Satie, un secolo prima.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/Brian_Eno_2015.png"
                  alt="Brian Eno"
                  className="w-full h-56 object-contain bg-slate-950 p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                  Brian Eno (2015), pioniere dell'ambient e teorico della musica come ambiente.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/Music_for_Airports.jpg"
                  alt="Ambient 1: Music for Airports"
                  className="w-full h-56 object-contain bg-slate-950 p-2"
                />
                <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                  <em>Ambient 1: Music for Airports</em> (1978): manifesto della musica d'ambiente.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mt-4">
              Eno rende esplicito il principio gia formulato da Satie: una musica funzionale, che non chiede attenzione
              ma modella lo spazio con discrezione.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-900/60 mt-4">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/vNwYtllyt3Q"
                  title="Brian Eno - Music for Airports"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="text-sm text-slate-300">Brian Eno, <em>Music for Airports</em></p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAmeublementModal(true)}
              className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
            >
              Approfondisci <ChevronRight className="w-4 h-4" />
            </button>
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
                {item.title.includes("Aldo Ciccolini") ? (
                  <div className="grid md:grid-cols-[1fr_1.3fr] gap-4 items-stretch">
                    <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                      <img
                        src="/images/satie_ciccolini.jpg"
                        alt="Aldo Ciccolini"
                        className="w-full h-48 object-contain bg-slate-950 p-2"
                      />
                      <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                        Aldo Ciccolini, interprete chiave per la riscoperta di Satie.
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-slate-300 mb-3">
                        Ciccolini non si limita a eseguire le Gymnopédies: le porta in sala da concerto con una
                        lettura limpida e controllata, che restituisce la loro modernita senza romanticismi.
                      </p>
                      <p className="text-sm text-slate-300 mb-3">
                        Le sue incisioni e i recital della seconda meta del Novecento hanno consolidato Satie
                        nel repertorio pianistico, presentandolo come autore essenziale e non solo come curiosita
                        da cabaret.
                      </p>
                      <p className="text-sm text-slate-300">
                        In questo senso la sua interpretazione ha funzionato come vero atto di riscoperta: ha
                        mostrato che la semplicità di Satie era una scelta estetica radicale.
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                      >
                        Ascolta su YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : item.title.includes("Khatia Buniatishvili") ? (
                  <div className="grid md:grid-cols-[1fr_1.3fr] gap-4 items-stretch">
                    <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                      <img
                        src="/images/kathia Labyrinh.jpg"
                        alt="Khatia Buniatishvili"
                        className="w-full h-48 object-contain bg-slate-950 p-2"
                      />
                      <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                        Khatia Buniatishvili: lettura intensa e contemporanea delle Gymnopédies.
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-slate-300 mb-3">
                        La sua interpretazione mette in luce il lato piu emotivo e cinematografico di Satie,
                        con un suono ampio ma controllato e un fraseggio che resta sospeso.
                      </p>
                      <p className="text-sm text-slate-300">
                        In questo modo le Gymnopédies diventano accessibili a un pubblico nuovo, senza perdere
                        la loro essenzialita e la loro delicatezza originale.
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                      >
                        Ascolta su YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 mb-3">{item.description}</p>
                )}
                {!item.title.includes("Aldo Ciccolini") && !item.title.includes("Khatia Buniatishvili") && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                  >
                    apri <ExternalLink className="w-3 h-3" />
                  </a>
                )}
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

export default EreditaSection;
