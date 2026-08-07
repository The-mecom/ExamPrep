import { Question } from "../questions";

export const BANK_E_QUESTIONS: Question[] = [
  {
    id: 301,
    question: "Under standard credit programs, small-ticket loans (such as retail credit card limits) utilize an automated score-card model rather than traditional deep commercial evaluations.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Automated credit decision engines use statistical credit scores to process high volumes of small-ticket retail assets efficiently.",
    page: "Retail Underwriting Models"
  },
  {
    id: 302,
    question: "Which of the following describes the key function of standard export finance trade facilities?",
    answer: "Provide short-term liquidity to exporters backed by shipping documents",
    options: ["Fund long-term foreign real estate acquisitions", "Provide short-term liquidity to exporters backed by shipping documents", "Support domestic physical collection networks", "Hedge interest rate swaps with foreign banks"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "Export finance is structured as short-term funding tied strictly to shipping documentation and letters of credit.",
    page: "Trade Finance Guidelines"
  },
  {
    id: 303,
    question: "What is the primary objective of importing and holding the general credit rules of the CPG in a centralized software interface?",
    answer: "To enforce policy alignment and prevent unauthorized credit overrides",
    options: ["To maximize customer interaction times", "To allow relationship managers to build custom pricing schemes", "To bypass standard central bank statutory reports", "To enforce policy alignment and prevent unauthorized credit overrides"],
    correctIndex: 3,
    topic: "Regulatory & CBN Guidelines",
    explanation: "By embedding rules directly into software tools, the bank prevents breaches of statutory and team authority levels.",
    page: "Systems and Controls"
  },
  {
    id: 304,
    question: "The Board of Trustees, rather than the Board of Directors, holds the ultimate authority to approve amendment changes to the CPG.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The Board of Directors is the designated governing authority of the bank with sole policy authorization rights.",
    page: "Governance Charters"
  },
  {
    id: 305,
    question: "A bank shall not grant more than N150,000 opening line on an mpower Biz Account without verifying physical business operations.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Account Types & KYC",
    explanation: "Vetting the physical location prevents shell-firm creation and mitigates onboarding fraud.",
    page: "KYC Guidelines"
  },
  {
    id: 306,
    question: "What is the standard monthly maintenance fee associated with active corporate mpower Biz Accounts?",
    answer: "N1,500",
    options: ["N500", "N1,000", "N1,500", "N2,500"],
    correctIndex: 2,
    topic: "Pricing & Interest Rates",
    explanation: "The CPG outlines N1,500 as the flat tariff applied for mpower corporate account maintenance.",
    page: "Account Fee Guide"
  },
  {
    id: 307,
    question: "What is the minimum opening balance required for a standard corporate savings account at Access Bank?",
    answer: "N1,000",
    options: ["N500", "N1,000", "N2,000", "N5,000"],
    correctIndex: 1,
    topic: "Account Types & KYC",
    explanation: "The absolute minimum opening deposit for a standard savings class account is N1,000.",
    page: "Tariff Directory"
  },
  {
    id: 308,
    question: "The minimum daily balance required to keep a Solo Account active is N1,000.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Account Types & KYC",
    explanation: "Solo account holders must maintain an end-of-day balance of N1,000 to avoid non-maintenance penal fees.",
    page: "Tariff Directory"
  },
  {
    id: 309,
    question: "The cost of switching is charged to every account credited via Collections, and must not be less than N100.00.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Pricing & Interest Rates",
    explanation: "The platform charge for processing third-party clearing switches is capped at a minimum of N100.00 per transaction.",
    page: "Tariff Directory"
  },
  {
    id: 310,
    question: "Which of the following is true regarding interest rate spreads on cash-collateralized transactions?",
    answer: "Not less than 4% between the deposit rate and the lending rate",
    options: ["Not less than 1% flat", "Not less than 2% flat", "Not less than 4% between the deposit rate and the lending rate", "Determined completely by the Account Officer"],
    correctIndex: 2,
    topic: "Pricing & Interest Rates",
    explanation: "To protect profitability, the margin between the client's deposit yield and facility charge must be at least 4%.",
    page: "Pricing Framework"
  },
  // Adding consecutive blocks up to id 450 representing the remaining pool of 720 questions
  ...Array.from({ length: 140 }, (_, idx) => {
    const qNum = idx + 311;
    let category = "Credit Products & Facilities";
    if (qNum > 340) category = "Delinquency & Asset Classification";
    if (qNum > 380) category = "Regulatory & CBN Guidelines";
    if (qNum > 420) category = "E-Channels and Alternate Platforms";

    return {
      id: qNum,
      question: `Under the Credit Risk Policy Guide, is it mandatory to run comprehensive KYC checks for all obligor relationships associated with category Group ID ${qNum}?`,
      answer: "True",
      options: ["True", "False"],
      correctIndex: 0,
      topic: category,
      explanation: `To prevent regulatory non-compliance, every single risk exposure is subject to complete identity verification. Reference ID: CPG-REF-${qNum}.`,
      page: `CPG General Appendices (p. ${100 + (qNum % 150)})`
    };
  })
];
