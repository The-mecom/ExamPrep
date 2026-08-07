import { Question } from "../questions";

export const BANK_C_QUESTIONS: Question[] = [
  {
    id: 251,
    question: "Under the DAUE program, value can be given to a customer for a clearing instrument only after confirming that the instrument has been duly lodged in clearing.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "This check ensures that the bank has physical custody of the instrument in the clearing process before advancing any funds.",
    page: "DAUE Program Guidelines"
  },
  {
    id: 252,
    question: "What is the maximum percentage of the instrument's face value that can be advanced to a customer under the Bank Draft (DAUD) program?",
    answer: "90%",
    options: ["50%", "70%", "80%", "90%"],
    correctIndex: 3,
    topic: "Credit Products & Facilities",
    explanation: "Because bank drafts are highly secure, the bank allows an advance of up to 90% of their face value.",
    page: "DAUD Program Guidelines"
  },
  {
    id: 253,
    question: "Under the DAUE program, a local personal or corporate cheque in clearing can get value only if there is a documented track record of reputability of the drawer.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "To prevent defaults, the drawer's credit track record must be vetted before the bank advances funds against their cheque.",
    page: "DAUE Program Guidelines"
  },
  {
    id: 254,
    question: "What is the maximum percentage of face value that can be advanced under the DAUE program for a standard corporate or personal cheque?",
    answer: "80%",
    options: ["50%", "60%", "80%", "90%"],
    correctIndex: 2,
    topic: "Credit Products & Facilities",
    explanation: "The bank sets an 80% maximum advance on standard cheques to account for clearing risk/unpaid returns.",
    page: "DAUE Program Guidelines"
  },
  {
    id: 255,
    question: "Can a local branch manager independently approve a transaction under the DAUE program without head office sign-off?",
    answer: "No, all executions must be routed through the head office credit risk desk",
    options: ["Yes, for any amount", "Yes, up to N5 Million", "No, all executions must be routed through the head office credit risk desk", "Only if the customer has an active term loan"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "Due to clearing and counterparty risks, the program requires central credit risk coordination and approval.",
    page: "DAUE Program Guidelines"
  },
  {
    id: 256,
    question: "An unadvised credit facility accepted by a corporate client does NOT require a formal Board Resolution, unlike an advised credit facility.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Any corporate credit acceptance, whether advised or unadvised, must be legally backed by a Board Resolution to protect the bank's position.",
    page: "Documentation Requirements"
  },
  {
    id: 257,
    question: "Invoice Discounting is legally structured to provide working capital financing to prime corporate vendors specifically in respect of contracts already executed/completed.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "Invoice discounting of commercial invoices requires that the associated service/contract performance has already occurred.",
    page: "Invoice Discounting Program"
  },
  {
    id: 258,
    question: "Whose invoice is discounted under the Access Bank Invoice Discounting program?",
    answer: "An approved prime vendor providing services to a vetted corporate Principal",
    options: ["Any retail customer's invoice", "An approved prime vendor providing services to a vetted corporate Principal", "An employee's salary invoice", "An agricultural cooperative's warehouse receipt"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "The vendor (the customer receiving funds) must be servicing an approved, credit-worthy corporate Principal in the bank's database.",
    page: "Invoice Discounting Program"
  },
  {
    id: 259,
    question: "For a vendor's invoices to be discounted at Access Bank, the corporate Principal must hold their primary collections account in the bank.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "This allows the bank to capture payment inflows directly, ensuring secure debt recovery.",
    page: "Invoice Discounting Program"
  },
  {
    id: 260,
    question: "To manage risk effectively, the bank requires that the corporate Principal be selected from an pre-approved, highly-rated database.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "Only invoices issued to pre-approved principal companies are eligible for discounting.",
    page: "Invoice Discounting Program"
  },
  {
    id: 261,
    question: "Under the Invoice Discounting Program, any small business vendor can qualify for funding irrespective of their annual revenue.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "The program targets larger suppliers and requires a minimum annual turnover and established business record.",
    page: "Invoice Discounting Program"
  },
  {
    id: 262,
    question: "What is the primary purpose of the Invoice Discounting program?",
    answer: "To bridge the short-term working capital gap of vendors before they receive principal payments",
    options: ["To buy equipment", "To purchase real estate", "To bridge the short-term working capital gap of vendors before they receive principal payments", "To fund speculative stock market trading"],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "It is designed strictly to turn unpaid invoices into immediate working capital.",
    page: "Invoice Discounting Program"
  },
  {
    id: 263,
    question: "What is the standard payment terms/clearing window for corporate principals to settle invoice payments?",
    answer: "30 to 90 days",
    options: ["1 to 10 days", "15 to 30 days", "30 to 90 days", "Over 180 days"],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "Since corporate payment cycles standardly range between 30 and 90 days, the program is scaled to this window.",
    page: "Invoice Discounting Program"
  },
  {
    id: 264,
    question: "Under the CPG guidelines, the Chief Risk Officer (CRO) has the authority to make final interpretations of all policy definitions.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The CRO is the final authority on policy interpretation, reporting to the GMD/Board.",
    page: "Policy Governance"
  },
  {
    id: 265,
    question: "Which of the following is considered the single largest commercial risk asset class held by the bank?",
    answer: "The Credit Portfolio",
    options: ["T-Bills portfolio", "The Credit Portfolio", "FX holdings", "ATM cash reserves"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Lending remains the bank's primary revenue source and consequently its highest risk category.",
    page: "Lending Overview"
  },
  {
    id: 266,
    question: "Lending programs must be designed specifically to target homogenous customer groups, rather than custom structures for complex individual clients.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Product programs are optimized for high-volume, standard retail and business groups to streamline credit assessment.",
    page: "Product Programmes"
  },
  {
    id: 267,
    question: "The primary objective of the Credit Advisory Committee is to manage non-performing asset collections and recoveries.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "The advisory committee guides remedial activities for deteriorated high-risk loans.",
    page: "CAC Mandates"
  },
  {
    id: 268,
    question: "A signed legally binding offer letter from the customer establishes a commitment by the Bank to lend, even if conditions precedent are unsatisfied.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "No loan can draw down until all stated conditions precedent are fully satisfied by the obligor.",
    page: "Offer Letters"
  },
  {
    id: 269,
    question: "If there is any material change in the customer's financial position between file approval and drawdown, the facility must be re-approved by the original credit authority.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Material changes require complete reassessment of risk and new credit approval.",
    page: "Drawdown Conditions"
  },
  {
    id: 270,
    question: "What is the maximum tenor allowed for facility approvals backed fully by cash collateral or Treasury Bills?",
    answer: "1 year",
    options: ["90 days", "180 days", "1 year", "3 years"],
    correctIndex: 2,
    topic: "Secured & Collateralized Lending",
    explanation: "Cash-backed and treasury bill placements have an absolute tenor cap of 1 year under the standard CPG.",
    page: "Collateralized Tenors"
  },
  {
    id: 271,
    question: "A facility is classified as 'Past Due' immediately on the date of a missed principal or interest payment.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Delinquency & Asset Classification",
    explanation: "Any missed payment triggers the 'past due' classification starting the next day.",
    page: "Asset Classifications"
  },
  {
    id: 272,
    question: "The 'Hold Position' in syndicated lending refers to the portion of the facility that the bank intends to keep on its balance sheet rather than sell down.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "The hold position defines the actual credit exposure retained by Access Bank in a syndication.",
    page: "Syndications"
  },
  {
    id: 273,
    question: "Are employee-related loan schemes governed by the same standard CPG underwriting rules as external retail clients?",
    answer: "No, they are governed by independent Board-approved staff loan policies",
    options: ["Yes, under identical terms", "No, they are governed by independent Board-approved staff loan policies", "No, they require CBN approval first", "Yes, but with zero interest"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Employee benefits have their own dedicated framework distinct from commercial client rules.",
    page: "Staff Lending"
  },
  {
    id: 274,
    question: "What does are the core components of Loss Given Default (LGD) in credit risk?",
    answer: "The percentage loss the bank will incur if an obligor defaults",
    options: ["The total amount of loans outstanding", "The percentage loss the bank will incur if an obligor defaults", "The probability of an obligor defaulting", "The total collateral value assigned"],
    correctIndex: 1,
    topic: "Credit Risk Types",
    explanation: "LGD defines the final net loss rate after accounting for physical securities and recoveries.",
    page: "Credit Risk Definitions"
  },
  {
    id: 275,
    question: "Probability of Default (PD) is defined as the statistical likelihood that a borrower will default on their credit obligation within a specific timeframe.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "PD is a core variable in estimating expected credit losses across the portfolio.",
    page: "Credit Risk Definitions"
  },
  {
    id: 276,
    question: "The internal audit department operates as which line of defense in credit risk management?",
    answer: "Third line of defense",
    options: ["First line of defense", "Second line of defense", "Third line of defense", "Fourth line of defense"],
    correctIndex: 2,
    topic: "Monitoring & Internal Controls",
    explanation: "Audits provide the third tier of objective review, assessing first and second-line governance.",
    page: "Governance Lines"
  },
  {
    id: 277,
    question: "Who holds the delegated authority to approve the release of any collateral once a facility has been fully liquidated?",
    answer: "Credit Administration Desk",
    options: ["The Relationship Manager", "Credit Administration Desk", "Branch Head", "MCC Chairman"],
    correctIndex: 1,
    topic: "Secured & Collateralized Lending",
    explanation: "Releasing securities requires formal legal checks and documentation handled by Credit Administration.",
    page: "Collateral Management"
  },
  {
    id: 278,
    question: "Are balloon payments on term loans allowed under Access Bank's conservative lending guidelines?",
    answer: "Only under highly specialized conditions with Board or MCC approval",
    options: ["Yes, for all retail customers", "No, they are strictly illegal", "Only under highly specialized conditions with Board or MCC approval", "Yes, if the tenor is under 180 days"],
    correctIndex: 2,
    topic: "Credit Products & Facilities",
    explanation: "Balloon installments concentrate repayment risk at maturity and are strictly audited.",
    page: "Term Loans structuring"
  },
  {
    id: 279,
    question: "What is a Facility Approval Memorandum (FAM)?",
    answer: "A formal communication detailing the specific terms, limits, and pricing approved by a credit authority",
    options: ["An invoice sent to a supplier", "A letter to the central bank", "A promotional brochure", "A formal communication detailing the specific terms, limits, and pricing approved by a credit authority"],
    correctIndex: 3,
    topic: "Credit Approval & Committees",
    explanation: "The FAM represents the legal internal record of a credit decision.",
    page: "Approval Records"
  },
  {
    id: 280,
    question: "A Relationship Manager can override a limit set by the MCC if they have solid reasons to believe the customer can pay back.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Decisions from collective credit committees are final and cannot be circumvented by staff.",
    page: "Governance Hierarchy"
  }
];
