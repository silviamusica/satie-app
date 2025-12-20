import React, { useState } from "react";
import { Library, ChevronDown } from "lucide-react";
import { glossaryData } from "../data/glossary";

const GlossarySection = () => {
  const [openItem, setOpenItem] = useState({});
  const toggleItem = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItem((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
                <div className="space-y-2">
                  {[...cat.items]
                    .sort((a, b) => a.term.localeCompare(b.term, "it", { sensitivity: "base" }))
                    .map((it, j) => {
                    const key = `${i}-${j}`;
                    return (
                      <div key={key} className="bg-slate-900/60 border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleItem(i, j)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-900/80"
                        >
                          <span className="text-sm text-slate-100 font-semibold">{it.term}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${openItem[key] ? "rotate-180" : ""}`} />
                        </button>
                        {openItem[key] && (
                          <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">
                            {it.definition}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {cat.category === "Termini musicali" && (
                <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                  <img
                    src="/images/Modi greci.jpg"
                    alt="Modi greci"
                    className="w-full h-56 sm:h-64 object-contain p-2"
                  />
                  <div className="p-3 bg-slate-900/50 text-center">
                    <p className="text-sm text-slate-300">Modi greci: suggestioni classiche nell'immaginario musicale</p>
                  </div>
                </div>
              )}

              {cat.category === "Contesto" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                    <img
                      src="/images/mappa-montmartre-1880-1900.jpg"
                      alt="Mappa di Montmartre (1880-1900)"
                      className="w-full h-56 sm:h-64 object-contain p-2"
                    />
                    <div className="p-3 bg-slate-900/50 text-center">
                      <p className="text-sm text-slate-300">Mappa di Montmartre (1880-1900)</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                    <img
                      src="/images/carte-postale-ancienne-paris-ii-boulevard-montmartre-autobus-a-plateforme.jpg"
                      alt="Cartolina di Boulevard Montmartre"
                      className="w-full h-56 sm:h-64 object-contain p-2"
                    />
                    <div className="p-3 bg-slate-900/50 text-center">
                      <p className="text-sm text-slate-300">Boulevard Montmartre: cartolina d'epoca</p>
                    </div>
                  </div>
                </div>
              )}

              {cat.category === "Personaggi" && (
                <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-950">
                  <img
                    src="/images/Zabaleta Portrait of Erik Satie.jpg"
                    alt="Ritratto di Erik Satie"
                    className="w-full h-64 sm:h-72 object-contain p-2"
                  />
                  <div className="p-3 bg-slate-900/50 text-center">
                    <p className="text-sm text-slate-300">Ritratto di Erik Satie (Zabaleta)</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8 bg-slate-950/40 border border-slate-700 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-slate-100 mb-3">Tre artisti chiave della Parigi di Satie</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            Ecco una selezione delle opere più iconiche di tre giganti dell'arte, contemporanei di Erik Satie,
            che hanno definito l'estetica della Parigi tra fine Ottocento e inizio Novecento.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Claude Monet: l'impressionismo e la luce</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Monet incarna la ricerca sulla luce che influenzò la prima fase di Satie e Debussy.
              </p>
              <div className="md:hidden space-y-3">
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Impressione, levar del sole</div>
                  <div className="text-xs text-slate-400 mt-1">1872</div>
                  <p className="text-sm text-slate-300 mt-2">
                    L'opera che diede il nome al movimento impressionista. Rappresenta il porto di Le Havre.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">La serie delle Ninfee</div>
                  <div className="text-xs text-slate-400 mt-1">1897-1926</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Ciclo monumentale di circa 250 dipinti sui riflessi dell'acqua nel giardino di Giverny.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">La Cattedrale di Rouen</div>
                  <div className="text-xs text-slate-400 mt-1">1892-1894</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Serie di oltre 30 tele con la facciata della cattedrale in diverse ore e condizioni atmosferiche.
                  </p>
                </div>
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700">
                  <thead className="bg-slate-900/60 text-slate-100">
                    <tr>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Opera</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Anno</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Descrizione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>Impressione, levar del sole</strong></td>
                      <td className="px-3 py-2">1872</td>
                      <td className="px-3 py-2">L'opera che diede il nome al movimento impressionista. Rappresenta il porto di Le Havre.</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>La serie delle Ninfee</strong></td>
                      <td className="px-3 py-2">1897-1926</td>
                      <td className="px-3 py-2">Ciclo monumentale di circa 250 dipinti sui riflessi dell'acqua nel giardino di Giverny.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2"><strong>La Cattedrale di Rouen</strong></td>
                      <td className="px-3 py-2">1892-1894</td>
                      <td className="px-3 py-2">Serie di oltre 30 tele con la facciata della cattedrale in diverse ore e condizioni atmosferiche.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Paul Cézanne: la struttura e il post-impressionismo</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Cézanne è considerato il padre dell'arte moderna. La sua ricerca di rigore geometrico è vicina
                all'essenzialità delle Gymnopédies.
              </p>
              <div className="md:hidden space-y-3">
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">I giocatori di carte</div>
                  <div className="text-xs text-slate-400 mt-1">1890-1895</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Serie di cinque dipinti con contadini provenzali, forme sempre più monumentali.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Il monte Sainte-Victoire</div>
                  <div className="text-xs text-slate-400 mt-1">1904-1906</div>
                  <p className="text-sm text-slate-300 mt-2">
                    La montagna dipinta decine di volte, semplificata in volumi geometrici.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Le grandi bagnanti</div>
                  <div className="text-xs text-slate-400 mt-1">1894-1905</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Opera monumentale che fonde nudi femminili e paesaggio in una struttura architettonica.
                  </p>
                </div>
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700">
                  <thead className="bg-slate-900/60 text-slate-100">
                    <tr>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Opera</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Anno</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Descrizione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>I giocatori di carte</strong></td>
                      <td className="px-3 py-2">1890-1895</td>
                      <td className="px-3 py-2">Serie di cinque dipinti con contadini provenzali, forme sempre più monumentali.</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>Il monte Sainte-Victoire</strong></td>
                      <td className="px-3 py-2">1904-1906</td>
                      <td className="px-3 py-2">La montagna dipinta decine di volte, semplificata in volumi geometrici.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2"><strong>Le grandi bagnanti</strong></td>
                      <td className="px-3 py-2">1894-1905</td>
                      <td className="px-3 py-2">Opera monumentale che fonde nudi femminili e paesaggio in una struttura architettonica.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Henri de Toulouse-Lautrec: la vita notturna di Montmartre</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Lautrec è l'artista più vicino al mondo di Satie: stesso cabaret, stesso immaginario bohémien.
              </p>
              <div className="md:hidden space-y-3">
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Moulin Rouge: La Goulue</div>
                  <div className="text-xs text-slate-400 mt-1">1891</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Manifesto che definisce l'estetica del cartellone pubblicitario moderno.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Al Moulin Rouge</div>
                  <div className="text-xs text-slate-400 mt-1">1892</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Dipinto che cattura l'atmosfera decadente e psicologica del locale.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-slate-100 font-semibold">Aristide Bruant nel suo cabaret</div>
                  <div className="text-xs text-slate-400 mt-1">1892</div>
                  <p className="text-sm text-slate-300 mt-2">
                    Celebre litografia dello chansonnier con sciarpa rossa e cappello nero.
                  </p>
                </div>
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700">
                  <thead className="bg-slate-900/60 text-slate-100">
                    <tr>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Opera</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Anno</th>
                      <th className="px-3 py-2 text-left border-b border-slate-700">Descrizione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>Moulin Rouge: La Goulue</strong></td>
                      <td className="px-3 py-2">1891</td>
                      <td className="px-3 py-2">Manifesto che definisce l'estetica del cartellone pubblicitario moderno.</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-3 py-2"><strong>Al Moulin Rouge</strong></td>
                      <td className="px-3 py-2">1892</td>
                      <td className="px-3 py-2">Dipinto che cattura l'atmosfera decadente e psicologica del locale.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2"><strong>Aristide Bruant nel suo cabaret</strong></td>
                      <td className="px-3 py-2">1892</td>
                      <td className="px-3 py-2">Celebre litografia dello chansonnier con sciarpa rossa e cappello nero.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4">
              <h4 className="text-base font-semibold text-blue-200 mb-2">Perché sono importanti per il progetto</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Monet: legame con acqua e luce, vicini alla fluidità delle Gymnopédies;</li>
                <li>• Cézanne: passaggio verso il cubismo, geometrizzazione del suono in Satie;</li>
                <li>• Lautrec: immaginario visivo del cabaret, i personaggi e la notte di Montmartre.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-950/40 border border-slate-700 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-slate-100 mb-3">Correnti artistiche in Francia (1800-1945)</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            Per orientarti tra i movimenti che fanno da sfondo a Satie, ecco una mappa sintetica delle svolte
            principali nell'arte francese tra Ottocento e primo Novecento.
          </p>

          <div className="hidden md:block overflow-x-auto mb-5">
            <table className="w-full text-sm text-slate-300 border border-slate-700">
              <thead className="bg-slate-900/60 text-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left border-b border-slate-700">Corrente</th>
                  <th className="px-3 py-2 text-left border-b border-slate-700">Anni</th>
                  <th className="px-3 py-2 text-left border-b border-slate-700">Rappresentanti</th>
                  <th className="px-3 py-2 text-left border-b border-slate-700">Caratteristiche</th>
                  <th className="px-3 py-2 text-left border-b border-slate-700">Opera simbolo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Romanticismo</strong></td>
                  <td className="px-3 py-2">1800-1850</td>
                  <td className="px-3 py-2">Delacroix, Géricault</td>
                  <td className="px-3 py-2">Emozione, dramma, natura selvaggia, patriottismo.</td>
                  <td className="px-3 py-2"><em>La Libertà che guida il popolo</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Realismo</strong></td>
                  <td className="px-3 py-2">1840-1880</td>
                  <td className="px-3 py-2">Courbet, Millet, Zola</td>
                  <td className="px-3 py-2">Vita quotidiana, lavoro, verità senza idealizzazione.</td>
                  <td className="px-3 py-2"><em>Gli spaccapietre</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Impressionismo</strong></td>
                  <td className="px-3 py-2">1870-1890</td>
                  <td className="px-3 py-2">Monet, Renoir, Degas</td>
                  <td className="px-3 py-2">Luce, en plein air, pennellate rapide, attimo fuggente.</td>
                  <td className="px-3 py-2"><em>Impressione, levar del sole</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Post-impressionismo</strong></td>
                  <td className="px-3 py-2">1880-1905</td>
                  <td className="px-3 py-2">Cézanne, Seurat, Gauguin</td>
                  <td className="px-3 py-2">Struttura, colore come costruzione, simbolismo.</td>
                  <td className="px-3 py-2"><em>I giocatori di carte</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Simbolismo</strong></td>
                  <td className="px-3 py-2">1880-1910</td>
                  <td className="px-3 py-2">Moreau, Redon</td>
                  <td className="px-3 py-2">Sogno, mito, inconscio, realtà come velo.</td>
                  <td className="px-3 py-2"><em>L'apparizione</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Fauvismo</strong></td>
                  <td className="px-3 py-2">1904-1908</td>
                  <td className="px-3 py-2">Matisse, Derain</td>
                  <td className="px-3 py-2">Colori selvaggi, anti-naturalismo, energia pura.</td>
                  <td className="px-3 py-2"><em>La danza</em></td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-3 py-2"><strong>Cubismo</strong></td>
                  <td className="px-3 py-2">1907-1914</td>
                  <td className="px-3 py-2">Picasso, Braque</td>
                  <td className="px-3 py-2">Scomposizione in volumi, visione simultanea.</td>
                  <td className="px-3 py-2"><em>Les demoiselles d'Avignon</em></td>
                </tr>
                <tr>
                  <td className="px-3 py-2"><strong>Surrealismo</strong></td>
                  <td className="px-3 py-2">1924-1945</td>
                  <td className="px-3 py-2">Dali, Magritte, Ernst</td>
                  <td className="px-3 py-2">Sogno, irrazionale, automatismo psichico.</td>
                  <td className="px-3 py-2"><em>La persistenza della memoria</em></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-3 mb-5">
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Romanticismo</div>
              <div className="text-xs text-slate-400 mt-1">1800-1850 · Delacroix, Géricault</div>
              <p className="text-sm text-slate-300 mt-2">Emozione, dramma, natura selvaggia, patriottismo.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: La Libertà che guida il popolo</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Realismo</div>
              <div className="text-xs text-slate-400 mt-1">1840-1880 · Courbet, Millet, Zola</div>
              <p className="text-sm text-slate-300 mt-2">Vita quotidiana, lavoro, verità senza idealizzazione.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: Gli spaccapietre</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Impressionismo</div>
              <div className="text-xs text-slate-400 mt-1">1870-1890 · Monet, Renoir, Degas</div>
              <p className="text-sm text-slate-300 mt-2">Luce, en plein air, pennellate rapide, attimo fuggente.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: Impressione, levar del sole</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Post-impressionismo</div>
              <div className="text-xs text-slate-400 mt-1">1880-1905 · Cézanne, Seurat, Gauguin</div>
              <p className="text-sm text-slate-300 mt-2">Struttura, colore come costruzione, simbolismo.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: I giocatori di carte</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Simbolismo</div>
              <div className="text-xs text-slate-400 mt-1">1880-1910 · Moreau, Redon</div>
              <p className="text-sm text-slate-300 mt-2">Sogno, mito, inconscio, realtà come velo.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: L'apparizione</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Fauvismo</div>
              <div className="text-xs text-slate-400 mt-1">1904-1908 · Matisse, Derain</div>
              <p className="text-sm text-slate-300 mt-2">Colori selvaggi, anti-naturalismo, energia pura.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: La danza</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Cubismo</div>
              <div className="text-xs text-slate-400 mt-1">1907-1914 · Picasso, Braque</div>
              <p className="text-sm text-slate-300 mt-2">Scomposizione in volumi, visione simultanea.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: Les demoiselles d'Avignon</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-100 font-semibold">Surrealismo</div>
              <div className="text-xs text-slate-400 mt-1">1924-1945 · Dali, Magritte, Ernst</div>
              <p className="text-sm text-slate-300 mt-2">Sogno, irrazionale, automatismo psichico.</p>
              <p className="text-xs text-slate-400 mt-1">Opera simbolo: La persistenza della memoria</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
              <h4 className="text-base font-semibold text-slate-100 mb-2">Come distinguere le svolte</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• i romantici puntano sull'emozione e il dramma;</li>
                <li>• i realisti cercano la verità quotidiana, anche dura;</li>
                <li>• gli impressionisti guardano alla luce più che al soggetto;</li>
                <li>• i post-impressionisti riportano struttura e geometria;</li>
                <li>• i cubisti scompongono la realtà per vederla da più lati.</li>
              </ul>
            </div>
            <div className="bg-blue-950/20 border border-blue-700/30 rounded-lg p-4">
              <h4 className="text-base font-semibold text-blue-200 mb-2">Legame con Satie</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• parte dal simbolismo (Rosa-Croce);</li>
                <li>• anticipa l'impressionismo e poi se ne distacca;</li>
                <li>• è vicino al cubismo con <em>Parade</em>;</li>
                <li>• influenza l'avanguardia e il clima surrealista e dada.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossarySection;
