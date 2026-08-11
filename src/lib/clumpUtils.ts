import { Question } from "../questions";

export interface ClumpDefinition {
  id: string;
  title: string;
  type: "template" | "pattern" | "unrelated";
  badgeLabel: string;
  badgeColor: string; // Tailwind color class for badges
  iconName: string;
  description: string;
  matchFn: (q: Question) => boolean;
}

export interface ClumpWithQuestions extends ClumpDefinition {
  questions: Question[];
  topicDistribution: Record<string, number>;
}

export const CLUMP_DEFINITIONS: ClumpDefinition[] = [
  {
    id: "clump-file-preservation",
    title: "Portfolio File Preservation",
    type: "template",
    badgeLabel: "Repetitive Template Clump",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    iconName: "FolderArchive",
    description: "Questions generated from a single structural template testing document retention and file preservation across portfolio categories.",
    matchFn: (q) =>
      q.question.toLowerCase().includes("preserve files for category portfolio group") ||
      q.question.toLowerCase().includes("preserve files for category")
  },
  {
    id: "clump-collateral-valuation",
    title: "Collateral Existence & Valuation",
    type: "template",
    badgeLabel: "Repetitive Template Clump",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    iconName: "ShieldCheck",
    description: "Questions generated from a single template testing physical inspection and valuation requirements across collateral segments.",
    matchFn: (q) =>
      q.question.toLowerCase().includes("physical existence and market valuation of collateral") ||
      q.question.toLowerCase().includes("valuation of collateral for category")
  },
  {
    id: "clump-kyc-checks",
    title: "Comprehensive Obligor KYC Checks",
    type: "template",
    badgeLabel: "Repetitive Template Clump",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    iconName: "UserCheck",
    description: "Questions generated from a single template testing Know Your Customer (KYC) compliance across obligor Group IDs.",
    matchFn: (q) =>
      q.question.toLowerCase().includes("comprehensive kyc checks for all obligor relationships") ||
      q.question.toLowerCase().includes("comprehensive kyc checks")
  },
  {
    id: "clump-insider-policy",
    title: "Insider & Related Party Lending",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    iconName: "UserCheck",
    description: "Questions covering insider credit facilities, director borrowing limits, BOFIA restrictions, related party disclosures, and dividend withholding.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("insider") ||
        text.includes("director") ||
        text.includes("related party") ||
        text.includes("bofia") ||
        text.includes("significant shareholder")
      );
    }
  },
  {
    id: "clump-specialized-lending",
    title: "Specialized, Agric & Object Financing",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    iconName: "Target",
    description: "Questions on agricultural schemes (CACS, DCRR, NIRSAL, tree crops), project finance, object finance (vessels, aircraft), and Reserve-Based Lending (RBL).",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("agric") ||
        text.includes("farm") ||
        text.includes("cacs") ||
        text.includes("dcrr") ||
        text.includes("nirsal") ||
        text.includes("object finance") ||
        text.includes("vessel") ||
        text.includes("rbl") ||
        text.includes("project finance") ||
        text.includes("tree crop")
      );
    }
  },
  {
    id: "clump-recovery-waivers",
    title: "Remedial Assets, Recoveries & Waivers",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    iconName: "AlertTriangle",
    description: "Questions on non-performing assets, bad debt write-offs, interest waivers, Criticized Assets Committee (CAC), and recovery procedures.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("write-off") ||
        text.includes("write off") ||
        text.includes("waiver") ||
        text.includes("remedial") ||
        text.includes("recovery") ||
        text.includes("criticized asset") ||
        text.includes("cac")
      );
    }
  },
  {
    id: "clump-tenors-limits",
    title: "Tenors, Credit Limits & Exposure Caps",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    iconName: "Clock",
    description: "Questions focused on allowable facility tenors, single obligor limits, revolving credit windows, and exposure limits.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("maximum tenor") ||
        text.includes("tenor permitted") ||
        text.includes("tenor of") ||
        text.includes("credit limit") ||
        text.includes("exposure limit") ||
        text.includes("single obligor limit") ||
        text.includes("prudential limit") ||
        text.includes("one obligor")
      );
    }
  },
  {
    id: "clump-classification-impairment",
    title: "Credit Classification & Impairment",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    iconName: "AlertTriangle",
    description: "Questions evaluating loan classification triggers (Sub-Standard, Doubtful, Lost, Watchlist), DPD thresholds, and provisioning rules.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("classified as") ||
        text.includes("past due") ||
        text.includes("sub-standard") ||
        text.includes("substandard") ||
        text.includes("doubtful") ||
        text.includes("watchlist") ||
        text.includes("days past due") ||
        text.includes("impairment") ||
        text.includes("provisioning") ||
        text.includes("loan loss")
      );
    }
  },
  {
    id: "clump-approval-governance",
    title: "Approval Authority & Governance",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    iconName: "Building2",
    description: "Questions testing approval limits, management/board credit committees, delegated authority thresholds, and policy exceptions.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("approval authority") ||
        text.includes("board credit committee") ||
        text.includes("management credit committee") ||
        text.includes("credit committee") ||
        text.includes("delegated authority") ||
        text.includes("approved by") ||
        text.includes("approval limit")
      );
    }
  },
  {
    id: "clump-rac-target-market",
    title: "Risk Acceptance Criteria & Target Market",
    type: "pattern",
    badgeLabel: "Policy Pattern",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    iconName: "Target",
    description: "Questions covering Target Market definitions, minimum obligor ratings, risk acceptance criteria (RAC), and sector benchmarks.",
    matchFn: (q) => {
      const text = q.question.toLowerCase();
      return (
        text.includes("target market") ||
        text.includes("risk acceptance criteria") ||
        text.includes("obligor rating") ||
        text.includes("credit rating") ||
        text.includes("credit score") ||
        text.includes("tm/rac")
      );
    }
  }
];

export function categorizeQuestionsIntoClumps(allQuestions: Question[]): ClumpWithQuestions[] {
  const clumpMap = new Map<string, Question[]>();
  CLUMP_DEFINITIONS.forEach((def) => clumpMap.set(def.id, []));
  const unrelatedQuestions: Question[] = [];

  for (const q of allQuestions) {
    let matched = false;
    for (const def of CLUMP_DEFINITIONS) {
      if (def.matchFn(q)) {
        clumpMap.get(def.id)!.push(q);
        matched = true;
        break; // Assign to first matching clump definition
      }
    }
    if (!matched) {
      unrelatedQuestions.push(q);
    }
  }

  const result: ClumpWithQuestions[] = CLUMP_DEFINITIONS.map((def) => {
    const qList = clumpMap.get(def.id) || [];
    const topicDist: Record<string, number> = {};
    qList.forEach((q) => {
      topicDist[q.topic] = (topicDist[q.topic] || 0) + 1;
    });

    return {
      ...def,
      questions: qList,
      topicDistribution: topicDist
    };
  });

  // Add the Unrelated / Distinct Questions Clump at the end
  const unrelatedTopicDist: Record<string, number> = {};
  unrelatedQuestions.forEach((q) => {
    unrelatedTopicDist[q.topic] = (unrelatedTopicDist[q.topic] || 0) + 1;
  });

  result.push({
    id: "clump-unrelated-distinct",
    title: "Standalone & Unrelated Policy Questions",
    type: "unrelated",
    badgeLabel: "Distinct Policy Clump",
    badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
    iconName: "Sparkles",
    description: "A comprehensive clump containing all unique, non-repetitive core credit policy questions across all 14 knowledge areas.",
    matchFn: () => false,
    questions: unrelatedQuestions,
    topicDistribution: unrelatedTopicDist
  });

  return result;
}
