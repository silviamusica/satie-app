import { useEffect, useState } from "react";
import { GraduationCap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { flashcardsData, quizData } from "../data/flashcards";

const ImparaSection = () => {
  const [tab, setTab] = useState("flashcard");
  const [idx, setIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [level, setLevel] = useState("base");

  const filteredFlashcards = flashcardsData.filter((c) => c.level === level);
  const filteredQuiz = quizData.filter((q, i) => {
    const cardLevel = flashcardsData[i]?.level;
    return cardLevel === level;
  });

  const card = filteredFlashcards[idx] || filteredFlashcards[0];

  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizCount, setQuizCount] = useState("tutte");
  const quiz = shuffledQuiz[quizIdx] || shuffledQuiz[0];

  const next = () => {
    if (!filteredFlashcards.length) return;
    setIsFlipped(false);
    setIsExpanded(false);
    setIdx((i) => (i + 1) % filteredFlashcards.length);
  };
  const prev = () => {
    if (!filteredFlashcards.length) return;
    setIsFlipped(false);
    setIsExpanded(false);
    setIdx((i) => (i - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };
  const nextQuiz = () => {
    if (!shuffledQuiz.length) return;
    setSelected(null);
    setQuizIdx((i) => {
      if (i >= shuffledQuiz.length - 1) {
        setShowQuizResult(true);
        return i;
      }
      return (i + 1) % shuffledQuiz.length;
    });
  };
  const prevQuiz = () => {
    if (!shuffledQuiz.length) return;
    setSelected(null);
    setShowQuizResult(false);
    setQuizIdx((i) => (i - 1 + shuffledQuiz.length) % shuffledQuiz.length);
  };
  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel);
    setIdx(0);
    setQuizIdx(0);
    setIsFlipped(false);
    setIsExpanded(false);
    setSelected(null);
    setShowQuizResult(false);
    setQuizAnswers([]);
  };
  const handleQuizCountChange = (nextCount) => {
    setQuizCount(nextCount);
    setQuizIdx(0);
    setSelected(null);
    setShowQuizResult(false);
    setQuizAnswers([]);
  };

  const handleQuizAnswer = (optionIndex) => {
    if (!shuffledQuiz.length || selected !== null) return;
    setSelected(optionIndex);
    setQuizAnswers((prev) => {
      const nextAnswers = [...prev];
      nextAnswers[quizIdx] = optionIndex;
      return nextAnswers;
    });
  };

  const getQuizScore = () => {
    return shuffledQuiz.reduce((sum, q, i) => {
      const answer = quizAnswers[i];
      return sum + (answer === q.answer ? 1 : 0);
    }, 0);
  };

  useEffect(() => {
    if (tab !== "quiz") return;
    if (!filteredQuiz.length) {
      setShuffledQuiz([]);
      setQuizIdx(0);
      return;
    }
    const shuffled = [...filteredQuiz].sort(() => Math.random() - 0.5);
    const count =
      quizCount === "tutte"
        ? shuffled.length
        : Math.min(parseInt(quizCount, 10), shuffled.length);
    const trimmed = shuffled.slice(0, count);
    setShuffledQuiz(shuffled);
    setQuizIdx(0);
    setSelected(null);
    setShowQuizResult(false);
    setQuizAnswers([]);
    setShuffledQuiz(trimmed);
  }, [tab, level, quizCount, filteredQuiz.length]);

  return (
    <div id="impara" className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          Impara
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Metti alla prova la tua conoscenza della Gymnopédie n. 1 attraverso flashcard interattive e quiz a difficolta
          crescente.
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

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTab("flashcard")}
            className={[
              "px-4 sm:px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
              tab === "flashcard"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600",
            ].join(" ")}
          >
            Memorizza
          </button>
          <button
            type="button"
            onClick={() => setTab("quiz")}
            className={[
              "px-4 sm:px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
              tab === "quiz"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600",
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
              {filteredFlashcards.length ? (
                <>
                  <p className="text-sm text-slate-400 mb-3 text-center">
                    Clicca sulla carta per girarla
                  </p>
                  <div
                    onClick={() => setIsFlipped((v) => !v)}
                    className="relative h-80 w-full cursor-pointer"
                    style={{ perspective: "1000px" }}
                  >
                    <div
                      className="relative w-full h-full duration-500"
                      style={{
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="absolute w-full h-full rounded-3xl p-8 flex flex-col justify-center items-center border border-slate-600 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">Domanda</div>
                        <div className="text-lg sm:text-xl text-slate-100 leading-relaxed text-center font-semibold">
                          {card.q}
                        </div>
                      </div>
                      <div
                        className="absolute w-full h-full rounded-3xl p-8 flex flex-col justify-center items-center border border-slate-600 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 shadow-2xl overflow-y-auto"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="text-xs uppercase tracking-wide text-slate-300 mb-3">Risposta</div>
                        <div className="text-base sm:text-lg text-slate-100 leading-relaxed text-center mb-4">
                          {card.a}
                        </div>
                        {card.details && (
                          <div className="w-full">
                            {!isExpanded ? (
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setIsExpanded(true);
                                }}
                                className="mx-auto flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                              >
                                <ChevronDown className="w-4 h-4" />
                                Leggi tutto
                              </button>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-sm text-slate-300 leading-relaxed text-center bg-slate-900/60 p-3 rounded-lg border border-slate-700">
                                  {card.details}
                                </p>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setIsExpanded(false);
                                  }}
                                  className="mx-auto flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
                                >
                                  <ChevronDown className="w-4 h-4 rotate-180" />
                                  Chiudi
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      precedente
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-amber-500 hover:bg-amber-400 border border-amber-400 text-slate-900 text-sm font-semibold"
                    >
                      successiva
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-5">
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((idx + 1) / filteredFlashcards.length) * 100}%` }}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-amber-400 text-xs font-mono bg-slate-800/50 px-3 py-1 rounded-full">
                        {idx + 1} / {filteredFlashcards.length}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Nessuna flashcard per questo livello.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "quiz" && (
          <div className="mt-6 bg-slate-950/40 border border-slate-700 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-slate-400">
                Domanda {shuffledQuiz.length ? quizIdx + 1 : 0} / {shuffledQuiz.length}
              </div>
              <label className="text-sm text-slate-300 font-semibold">
                Numero domande
                <select
                  value={quizCount}
                  onChange={(event) => handleQuizCountChange(event.target.value)}
                  className="ml-3 bg-slate-900 text-slate-100 border border-slate-700 rounded px-2 py-1 text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="tutte">Tutte</option>
                </select>
              </label>
            </div>
            <div className="mt-5">
              <div className="text-slate-100 font-semibold">Domanda</div>
              {shuffledQuiz.length ? (
                <div className="mt-2 text-sm text-slate-200 leading-relaxed">{quiz.q}</div>
              ) : (
                <div className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Nessun quiz per questo livello.
                </div>
              )}
              <div className="mt-4 grid gap-2">
                {shuffledQuiz.length ? quiz.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = selected !== null && i === quiz.answer;
                  const isWrong = selected !== null && isSelected && i !== quiz.answer;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleQuizAnswer(i)}
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
              {selected !== null && shuffledQuiz.length > 0 && (
                <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
                  <div className="text-slate-100 font-semibold">
                    {selected === quiz.answer ? "Risposta corretta" : "Risposta errata"}
                  </div>
                  {quiz.details && (
                    <div className="mt-1 text-sm text-slate-400">{quiz.details}</div>
                  )}
                </div>
              )}
              {showQuizResult && shuffledQuiz.length > 0 && (
                <div className="mt-6 bg-slate-900/70 border border-slate-600 rounded-xl p-5 text-center">
                  <div className="text-slate-100 font-semibold mb-2">Hai completato il quiz</div>
                  <div className="text-3xl font-bold text-amber-400 mb-2">
                    {getQuizScore()} / {shuffledQuiz.length}
                  </div>
                  <p className="text-sm text-slate-300">
                    {getQuizScore() === shuffledQuiz.length
                      ? "Perfetto! Livello eccellente."
                      : getQuizScore() >= Math.ceil(shuffledQuiz.length * 0.7)
                      ? "Ottimo risultato. Sei gia a un livello avanzato."
                      : getQuizScore() >= Math.ceil(shuffledQuiz.length * 0.4)
                      ? "Buon lavoro. Ripassa le parti chiave e riprova."
                      : "Consiglio: riparti dal livello base e torna qui dopo il ripasso."}
                  </p>
                </div>
              )}
              <div className="mt-5 grid grid-cols-2 gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={prevQuiz}
                  disabled={!shuffledQuiz.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  precedente
                </button>
                <button
                  type="button"
                  onClick={nextQuiz}
                  disabled={!shuffledQuiz.length}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-amber-500 hover:bg-amber-400 border border-amber-400 text-slate-900 text-sm font-semibold"
                >
                  successiva
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
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
