import { useState } from "react";
import { GraduationCap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { flashcardsData, quizData } from "../data/flashcards";

const ImparaSection = () => {
  const [tab, setTab] = useState("flashcard");
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState("base");

  const filteredFlashcards = flashcardsData.filter((c) => c.level === level);
  const filteredQuiz = quizData.filter((q, i) => {
    const cardLevel = flashcardsData[i]?.level;
    return cardLevel === level;
  });

  const card = filteredFlashcards[idx] || filteredFlashcards[0];

  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const quiz = filteredQuiz[quizIdx] || filteredQuiz[0];

  const next = () => {
    if (!filteredFlashcards.length) return;
    setShow(false);
    setIdx((i) => (i + 1) % filteredFlashcards.length);
  };
  const prev = () => {
    if (!filteredFlashcards.length) return;
    setShow(false);
    setIdx((i) => (i - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };
  const nextQuiz = () => {
    if (!filteredQuiz.length) return;
    setSelected(null);
    setQuizIdx((i) => (i + 1) % filteredQuiz.length);
  };
  const prevQuiz = () => {
    if (!filteredQuiz.length) return;
    setSelected(null);
    setQuizIdx((i) => (i - 1 + filteredQuiz.length) % filteredQuiz.length);
  };
  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel);
    setIdx(0);
    setQuizIdx(0);
    setShow(false);
    setSelected(null);
  };

  return (
    <div id="impara" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          Impara
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Scegli tra Flashcard e Quiz per fissare i dati principali.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Un buon livello di preparazione e gia raggiunto con il livello base.
        </p>
        <div className="mt-4">
          <label className="text-sm text-slate-300 font-semibold">
            Livello
            <select
              value={level}
              onChange={(event) => handleLevelChange(event.target.value)}
              className="ml-3 bg-slate-900 text-slate-100 border border-slate-700 rounded px-2 py-1 text-sm"
            >
              <option value="base">Base</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzato">Avanzato</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("flashcard")}
            className={[
              "px-3 py-2 rounded-lg text-sm font-semibold border transition-colors",
              tab === "flashcard"
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800",
            ].join(" ")}
          >
            Flashcard
          </button>
          <button
            type="button"
            onClick={() => setTab("quiz")}
            className={[
              "px-3 py-2 rounded-lg text-sm font-semibold border transition-colors",
              tab === "quiz"
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800",
            ].join(" ")}
          >
            Quiz
          </button>
        </div>

        {tab === "flashcard" && (
          <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-slate-400">
                Carta {filteredFlashcards.length ? idx + 1 : 0} / {filteredFlashcards.length} · livello:{" "}
                <span className="text-slate-200 font-semibold">{card?.level}</span>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-slate-100 font-semibold">Domanda</div>
              {filteredFlashcards.length ? (
                <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.q}</div>
              ) : (
                <div className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Nessuna flashcard per questo livello.
                </div>
              )}
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                disabled={!filteredFlashcards.length}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              >
                {show ? "Nascondi risposta" : "Mostra risposta"}
                <ChevronDown className={`w-4 h-4 transition-transform ${show ? "rotate-180" : ""}`} />
              </button>
              {show && filteredFlashcards.length > 0 && (
                <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                  <div className="text-slate-100 font-semibold">Risposta</div>
                  <div className="mt-2 text-sm text-slate-200 leading-relaxed">{card.a}</div>
                  {card.details && (
                    <div className="mt-1 text-sm text-slate-400">{card.details}</div>
                  )}
                </div>
              )}
              <div className="mt-5 grid grid-cols-2 gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={prev}
                  disabled={!filteredFlashcards.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  precedente
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!filteredFlashcards.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-amber-500 hover:bg-amber-400 border border-amber-400 text-slate-900 text-sm font-semibold"
                >
                  successiva
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "quiz" && (
          <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-slate-400">
                Domanda {quizIdx + 1} / {filteredQuiz.length}
              </div>
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={prevQuiz}
                  disabled={!filteredQuiz.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  precedente
                </button>
                <button
                  type="button"
                  onClick={nextQuiz}
                  disabled={!filteredQuiz.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-blue-600 hover:bg-blue-700 border border-blue-500 text-white text-sm font-semibold"
                >
                  successiva
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-slate-100 font-semibold">Domanda</div>
              {filteredQuiz.length ? (
                <div className="mt-2 text-sm text-slate-200 leading-relaxed">{quiz.q}</div>
              ) : (
                <div className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Nessun quiz per questo livello.
                </div>
              )}
              <div className="mt-4 grid gap-2">
                {filteredQuiz.length ? quiz.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = selected !== null && i === quiz.answer;
                  const isWrong = selected !== null && isSelected && i !== quiz.answer;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelected(i)}
                      className={[
                        "w-full text-left px-4 py-2 rounded border text-sm font-semibold transition-colors",
                        isCorrect
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-200"
                          : isWrong
                          ? "bg-red-600/20 border-red-500 text-red-200"
                          : "bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800",
                      ].join(" ")}
                    >
                      {opt}
                    </button>
                  );
                }) : null}
              </div>
              {selected !== null && filteredQuiz.length > 0 && (
                <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                  <div className="text-slate-100 font-semibold">
                    {selected === quiz.answer ? "Risposta corretta" : "Risposta errata"}
                  </div>
                  {quiz.details && (
                    <div className="mt-1 text-sm text-slate-400">{quiz.details}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
          <img
            src="/images/Satie con occhiali.jpg"
            alt="Erik Satie con occhiali"
            className="w-full h-56 sm:h-72 object-contain bg-slate-950 p-2"
          />
          <p className="text-sm text-slate-400 p-3 italic text-center bg-slate-900/50">
            Erik Satie: uno sguardo ironico e concentrato sul pianoforte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImparaSection;
