import { useState } from "react";
import { MapPin, Sparkles, BookOpen, Music } from "lucide-react";
import Tooltip from "../components/Tooltip";
import Modal from "../components/Modal";

const Parigi1888Section = () => {
  const [showAntiquesModal, setShowAntiquesModal] = useState(false);
  return (
  <div className="space-y-6 max-w-5xl mx-auto">
    <Modal
      isOpen={showAntiquesModal}
      onClose={() => setShowAntiquesModal(false)}
      title="Les Antiques (J. P. Contamine de Latour)"
    >
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <div className="text-sm font-semibold text-slate-100 mb-2">Testo originale (francese)</div>
          <p className="whitespace-pre-line">
            Oblique et coupant l'ombre un torrent éclatant{"\n"}
            Ruisselait en flots d'or sur la dalle polie{"\n"}
            Où les atomes d'ambre au feu se miroitant{"\n"}
            Mêlaient leur sarabande à la gymnopédie
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100 mb-2">Traduzione (italiano)</div>
          <p className="whitespace-pre-line">
            Obliquo e fendente l'ombra, un torrente splendente{"\n"}
            scorreva in flutti d'oro sulla lastra levigata{"\n"}
            dove gli atomi d'ambra, specchiandosi nel fuoco,{"\n"}
            mescolavano la loro sarabanda alla gymnopédie
          </p>
        </div>
      </div>
    </Modal>
    {/* Header */}
    <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
      <h1 className="text-3xl font-bold text-slate-100 mb-3 flex items-center gap-3">
        <MapPin className="w-7 h-7 text-blue-400" />
        Parigi 1888: la scena
      </h1>
      <p className="text-sm text-slate-300 leading-relaxed">
        Per capire le Gymnopédies, dobbiamo prima immergerci nella Parigi di fine Ottocento: una città in fermento,
        dove l'arte si rinnova, dove i café-cabaret di Montmartre diventano laboratori di sperimentazione
        e dove un giovane pianista sta per cambiare il corso della musica.
      </p>
    </div>
    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-slate-100 mb-3">Un salto nella Parigi della Belle Époque</h2>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        La <strong>Belle Époque</strong> (circa 1871-1914) è un periodo di ottimismo, crescita economica e fiducia nel
        progresso tecnico: Parigi diventa una capitale moderna, illuminata, piena di nuove invenzioni e di spinta verso il futuro.
        La{" "}
        <Tooltip text="Vita artistica fuori dalle regole borghesi: caffè, atelier, precarietà e sperimentazione.">
          <strong>bohème</strong>
        </Tooltip>{" "}
        è la controfaccia artistica di questa modernità: vita libera, notti nei caffè, rifiuto delle regole borghesi,
        sperimentazione continua.
      </p>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        Il{" "}
        <Tooltip text="Movimento che privilegia simboli ed evocazioni rispetto alla descrizione diretta.">
          <strong>Simbolismo</strong>
        </Tooltip>{" "}
        rompe con il{" "}
        <Tooltip text="Rappresentazione fedele e oggettiva della realtà.">
          <span>realismo</span>
        </Tooltip>{" "}
        e privilegia immagini evocative, sogni, allusioni: in letteratura spiccano{" "}
        <Tooltip text="Poeta simbolista francese (1844-1896).">
          <strong>Verlaine</strong>
        </Tooltip>{" "}
        e{" "}
        <Tooltip text="Poeta simbolista francese (1842-1898).">
          <strong>Mallarmé</strong>
        </Tooltip>, mentre in pittura e grafica si affermano i manifesti e l'estetica notturna dei locali di Montmartre.
        In musica, l'<strong>Impressionismo</strong> cerca colore timbrico e atmosfera: i nomi chiave sono{" "}
        <Tooltip text="Compositore francese (1862-1918), padre dell'impressionismo musicale.">
          <strong>Claude Debussy</strong>
        </Tooltip>{" "}
        e{" "}
        <Tooltip text="Compositore francese (1875-1937), maestro dell'orchestrazione e della chiarezza formale.">
          <strong>Maurice Ravel</strong>
        </Tooltip>.
      </p>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        Il <strong>cabaret francese</strong> (café-concert) è il punto di incontro tra arti diverse: musica dal vivo, poesia,
        satira e pittura convivono nello stesso spazio. Locali come il <em>Chat Noir</em> e il <em>Lapin Agile</em> diventano
        laboratori creativi dove gli artisti si contaminano a vicenda e dove Satie costruisce la sua identità musicale.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="#parigi-belle-epoque" className="text-sm text-blue-300 hover:text-blue-200 font-semibold">
          La Belle Époque
        </a>
        <a href="#parigi-montmartre" className="text-sm text-blue-300 hover:text-blue-200 font-semibold">
          Montmartre bohémien
        </a>
        <a href="#parigi-simbolismo" className="text-sm text-blue-300 hover:text-blue-200 font-semibold">
          Il simbolismo
        </a>
      </div>
    </div>
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
      <img
        src="/images/paris-10-place-de-la-republique-et-magasins-reunis.jpg"
        alt="Place de la République a Parigi"
        className="w-full object-contain p-2"
      />
      <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
        Place de la République e Magasins Réunis: la Parigi urbana di fine Ottocento
      </p>
    </div>

    {/* La Belle Époque */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 id="parigi-belle-epoque" className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3 scroll-mt-28">
        <Sparkles className="w-6 h-6 text-amber-400" />
        La Belle Époque
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Il <strong className="text-slate-100">1888</strong> è un anno simbolo della Belle Époque, periodo di ottimismo
          tecnologico e fermento culturale che caratterizzò la Francia tra la fine dell'Ottocento e la Prima Guerra Mondiale.
        </p>

        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">Cosa succede nel 1888</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                la <strong>Torre Eiffel</strong> è in costruzione per l'
                <Tooltip text="Grande esposizione internazionale a Parigi (1889) che celebra il progresso tecnico e industriale.">
                  <span>Esposizione Universale</span>
                </Tooltip>{" "}
                del 1889;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <Tooltip text="Chimico e microbiologo francese; pioniere della vaccinazione e della teoria dei germi.">
                  <strong>Louis Pasteur</strong>
                </Tooltip>{" "}
                fonda l'Istituto Pasteur, rivoluzionando la medicina;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <Tooltip text="Fisico tedesco che dimostra sperimentalmente le onde elettromagnetiche.">
                  <strong>Heinrich Hertz</strong>
                </Tooltip>{" "}
                dimostra l'esistenza delle onde elettromagnetiche;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <Tooltip text="Imprenditore statunitense; fondatore della Eastman Kodak Company.">
                  <strong>George Eastman</strong>
                </Tooltip>{" "}
                brevetta la prima fotocamera portatile Kodak;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                l'arte si libera dal{" "}
                <Tooltip text="Corrente ottocentesca caratterizzata da enfasi emotiva e culto del genio artistico.">
                  <strong>romanticismo</strong>
                </Tooltip>{" "}
                e dalle regole accademiche.
              </span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In musica,{" "}
          <Tooltip text="Richard Wagner (1813-1883), compositore tedesco noto per drammi musicali monumentali e armonie dense.">
            <strong className="text-slate-100">Wagner</strong>
          </Tooltip>{" "}
          domina l'Europa con le sue opere monumentali e le tensioni armoniche drammatiche; ma a Parigi,
          nei café-cabaret di Montmartre, sta nascendo qualcosa di completamente diverso.
        </p>

        {/* Immagini Belle Époque */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/parigi-belle-epoque-1888.jpg"
              alt="Costruzione Torre Eiffel"
              className="w-full h-56 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Costruzione della Torre Eiffel (1887-1889)
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600">
            <img
              src="/images/Paris_1889_plakat.jpg"
              alt="Manifesto dell'Esposizione Universale di Parigi 1889"
              className="w-full h-56 object-contain bg-slate-950 p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Manifesto dell'Esposizione Universale di Parigi (1889)
            </p>
          </div>
        </div>

        {/* Cartoline Parigi Belle Époque */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/499-paris-paris-e-boulevard-montmartre.jpg"
              alt="Boulevard Montmartre"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Boulevard Montmartre dall'alto
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
            <img
              src="/images/paris-11-cafe-leroy-angle-rue-fontaine-au-roi-et-avenue-parmentier-1916.jpg"
              alt="Café Leroy 1916"
              className="w-full h-56 object-contain p-2"
            />
            <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50 min-h-[3.5rem]">
              Café Leroy (1916)
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Montmartre: il quartiere bohémien */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 id="parigi-montmartre" className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3 scroll-mt-28">
        <MapPin className="w-6 h-6 text-blue-400" />
        Montmartre: il quartiere bohémien
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          <Tooltip text="Quartiere parigino dei café-cabaret dove Satie lavorò come pianista e trovò ispirazione per il suo stile sobrio">
            <strong className="text-slate-100">Montmartre</strong>
          </Tooltip>,
          sulla collina a nord di Parigi, era il cuore della vita artistica bohémien: qui si mescolavano pittori, poeti, musicisti e intellettuali in un'atmosfera di libertà e sperimentazione.
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
              className="w-full h-56 object-contain bg-slate-950 p-2"
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
              className="w-full h-56 object-contain p-2"
            />
          </div>
        </div>

        {/* L'atmosfera */}
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">L'atmosfera dei café-cabaret</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Nei cabaret di Montmartre, l'<strong>arte "alta"</strong> si mescolava con la <strong>cultura popolare</strong>: la musica non era un rito religioso da sala da concerto, ma accompagnamento alla vita quotidiana con
            conversazioni, fumo, alcol, poesia.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vi passarono <strong>Claude Debussy</strong>, <strong>Paul Verlaine</strong>, <strong>Toulouse-Lautrec</strong>
            e molti altri artisti che avrebbero segnato l'epoca.
          </p>
        </div>

        {/* Vita bohémien */}
        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">La vita bohémien</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            La bohème non era solo uno stile, ma un modo di stare al mondo: precarietà economica,
            notti passate a discutere di estetica, amicizie e rivalità tra pittori e musicisti, gusto per
            l'ironia e il paradosso. In questo ambiente, la musica smette di essere cerimonia ufficiale
            e diventa linguaggio quotidiano, vicino alle persone e alle loro vite.
          </p>

          {/* Immagini affiancate: El Bohemi + Parigi Belle Époque */}
          <div className="grid sm:grid-cols-2 gap-4 items-stretch">
            {/* Colonna sinistra: El bohemi + Satie bohémien */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/El_bohemi_by_Ramon_Casas-1.jpg"
                  alt="El bohemi di Ramon Casas"
                  className="w-full h-full object-contain p-2"
                />
                <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Ramon Casas (1866-1932), <em>El Bohemio, Poet of Montmartre</em>, 1891, olio su tela.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/The bohemien SATIE.jpg"
                  alt="Erik Satie in abito bohémien"
                  className="w-full h-full object-contain p-2"
                />
                <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Erik Satie in abito bohémien, anni di Montmartre.
                </p>
              </div>
            </div>

            {/* Colonna destra: foto Tour Eiffel + testo */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                <img
                  src="/images/progetti-rifiutati-tour.jpg"
                  alt="Progetti rifiutati per la Tour Eiffel"
                  className="w-full h-full object-contain p-2"
                />
                <p className="text-sm text-slate-400 p-2 italic text-center bg-slate-900/50 min-h-[3.5rem]">
                  Progetti rifiutati per l'Esposizione Universale del 1889
                </p>
              </div>

              <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-100 mb-2">La Tour Eiffel: da struttura temporanea a icona</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  La Torre Eiffel fu costruita come <strong>struttura temporanea</strong> per l'Esposizione Universale
                  del 1889, celebrazione del centenario della Rivoluzione Francese.{" "}
                  <br />
                  Doveva essere <strong>smontata dopo 20 anni</strong>.
                  Molti intellettuali parigini la detestarono, chiamandola "mostro di ferro". Ma la torre si rivelò preziosa
                  per esperimenti scientifici (telegrafo senza fili, meteorologia) e nel 1909 fu salvata dalla demolizione.
                  La sua ossatura in ferro, inizialmente percepita come provocazione, divenne presto un emblema di modernità,
                  ingegneria e fiducia nel progresso.{" "}
                  <br />
                  Dalla piattaforma panoramica alle prime antenne radio, la torre dimostrò
                  di essere utile oltre che spettacolare.{" "}
                  <br />
                  <br />
                  Oggi è il simbolo universale di Parigi e della Belle Époque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Il clima artistico: simbolismo */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 id="parigi-simbolismo" className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3 scroll-mt-28">
        <BookOpen className="w-6 h-6 text-purple-400" />
        Il simbolismo
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Montmartre era il centro del <strong className="text-slate-100">movimento simbolista</strong>,
          che rifiutava il <span>realismo</span> e l'accademismo in favore dell'evocazione, del sogno,
          dell'immagine e della suggestione.
        </p>

        <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
          <h3 className="text-base font-semibold text-slate-100 mb-3">Principi del simbolismo musicale</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span><strong>Evocazione</strong> invece di descrizione;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                <Tooltip text="Uso di accordi e progressioni che non seguono le regole tonali tradizionali, creando incertezza">
                  <strong>ambiguità armonica</strong>
                </Tooltip>{" "}
                invece di progressioni chiare;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                <Tooltip text="Timbro e atmosfera sonora come elementi principali della composizione">
                  <strong>colore</strong>
                </Tooltip>{" "}
                invece di{" "}
                <Tooltip text="Elaborazione e variazione di un tema musicale attraverso diverse sezioni del brano">
                  <span>sviluppo tematico</span>
                </Tooltip>;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>l'idea di <strong>"musica bianca"</strong> senza ornamenti, essenziale.</span>
            </li>
          </ul>
        </div>

        {/* Personaggi chiave */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">J. P. Contamine de Latour</h3>
            <p className="text-sm text-slate-300">
              <span>Poeta simbolista</span>. La sua poesia <em>Les Antiques</em> fu pubblicata insieme
              alla Gymnopédie n. 1 nell'estate del 1888 e ispirò il titolo arcaico.{" "}
              <button
                type="button"
                onClick={() => setShowAntiquesModal(true)}
                className="text-blue-300 hover:text-blue-200 text-sm font-semibold"
              >
                Leggi la poesia
              </button>
            </p>
            <div className="mt-3 text-sm text-slate-400 leading-relaxed">
              La poesia appare accanto allo spartito nel 1888; alcuni studiosi ipotizzano che la musica
              preceda il testo (con il verso sulla <em>sarabande</em> come omaggio alle <em>Sarabandes</em> del 1887),
              altri pensano l'opposto.
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-600 mt-4 bg-slate-950">
              <img
                src="/images/PatriceContamine.jpg"
                alt="Patrice Contamine de Latour"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Patrice Contamine de Latour, poeta simbolista
              </p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
            <h3 className="text-base font-semibold text-slate-100 mb-2">Puvis de Chavannes</h3>
            <p className="text-sm text-slate-300">
              Satie adorava il pittore simbolista Puvis. Non esiste un'unica "ispirazione", ma un chiaro parallelo
              tra la sua musica statica e dipinti come <em>Jeune fille au bord de la mer</em> (1879). <br /> L'opera
              <em>"Les Muses"</em> riassume bene la sua estetica di semplicità, mentre
              <Tooltip text="Pittore e scrittore catalano (1861-1931), vicino al simbolismo.">
                <span>Rusiñol</span>
              </Tooltip>{" "}
              scrisse che Satie cercava in musica la stessa essenzialità raggiunta da Puvis in pittura.
              <br /> <br /> Templier parlò di "esatte rappresentazioni musicali" dei suoi quadri. Per le <em>Sonneries de la Rose+Croix</em>
              Satie scelse un frammento di <em>La Guerre</em> per il frontespizio.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950 mt-4">
              <img
                src="/images/puvis-de-chavannes.jpeg"
                alt="Puvis de Chavannes"
                className="w-full h-56 object-contain p-2"
              />
              <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
                Puvis de Chavannes, pittore simbolista
              </p>
            </div>
          </div>
        </div>

        {/* Quadro Puvis de Chavannes */}
        <div className="rounded-lg overflow-hidden border border-slate-600 mt-4">
          <img
            src="/images/Arts_and_the_Muses_by_Pierre_Puvis_de_Chavannes.jpg"
            alt="The Arts and the Muses"
            className="w-full object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
            Pierre Puvis de Chavannes (1824-1898), <em>Le bois sacré cher aux arts et aux muses</em>, 1884-1889, olio su tela, Art Institute of Chicago.
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
            e risoluzioni potenti, Satie, a 21 anni, pianista di cabaret, oppone{" "}
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
};

export default Parigi1888Section;
