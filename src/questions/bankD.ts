import { Question } from "../questions";

export const BANK_D_QUESTIONS: Question[] = [
  {
    id: 281,
    question: "A 'Negative Pledge' is a protective covenant designed to prevent a borrower from pledging their assets to other lenders.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Secured & Collateralized Lending",
    explanation: "This covenant protects the bank's position as the primary lender by ensuring the borrower's assets remain unencumbered.",
    page: "Loan Covenants"
  },
  {
    id: 282,
    question: "Standard Credit Program approvals are mandatory across all branches of Access Bank to ensure uniformity in product distributions.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Standardized programs are used to enforce a uniform underwriting approach across the branch network.",
    page: "Product Programs Guidelines"
  },
  {
    id: 283,
    question: "Under the bank's governance rules, the Credit Risk Policy Guide (CPG) must be formally reviewed and calibrated at least:",
    answer: "Annually",
    options: ["Semi-annually", "Annually", "Every two years", "Every five years"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The CPG is a living document that must be reviewed and re-approved by the Board at least once every year.",
    page: "Policy Amendments"
  },
  {
    id: 284,
    question: "Any material deviation or exception from the rules specified in the CPG must be formally documented, justified, and approved by the original authority or Board.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Strict tracking of policy exceptions is required to avoid credit rating downgrades and structural audit issues.",
    page: "Policy Governance"
  },
  {
    id: 285,
    question: "What is Exposure at Default (EAD) in credit risk measurement?",
    answer: "The total gross exposure expected when an obligor defaults",
    options: ["The amount of loan written off", "The statistical likelihood of a default", "The total gross exposure expected when an obligor defaults", "The collateral value after haircut"],
    correctIndex: 2,
    topic: "Credit Risk Types",
    explanation: "EAD estimates the full outstanding balance of principal and accrued interest at the moment of default.",
    page: "Risk Parameter Definitions"
  },
  {
    id: 286,
    question: "Lending to sensitive industries is highly restricted because of which of the following risks?",
    answer: "Reputational and Environmental Risk",
    options: ["Liquidity risk", "Interest rate risk", "Reputational and Environmental Risk", "Sovereign default risk"],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Industries like weapons, tobacco, or heavy pollutants carry severe environmental and image fallout risks.",
    page: "Social & Environmental Policies"
  },
  {
    id: 287,
    question: "Covenants in an offer letter are legally binding conditions that the borrower must respect during the lifetime of the credit facility.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Covenants are legal requirements that provide the bank with protection and early warning indicators.",
    page: "Covenants Framework"
  },
  {
    id: 288,
    question: "What is the primary role of an independent Collateral Manager in structured commodity financing?",
    answer: "To physically secure and monitor commodities stored in warehouses on behalf of the bank",
    options: ["To negotiate loan interest rates", "To physically secure and monitor commodities stored in warehouses on behalf of the bank", "To approve credit bureau files", "To design marketing campaigns"],
    correctIndex: 1,
    topic: "Secured & Collateralized Lending",
    explanation: "Collateral managers verify that the actual commodity remains intact and preserved for debt security.",
    page: "Warehouse Financing Guidelines"
  },
  {
    id: 289,
    question: "A default on any other third-party borrowing by the customer can automatically trigger a default on their Access Bank facility under 'Cross-Default' rules.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Delinquency & Asset Classification",
    explanation: "Cross-default clauses protect the bank from acting too late when a customer's business starts collapsing.",
    page: "Default Triggers"
  },
  {
    id: 290,
    question: "Are political campaign organizations or individual candidates eligible to receive commercial loans from Access Bank under standard CPG constraints?",
    answer: "No, lending to support political campaigns is strictly prohibited",
    options: ["Yes, up to N100 Million", "No, lending to support political campaigns is strictly prohibited", "Yes, provided they provide a cash collateral", "Only in primary election seasons"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "To safeguard political neutrality and avoid non-commercial defaults, political loans are banned.",
    page: "Prohibited Lending list"
  },
  {
    id: 291,
    question: "Any waiver of a core covenant or condition precedent must follow the exact same approval limit hierarchy as a new credit approval.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "Waiving critical conditions changes the risk profile, requiring formal re-authorization.",
    page: "Policy Exceptions"
  },
  {
    id: 292,
    question: "KYC (Know Your Customer) and AML (Anti-Money Laundering) checks are completely mandatory for every loan applicant before any credit file goes to approval.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Strict regulatory Compliance requires completing all KYC checks before any credit assessment.",
    page: "Compliance Onboarding"
  },
  {
    id: 293,
    question: "Under bank guidelines, a personal guarantor is jointly and severally liable for the entire outstanding debt of the borrower if a default occurs.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Secured & Collateralized Lending",
    explanation: "Guarantees are legally binding for the full extent of the debt, enabling direct recovery from the guarantor.",
    page: "Guarantees Section"
  },
  {
    id: 294,
    question: "Access Bank maintains a centralized database of all approved and declined credit files for systemic auditing and credit reporting purposes.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "Centralized tracking is crucial for data completeness, statutory audits, and risk modeling.",
    page: "Reporting Standards"
  },
  {
    id: 295,
    question: "Treasury placements with other commercial banks are managed under specific credit limits approved by the GMD and credit risk department.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Interbank placement risks are strictly governed to control systemic exposure in the market.",
    page: "Treasury Placements"
  },
  {
    id: 296,
    question: "If a credit relationship's scheduled annual review date passes without completion, how is the facility treated under conservative audit rules?",
    answer: "It is flagged as expired and drawing down new funds is blocked",
    options: ["It is automatically extended for 1 year", "It is flagged as expired and drawing down new funds is blocked", "It is immediately written off", "It is downgraded to substandard"],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "Pending reviews block further credit utilization to compel relationship managers to complete files.",
    page: "Annual Credit Reviews"
  },
  {
    id: 297,
    question: "What does 'Forced Sale Value' (FSV) of a collateral refer to?",
    answer: "The estimated value of the asset if sold quickly under distressed conditions",
    options: ["The current book value", "The emotional replacement value", "The estimated value of the asset if sold quickly under distressed conditions", "The original purchase cost"],
    correctIndex: 2,
    topic: "Secured & Collateralized Lending",
    explanation: "FSV represents a conservative liquidation value used in risk modeling.",
    page: "Collateral Valuation"
  },
  {
    id: 298,
    question: "Does the Head of Credit Risk Management hold a voting seat in the collective Management Credit Committee?",
    answer: "Yes, and they hold an veto authority over high-risk proposals",
    options: ["No, they are only observers", "Yes, but they cannot veto any proposal", "Yes, and they hold an veto authority over high-risk proposals", "Only when the GMD is absent"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "To enforce rigid risk discipline, the head of credit holds veto capability on high-risk approvals.",
    page: "MCC Charter"
  },
  {
    id: 299,
    question: "Financial covenants (e.g. Debt-Service-Coverage ratio) are monitored on a quarterly basis by the monitoring team.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "Regular tracking of financial covenants acts as an early warning signal of potential obligor stress.",
    page: "Covenants Monitoring"
  },
  {
    id: 300,
    question: "Unexpected macroeconomic fluctuations (such as sudden exchange rate devaluations) can immediately trigger an increase in expected credit losses across the portfolio.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Macro shocks directly impact customer cash flow, increasing portfolio PDs and LGDs.",
    page: "Macro risk stress testing"
  }
];
