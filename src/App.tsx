import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Filter,
  TrendingUp,
  Inbox,
  Sun,
  Moon,
  Sparkles,
  Search,
  Grid,
  X,
  Play,
  Layers
} from "lucide-react";
import { CPG_QUESTIONS, Question } from "./questions";
import { AITutorModal } from "./components/AITutorModal";
import { ClumpsExplorerView } from "./components/ClumpsExplorerView";

interface SessionResult {
  date: string;
  mode: string;
  score: number;
  total: number;
}

export default function App() {
  // Theme State ("dark" | "light")
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return (localStorage.getItem("cpg_theme") as "dark" | "light") || "dark";
    } catch {
      return "dark";
    }
  });

  // Navigation State
  const [screen, setScreen] = useState<"home" | "topic" | "quiz" | "review" | "review-complete" | "search" | "clumps">("home");

  // Search Mode State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTopicFilter, setSearchTopicFilter] = useState<string>("all");
  const [searchPage, setSearchPage] = useState<number>(1);
  const [searchExpandedIds, setSearchExpandedIds] = useState<Record<number, boolean>>({});

  // Quick practice modal for search questions
  const [quickPracticeQuestion, setQuickPracticeQuestion] = useState<Question | null>(null);
  const [quickPracticeAnswer, setQuickPracticeAnswer] = useState<number | undefined>(undefined);
  const [quickPracticeChecked, setQuickPracticeChecked] = useState<boolean>(false);

  // Save theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cpg_theme", theme);
    } catch (e) {
      console.error("Could not save theme preference", e);
    }
  }, [theme]);
  
  // Selected configuration for learning session
  const [sessionMode, setSessionMode] = useState<"exam" | "study" | "review-mode" | "clump">("study");
  const [activeClumpId, setActiveClumpId] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [reviewSize, setReviewSize] = useState<"5" | "10" | "15" | "20" | "30" | "50" | "100" | "all">("15");
  
  // Quiz Active State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // { questionId: selectedOptionIndex }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({}); // { questionId: isChecked }
  const [showQuestionPalette, setShowQuestionPalette] = useState<boolean>(false);
  const [topicSearch, setTopicSearch] = useState<string>("");
  const [timeRemaining, setTimeLeft] = useState<number>(3600); // 1 hour for exam
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Persist clump practice question index position
  useEffect(() => {
    if (screen === "quiz" && sessionMode === "clump" && activeClumpId) {
      try {
        localStorage.setItem(`clump_last_index_${activeClumpId}`, currentIndex.toString());
      } catch (e) {
        console.error("Could not save clump progress", e);
      }
    }
  }, [screen, sessionMode, activeClumpId, currentIndex]);

  // Confirmation Modals State
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // AI Tutor Modal State
  const [tutorModalOpen, setTutorModalOpen] = useState<boolean>(false);
  const [tutorQuestion, setTutorQuestion] = useState<Question | null>(null);
  const [tutorUserIndex, setTutorUserIndex] = useState<number | undefined>(undefined);

  const handleOpenTutor = (q: Question, userIndex?: number) => {
    setTutorQuestion(q);
    setTutorUserIndex(userIndex);
    setTutorModalOpen(true);
  };
  
  // User Filter on the Review page
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "failed" | "skipped">("all");
  
  // Persistent Statistics
  const [history, setHistory] = useState<SessionResult[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load statistics from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cpg_study_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not parse study history", e);
    }
  }, []);

  // Timer Effect for Exam Simulation
  useEffect(() => {
    if (timerActive && screen === "quiz") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Out of time - auto submit
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerActive(false);
            submitExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, screen]);

  // Scroll to top of window whenever the active screen changes (e.g., submitting an exam to show the review)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen]);

  // Utility to shuffle questions
  const getRandomSelection = (arr: Question[], num: number): Question[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(num, arr.length));
  };

  // Extract total category counts
  const getTopicMeta = () => {
    const counts: Record<string, number> = {};
    CPG_QUESTIONS.forEach((q) => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
    return counts;
  };

  const topicCounts = getTopicMeta();
  const allTopics = Object.keys(topicCounts).sort();

  // Reset search page when query or filter changes
  useEffect(() => {
    setSearchPage(1);
  }, [searchQuery, searchTopicFilter]);

  // Filtered search questions logic
  const filteredSearchQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return CPG_QUESTIONS.filter((q) => {
      if (searchTopicFilter !== "all" && q.topic !== searchTopicFilter) {
        return false;
      }
      if (!query) return true;

      const matchQuestion = q.question.toLowerCase().includes(query);
      const matchTopic = q.topic.toLowerCase().includes(query);
      const matchExplanation = q.explanation.toLowerCase().includes(query);
      const matchPage = q.page.toLowerCase().includes(query);
      const matchOptions = q.options.some((opt) => opt.toLowerCase().includes(query));
      const matchId = `q${q.id}`.includes(query) || q.id.toString() === query;

      return matchQuestion || matchTopic || matchExplanation || matchPage || matchOptions || matchId;
    });
  }, [searchQuery, searchTopicFilter]);

  const SEARCH_PAGE_SIZE = 12;
  const totalSearchPages = Math.max(1, Math.ceil(filteredSearchQuestions.length / SEARCH_PAGE_SIZE));
  const paginatedSearchQuestions = filteredSearchQuestions.slice(
    (searchPage - 1) * SEARCH_PAGE_SIZE,
    searchPage * SEARCH_PAGE_SIZE
  );

  const toggleSearchExpand = (id: number) => {
    setSearchExpandedIds((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false
    }));
  };

  const handleStartPracticeFromSearchResults = () => {
    if (filteredSearchQuestions.length === 0) return;
    const sessionQuestions = filteredSearchQuestions.slice(0, 50);
    setQuestions(sessionQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setSessionMode("study");
    setScreen("quiz");
  };

  const handleOpenQuickPractice = (q: Question) => {
    setQuickPracticeQuestion(q);
    setQuickPracticeAnswer(undefined);
    setQuickPracticeChecked(false);
  };

  // Helper to detect repetitive question template types
  const isPreserveFilesTemplate = (q: Question) =>
    q.question.toLowerCase().includes("preserve files for category portfolio group");

  const isCollateralValuationTemplate = (q: Question) =>
    q.question.toLowerCase().includes("physical existence and market valuation of collateral");

  const isKycChecksTemplate = (q: Question) =>
    q.question.toLowerCase().includes("comprehensive kyc checks for all obligor relationships");

  // Generate deduplicated 100-question exam pool ensuring at most ONE of each template question type appears
  const getDeduplicatedExamPool = (allQuestions: Question[], totalCount = 100): Question[] => {
    const groupPreserveFiles: Question[] = [];
    const groupCollateralValuation: Question[] = [];
    const groupKycChecks: Question[] = [];
    const standardQuestions: Question[] = [];

    for (const q of allQuestions) {
      if (isPreserveFilesTemplate(q)) {
        groupPreserveFiles.push(q);
      } else if (isCollateralValuationTemplate(q)) {
        groupCollateralValuation.push(q);
      } else if (isKycChecksTemplate(q)) {
        groupKycChecks.push(q);
      } else {
        standardQuestions.push(q);
      }
    }

    // Shuffle each category independently
    const shuffledPreserve = [...groupPreserveFiles].sort(() => 0.5 - Math.random());
    const shuffledCollateral = [...groupCollateralValuation].sort(() => 0.5 - Math.random());
    const shuffledKyc = [...groupKycChecks].sort(() => 0.5 - Math.random());
    const shuffledStandard = [...standardQuestions].sort(() => 0.5 - Math.random());

    // Pick at most 1 question from each template family
    const selectedTemplates: Question[] = [];
    if (shuffledPreserve.length > 0) selectedTemplates.push(shuffledPreserve[0]);
    if (shuffledCollateral.length > 0) selectedTemplates.push(shuffledCollateral[0]);
    if (shuffledKyc.length > 0) selectedTemplates.push(shuffledKyc[0]);

    // Fill remaining required slots with standard questions
    const remainingNeeded = totalCount - selectedTemplates.length;
    const selectedStandard = shuffledStandard.slice(0, Math.min(remainingNeeded, shuffledStandard.length));

    const combined = [...selectedTemplates, ...selectedStandard];

    // Backfill from leftover templates if needed (unlikely as standard pool is ~380 items)
    if (combined.length < totalCount) {
      const leftoverTemplates = [
        ...shuffledPreserve.slice(1),
        ...shuffledCollateral.slice(1),
        ...shuffledKyc.slice(1)
      ].sort(() => 0.5 - Math.random());
      combined.push(...leftoverTemplates.slice(0, totalCount - combined.length));
    }

    // Final random shuffle of the selected questions
    return combined.sort(() => 0.5 - Math.random());
  };

  // Start Exam Simulation
  const handleStartExam = () => {
    // Select 100 questions representing all categories with at most 1 of each template question type
    const selected = getDeduplicatedExamPool(CPG_QUESTIONS, 100);
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowQuestionPalette(false);
    setTimeLeft(3600); // 60 minutes strictly
    setSessionMode("exam");
    setScreen("quiz");
    setTimerActive(true);
  };

  // Start Practice on a specific Clump in sequential non-randomized order
  const handleStartClumpPractice = (
    clumpQuestions: Question[],
    _clumpTitle?: string,
    clumpId?: string,
    startIndex = 0
  ) => {
    if (clumpId) {
      setActiveClumpId(clumpId);
    }
    setQuestions(clumpQuestions); // strictly non-randomized sequential order
    const safeStart = Math.max(0, Math.min(startIndex, Math.max(0, clumpQuestions.length - 1)));
    setCurrentIndex(safeStart);
    setAnswers({});
    setCheckedQuestions({});
    setShowQuestionPalette(false);
    setSessionMode("clump");
    setTimerActive(false);
    setScreen("quiz");
  };

  // Proceed to Topic Selector
  const handlePrepareStudy = () => {
    setSelectedTopics([]);
    setTopicSearch("");
    setSessionMode("study");
    setScreen("topic");
  };

  // Proceed to Topic Selector for Interactive Review
  const handlePrepareReview = () => {
    setSelectedTopics([]);
    setTopicSearch("");
    setReviewSize("15");
    setSessionMode("review-mode");
    setScreen("topic");
  };

  // Start Study Session or Review Session
  const handleStartStudy = () => {
    let topicsToQuery = selectedTopics;
    // Default to all topics if review-mode and nothing selected
    if (sessionMode === "review-mode" && topicsToQuery.length === 0) {
      topicsToQuery = allTopics;
    } else if (topicsToQuery.length === 0) {
      return;
    }
    
    // Filter questions matching selected topics
    const filtered = CPG_QUESTIONS.filter((q) => topicsToQuery.includes(q.topic));
    // Shuffle the matching subset
    let shuffled = [...filtered].sort(() => 0.5 - Math.random());
    
    if (sessionMode === "review-mode") {
      const limit = reviewSize === "all" ? shuffled.length : parseInt(reviewSize, 10);
      shuffled = shuffled.slice(0, Math.min(limit, shuffled.length));
    }
    
    setQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowQuestionPalette(false);
    setScreen("quiz");
    setTimerActive(false);
  };

  // Toggle Topic in list
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => 
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Select Topic All / None helpers
  const selectAllTopics = () => {
    const all = Array.from(new Set(CPG_QUESTIONS.map((q) => q.topic)));
    setSelectedTopics(all);
  };

  const selectNoTopics = () => {
    setSelectedTopics([]);
  };

  // Explicitly check solution for current question
  const handleCheckSolution = (qId: number) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [qId]: true
    }));
  };

  // Reset answer for current question to try again in study mode
  const handleResetQuestion = (qId: number) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setCheckedQuestions((prev) => ({
      ...prev,
      [qId]: false
    }));
  };

  // Handle Option Click (Step 1: Free selection before solution is checked)
  const handleSelectOption = (idx: number) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    // Once solution has been checked for this question, option choices are frozen
    if (checkedQuestions[currentQuestion.id]) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: idx
    }));
  };

  // Navigation within Quiz
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Complete session & trigger scorecard save
  const executeActualSubmission = () => {
    setTimerActive(false);
    setShowSubmitConfirm(false);
    
    // Calculate final metrics
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const newRecord: SessionResult = {
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      mode: sessionMode === "exam" ? "Exam Sim" : "Study Mode",
      score: correctCount,
      total: questions.length
    };

    const updatedHistory = [newRecord, ...history].slice(0, 10);
    setHistory(updatedHistory);
    try {
      localStorage.setItem("cpg_study_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Could not write history to local storage", e);
    }

    setReviewFilter("all");
    setScreen("review");
  };

  const submitExam = (autoSubmitted = false) => {
    if (autoSubmitted) {
      executeActualSubmission();
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const handleFinishReviewSession = () => {
    setShowSubmitConfirm(false);
    setScreen("review-complete");
  };

  // Reset Home
  const handleExitToHome = () => {
    if (screen === "quiz") {
      setShowExitConfirm(true);
    } else {
      setScreen("home");
    }
  };

  // Score analytics
  const scoreStats = () => {
    let correct = 0;
    let failed = 0;
    let skipped = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === undefined) {
        skipped++;
      } else if (selected === q.correctIndex) {
        correct++;
      } else {
        failed++;
      }
    });

    return { correct, failed, skipped, total: questions.length };
  };

  const stats = scoreStats();
  const passRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  // Category scorecard detail
  const getCategoryScores = () => {
    const report: Record<string, { total: number; correct: number }> = {};
    questions.forEach((q) => {
      if (!report[q.topic]) {
        report[q.topic] = { total: 0, correct: 0 };
      }
      report[q.topic].total++;
      if (answers[q.id] === q.correctIndex) {
        report[q.topic].correct++;
      }
    });
    return report;
  };

  const categoryScorecard = getCategoryScores();

  // For nice time formatting
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  return (
    <div className={`min-h-screen pb-16 relative overflow-hidden font-sans transition-colors duration-200 ${
      theme === "dark" 
        ? "bg-[#020617] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200" 
        : "bg-slate-100 text-slate-800 selection:bg-cyan-500/20 selection:text-cyan-900"
    }`}>
      {/* Ambient Deep Glow Effects */}
      {theme === "dark" ? (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Premium Immersive Navigation Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl h-16 flex items-center transition-colors duration-200 ${
        theme === "dark" 
          ? "bg-slate-950/80 border-b border-slate-900/80" 
          : "bg-white/85 border-b border-slate-200 shadow-xs"
      }`}>
        <div className="max-w-5xl w-full mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setScreen("home")}>
            <div className="h-9 w-9 bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-sm font-black tracking-widest uppercase ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Exam Prep
              </h1>
              <p className={`text-[10px] font-semibold uppercase tracking-tighter ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                Credit Policy Portal V6.0
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Clumps & Pattern Explorer Button */}
            <button
              onClick={() => {
                if (screen === "quiz") {
                  setShowExitConfirm(true);
                } else {
                  setScreen("clumps");
                }
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                screen === "clumps"
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                  : theme === "dark"
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700 hover:text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-xs"
              }`}
              title="Question Clumps & Pattern Explorer"
            >
              <Layers className="w-4 h-4 text-cyan-500" />
              <span className="hidden sm:inline">Clumps Explorer</span>
            </button>

            {/* Search Questions Button */}
            <button
              onClick={() => {
                if (screen === "quiz") {
                  setShowExitConfirm(true);
                } else {
                  setScreen("search");
                }
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                screen === "search"
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                  : theme === "dark"
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700 hover:text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-xs"
              }`}
              title="Search CPG Question Bank"
            >
              <Search className="w-4 h-4 text-cyan-500" />
              <span className="hidden sm:inline">Search Mode</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-850 hover:border-slate-700 hover:text-amber-300"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-xs"
              }`}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {screen !== "home" && (
              <button 
                onClick={handleExitToHome}
                className={`px-4 py-1.5 text-xs font-bold rounded border transition duration-150 ${
                  theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
                    : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 hover:border-slate-400 shadow-xs"
                }`}
              >
                Exit Session
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ================= SCREEN DEFAULT: HOME ================= */}
          {screen === "home" && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Premium Hero Section */}
              <div className={`rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.15)] border relative overflow-hidden backdrop-blur-xl ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-slate-950 to-slate-900 text-white border-slate-800/80" 
                  : "bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700"
              }`}>
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 text-cyan-500">
                  <BookOpen className="w-96 h-96" />
                </div>
                <div className="max-w-2xl relative z-10 space-y-4">
                  <div className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                     V6.0 Handbook Portal
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Exam Prep <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Training Simulator</span>
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                    Prepare with high-fidelity simulation material meticulously mapped directly from the Access Bank Credit Policy Guide. Train with active recall, study specifically by section, and verify explanations instantly.
                  </p>
                  <p className="text-xs text-slate-400">
                    * Covers all 14 knowledge disciplines including Delinquency, Risk Measurement, Specialized Lending, Cards, ATMs, and more.
                  </p>
                </div>
              </div>

              {/* Mode Selectors */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card Mode 1: Exam */}
                <div id="mode-exam-card" className={`rounded-2xl p-6 border shadow-md hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  theme === "dark" 
                    ? "bg-slate-950/60 backdrop-blur-md border-slate-800 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-rose-500/5 blur-xl rounded-full" />
                  <div className="space-y-4">
                    <div className="bg-rose-500/10 border border-rose-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-rose-500">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Exam Certification</h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Start a strict simulation of the certification exam. Includes <strong className={theme === "dark" ? "text-white" : "text-slate-900"}>100 random questions</strong>, a strict <strong className="text-rose-500 font-mono font-bold">60-minute countdown timer</strong>, and an auto-submit protocol.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={handleStartExam}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition duration-150 border border-slate-800 hover:border-cyan-500/30 flex justify-center items-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-lg"
                    >
                      <Award className="w-4 h-4 text-cyan-400" /> Start Random Exam
                    </button>
                  </div>
                </div>

                {/* Card Mode 2: Clumps & Pattern Explorer */}
                <div id="mode-clumps-card" className={`rounded-2xl p-6 border shadow-md hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  theme === "dark" 
                    ? "bg-slate-950/60 backdrop-blur-md border-slate-800 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-teal-500/5 blur-xl rounded-full" />
                  <div className="space-y-4">
                    <div className="bg-teal-500/10 border border-teal-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-teal-400">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        New Clump Mode
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Question Clumps & Patterns</h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Explore mapped question clumps: study repetitive template groups, pattern clusters, or focus strictly on the <strong className="text-teal-400 font-semibold">Standalone & Unrelated Questions Clump</strong>.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={() => setScreen("clumps")}
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white font-bold py-3 rounded-xl transition duration-155 flex justify-center items-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-[0_4px_15px_rgba(20,184,166,0.3)]"
                    >
                      <Layers className="w-4 h-4 text-teal-200" /> Explore Question Clumps
                    </button>
                  </div>
                </div>

                {/* Card Mode 3: Study */}
                <div id="mode-study-card" className={`rounded-2xl p-6 border shadow-md hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  theme === "dark" 
                    ? "bg-slate-950/60 backdrop-blur-md border-slate-800 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-cyan-500/5 blur-xl rounded-full" />
                  <div className="space-y-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-cyan-500">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Custom Study Mode</h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Focus your recall drills on specific areas of weakness. Filter and select the exact topics you want to practice. No active timer, showing detailed explanation cards.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={handlePrepareStudy}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition duration-155 border border-slate-800 hover:border-cyan-500/30 flex justify-center items-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-lg"
                    >
                      Filter & Study Topics <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Mode 4: Interactive Review */}
                <div id="mode-review-card" className={`rounded-2xl p-6 border shadow-md hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  theme === "dark" 
                    ? "bg-slate-950/60 backdrop-blur-md border-slate-800 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-purple-500/5 blur-xl rounded-full" />
                  <div className="space-y-4">
                    <div className="bg-purple-500/10 border border-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-purple-500">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Interactive Review</h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Study with immediate answer validation. See real-time corrections, explanation quotes, and page numbers after each question. Custom question pool count.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={handlePrepareReview}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-505 hover:brightness-110 text-white font-bold py-3 rounded-xl transition duration-155 flex justify-center items-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-[0_4px_15px_rgba(147,51,234,0.3)]"
                    >
                      Configure & Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Mode 5: Question Search */}
                <div id="mode-search-card" className={`rounded-2xl p-6 border shadow-md hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  theme === "dark" 
                    ? "bg-slate-950/60 backdrop-blur-md border-slate-800 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full" />
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Question Bank Search</h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Search, filter, and inspect all 400+ questions from the Credit Policy Guide by keywords, topics, or handbook page numbers.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={() => setScreen("search")}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition duration-155 border border-slate-800 hover:border-emerald-500/30 flex justify-center items-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-lg"
                    >
                      <Search className="w-4 h-4 text-emerald-400" /> Search Question Bank
                    </button>
                  </div>
                </div>

              </div>

              {/* History & Statistics */}
              <div className={`rounded-2xl p-6 border shadow-sm space-y-4 ${
                theme === "dark" 
                  ? "bg-slate-950/40 border-slate-800 backdrop-blur-md" 
                  : "bg-white border-slate-200"
              }`}>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-cyan-500" />
                  <h4 className={`text-lg font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}>Your Recent Activity Records</h4>
                </div>
                {history.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    No active sessions saved. Complete an exam simulation to see your records persistent stats here!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`border-b text-xs uppercase tracking-wider font-bold ${
                          theme === "dark" ? "border-slate-900 text-slate-500" : "border-slate-200 text-slate-400"
                        }`}>
                          <th className="py-2">Date Completed</th>
                          <th className="py-2">Active Mode</th>
                          <th className="py-2 text-right">Correct Rating</th>
                          <th className="py-2 text-right">Percentage Score</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y text-sm ${
                        theme === "dark" ? "divide-slate-900 text-slate-300" : "divide-slate-200 text-slate-700"
                      }`}>
                        {history.map((record, index) => {
                          const pct = Math.round((record.score / record.total) * 100);
                          const isPass = pct >= 70;
                          return (
                            <tr key={index} className={theme === "dark" ? "hover:bg-slate-900/40 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                              <td className={theme === "dark" ? "py-3 text-slate-400" : "py-3 text-slate-500"}>{record.date}</td>
                              <td className={`py-3 font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{record.mode}</td>
                              <td className="py-3 text-right font-semibold font-mono">
                                {record.score} / {record.total}
                              </td>
                              <td className="py-3 text-right">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                                  isPass ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                                }`}>
                                  {pct}% {isPass ? "PASS" : "FAIL"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ================= SCREEN: TOPIC SELECTOR ================= */}
          {screen === "topic" && (
            <motion.div 
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className={`rounded-2xl p-6 border shadow-xl space-y-6 ${
                theme === "dark" 
                  ? "bg-slate-950/60 border-slate-800 backdrop-blur-md text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {sessionMode === "review-mode" ? "Interactive Review Setup" : "Custom Study Discipline Selection"}
                    </h2>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {sessionMode === "review-mode" 
                        ? "Configure your interactive review size and filter specific disciplines."
                        : "Pick any specific CPG disciplines to target your study practice."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={selectAllTopics}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                        theme === "dark"
                          ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs"
                      }`}
                    >
                      Select All ({allTopics.length})
                    </button>
                    <button 
                      onClick={selectNoTopics}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                        theme === "dark"
                          ? "bg-transparent hover:bg-slate-900 text-slate-400 border-slate-800"
                          : "bg-transparent hover:bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>

                {/* Pool & Discipline Live Summary */}
                <div className={`p-4 border rounded-2xl flex flex-wrap items-center justify-between gap-4 ${
                  theme === "dark" ? "bg-slate-900/50 border-slate-800/80" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                      {selectedTopics.length === 0 ? allTopics.length : selectedTopics.length}
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                        {selectedTopics.length === 0 
                          ? (sessionMode === "review-mode" ? "All Disciplines Active" : "No Disciplines Selected")
                          : `${selectedTopics.length} Disciplines Selected`}
                      </div>
                      <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        Total Questions in Session Pool: <strong className="text-cyan-500 font-mono">
                          {selectedTopics.length === 0 
                            ? CPG_QUESTIONS.length 
                            : selectedTopics.reduce((sum, t) => sum + (topicCounts[t] || 0), 0)}
                        </strong> Questions
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search disciplines..."
                      value={topicSearch}
                      onChange={(e) => setTopicSearch(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        theme === "dark"
                          ? "bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500"
                          : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 shadow-xs"
                      }`}
                    />
                  </div>
                </div>

                {/* 3rd Mode - Config Review Size row */}
                {sessionMode === "review-mode" && (
                  <div className={`p-4 sm:p-5 border rounded-2xl space-y-3 ${
                    theme === "dark" ? "bg-purple-500/5 border-purple-500/10" : "bg-purple-50 border-purple-200"
                  }`}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <h3 className={`text-xs font-black uppercase tracking-widest ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>Select Question Limit:</h3>
                      </div>
                      <span className="text-xs text-purple-600 font-mono font-bold">
                        Limit: {reviewSize === "all" ? "All Matched Questions" : `${reviewSize} Questions`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(["5", "10", "15", "20", "30", "50", "100", "all"] as const).map((size) => {
                        const isChosen = reviewSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setReviewSize(size)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer font-mono ${
                              isChosen
                                ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                                : theme === "dark"
                                  ? "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300"
                                  : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700 shadow-xs"
                            }`}
                          >
                            {size.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-black uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Target Disciplines:</span>
                    {topicSearch && (
                      <span className="text-xs text-slate-400">
                        Showing {allTopics.filter((t) => t.toLowerCase().includes(topicSearch.toLowerCase())).length} of {allTopics.length}
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {allTopics
                      .filter((topic) => topic.toLowerCase().includes(topicSearch.toLowerCase()))
                      .map((topic, i) => {
                        const isSelected = selectedTopics.includes(topic);
                        const qCount = topicCounts[topic];
                        return (
                          <div 
                            key={i}
                            onClick={() => toggleTopic(topic)}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition select-none ${
                              isSelected 
                                ? sessionMode === "review-mode"
                                  ? theme === "dark"
                                    ? "border-purple-500 bg-purple-500/10 text-white font-semibold"
                                    : "border-purple-500 bg-purple-50 text-purple-950 font-semibold shadow-xs"
                                  : theme === "dark"
                                    ? "border-cyan-500 bg-cyan-500/10 text-white font-semibold" 
                                    : "border-cyan-500 bg-cyan-50 text-cyan-950 font-semibold shadow-xs"
                                : theme === "dark"
                                  ? "border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300 bg-slate-900/20"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white"
                            }`}
                          >
                            <div className="flex items-center space-x-3 text-sm">
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                isSelected 
                                  ? sessionMode === "review-mode"
                                    ? "bg-purple-500 text-white"
                                    : "bg-cyan-500 text-white"
                                  : theme === "dark"
                                    ? "bg-slate-900 border border-slate-700"
                                    : "bg-slate-100 border border-slate-300"
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className="line-clamp-1">{topic}</span>
                            </div>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono flex-shrink-0 ml-2 ${
                              isSelected 
                                ? sessionMode === "review-mode"
                                  ? "bg-purple-500/20 text-purple-400 font-bold"
                                  : "bg-cyan-500/20 text-cyan-500 font-bold"
                                : theme === "dark"
                                  ? "bg-slate-800 text-slate-400"
                                  : "bg-slate-200 text-slate-600"
                            }`}>
                              {qCount} Qs
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className={`flex justify-between items-center pt-6 border-t ${theme === "dark" ? "border-slate-900" : "border-slate-200"}`}>
                  <button 
                    onClick={() => setScreen("home")}
                    className={`flex items-center space-x-2 text-sm font-semibold transition cursor-pointer ${
                      theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                  </button>
                  <button 
                    onClick={handleStartStudy}
                    disabled={sessionMode !== "review-mode" && selectedTopics.length === 0}
                    className={`px-6 py-3 font-bold rounded-xl shadow-md disabled:cursor-not-allowed disabled:opacity-50 transition flex items-center space-x-2 cursor-pointer ${
                      sessionMode === "review-mode"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-505 hover:brightness-110 text-white shadow-purple-600/10"
                        : "bg-gradient-to-r from-cyan-600 to-cyan-400 hover:brightness-110 text-slate-950 shadow-cyan-600/10"
                    }`}
                  >
                    <span>
                      {sessionMode === "review-mode"
                        ? `Start Review (${selectedTopics.length === 0 ? "All Clashed" : `${selectedTopics.length} Classes`})`
                        : `Start Study Session (${selectedTopics.length} Selected)`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SCREEN: ACTIVE QUIZ PANEL ================= */}
          {screen === "quiz" && questions.length > 0 && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Header Score & Timing Details */}
              <div className={`rounded-2xl p-4 sm:px-6 border shadow-md backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-4 ${
                theme === "dark" 
                  ? "bg-slate-950/80 border-slate-900 text-slate-300" 
                  : "bg-white border-slate-200 text-slate-800"
              }`}>
                <div className="w-full sm:w-auto flex-1">
                  <div className={`flex justify-between items-center text-xs uppercase tracking-widest font-bold mb-1.5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    <span>
                      Active Session:{" "}
                      <strong className={sessionMode === "review-mode" ? "text-purple-500" : sessionMode === "clump" ? "text-teal-400" : "text-cyan-500"}>
                        {sessionMode === "exam" ? "Exam Sim" : sessionMode === "study" ? "Study Drills" : sessionMode === "clump" ? "Sequential Clump Practice" : "Interactive Review"}
                      </strong>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
                          showQuestionPalette
                            ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                            : theme === "dark"
                              ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                              : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                        }`}
                        title="Toggle Question Quick Jump Matrix"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span>Question Grid</span>
                      </button>
                      <span>Question <strong className={theme === "dark" ? "text-white font-mono" : "text-slate-900 font-mono"}>{currentIndex + 1}</strong> of <strong className="font-mono">{questions.length}</strong></span>
                    </div>
                  </div>
                  {/* Dynamic Progress Bar */}
                  <div className={`w-full h-1.5 rounded-full overflow-hidden font-sans ${theme === "dark" ? "bg-slate-900" : "bg-slate-200"}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-300 shadow-sm ${
                        sessionMode === "review-mode"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-505 shadow-[0_0_8px_rgba(147,51,234,0.5)]"
                          : "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      }`}
                      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Strict Countdown Timer */}
                {sessionMode === "exam" && (
                  <div className={`flex items-center space-x-3 border px-4 py-2 rounded-xl font-bold font-mono shadow-inner ${
                    theme === "dark" 
                      ? "bg-slate-900/80 border-slate-800 text-slate-300" 
                      : "bg-slate-100 border-slate-300 text-slate-800"
                  }`}>
                    <Clock className={`w-5 h-5 ${timeRemaining <= 300 ? "text-rose-500 animate-pulse" : "text-cyan-500"}`} />
                    <span className={`text-lg font-bold ${timeRemaining <= 300 ? "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" : theme === "dark" ? "text-slate-200" : "text-slate-900"}`}>
                      {formatTime(timeRemaining)}
                    </span>
                    {timeRemaining <= 300 && (
                      <span className="text-[10px] text-rose-500 uppercase tracking-widest font-extrabold animate-pulse hidden sm:inline">
                        LOW TIME
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Selection Palette / Quick Jump Grid Drawer */}
              <AnimatePresence>
                {showQuestionPalette && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 border rounded-2xl shadow-lg space-y-3 overflow-hidden ${
                      theme === "dark" ? "bg-slate-950/90 border-slate-850" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Question Palette & Matrix
                      </span>
                      <div className="flex items-center gap-3 text-[10px] font-bold">
                        <span className="flex items-center gap-1 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct</span>
                        <span className="flex items-center gap-1 text-rose-500"><span className="w-2 h-2 rounded-full bg-rose-500" /> Incorrect</span>
                        <span className="flex items-center gap-1 text-cyan-500"><span className="w-2 h-2 rounded-full bg-cyan-500" /> Selected</span>
                        <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-600" /> Pending</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-15 gap-2 max-h-48 overflow-y-auto p-1">
                      {questions.map((q, idx) => {
                        const isCurrent = idx === currentIndex;
                        const userAns = answers[q.id];
                        const isChecked = checkedQuestions[q.id];
                        const isCorrect = userAns === q.correctIndex;

                        let badgeColor = theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800" : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200";

                        if (userAns !== undefined) {
                          if (sessionMode !== "exam" && (isChecked || sessionMode === "review-mode")) {
                            if (isCorrect) {
                              badgeColor = "bg-emerald-500 text-white font-bold border-emerald-400";
                            } else {
                              badgeColor = "bg-rose-500 text-white font-bold border-rose-400";
                            }
                          } else {
                            badgeColor = "bg-cyan-500 text-white font-bold border-cyan-400";
                          }
                        } else if (isChecked) {
                          badgeColor = "bg-purple-500/20 text-purple-400 border-purple-500/40";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-9 w-full rounded-lg text-xs font-mono font-bold border transition flex items-center justify-center cursor-pointer ${badgeColor} ${
                              isCurrent ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 shadow-md scale-105" : ""
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top Navigation Action Header */}
              <div className={`rounded-2xl p-3 sm:px-5 border shadow-md backdrop-blur-md flex flex-wrap justify-between items-center gap-3 ${
                theme === "dark" 
                  ? "bg-slate-950/80 border-slate-900 text-slate-300" 
                  : "bg-white border-slate-200 text-slate-800"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {sessionMode === "exam" ? "TIMED EXAM" : sessionMode === "review-mode" ? "INTERACTIVE REVIEW" : "PRACTICE SESSION"}
                  </span>
                  <span className="text-slate-600 font-mono">•</span>
                  <span className="text-xs font-semibold text-slate-300">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                    className="px-3 py-1.5 border border-slate-800 bg-[#101726] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Question Palette</span>
                  </button>

                  <button 
                    onClick={() => submitExam(false)}
                    className={`px-4 py-1.5 text-white text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer ${
                      sessionMode === "review-mode"
                        ? "bg-purple-600 hover:bg-purple-500"
                        : "bg-indigo-600 hover:bg-indigo-500"
                    }`}
                  >
                    {sessionMode === "review-mode" ? "End Review" : "End Session"}
                  </button>
                </div>
              </div>

              {/* The Active Question Card Display */}
              <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden space-y-6 border-l-4 border-l-indigo-600 ${
                theme === "dark" 
                  ? "bg-[#090d16] border-slate-800/80 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                {/* Ambient Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] blur-[90px] rounded-full pointer-events-none ${
                  sessionMode === "review-mode" ? "bg-purple-500/5" : "bg-indigo-500/5"
                }`} />

                <div className="flex flex-wrap justify-between items-center gap-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={`inline-block border px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-inner ${
                      sessionMode === "review-mode"
                        ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                    }`}>
                       Q. {currentIndex + 1} of {questions.length}
                    </div>

                    {sessionMode !== "exam" && (
                      <button
                        onClick={() => handleOpenTutor(questions[currentIndex], answers[questions[currentIndex].id])}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 hover:from-indigo-500/25 hover:to-purple-500/25 border border-indigo-500/30 text-indigo-300 transition cursor-pointer shadow-xs"
                        title="Get CPG handbook elaboration from AI Tutor"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                        <span>Ask CPG AI Tutor</span>
                      </button>
                    )}
                  </div>

                  <div className={`text-[11px] font-bold border px-3 py-1.5 rounded-lg max-w-[200px] sm:max-w-none truncate sm:whitespace-normal ${
                    theme === "dark" 
                      ? "text-slate-400 bg-slate-900/80 border-slate-800" 
                      : "text-slate-600 bg-slate-100 border-slate-200"
                  }`}>
                    {questions[currentIndex].topic}
                  </div>
                </div>

                {/* Display prompt text */}
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-relaxed relative z-10 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {questions[currentIndex].question}
                </h3>

                {/* Available Multiple Choice Options */}
                <div className="grid gap-3.5 pt-1 relative z-10">
                  {questions[currentIndex].options.map((option, oIdx) => {
                    const userAns = answers[questions[currentIndex].id];
                    const isSelected = userAns === oIdx;
                    const isCorrectOption = questions[currentIndex].correctIndex === oIdx;
                    const isChecked = checkedQuestions[questions[currentIndex].id] || (sessionMode === "review-mode" && userAns !== undefined);

                    let buttonClasses = theme === "dark" 
                      ? "border-slate-800/80 bg-[#0f172a] hover:bg-[#152037] hover:border-slate-700 text-slate-300 hover:text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800";
                    let badgeClasses = theme === "dark" 
                      ? "bg-[#1a253a] text-slate-400"
                      : "border border-slate-300 bg-white text-slate-600";
                    let rightIcon = null;

                    if (isChecked) {
                      if (isCorrectOption) {
                        buttonClasses = "border-2 border-emerald-500 bg-[#0d2822] text-emerald-100 font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                        badgeClasses = "bg-emerald-500 text-white font-black shadow-sm";
                        rightIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-auto" />;
                      } else if (isSelected) {
                        buttonClasses = "border-2 border-rose-500 bg-[#28131d] text-rose-100 font-medium shadow-[0_0_15px_rgba(244,63,94,0.2)]";
                        badgeClasses = "bg-rose-500 text-white font-black shadow-sm";
                        rightIcon = <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 ml-auto" />;
                      } else {
                        buttonClasses = theme === "dark"
                          ? "border-slate-900/40 bg-[#0a101d]/60 text-slate-500 opacity-40 cursor-not-allowed"
                          : "border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
                        badgeClasses = theme === "dark" ? "bg-slate-900 text-slate-600" : "bg-slate-200 text-slate-400";
                      }
                    } else {
                      // Original styling before solution checked
                      if (isSelected) {
                        buttonClasses = "border-2 border-indigo-500 bg-[#131d33] shadow-[0_0_15px_rgba(99,102,241,0.2)] text-white font-semibold";
                        badgeClasses = "bg-indigo-600 text-white font-bold shadow-xs";
                      }
                    }

                    return (
                      <button 
                        key={oIdx}
                        id={`option-${currentIndex}-${oIdx}`}
                        disabled={isChecked}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full flex items-center gap-4 p-4 sm:p-4.5 rounded-xl border text-left transition-all duration-150 text-sm sm:text-base leading-relaxed select-none group cursor-pointer ${buttonClasses}`}
                      >
                        <span className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all text-xs font-bold uppercase flex-shrink-0 ${badgeClasses}`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {rightIcon}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Verification explanation quote block for non-exam modes when checked */}
                <AnimatePresence>
                  {(checkedQuestions[questions[currentIndex].id] || (sessionMode === "review-mode" && answers[questions[currentIndex].id] !== undefined)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 border rounded-2xl text-xs space-y-3 relative z-10 ${
                        theme === "dark" 
                          ? "bg-[#0d1424] border-slate-800 text-slate-300" 
                          : "bg-purple-50 border-purple-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                          <HelpCircle className="w-4 h-4 text-indigo-400" />
                          <span>CPG OFFICIAL GUIDANCE</span>
                        </div>
                        <button
                          onClick={() => handleOpenTutor(questions[currentIndex], answers[questions[currentIndex].id])}
                          className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg transition cursor-pointer text-[11px] shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                          <span>Elaborate with AI Tutor</span>
                        </button>
                      </div>
                      <p className={`leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Correct answer: <strong className="text-emerald-400 font-bold font-mono">Option {String.fromCharCode(65 + questions[currentIndex].correctIndex)}</strong> — "{questions[currentIndex].options[questions[currentIndex].correctIndex]}". {questions[currentIndex].explanation}
                      </p>
                      <div className={`flex justify-between items-center text-[10px] border-t pt-2.5 mt-2 ${
                        theme === "dark" ? "text-slate-400 border-slate-800/80" : "text-slate-500 border-slate-200"
                      }`}>
                        <span>Chapter Focus: <strong className="text-indigo-400 font-mono">{questions[currentIndex].topic}</strong></span>
                        <span>Handbook Reference: <strong className="text-purple-400 font-mono">{questions[currentIndex].page}</strong></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Action Controls Bar INSIDE the Card (matching images 1, 2 & 3) */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer disabled:cursor-not-allowed ${
                      currentIndex === 0
                        ? "bg-[#101726] border-slate-800/50 text-slate-600"
                        : "bg-[#151f33] hover:bg-[#1a2842] border-slate-700 text-slate-200"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> PREVIOUS
                  </button>

                  {sessionMode !== "exam" ? (
                    <>
                      {!checkedQuestions[questions[currentIndex].id] ? (
                        <button
                          onClick={() => handleCheckSolution(questions[currentIndex].id)}
                          disabled={answers[questions[currentIndex].id] === undefined}
                          className={`px-6 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition duration-150 flex items-center gap-2 ${
                            answers[questions[currentIndex].id] === undefined
                              ? "bg-[#182234] text-slate-500 border border-slate-800/80 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5"
                          }`}
                        >
                          <span>CHECK SOLUTION</span>
                        </button>
                      ) : (
                        <button
                          onClick={currentIndex === questions.length - 1 ? () => submitExam(false) : handleNext}
                          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                        >
                          <span>{currentIndex === questions.length - 1 ? "FINISH SESSION" : "NEXT QUESTION"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      {answers[questions[currentIndex].id] === undefined && (
                        <button
                          onClick={handleSkip}
                          disabled={currentIndex === questions.length - 1}
                          className="px-4 py-2.5 rounded-xl border border-slate-800 bg-[#101726] text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>SKIP</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={currentIndex === questions.length - 1 ? () => submitExam(false) : handleNext}
                        className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-cyan-600/30 transition flex items-center gap-2"
                      >
                        <span>{currentIndex === questions.length - 1 ? "SUBMIT EXAM" : "NEXT"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SCREEN: DETAILED PERFORMANCE REVIEW ================= */}
          {screen === "review" && (
            <motion.div 
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Overall Circular Score Display Ring */}
              <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl text-center space-y-6 relative overflow-hidden ${
                theme === "dark" 
                  ? "bg-slate-950/60 border-slate-900 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <h2 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>CPG Session Scorecard</h2>
                  <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Review your final metrics and textbook references below.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-4 relative z-10">
                  {/* Circular Score Badge */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-95">
                      <circle 
                        cx="72" cy="72" r="64"
                        className={theme === "dark" ? "text-slate-900" : "text-slate-200"} strokeWidth="10" stroke="currentColor" fill="transparent"
                      />
                      <circle 
                        cx="72" cy="72" r="64"
                        className={`${
                          passRate >= 70 ? "text-emerald-500" : passRate >= 50 ? "text-cyan-500" : "text-rose-500"
                        }`}
                        strokeWidth="10" strokeDasharray={`${2 * Math.PI * 64}`}
                        strokeDashoffset={`${2 * Math.PI * 64 * (1 - passRate / 100)}`}
                        strokeLinecap="round" stroke="currentColor" fill="transparent"
                      />
                    </svg>
                    <div className="text-center relative">
                      <span className={`text-4xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{passRate}%</span>
                      <p className={`text-[10px] uppercase tracking-wider mt-0.5 font-black ${
                        passRate >= 70 ? "text-emerald-500" : passRate >= 50 ? "text-cyan-500" : "text-rose-500"
                      }`}>
                        {passRate >= 70 ? "PASSED" : "FAILED"}
                      </p>
                    </div>
                  </div>

                  {/* Standard Metric Scorebox Grid */}
                  <div className="grid grid-cols-2 gap-4 w-full sm:w-auto max-w-sm">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                      <span className="block text-2xl font-black text-emerald-500 font-mono">{stats.correct}</span>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Correct</span>
                    </div>
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center">
                      <span className="block text-2xl font-black text-rose-500 font-mono">{stats.failed}</span>
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Wrong</span>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center">
                      <span className="block text-2xl font-black text-amber-500 font-mono">{stats.skipped}</span>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Skipped</span>
                    </div>
                    <div className={`p-4 border rounded-2xl text-center ${
                      theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-slate-100 border-slate-300"
                    }`}>
                      <span className={`block text-2xl font-black font-mono ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>{stats.total}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Total</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl max-w-lg mx-auto text-sm leading-relaxed relative z-10 ${
                  passRate >= 70 
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" 
                    : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-600"
                }`}>
                  {passRate >= 70 
                    ? "🌟 Outstanding certification standard! You have demonstrated exceptional mastery of the CPG requirements."
                    : "📖 Let's study weak areas below. Review the assigned references on the handbook before trying again!"
                  }
                </div>
              </div>

              {/* Swiss Table Category Breakdown */}
              <div className={`rounded-3xl p-6 border shadow-sm space-y-4 ${
                theme === "dark" 
                  ? "bg-slate-950/40 border-slate-900 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-cyan-500" />
                  <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Section-by-Section Breakdown Scorecard</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className={`border-b text-xs uppercase tracking-wider font-bold ${
                        theme === "dark" ? "border-slate-900 text-slate-500" : "border-slate-200 text-slate-400"
                      }`}>
                        <th className="py-2.5">Credit Policy Category</th>
                        <th className="py-2.5 text-center">Weight Done</th>
                        <th className="py-2.5 text-center">Correct Details</th>
                        <th className="py-2.5 text-right">Specific Score</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === "dark" ? "divide-slate-900 text-slate-300" : "divide-slate-200 text-slate-700"}`}>
                      {Object.keys(categoryScorecard).map((topic, index) => {
                        const cell = categoryScorecard[topic];
                        const pct = Math.round((cell.correct / cell.total) * 100);
                        return (
                          <tr key={index} className={theme === "dark" ? "hover:bg-slate-900/40 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                            <td className={`py-3 font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{topic}</td>
                            <td className="py-3 text-center font-semibold font-mono">{cell.total}</td>
                            <td className="py-3 text-center text-emerald-500 font-semibold font-mono">{cell.correct}</td>
                            <td className="py-3 text-right">
                              <span className={`font-bold font-mono ${
                                pct >= 75 ? "text-emerald-500" : pct >= 50 ? "text-cyan-500" : "text-rose-500"
                              }`}>
                                {pct}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Review Filter Navigation Action bar */}
              <div className="space-y-4">
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl border ${
                  theme === "dark" ? "bg-slate-950/80 border-slate-900" : "bg-white border-slate-200"
                }`}>
                  <div className={`flex items-center space-x-2 text-sm font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    <Filter className="w-4 h-4 text-cyan-500" />
                    <span>Filter Questions List:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {[
                      { key: "all", label: "All Questions", color: theme === "dark" ? "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300" : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800" },
                      { key: "correct", label: "Correct ✅", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-semibold" },
                      { key: "failed", label: "Failed ❌", color: "bg-rose-500/10 border-rose-500/20 text-rose-600 font-semibold" },
                      { key: "skipped", label: "Skipped ⏭️", color: "bg-amber-500/10 border-amber-500/20 text-amber-600 font-semibold" }
                    ].map((btn) => {
                      const isSelected = reviewFilter === btn.key;
                      return (
                        <button 
                          key={btn.key}
                          onClick={() => setReviewFilter(btn.key as any)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition whitespace-nowrap cursor-pointer ${
                            isSelected 
                              ? "bg-cyan-500 border-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                              : `${btn.color}`
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Iterative output representing exact status */}
                <div className="space-y-4">
                  {questions
                    .filter((q, qIndex) => {
                      const ans = answers[q.id];
                      if (reviewFilter === "correct") return ans === q.correctIndex;
                      if (reviewFilter === "failed") return ans !== undefined && ans !== q.correctIndex;
                      if (reviewFilter === "skipped") return ans === undefined;
                      return true;
                    })
                    .map((q, qIndex) => {
                      const userAns = answers[q.id];
                      const isCorrect = userAns === q.correctIndex;
                      const isSkipped = userAns === undefined;

                      return (
                        <div 
                          key={q.id}
                          className={`rounded-2xl p-6 border-l-8 shadow-md space-y-4 ${
                            isCorrect 
                              ? "border-emerald-500" 
                              : isSkipped 
                                ? "border-amber-400" 
                                : "border-rose-500"
                          } ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-t border-r border-b border-slate-900" 
                              : "bg-white border-t border-r border-b border-slate-200 text-slate-900"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                              isCorrect 
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                                : isSkipped 
                                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                                  : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                            }`}>
                              {isCorrect ? "CORRECT" : isSkipped ? "SKIPPED" : "INCORRECT"}
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wide border ${
                              theme === "dark" 
                                ? "text-slate-400 bg-slate-900 border-slate-850" 
                                : "text-slate-600 bg-slate-100 border-slate-200"
                            }`}>
                              {q.topic}
                            </span>
                          </div>

                          <h4 className={`text-base font-semibold leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}>
                            {q.question}
                          </h4>

                          {/* Answers Block */}
                          <div className={`space-y-2 pt-1 text-sm p-4 rounded-xl border ${
                            theme === "dark" 
                              ? "bg-slate-900/40 border-slate-900" 
                              : "bg-slate-50 border-slate-200"
                          }`}>
                            {q.options.map((opt, oIdx) => {
                              const wasSelected = userAns === oIdx;
                              const isRightOpt = q.correctIndex === oIdx;
                              
                              let badgeColor = theme === "dark" ? "text-slate-400" : "text-slate-600";
                              let prefixIcon = "○";
                              
                              if (isRightOpt) {
                                badgeColor = "text-emerald-500 font-semibold";
                                prefixIcon = "✓";
                              } else if (wasSelected && !isRightOpt) {
                                badgeColor = "text-rose-500 font-medium line-through";
                                prefixIcon = "✗";
                              }

                              return (
                                <div key={oIdx} className={`flex items-start space-x-2 ${badgeColor}`}>
                                  <span className="font-mono">{prefixIcon}</span>
                                  <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Pre-Indexed Quote and explanation details */}
                          <div className={`p-4 border rounded-xl text-xs space-y-2 mt-4 leading-relaxed ${
                            theme === "dark"
                              ? "bg-emerald-500/5 border-emerald-500/10 text-slate-300"
                              : "bg-emerald-50/70 border-emerald-200 text-slate-800"
                          }`}>
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-emerald-600">📖 CPG Policy Quote & Explanation:</p>
                              <button
                                onClick={() => handleOpenTutor(q, userAns)}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-bold rounded-lg transition cursor-pointer text-[11px] shrink-0"
                              >
                                <Sparkles className="w-3 h-3 text-cyan-500 animate-pulse" />
                                <span>Ask AI Tutor</span>
                              </button>
                            </div>
                            <p className="italic">"{q.explanation}"</p>
                            <p className={`font-bold text-[10px] text-right mt-1 tracking-wide ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                              Reference: <span className="text-cyan-500 font-mono">{q.page}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}

                  {questions.filter((q) => {
                    const ans = answers[q.id];
                    if (reviewFilter === "correct") return ans === q.correctIndex;
                    if (reviewFilter === "failed") return ans !== undefined && ans !== q.correctIndex;
                    if (reviewFilter === "skipped") return ans === undefined;
                    return true;
                  }).length === 0 && (
                    <div className={`p-12 text-center rounded-2xl border space-y-2 ${
                      theme === "dark" 
                        ? "bg-slate-950/40 border-slate-850 text-slate-500" 
                        : "bg-white border-slate-200 text-slate-400"
                    }`}>
                      <Inbox className="w-10 h-10 mx-auto text-slate-400" />
                      <p className="text-sm">No recorded questions fall under this review category filter.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Restart actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button 
                  onClick={() => setScreen("home")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-400 text-slate-950 hover:brightness-110 font-extrabold rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(6,182,212,0.3)] text-white"
                >
                  <RotateCcw className="w-4 h-4 text-white" /> Practice New Session
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= SCREEN: INTERACTIVE REVIEW COMPLETED ================= */}
          {screen === "review-complete" && (
            <motion.div 
              key="review-complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto space-y-8 py-12 text-center"
            >
              <div className={`rounded-3xl p-8 border shadow-2xl relative overflow-hidden space-y-6 backdrop-blur-xl ${
                theme === "dark" 
                  ? "bg-slate-950/60 border-slate-900 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                {/* Visual Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-purple-500/15 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-500 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className={`text-3xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Review Complete!</h2>
                  <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    You have successfully navigated through your custom interactive review session. Every Credit Policy Guide quotation, index code, and handbook reference has been verified.
                  </p>
                </div>

                <div className={`relative z-10 grid grid-cols-2 gap-4 p-5 rounded-2xl border font-mono ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="text-center p-3">
                    <span className="block text-2xl font-black text-purple-500">{questions.length}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Reviewed</span>
                  </div>
                  <div className="text-center p-3">
                    <span className={`block text-2xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{Object.keys(answers).length}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Attempted</span>
                  </div>
                </div>

                <div className="relative z-10 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-300 italic text-center leading-relaxed">
                  "No formal percentage scorecard is issued in this validation mode. High-fidelity drilling reinforces memory retention."
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setScreen("home")}
                    className={`flex-1 px-5 py-3.5 font-bold rounded-xl border transition cursor-pointer text-sm ${
                      theme === "dark" 
                        ? "bg-slate-900 hover:bg-slate-800 text-white border-slate-800" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                    }`}
                  >
                    Return to Home
                  </button>
                  <button
                    onClick={handlePrepareReview}
                    className="flex-1 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-505 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-[0_4px_15px_rgba(147,51,234,0.35)]"
                  >
                    Start New Review
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SCREEN: SEARCH MODE ================= */}
          {screen === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Search Header Box */}
              <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
                theme === "dark"
                  ? "bg-slate-950/70 border-slate-800/80 backdrop-blur-xl text-white"
                  : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                        <Search className="w-5 h-5" />
                      </div>
                      <h2 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Question Bank Explorer & Search
                      </h2>
                    </div>
                    <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Search across all {CPG_QUESTIONS.length} questions in the Credit Policy Guide by keywords, option choices, section name, or handbook page numbers.
                    </p>
                  </div>

                  <button
                    onClick={() => setScreen("home")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      theme === "dark"
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                  </button>
                </div>

                {/* Search Bar & Filter Controls */}
                <div className="grid md:grid-cols-12 gap-4 pt-2">
                  {/* Text Search Input */}
                  <div className="md:col-span-8 relative">
                    <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search questions by key terms (e.g., 'overdraft', 'BOFIA', '50%', 'p. 25')..."
                      className={`w-full pl-11 pr-10 py-3 text-sm rounded-xl border transition outline-none font-medium ${
                        theme === "dark"
                          ? "bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                      }`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Topic Filter Dropdown */}
                  <div className="md:col-span-4">
                    <select
                      value={searchTopicFilter}
                      onChange={(e) => setSearchTopicFilter(e.target.value)}
                      className={`w-full py-3 px-3 text-sm rounded-xl border transition outline-none font-medium cursor-pointer ${
                        theme === "dark"
                          ? "bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-500"
                          : "bg-slate-50 border-slate-300 text-slate-800 focus:border-cyan-600"
                      }`}
                    >
                      <option value="all">All Topics & Disciplines ({CPG_QUESTIONS.length})</option>
                      {allTopics.map((top) => (
                        <option key={top} value={top}>
                          {top} ({topicCounts[top] || 0})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Results Summary & Quick Practice Banner */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="text-xs space-y-1">
                    <p className={`font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                      Found <span className="text-cyan-500 font-mono font-black text-sm">{filteredSearchQuestions.length}</span> question{filteredSearchQuestions.length === 1 ? "" : "s"}
                      {searchQuery && <span> matching "<span className="text-cyan-400">{searchQuery}</span>"</span>}
                      {searchTopicFilter !== "all" && <span> in <span className="text-emerald-400">{searchTopicFilter}</span></span>}
                    </p>
                    <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
                      Showing page {searchPage} of {totalSearchPages} ({paginatedSearchQuestions.length} item{paginatedSearchQuestions.length === 1 ? "" : "s"} on this page)
                    </p>
                  </div>

                  {filteredSearchQuestions.length > 0 && (
                    <button
                      onClick={handleStartPracticeFromSearchResults}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Practice These {Math.min(filteredSearchQuestions.length, 50)} Results</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Questions List */}
              {paginatedSearchQuestions.length === 0 ? (
                <div className={`p-12 text-center rounded-3xl border space-y-3 ${
                  theme === "dark" ? "bg-slate-950/40 border-slate-900 text-slate-400" : "bg-white border-slate-200 text-slate-600"
                }`}>
                  <Inbox className="w-12 h-12 mx-auto text-slate-500" />
                  <h3 className="text-lg font-bold">No Matching Questions Found</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try refining or shortening your search query, or select "All Topics & Disciplines" in the filter dropdown.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchTopicFilter("all");
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition cursor-pointer mt-2 inline-block"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedSearchQuestions.map((q) => {
                    const isExpanded = searchExpandedIds[q.id] ?? true;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl p-6 border shadow-md space-y-4 transition-all duration-200 ${
                          theme === "dark"
                            ? "bg-slate-950/60 border-slate-850 hover:border-slate-800"
                            : "bg-white border-slate-200 text-slate-900 hover:border-slate-300"
                        }`}
                      >
                        {/* Top Metadata Row */}
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold rounded-lg">
                              Question #{q.id}
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wide border ${
                              theme === "dark"
                                ? "text-slate-300 bg-slate-900 border-slate-800"
                                : "text-slate-700 bg-slate-100 border-slate-200"
                            }`}>
                              {q.topic}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg border ${
                              theme === "dark" ? "bg-slate-900 border-slate-850 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}>
                              {q.page}
                            </span>
                            <button
                              onClick={() => toggleSearchExpand(q.id)}
                              className={`p-1.5 rounded-lg border transition text-xs font-semibold cursor-pointer ${
                                theme === "dark"
                                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                                  : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                              }`}
                              title={isExpanded ? "Collapse Details" : "Expand Details"}
                            >
                              {isExpanded ? "Hide Details" : "Show Details"}
                            </button>
                          </div>
                        </div>

                        {/* Question Text */}
                        <h3 className={`text-base font-bold leading-relaxed ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                          {q.question}
                        </h3>

                        {/* Expanded Content (Options, Explanation, Actions) */}
                        {isExpanded && (
                          <div className="space-y-4 pt-2">
                            {/* Options List */}
                            <div className={`space-y-2 p-4 rounded-xl border text-sm ${
                              theme === "dark" ? "bg-slate-900/50 border-slate-900" : "bg-slate-50 border-slate-200"
                            }`}>
                              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                Option Choices:
                              </p>
                              {q.options.map((opt, oIdx) => {
                                const isCorrect = oIdx === q.correctIndex;
                                return (
                                  <div
                                    key={oIdx}
                                    className={`flex items-start justify-between gap-2 p-2.5 rounded-lg transition ${
                                      isCorrect
                                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold"
                                        : theme === "dark"
                                          ? "text-slate-300"
                                          : "text-slate-700"
                                    }`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="font-mono font-bold text-xs mt-0.5">
                                        {String.fromCharCode(65 + oIdx)}.
                                      </span>
                                      <span>{opt}</span>
                                    </div>
                                    {isCorrect && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 shrink-0">
                                        <Check className="w-3 h-3 stroke-[3]" /> Correct Answer
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* CPG Policy Handbook Citation / Explanation */}
                            <div className={`p-4 border rounded-xl text-xs space-y-1.5 leading-relaxed ${
                              theme === "dark"
                                ? "bg-emerald-500/5 border-emerald-500/10 text-slate-300"
                                : "bg-emerald-50/70 border-emerald-200 text-slate-800"
                            }`}>
                              <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" /> Official CPG Handbook Explanation:
                              </p>
                              <p className="italic">"{q.explanation}"</p>
                              <p className={`font-bold text-[10px] text-right mt-1 tracking-wide ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                Handbook Reference: <span className="text-cyan-500 font-mono">{q.page}</span>
                              </p>
                            </div>

                            {/* Action Bar for this question */}
                            <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                              <button
                                onClick={() => handleOpenTutor(q)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-bold rounded-lg transition cursor-pointer text-xs"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                                <span>Ask AI Tutor</span>
                              </button>

                              <button
                                onClick={() => handleOpenQuickPractice(q)}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-lg transition cursor-pointer text-xs shadow-sm"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Quick Practice Question</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              {totalSearchPages > 1 && (
                <div className={`p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-4 ${
                  theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <button
                    onClick={() => setSearchPage((prev) => Math.max(1, prev - 1))}
                    disabled={searchPage === 1}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                        : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-1 overflow-x-auto py-1">
                    {Array.from({ length: totalSearchPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === searchPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setSearchPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                            isActive
                              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                              : theme === "dark"
                                ? "bg-slate-900 hover:bg-slate-800 text-slate-400"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setSearchPage((prev) => Math.min(totalSearchPages, prev + 1))}
                    disabled={searchPage === totalSearchPages}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                        : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ================= SCREEN 6: QUESTION CLUMPS EXPLORER ================= */}
          {screen === "clumps" && (
            <motion.div
              key="clumps"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ClumpsExplorerView
                allQuestions={CPG_QUESTIONS}
                theme={theme}
                onStartClumpPractice={handleStartClumpPractice}
                onOpenTutor={(q) => handleOpenTutor(q)}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* ================= MODAL: INTERNAL EXIT CONFIRMATION OVERLAY ================= */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans ${
                theme === "dark" ? "bg-slate-950/80" : "bg-slate-900/60"
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className={`border max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative ${
                  theme === "dark" 
                    ? "bg-slate-950 border-slate-900 text-white" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3 text-rose-500">
                  <AlertCircle className="w-6 h-6" />
                  <h3 className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Exit Active Session?</h3>
                </div>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Are you absolutely sure you want to exit your active training session? Your choices will not be recorded and any current progress will be lost.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className={`flex-1 order-2 sm:order-1 px-5 py-3 font-bold rounded-xl border transition cursor-pointer text-sm ${
                      theme === "dark"
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                    }`}
                  >
                    Keep Playing
                  </button>
                  <button
                    onClick={() => {
                      setShowExitConfirm(false);
                      setScreen(sessionMode === "clump" ? "clumps" : "home");
                      setTimerActive(false);
                    }}
                    className="flex-1 order-1 sm:order-2 px-5 py-3 bg-rose-600 hover:bg-rose-550 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-[0_4px_15px_rgba(224,56,86,0.3)]"
                  >
                    Yes, Exit Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MODAL: INTERNAL SUBMIT CONFIRMATION OVERLAY ================= */}
        <AnimatePresence>
          {showSubmitConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans ${
                theme === "dark" ? "bg-slate-950/80" : "bg-slate-900/60"
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className={`border max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative ${
                  theme === "dark" 
                    ? "bg-slate-950 border-slate-900 text-white" 
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3 text-cyan-500">
                  <HelpCircle className={sessionMode === "review-mode" ? "text-purple-500 w-6 h-6" : "text-cyan-500 w-6 h-6"} />
                  <h3 className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {sessionMode === "review-mode" ? "Finish Interactive Review?" : "Submit Sheet Details?"}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {sessionMode === "review-mode" 
                    ? "Are you sure you want to complete this review session? You will proceed to a brief summary layout of verified materials."
                    : "Are you sure you want to finalize and submit your test sheet for automatic scorecard grading?"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className={`flex-1 order-2 sm:order-1 px-5 py-3 font-bold rounded-xl border transition cursor-pointer text-sm ${
                      theme === "dark"
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                    }`}
                  >
                    Keep Modifying
                  </button>
                  <button
                    onClick={() => {
                      if (sessionMode === "review-mode") {
                        handleFinishReviewSession();
                      } else {
                        executeActualSubmission();
                      }
                    }}
                    className={`flex-1 order-1 sm:order-2 px-5 py-3 font-bold rounded-xl transition cursor-pointer text-sm ${
                      sessionMode === "review-mode"
                        ? "bg-purple-600 hover:bg-purple-550 text-white shadow-[0_4px_15px_rgba(147,51,234,0.3)]"
                        : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
                    }`}
                  >
                    {sessionMode === "review-mode" ? "Yes, Finish" : "Yes, Submit"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MODAL: QUICK PRACTICE MODAL FOR SEARCH ================= */}
        <AnimatePresence>
          {quickPracticeQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans ${
                theme === "dark" ? "bg-slate-950/80" : "bg-slate-900/60"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className={`border max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
                  theme === "dark"
                    ? "bg-slate-950 border-slate-850 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold rounded-lg">
                      Question #{quickPracticeQuestion.id} • Quick Practice
                    </span>
                    <h3 className={`text-lg font-bold mt-2 leading-relaxed ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {quickPracticeQuestion.question}
                    </h3>
                  </div>
                  <button
                    onClick={() => setQuickPracticeQuestion(null)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {quickPracticeQuestion.options.map((opt, idx) => {
                    const isSelected = quickPracticeAnswer === idx;
                    const isCorrect = idx === quickPracticeQuestion.correctIndex;
                    let optionStyle = theme === "dark"
                      ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700"
                      : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300";

                    if (quickPracticeChecked) {
                      if (isCorrect) {
                        optionStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "bg-rose-500/20 border-rose-500 text-rose-400 font-bold";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quickPracticeChecked}
                        onClick={() => setQuickPracticeAnswer(idx)}
                        className={`w-full p-4 rounded-xl border text-left transition flex items-start justify-between gap-3 text-sm cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono font-bold text-xs mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                          <span>{opt}</span>
                        </div>
                        {quickPracticeChecked && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {quickPracticeChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Checked Explanation */}
                {quickPracticeChecked && (
                  <div className={`p-4 border rounded-xl text-xs space-y-2 leading-relaxed ${
                    quickPracticeAnswer === quickPracticeQuestion.correctIndex
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                  }`}>
                    <p className="font-bold">
                      {quickPracticeAnswer === quickPracticeQuestion.correctIndex ? "✅ Correct!" : "❌ Incorrect"}
                    </p>
                    <p className="italic">"{quickPracticeQuestion.explanation}"</p>
                    <p className="text-[10px] font-mono text-cyan-400 font-bold text-right">
                      {quickPracticeQuestion.page}
                    </p>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => handleOpenTutor(quickPracticeQuestion, quickPracticeAnswer)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 border border-purple-500/30 font-bold rounded-xl transition cursor-pointer text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Ask AI Tutor</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {!quickPracticeChecked ? (
                      <button
                        disabled={quickPracticeAnswer === undefined}
                        onClick={() => setQuickPracticeChecked(true)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md disabled:cursor-not-allowed"
                      >
                        Check Solution
                      </button>
                    ) : (
                      <button
                        onClick={() => setQuickPracticeQuestion(null)}
                        className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {tutorQuestion && (
          <AITutorModal
            isOpen={tutorModalOpen}
            onClose={() => setTutorModalOpen(false)}
            question={tutorQuestion}
            userSelectedIndex={tutorUserIndex}
            theme={theme}
          />
        )}
      </main>
    </div>
  );
}
