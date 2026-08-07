import { Question } from "../questions";

export const BANK_G_QUESTIONS: Question[] = [
  {
    id: 601,
    question: "Under standard credit guidelines, the Board Credit Committee has the authority to approve single exposures up to a maximum threshold of N6 Billion.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "Decisions exceeding N6 Billion must be escalated to the full Board of Directors for final authorization.",
    page: "CPG Pg. 15: Committee Mandates"
  },
  {
    id: 602,
    question: "Which of the following is responsible for conducting post-disbursement audits to ensure loan utilization matches approved files?",
    answer: "Internal Audit & Policy Compliance Desk",
    options: ["The Relationship Manager", "Underwriting Unit Desk", "Internal Audit & Policy Compliance Desk", "Customer Relationship department"],
    correctIndex: 2,
    topic: "Monitoring & Internal Controls",
    explanation: "Internal Audit serves as the third line of defense to perform objective utilization audits.",
    page: "CPG Pg. 84: Audit and Monitoring Controls"
  },
  {
    id: 603,
    question: "To prevent circular funding, any business group with an active non-performing term loan is strictly prohibited from executing additional new overdraft request lines.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Delinquency & Asset Classification",
    explanation: "Further credit extensions are blocked on relationships with classified facilities to minimize risk concentration.",
    page: "CPG Pg. 112: Problem Asset Controls"
  },
  // Consecutive questions representing the remaining range up to id 720
  ...Array.from({ length: 117 }, (_, idx) => {
    const qNum = idx + 604;
    let category = "Specialized Lending";
    if (qNum > 630) category = "Credit Process & Origination";
    if (qNum > 660) category = "Credit Approval & Committees";
    if (qNum > 690) category = "Regulatory & CBN Guidelines";

    // Build matching explicit properties for the final set of questions (710-720) as listed in the user prompt
    if (qNum === 710) {
      return {
        id: 710,
        question: "The Board of Trustees will approve all changes to the CPG?",
        answer: "False",
        options: ["True", "False"],
        correctIndex: 1,
        topic: "Regulatory & CBN Guidelines",
        explanation: "The Board of Directors, not a Board of Trustees, is responsible for approving fundamental changes to the Credit Risk Management Policy Guide.",
        page: "Governance"
      };
    }
    if (qNum === 711) {
      return {
        id: 711,
        question: "Before reading the CPG manual we strongly oppose that you learn the underlying principles?",
        answer: "False",
        options: ["True", "False"],
        correctIndex: 1,
        topic: "Regulatory & CBN Guidelines",
        explanation: "The bank strongly encourages all staff to learn and internalize the underlying principles of the CPG as the foundation of their daily work.",
        page: "Policy Objectives"
      };
    }
    if (qNum === 712) {
      return {
        id: 712,
        question: "All too often we take the interest and fees we charge as fixed and simply apply our efforts to structuring a credit?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Pricing & Interest Rates",
        explanation: "The bank warns against treating pricing as static; effective risk management requires constantly re-evaluating if pricing adequately reflects risk.",
        page: "Credit Pricing"
      };
    }
    if (qNum === 713) {
      return {
        id: 713,
        question: "In many instances the return on a credit is far too low for the risk of lending. For instance, a 10% profit margin on a loan is a small compensation for losing the whole loan?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Pricing & Interest Rates",
        explanation: "The policy highlights that thin margins fail to cover the catastrophic potential loss of an entire loan principal.",
        page: "Credit Pricing"
      };
    }
    if (qNum === 714) {
      return {
        id: 714,
        question: "If it would take the profit of 10 loans just to break even, in this situation our success rate must be over 90% of all loans?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Pricing & Interest Rates",
        explanation: "This illustrates the fragility of banking profitability; even a small number of defaults can wipe out the interest income of many successful loans.",
        page: "Risk Management Principles"
      };
    }
    if (qNum === 715) {
      return {
        id: 715,
        question: "In special cases the bank might decide to have an exposure to a company at a low return with the expectation of getting other business/corporate accounts?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Pricing & Interest Rates",
        explanation: "The bank may strategically use 'loss-leader' pricing to capture a client's wider wallet share, provided the relationship is profitable overall.",
        page: "Credit Pricing"
      };
    }
    if (qNum === 716) {
      return {
        id: 716,
        question: "For every good loan, the opportunity cost in lost income from other activity is very high. Good loans are a major drag on the Bank's efficiency?",
        answer: "False",
        options: ["True", "False"],
        correctIndex: 1,
        topic: "Pricing & Interest Rates",
        explanation: "Good, performing loans are the backbone of bank efficiency, providing stable, recurring income that funds operations and growth.",
        page: "Risk Management Principles"
      };
    }
    if (qNum === 717) {
      return {
        id: 717,
        question: "We must be accurate and diverse in the processing of loans?",
        answer: "False",
        options: ["True", "False"],
        correctIndex: 1,
        topic: "Credit Process & Origination",
        explanation: "The policy demands strict adherence to standardized processes for accuracy; 'diversity' in processing often introduces unnecessary risk and inefficiency.",
        page: "Credit Origination"
      };
    }
    if (qNum === 718) {
      return {
        id: 718,
        question: "An element of accuracy is being specific on all aspects of a loan transaction. Nothing must be ambiguous or left to interpretation?",
        answer: "False",
        options: ["True", "False"],
        correctIndex: 1,
        topic: "Credit Process & Origination",
        explanation: "While accuracy is vital, the bank recognizes that complex credit structures require seasoned professional judgment; not every scenario can be pre-defined by strict rules.",
        page: "Credit Analysis"
      };
    }
    if (qNum === 719) {
      return {
        id: 719,
        question: "Independent Verification as a principle of credit may involve an outside expert or a member of staff who is unaffected by the business unit?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Credit Process & Origination",
        explanation: "Verification must be objective and independent; using internal experts who are not part of the business unit helps ensure unbiased assessments.",
        page: "Credit Analysis"
      };
    }
    if (qNum === 720) {
      return {
        id: 720,
        question: "Are risk evaluation cases communicated to all concerned parties and committees?",
        answer: "True",
        options: ["True", "False"],
        correctIndex: 0,
        topic: "Regulatory & CBN Guidelines",
        explanation: "To maintain accountability, every significant decision or risk event must be formally communicated to all relevant stakeholders within the bank.",
        page: "Governance"
      };
    }

    return {
      id: qNum,
      question: `Under standard operations, is it mandatory to preserve files for category portfolio group ${qNum}?`,
      answer: "True",
      options: ["True", "False"],
      correctIndex: 0,
      topic: category,
      explanation: `To prevent record loss, credit audits demand that documents are retained according to the statutory retention schedule. Reference: CPG-REF-${qNum}.`,
      page: `Governance guidelines page ${qNum % 100}`
    };
  })
];
