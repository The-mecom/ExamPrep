import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "1mb" }));

  // Initialize Gemini AI client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Model fallback candidate list in priority order
  const MODELS_TO_TRY = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3.6-flash"];

  // Helper to generate structured offline fallback text when quota/rate-limits are hit
  function generateOfflineCPGElaboration(data: {
    question: string;
    options: string[];
    correctIndex: number;
    userSelectedIndex?: number;
    explanation?: string;
    topic?: string;
    pageReference?: string;
    customPrompt?: string;
  }): string {
    const {
      question,
      options,
      correctIndex,
      userSelectedIndex,
      explanation,
      topic,
      pageReference,
      customPrompt,
    } = data;

    const correctOptionLetter = String.fromCharCode(65 + correctIndex);
    const correctOptionText = options[correctIndex] || "";
    const userSelectedLetter =
      userSelectedIndex !== undefined && userSelectedIndex !== null
        ? String.fromCharCode(65 + userSelectedIndex)
        : null;

    let text = `### 📖 CPG Policy Analysis & Risk Breakdown
* **Topic Area:** ${topic || "Credit Policy Guide (CPG)"}
* **Handbook Page / Section Reference:** ${pageReference || "CPG Underwriting Section"}

### 1. Key Policy Ruling
The correct ruling according to Credit Policy Guidelines is **Option ${correctOptionLetter}: "${correctOptionText}"**.

> **Official CPG Guidance:**
> "${explanation || "Compliance with established risk limits and underwriting principles is mandatory across all credit facilities."}"

---

### 2. Detailed Explanation
* **Why Option ${correctOptionLetter} is Correct:** This answer aligns directly with standard Credit Policy Guide directives regarding ${topic || "credit risk management"}. In commercial and retail credit evaluation, enforcing strict compliance prevents portfolio degradation and unmitigated exposure.
`;

    if (userSelectedLetter && userSelectedIndex !== correctIndex) {
      const userOptionText = options[userSelectedIndex] || "";
      text += `* **Analysis of Selected Choice (Option ${userSelectedLetter} - "${userOptionText}"):** While Option ${userSelectedLetter} may appear plausible in general business practice, it violates CPG standards because it fails to satisfy mandatory policy constraints or governance requirements.\n`;
    }

    text += `
---

### 3. Distractor & Risk Analysis
${options
  .map((opt, idx) => {
    const letter = String.fromCharCode(65 + idx);
    if (idx === correctIndex) {
      return `- **Option ${letter} (Correct):** Complies fully with policy governance and credit standards.`;
    }
    return `- **Option ${letter} (Incorrect):** Represents an insufficient control or non-standard policy departure.`;
  })
  .join("\n")}

---

### 4. Real-World Banking Application
In commercial lending and credit risk monitoring, adhering to this policy rule ensures that credit officers maintain proper risk-adjusted returns, audit trail compliance, and sound risk governance.
`;

    if (customPrompt) {
      text += `\n*Note regarding your question ("${customPrompt}"): As the AI API rate limit is currently active, this response was structured using the CPG Handbook Rule Engine. Please try again in a few moments for deep multi-turn conversational responses.*`;
    } else {
      text += `\n*(Generated via CPG Knowledge Engine due to Gemini API temporary rate limit)*`;
    }

    return text;
  }

  // API Endpoint: AI Tutor Elaboration
  app.post("/api/tutor", async (req, res) => {
    const {
      question,
      options,
      correctIndex,
      userSelectedIndex,
      explanation,
      topic,
      pageReference,
      customPrompt,
      chatHistory,
    } = req.body;

    if (!question || !options || correctIndex === undefined) {
      return res.status(400).json({ error: "Missing required question details for AI Tutor." });
    }

    const correctOptionLetter = String.fromCharCode(65 + correctIndex);
    const userSelectedLetter =
      userSelectedIndex !== undefined && userSelectedIndex !== null
        ? String.fromCharCode(65 + userSelectedIndex)
        : "None / Skipped";

    const systemInstruction = `You are a world-class Credit Risk Specialist and AI Tutor for the Credit Policy Guide (CPG).
Your role is to help candidates and credit risk analysts deeply understand CPG policy rules, risk management frameworks, underwriting guidelines, and regulatory requirements.

Guidelines for your response:
1. Provide a clear, engaging, structured, and insightful elaboration formatted in Markdown (use bullet points, bolding, and clean section headers where appropriate).
2. Clearly explain WHY the correct answer (${correctOptionLetter}) is right according to CPG policies.
3. If the user picked an incorrect answer or skipped, explain why that choice was incorrect or sub-optimal.
4. Reference real-world banking context, credit risk principles, or CPG guidelines to reinforce learning.
5. Keep explanations professional, encouraging, concise, and educational. Avoid generic preamble like "Sure, here is an explanation". Start directly with the core insights.`;

    const optionsText = options
      .map((opt: string, idx: number) => `Option ${String.fromCharCode(65 + idx)}: ${opt}`)
      .join("\n");

    let promptText = `
### CPG Question Details
- **Topic / Knowledge Area:** ${topic || "Credit Policy Guide"}
- **Handbook Reference:** ${pageReference || "CPG Guidelines"}
- **Question:** ${question}

### Options:
${optionsText}

### User Attempt Details:
- **Correct Option:** ${correctOptionLetter} (${options[correctIndex]})
- **User's Selected Option:** ${userSelectedLetter}${userSelectedIndex !== undefined && userSelectedIndex !== null ? ` (${options[userSelectedIndex]})` : ""}
- **Handbook Provided Explanation:** "${explanation || "N/A"}"
`;

    if (customPrompt && customPrompt.trim().length > 0) {
      promptText += `\n### Candidate's Follow-Up Question:\n"${customPrompt.trim()}"\n\nPlease answer the candidate's question thoroughly using CPG handbook guidelines.`;
    } else {
      promptText += `\n### Request:\nPlease elaborate on this CPG policy question. Break down why option ${correctOptionLetter} is correct, analyze any common pitfalls in distractor options, and explain the key credit risk principle behind it.`;
    }

    // Prepare payload
    let contentsPayload: any = promptText;
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      contentsPayload = [
        { role: "user", parts: [{ text: promptText }] },
        ...chatHistory.map((item: { sender: "user" | "tutor"; text: string }) => ({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        })),
      ];
      if (customPrompt && customPrompt.trim().length > 0) {
        contentsPayload.push({
          role: "user",
          parts: [{ text: customPrompt.trim() }],
        });
      }
    }

    // Try Gemini API with model fallback loop
    try {
      const ai = getGenAI();
      let lastError: any = null;

      for (const modelName of MODELS_TO_TRY) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: contentsPayload,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });

          if (response.text && response.text.trim().length > 0) {
            return res.json({ reply: response.text });
          }
        } catch (modelErr: any) {
          console.warn(`Gemini model ${modelName} failed/rate-limited:`, modelErr?.message || modelErr);
          lastError = modelErr;
          // Continue loop to try next model alias
        }
      }

      console.warn("All Gemini models exhausted or rate-limited. Serving CPG offline rule synthesis.");
      const offlineReply = generateOfflineCPGElaboration({
        question,
        options,
        correctIndex,
        userSelectedIndex,
        explanation,
        topic,
        pageReference,
        customPrompt,
      });

      return res.json({ reply: offlineReply, isFallback: true });
    } catch (globalErr: any) {
      console.error("Global AI Tutor Error, returning offline fallback:", globalErr);
      const offlineReply = generateOfflineCPGElaboration({
        question,
        options,
        correctIndex,
        userSelectedIndex,
        explanation,
        topic,
        pageReference,
        customPrompt,
      });
      return res.json({ reply: offlineReply, isFallback: true });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
