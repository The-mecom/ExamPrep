import { useState, useMemo, useEffect } from "react";
import {
  Layers,
  Sparkles,
  FolderArchive,
  ShieldCheck,
  UserCheck,
  Clock,
  AlertTriangle,
  Building2,
  Target,
  Play,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  FileText,
  RotateCcw,
  History
} from "lucide-react";
import { Question, getQuestionSourceBadgeInfo, QuestionSource } from "../questions";
import { ClumpWithQuestions, categorizeQuestionsIntoClumps } from "../lib/clumpUtils";

interface ClumpsExplorerViewProps {
  allQuestions: Question[];
  theme: "dark" | "light";
  onStartClumpPractice: (
    questions: Question[],
    clumpTitle: string,
    clumpId: string,
    startIndex?: number
  ) => void;
  onOpenTutor: (question: Question) => void;
}

export function ClumpsExplorerView({
  allQuestions,
  theme,
  onStartClumpPractice,
  onOpenTutor
}: ClumpsExplorerViewProps) {
  const [filterType, setFilterType] = useState<"all" | "unrelated" | "template" | "pattern">("all");
  const [sourceFilter, setSourceFilter] = useState<QuestionSource>("all");
  const [activeClumpId, setActiveClumpId] = useState<string | null>("clump-unrelated-distinct");
  const [clumpSearchQuery, setClumpSearchQuery] = useState<string>("");
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Record<number, boolean>>({});
  const [savedProgress, setSavedProgress] = useState<Record<string, number>>({});

  // Filter questions based on selected source bank
  const filteredQuestionsBySource = useMemo(() => {
    if (sourceFilter === "cpg_manual") return allQuestions.filter((q) => q.id <= 802);
    if (sourceFilter === "uploaded_txt") return allQuestions.filter((q) => q.id >= 803);
    return allQuestions;
  }, [allQuestions, sourceFilter]);

  // Categorize questions into stable sequential clumps
  const clumps = useMemo(() => categorizeQuestionsIntoClumps(filteredQuestionsBySource), [filteredQuestionsBySource]);

  // Load saved progress from localStorage
  useEffect(() => {
    const loaded: Record<string, number> = {};
    clumps.forEach((c) => {
      const val = localStorage.getItem(`clump_last_index_${c.id}`);
      if (val !== null) {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          loaded[c.id] = parsed;
        }
      }
    });
    setSavedProgress(loaded);
  }, [clumps]);

  // Filter clumps based on selected tab
  const filteredClumps = useMemo(() => {
    if (filterType === "all") return clumps;
    return clumps.filter((c) => c.type === filterType);
  }, [clumps, filterType]);

  // Selected clump details
  const selectedClump = useMemo(() => {
    if (!activeClumpId) return clumps[0];
    return clumps.find((c) => c.id === activeClumpId) || clumps[0];
  }, [clumps, activeClumpId]);

  // Questions inside selected clump with their original index in the clump array
  const clumpQuestionsWithIndex = useMemo(() => {
    if (!selectedClump) return [];
    return selectedClump.questions.map((q, idx) => ({ question: q, clumpIndex: idx }));
  }, [selectedClump]);

  // Questions inside selected clump matching search query
  const searchedClumpQuestions = useMemo(() => {
    if (!selectedClump) return [];
    if (!clumpSearchQuery.trim()) return clumpQuestionsWithIndex;
    const query = clumpSearchQuery.toLowerCase();
    return clumpQuestionsWithIndex.filter(
      ({ question: item }) =>
        item.question.toLowerCase().includes(query) ||
        item.topic.toLowerCase().includes(query) ||
        item.explanation.toLowerCase().includes(query)
    );
  }, [selectedClump, clumpQuestionsWithIndex, clumpSearchQuery]);

  const toggleQuestionExpand = (id: number) => {
    setExpandedQuestionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "FolderArchive":
        return <FolderArchive className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5" />;
      case "Clock":
        return <Clock className="w-5 h-5" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-5 h-5" />;
      case "Building2":
        return <Building2 className="w-5 h-5" />;
      case "Target":
        return <Target className="w-5 h-5" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  // Overall statistics
  const totalQuestions = allQuestions.length;
  const unrelatedCount = clumps.find((c) => c.id === "clump-unrelated-distinct")?.questions.length || 0;
  const templateCount = clumps
    .filter((c) => c.type === "template")
    .reduce((sum, c) => sum + c.questions.length, 0);
  const patternCount = clumps
    .filter((c) => c.type === "pattern")
    .reduce((sum, c) => sum + c.questions.length, 0);

  const activeClumpLastIndex = savedProgress[selectedClump?.id || ""] ?? 0;
  const hasSavedProgress = savedProgress[selectedClump?.id || ""] !== undefined && activeClumpLastIndex > 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-925 to-slate-950 border-slate-800 text-white shadow-2xl"
            : "bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 border-slate-200 text-slate-900 shadow-xl"
        }`}
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl text-white shadow-lg shadow-cyan-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Sequential Question Clumps
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                  Question Clumps & Pattern Explorer
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasSavedProgress ? (
                <button
                  onClick={() =>
                    onStartClumpPractice(
                      selectedClump.questions,
                      selectedClump.title,
                      selectedClump.id,
                      activeClumpLastIndex
                    )
                  }
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <History className="w-4 h-4 text-slate-950" />
                  <span>Resume Q{activeClumpLastIndex + 1}</span>
                </button>
              ) : null}

              <button
                onClick={() =>
                  onStartClumpPractice(
                    selectedClump.questions,
                    selectedClump.title,
                    selectedClump.id,
                    0
                  )
                }
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Practice Active Clump (Q1)</span>
              </button>
            </div>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
            All questions inside clumps retain a <strong className="text-teal-400">fixed, sequential order without randomization</strong>.
            Stop at Question #20 and seamlessly pick up right where you left off at any time.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div
              className={`p-3 rounded-2xl border transition-all ${
                theme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200 shadow-xs"
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Bank</div>
              <div className="text-lg font-black text-cyan-400">{totalQuestions.toLocaleString()} Qs</div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                theme === "dark" ? "bg-teal-950/30 border-teal-800/40" : "bg-teal-50 border-teal-200 shadow-xs"
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Unrelated Clump</div>
              <div className="text-lg font-black text-teal-400">{unrelatedCount.toLocaleString()} Qs</div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                theme === "dark" ? "bg-amber-950/30 border-amber-800/40" : "bg-amber-50 border-amber-200 shadow-xs"
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Template Clumps</div>
              <div className="text-lg font-black text-amber-400">{templateCount.toLocaleString()} Qs</div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                theme === "dark" ? "bg-blue-950/30 border-blue-800/40" : "bg-blue-50 border-blue-200 shadow-xs"
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-blue-400">Pattern Clusters</div>
              <div className="text-lg font-black text-blue-400">{patternCount.toLocaleString()} Qs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Bank Source Selector */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        theme === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200 shadow-xs"
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Source Question Bank Filter:
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSourceFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              sourceFilter === "all"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : theme === "dark"
                ? "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700"
                : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <span>🌐 All Question Banks (1,469 Qs)</span>
          </button>

          <button
            onClick={() => setSourceFilter("cpg_manual")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              sourceFilter === "cpg_manual"
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                : theme === "dark"
                ? "bg-slate-800/80 text-blue-400 hover:text-blue-300 border border-blue-500/30"
                : "bg-blue-50 text-blue-700 hover:text-blue-900 border border-blue-200"
            }`}
          >
            <span>📘 Primary CPG Manual (796 Qs)</span>
          </button>

          <button
            onClick={() => setSourceFilter("uploaded_txt")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              sourceFilter === "uploaded_txt"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : theme === "dark"
                ? "bg-slate-800/80 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30"
                : "bg-emerald-50 text-emerald-700 hover:text-emerald-900 border border-emerald-200"
            }`}
          >
            <span>📄 Uploaded CPM Test File (673 Qs)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b pb-3 border-slate-800/60 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              filterType === "all"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : theme === "dark"
                ? "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>All Clumps ({clumps.length})</span>
          </button>

          <button
            onClick={() => setFilterType("unrelated")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              filterType === "unrelated"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : theme === "dark"
                ? "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Unrelated & Standalone Clump</span>
          </button>

          <button
            onClick={() => setFilterType("template")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              filterType === "template"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : theme === "dark"
                ? "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
            <span>Repetitive Templates ({clumps.filter((c) => c.type === "template").length})</span>
          </button>

          <button
            onClick={() => setFilterType("pattern")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              filterType === "pattern"
                ? "bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20"
                : theme === "dark"
                ? "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Policy Patterns ({clumps.filter((c) => c.type === "pattern").length})</span>
          </button>
        </div>
      </div>

      {/* Clumps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClumps.map((clump) => {
          const isSelected = selectedClump.id === clump.id;
          const lastIdx = savedProgress[clump.id];
          const hasProgress = lastIdx !== undefined && lastIdx > 0;

          return (
            <div
              key={clump.id}
              onClick={() => setActiveClumpId(clump.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative ${
                isSelected
                  ? theme === "dark"
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl"
                    : "bg-white border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl"
                  : theme === "dark"
                  ? "bg-slate-925/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${clump.badgeColor}`}>
                    {clump.badgeLabel}
                  </span>
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {clump.questions.length} Qs
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      clump.type === "unrelated"
                        ? "bg-teal-500/10 text-teal-400"
                        : clump.type === "template"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {renderIcon(clump.iconName)}
                  </div>
                  <div>
                    <h3
                      className={`text-base font-bold ${
                        isSelected
                          ? "text-cyan-400"
                          : theme === "dark"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {clump.title}
                    </h3>
                    {hasProgress && (
                      <span className="text-[10px] text-teal-400 font-semibold flex items-center gap-1 mt-0.5">
                        <History className="w-3 h-3" /> Last position: Q{lastIdx + 1}
                      </span>
                    )}
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {clump.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs font-bold gap-2">
                <span className={theme === "dark" ? "text-slate-400 text-[11px]" : "text-slate-500 text-[11px]"}>
                  Sequential Order
                </span>

                <div className="flex items-center gap-1.5">
                  {hasProgress && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartClumpPractice(clump.questions, clump.title, clump.id, lastIdx);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Resume where you left off"
                    >
                      <History className="w-3 h-3" />
                      <span>Resume Q{lastIdx + 1}</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartClumpPractice(clump.questions, clump.title, clump.id, 0);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Q1</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Clump Detailed Inspector */}
      {selectedClump && (
        <div
          className={`p-6 rounded-3xl border space-y-6 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-lg"
          }`}
        >
          {/* Active Clump Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800/60">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl ${
                  selectedClump.type === "unrelated"
                    ? "bg-teal-500/20 text-teal-400"
                    : selectedClump.type === "template"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {renderIcon(selectedClump.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${selectedClump.badgeColor}`}>
                    {selectedClump.badgeLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{selectedClump.questions.length} Sequential Questions</span>
                </div>
                <h3 className={`text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {selectedClump.title} Inspector
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {hasSavedProgress && (
                <button
                  onClick={() =>
                    onStartClumpPractice(
                      selectedClump.questions,
                      selectedClump.title,
                      selectedClump.id,
                      activeClumpLastIndex
                    )
                  }
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <History className="w-4 h-4 text-slate-950" />
                  <span>Resume at Q{activeClumpLastIndex + 1}</span>
                </button>
              )}

              <button
                onClick={() =>
                  onStartClumpPractice(
                    selectedClump.questions,
                    selectedClump.title,
                    selectedClump.id,
                    0
                  )
                }
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Start from Q1</span>
              </button>
            </div>
          </div>

          {/* Search & Sequential Indicator Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={clumpSearchQuery}
                onChange={(e) => setClumpSearchQuery(e.target.value)}
                placeholder={`Search inside ${selectedClump.title} (${selectedClump.questions.length} items)...`}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  theme === "dark"
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                }`}
              />
            </div>
            <div className="text-xs font-bold text-slate-400 flex items-center gap-2 whitespace-nowrap">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-teal-300 border border-slate-700">
                Fixed Sequential Sequence
              </span>
              <span>Showing {searchedClumpQuestions.length} of {selectedClump.questions.length}</span>
            </div>
          </div>

          {/* Question List inside Selected Clump */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {searchedClumpQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No questions found matching &quot;{clumpSearchQuery}&quot; in this clump.
              </div>
            ) : (
              searchedClumpQuestions.map(({ question: q, clumpIndex }) => {
                const isExpanded = expandedQuestionIds[q.id];
                const isLastSaved = activeClumpLastIndex === clumpIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLastSaved
                        ? "bg-teal-500/10 border-teal-500/50 ring-1 ring-teal-500/30"
                        : theme === "dark"
                        ? "bg-slate-925 border-slate-800/80 hover:border-slate-700"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => toggleQuestionExpand(q.id)}>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            Clump Q{clumpIndex + 1}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            Bank #{q.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            q.id <= 802
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          }`}>
                            {q.id <= 802 ? "📘 Primary CPG Manual" : "📄 Uploaded CPM Test File"}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"}`}>
                            {q.topic}
                          </span>
                          {isLastSaved && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <History className="w-3 h-3" /> Stopped Here
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-semibold leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                          {q.question}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartClumpPractice(
                              selectedClump.questions,
                              selectedClump.title,
                              selectedClump.id,
                              clumpIndex
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-300 hover:bg-teal-500/30 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          title={`Practice from Q${clumpIndex + 1}`}
                        >
                          <Play className="w-3 h-3 fill-teal-300" />
                          <span>Practice from Q{clumpIndex + 1}</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTutor(q);
                          }}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                          title="Ask AI Tutor about this question"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <button className="p-1 text-slate-400 hover:text-white">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-3 text-xs">
                        <div className="space-y-1.5">
                          <div className="font-bold text-slate-400 uppercase text-[10px]">Options & Correct Answer:</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = optIdx === q.correctIndex;
                              return (
                                <div
                                  key={optIdx}
                                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                                    isCorrect
                                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold"
                                      : theme === "dark"
                                      ? "bg-slate-900 border-slate-800 text-slate-400"
                                      : "bg-white border-slate-200 text-slate-600"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                  ) : (
                                    <span className="w-3.5 text-center text-[10px] text-slate-500 flex-shrink-0">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                  )}
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Explanation */}
                        {q.explanation && (
                          <div
                            className={`p-3 rounded-xl border space-y-1 ${
                              theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                            }`}
                          >
                            <div className="font-bold text-cyan-400 text-[10px] uppercase flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              Explanation:
                            </div>
                            <p className="text-xs leading-relaxed">{q.explanation}</p>
                          </div>
                        )}

                        {q.page && (
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>Source: {q.page}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

