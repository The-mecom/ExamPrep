import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen, 
  HelpCircle,
  Lightbulb,
  Building2,
  AlertTriangle,
  FileText
} from "lucide-react";
import { Question } from "../questions";

interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  userSelectedIndex?: number;
  theme: "dark" | "light";
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  question,
  userSelectedIndex,
  theme,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  // Initial Elaboration fetch when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setErrorMessage(null);
      fetchElaboration();
    }
  }, [isOpen, question.id]);

  const fetchElaboration = async (customQuestion?: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    const userMsgText = customQuestion || "Please elaborate on this question and explain why the correct option is right based on CPG policies.";

    if (customQuestion) {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        text: customQuestion,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    try {
      // Prepare chat history for follow-ups
      const chatHistoryForApi = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.question,
          options: question.options,
          correctIndex: question.correctIndex,
          userSelectedIndex,
          explanation: question.explanation,
          topic: question.topic,
          pageReference: question.page,
          customPrompt: customQuestion,
          chatHistory: chatHistoryForApi,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to reach AI Tutor.");
      }

      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      console.error("AI Tutor request error:", err);
      setErrorMessage(err.message || "An error occurred while connecting to the CPG AI Tutor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const query = inputValue.trim();
    setInputValue("");
    fetchElaboration(query);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const correctLetter = String.fromCharCode(65 + question.correctIndex);
  const userSelectedLetter = userSelectedIndex !== undefined ? String.fromCharCode(65 + userSelectedIndex) : undefined;

  // Simple Markdown Text Formatter
  const renderFormattedText = (text: string) => {
    // Split text into paragraphs/lines
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;

      // Header h3
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-sm sm:text-base mt-3 mb-1 text-cyan-500 flex items-center gap-1.5">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      // Header h2 / h1
      if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
        return (
          <h3 key={idx} className="font-extrabold text-base sm:text-lg mt-4 mb-2 text-purple-500">
            {trimmed.replace(/^#+\s*/, "")}
          </h3>
        );
      }

      // Bullet points
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const bulletText = trimmed.substring(2);
        return (
          <div key={idx} className="flex items-start space-x-2 my-1 pl-1">
            <span className="text-cyan-500 font-bold mt-1">•</span>
            <span className="leading-relaxed text-xs sm:text-sm">{parseInlineBold(bulletText)}</span>
          </div>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const listText = trimmed.replace(/^\d+\.\s/, "");
        const num = trimmed.match(/^\d+/)?.[0];
        return (
          <div key={idx} className="flex items-start space-x-2 my-1 pl-1">
            <span className="font-mono text-xs font-bold text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded">{num}.</span>
            <span className="leading-relaxed text-xs sm:text-sm">{parseInlineBold(listText)}</span>
          </div>
        );
      }

      // Quote blocks
      if (trimmed.startsWith("> ")) {
        return (
          <div key={idx} className="border-l-4 border-purple-500/60 bg-purple-500/5 p-2.5 my-2 rounded-r-lg italic text-xs sm:text-sm">
            {parseInlineBold(trimmed.substring(2))}
          </div>
        );
      }

      return (
        <p key={idx} className="my-1.5 leading-relaxed text-xs sm:text-sm">
          {parseInlineBold(trimmed)}
        </p>
      );
    });
  };

  const parseInlineBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-cyan-600 dark:text-cyan-300">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i} className="font-mono text-[11px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-300">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`w-full max-w-3xl h-[90vh] sm:h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden relative ${
            theme === "dark"
              ? "bg-slate-950 border-slate-800 text-slate-100"
              : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          {/* Header */}
          <div className={`p-4 sm:px-6 border-b flex items-center justify-between ${
            theme === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                    CPG AI Risk Tutor
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                    Gemini Powered
                  </span>
                </div>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Topic: <span className="font-semibold">{question.topic}</span> • Ref: <span className="font-mono">{question.page}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition cursor-pointer ${
                theme === "dark" ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Question Summary Bar */}
          <div className={`px-4 sm:px-6 py-3 border-b text-xs space-y-2 ${
            theme === "dark" ? "bg-slate-900/50 border-slate-850 text-slate-300" : "bg-slate-100/70 border-slate-200 text-slate-700"
          }`}>
            <p className="font-semibold line-clamp-2 leading-relaxed">
              <span className="text-cyan-500 font-bold mr-1">Q:</span> {question.question}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] pt-0.5 font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Correct Option: {correctLetter} ({question.options[question.correctIndex]})
              </span>
              {userSelectedLetter && (
                <span className={`px-2 py-0.5 rounded border font-bold ${
                  userSelectedIndex === question.correctIndex
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
                }`}>
                  Your Answer: Option {userSelectedLetter}
                </span>
              )}
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center space-x-2 overflow-x-auto no-scrollbar ${
            theme === "dark" ? "bg-slate-950/60 border-slate-850" : "bg-white border-slate-200"
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Quick Prompts:
            </span>
            <button
              onClick={() => fetchElaboration("Why is the correct answer right and how does it relate to credit policy?")}
              disabled={isLoading}
              className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                theme === "dark"
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Explain Correct Option
            </button>
            <button
              onClick={() => fetchElaboration("Why are the other options incorrect or misleading according to CPG guidelines?")}
              disabled={isLoading}
              className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                theme === "dark"
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Distractor Pitfalls
            </button>
            <button
              onClick={() => fetchElaboration("Give a realistic commercial banking or loan underwriting scenario that illustrates this rule.")}
              disabled={isLoading}
              className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                theme === "dark"
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-500" /> Real-World Banking Case
            </button>
          </div>

          {/* Chat Messages Display Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.length === 0 && isLoading && (
              <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                <p className={`text-sm font-semibold animate-pulse ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  CPG AI Tutor is analyzing handbook guidelines & drafting elaboration...
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-600 dark:text-rose-400 text-xs sm:text-sm space-y-2">
                <p className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Error Connecting to AI Tutor
                </p>
                <p>{errorMessage}</p>
                <button
                  onClick={() => fetchElaboration()}
                  className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-lg text-xs hover:bg-rose-600 transition cursor-pointer"
                >
                  Retry Analysis
                </button>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "tutor" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm relative group ${
                    msg.sender === "user"
                      ? "bg-cyan-500 text-slate-950 font-medium rounded-tr-none"
                      : theme === "dark"
                      ? "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                      : "bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none"
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mb-2 opacity-75">
                    <span>{msg.sender === "user" ? "Candidate" : "CPG Senior Risk Tutor"}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1">
                    {msg.sender === "tutor" ? renderFormattedText(msg.text) : <p className="text-sm">{msg.text}</p>}
                  </div>

                  {/* Copy Button for Tutor */}
                  {msg.sender === "tutor" && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className={`absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition cursor-pointer ${
                        theme === "dark" ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-200 text-slate-600"
                      }`}
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                    theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages.length > 0 && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className={`p-4 rounded-2xl border text-xs flex items-center space-x-2 ${
                  theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                }`}>
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-200" />
                  <span className="ml-2 font-medium">Tutor is drafting follow-up explanation...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={handleSend}
            className={`p-3 sm:p-4 border-t flex items-center space-x-2 ${
              theme === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask the CPG AI Tutor a follow-up question..."
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                theme === "dark"
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
