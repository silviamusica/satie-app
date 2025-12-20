import {
  BookOpen,
  Music,
  MapPin,
  User,
  Sparkles,
  Library,
  GraduationCap,
  FileText,
  ChevronRight,
} from "lucide-react";

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
        <span className="text-sm text-slate-400">Un percorso in 7 tappe</span>
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
          Manoscritto autografo di Erik Satie, tre pagine che hanno cambiato il corso della musica moderna
        </p>
      </div>
    </div>

    {/* Perché questo brano */}
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-3">
        Perché Gymnopédie n. 1?
      </h2>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        Nel 1888, un giovane pianista di 21 anni che lavorava nei café-cabaret di Montmartre compose tre brevi pagine per pianoforte:
        semplici in apparenza, nascondevano una rivoluzione; armonie sospese, forme svuotate di drammaticità, un suono "bianco" che
        anticipava l'impressionismo, il minimalismo e la musica ambient.
      </p>
      <p className="text-sm text-slate-300 leading-relaxed">
        Ti guiderò alla scoperta di un brano che ha cambiato il corso della musica, della persona che lo compose e del
        contesto storico che lo rese possibile. Tutti i termini e i personaggi meno conosciuti sono spiegati nel{" "}
        <button
          type="button"
          onClick={() => goTo("glossario")}
          onTouchEnd={(e) => {
            e.preventDefault();
            goTo("glossario");
          }}
          className="text-blue-400 hover:text-blue-300 active:text-blue-200 font-semibold underline bg-transparent border-none p-0 cursor-pointer"
        >
          glossario
        </button>.
      </p>
      <p className="text-sm text-slate-300 leading-relaxed">
        <span className="block h-3" />
        In un viaggio ci si ferma, si rilegge il percorso e si trasformano le tappe in ricordi. La sezione{" "}
        <button
          type="button"
          onClick={() => goTo("impara")}
          onTouchEnd={(e) => {
            e.preventDefault();
            goTo("impara");
          }}
          className="text-blue-400 hover:text-blue-300 active:text-blue-200 font-semibold underline bg-transparent border-none p-0 cursor-pointer"
        >
          Impara
        </button>{" "}
        e la nostra pausa-gioco: qui il cammino diventa divertimento e le scoperte si fissano come foto ricordo.
      </p>
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
          { title: "Glossario", desc: "Termini musicali e contesto in schede rapide", icon: Library, tab: "glossario" },
          { title: "Impara", desc: "Per fissare il viaggio: ricordi da portare con te", icon: GraduationCap, tab: "impara" },
          { title: "Bibliografia", desc: "Libri e riferimenti essenziali", icon: FileText, tab: "fonti" },
        ].map((item) => (
          <button
            key={item.tab}
            type="button"
            onClick={() => goTo(item.tab)}
            onTouchEnd={(e) => {
              e.preventDefault();
              goTo(item.tab);
            }}
            className="bg-slate-950/40 border border-slate-700 rounded-xl p-4 text-left hover:bg-slate-800 active:bg-slate-700 hover:border-blue-500 transition-all group"
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
    {/* CTA */}
    <div className="text-center">
      <button
        type="button"
        onClick={() => goTo("parigi1888")}
        onTouchEnd={(e) => {
          e.preventDefault();
          goTo("parigi1888");
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold transition-colors"
      >
        Inizia il viaggio
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default BenvenutoSection;
