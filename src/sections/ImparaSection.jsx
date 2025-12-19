import { useState } from "react";
import { GraduationCap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { flashcardsData, quizData } from "../data/flashcards";

const ImparaSection = () => {
  const [tab, setTab] = useState("flashcard");
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const card = flashcardsData[idx];

  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const quiz = quizData[quizIdx];

  const next = () => {
    setShow(false);
    setIdx((i) => (i + 1) % flashcardsData.length);
  };
  const prev = () => {
    setShow(false);
    setIdx((i) => (i - 1 + flashcardsData.length) % flashcardsData.length);
  };
  const nextQuiz = () => {
    setSelected(null);
    setQuizIdx((i) => (i + 1) % quizData.length);
  };
  const prevQuiz = () => {
    setSelected(null);
    setQuizIdx((i) => (i - 1 + quizData.length) % quizData.length);
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
        )}

        {tab === "quiz" && (
          <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-400">
                Domanda {quizIdx + 1} / {quizData.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevQuiz}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  prev
                </button>
                <button
                  type="button"
                  onClick={nextQuiz}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                >
                  next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-slate-100 font-semibold">Domanda</div>
              <div className="mt-2 text-sm text-slate-200 leading-relaxed">{quiz.q}</div>
              <div className="mt-4 grid gap-2">
                {quiz.options.map((opt, i) => {
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
                })}
              </div>
              {selected !== null && (
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
      </div>
    </div>
  );
};

export default ImparaSection;
