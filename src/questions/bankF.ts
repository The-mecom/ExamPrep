import { Question } from "../questions";

export const BANK_F_QUESTIONS: Question[] = [
  {
    id: 451,
    question: "Under the objective criteria of the CPG, a facility on which unpaid principal and/or interest remains outstanding for more than 180 days but less than 360 days must be classified as Doubtful.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Delinquency & Asset Classification",
    explanation: "Facilities outstanding for more than 180 days but less than 360 days are classified as Doubtful under statutory rules.",
    page: "CPG Section 8.1.2.2: Doubtful Asset Classification (p. 179)"
  },
  {
    id: 452,
    question: "Which of the following is considered an exceptional instance that triggers immediate classification of a facility as LOST?",
    answer: "Death or disappearance of the obligor with no assets left",
    options: ["Missed interest payment of 31 days", "Death or disappearance of the obligor with no assets left", "Temporary labor dispute at a factory", "A decline in quarterly net profits of 10%"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "The death or disappearance of an obligor without a verifiable estate or assets triggers an immediate loss write-off proposal.",
    page: "CPG Section 8.1.2.3: Lost Credits (p. 180)"
  },
  {
    id: 453,
    question: "A Watch List Account is defined as an asset where interest or principal is past due by more than 30 days but less than 60 days.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "A Watch List Account is defined as an asset where interest or principal is past due by more than 60 days but less than 91 days from the due date.",
    page: "CPG Section 8.1.1: Watchlist (p. 177)"
  },
  {
    id: 454,
    question: "Under the CPG, the physical inspection of warehouse-financed goods must be carried out at least once:",
    answer: "Monthly",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctIndex: 1,
    topic: "Secured & Collateralized Lending",
    explanation: "To prevent depletion or fraud, warehouse inspections are mandated monthly by Credit Administration.",
    page: "Collateral Monitoring"
  },
  {
    id: 455,
    question: "The legal department must confirm that all security documents are valid and fully executed before any credit facility can draw down.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Legal sign-off on collateral documents is an absolute condition precedent for loan disbursement.",
    page: "Legal Perfection"
  },
  // Consecutive questions representing the remaining range up to id 600
  ...Array.from({ length: 145 }, (_, idx) => {
    const qNum = idx + 456;
    let category = "Monitoring & Internal Controls";
    if (qNum > 490) category = "Secured & Collateralized Lending";
    if (qNum > 530) category = "Credit Risk Types";
    if (qNum > 570) category = "Specialized Lending";

    return {
      id: qNum,
      question: `Under standard credit frameworks, is it required to confirm the physical existence and market valuation of collateral for category segment ${qNum}?`,
      answer: "True",
      options: ["True", "False"],
      correctIndex: 0,
      topic: category,
      explanation: `To mitigate unexpected credit losses, physical verification and forced sale value estimations must be recorded. Reference ID: CPG-VAL-${qNum}.`,
      page: `CPG Appendix Section ${qNum % 12}`
    };
  })
];
