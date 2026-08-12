import { BANK_B_QUESTIONS } from "./questions/bankB";
import { BANK_C_QUESTIONS } from "./questions/bankC";
import { BANK_D_QUESTIONS } from "./questions/bankD";
import { BANK_E_QUESTIONS } from "./questions/bankE";
import { BANK_F_QUESTIONS } from "./questions/bankF";
import { BANK_G_QUESTIONS } from "./questions/bankG";
import { BANK_H_QUESTIONS } from "./questions/bankH";
import { BANK_I_QUESTIONS } from "./questions/bankI";
import { BANKJ_QUESTIONS } from "./questions/bankJ";
import { BANKK_QUESTIONS } from "./questions/bankK";
import { BANKL_QUESTIONS } from "./questions/bankL";
import { BANKM_QUESTIONS } from "./questions/bankM";
import { BANKN_QUESTIONS } from "./questions/bankN";
import { BANKO_QUESTIONS } from "./questions/bankO";

export interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
  correctIndex: number;
  topic: string;
  explanation: string;
  page: string;
}

export const CPG_QUESTIONS: Question[] = [
  // 1. Credit Products & Facilities
  {
    id: 1,
    question: "Where a temporary overdraft accommodation remains outstanding for longer than 30 days, how shall it be classified under the CPG?",
    answer: "Past due loan",
    options: ["Performing overdraft", "Past due loan", "Immediate write-off", "Substandard debit"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Where a temporary overdraft accommodation remains outstanding for longer than 30 days it shall be classified as a past due loan.",
    page: "CPG Section 3.6: Credit Products (p. 25-33)"
  },
  {
    id: 2,
    question: "Under CPG regulations, the approval of credit product programs must demonstrate that the behavior of the portfolio will be predictable in terms of yield, delinquencies, and write-offs.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Approved credit product programs shall demonstrate that the behavior of the portfolio will be predictable in terms of yield, delinquencies and write-offs.",
    page: "CPG Section 3.6.11: Product Programmes (p. 30)"
  },
  {
    id: 3,
    question: "What is the maximum tenor permitted for revolving credit facilities under Access Bank CPG guidelines?",
    answer: "3 years",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correctIndex: 2,
    topic: "Credit Products & Facilities",
    explanation: "Revolving credits are short term/tenured facilities with predefined cycles. The tenor of revolving credit must not exceed 3 years.",
    page: "CPG Section 3.6.2: Revolving Credits (p. 27)"
  },
  {
    id: 4,
    question: "An Overdraft (OD) is a line of credit that allows a customer to write cheques for more than the actual balance on the account with a finance charge on the excess.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "An Overdraft (OD) is a line of credit that allows a customer write cheques for more than the actual balance on the account with a finance charge on the excess.",
    page: "CPG Section 3.6.3: Overdraft facilities (p. 28)"
  },
  {
    id: 5,
    question: "Which of the following is NOT an approved credit product that qualifies as a Term Loan under CPG classification?",
    answer: "Trading Asset Loan",
    options: ["Trading Asset Loan", "Equipment Financing", "New Technology Capital Loan", "Asset Replacement"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Examples of credit products that shall qualify as Term Loans include Equipment Financing, New Technology Capital Loan, Asset Replacement, and Personal Loans. Trading Asset Loan is not listed.",
    page: "CPG Section 3.6.1: Term / Time Loans (p. 27)"
  },

  // 2. Delinquency & Asset Classification
  {
    id: 6,
    question: "Under the objective criteria of the CPG, a facility on which unpaid principal and/or interest remains outstanding for more than 90 days but less than 180 days must be classified as:",
    answer: "Sub-Standard",
    options: ["Watchlist Account", "Sub-Standard", "Doubtful", "Lost"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Objective Criteria: facilities on which unpaid principal and/or interest remain outstanding for more than 90 days but less than 180 days are classified as sub-standard.",
    page: "CPG Section 8.1.2.1: Sub-Standard (p. 179)"
  },
  {
    id: 7,
    question: "Under which of the following instances will a non-performing facility be immediately classified as lost?",
    answer: "Death/disappearance of the obligor",
    options: ["The facility is past due for 91 days", "The obligor experiences temporary cash flow constraints", "Death/disappearance of the obligor with no assets left", "The obligor requests a restructure"],
    correctIndex: 2,
    topic: "Delinquency & Asset Classification",
    explanation: "Other exceptional instances that will trigger immediate transfer to Remedial Assets and classification as lost include death or disappearance of an obligor, bankruptcy, or going concern problems.",
    page: "CPG Section 8.1.2.3: Lost Credits (p. 180)"
  },
  {
    id: 8,
    question: "A Watch List Account is defined as an asset where interest or principal is past due by more than:",
    answer: "60 days but less than 91 days",
    options: ["30 days but less than 60 days", "60 days but less than 91 days", "90 days but less than 180 days", "180 days but less than 360 days"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Watch List Accounts: These are assets where mark-up/interest or principal is past due by more than 60 days but less than 91 days from the due date.",
    page: "CPG Section 8.1.1: Performing Assets (p. 177)"
  },
  {
    id: 9,
    question: "According to CPG Section 8, drawing down on facilities classified as 'substandard' and worse requires drawdown memorandums approved by both Credit Risk Management and the Legal Department.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Delinquency & Asset Classification",
    explanation: "Drawdown on facilities classified substandard shall be through drawdown memorandum approved by an officer in Credit Risk Management and an officer in Legal Department.",
    page: "CPG Section 8.2: Drawdown Controls (p. 113)"
  },
  {
    id: 10,
    question: "According to the CBN guidelines within CPG Section 8.2, the general provisioning requirement for standard/performing assets is set to:",
    answer: "2% of outstanding balances",
    options: ["1% of outstanding balances", "2% of outstanding balances", "5% of outstanding balances", "10% of outstanding balances"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "The bank will also make a general provision of at least 2% of outstanding credit facility balances not specifically provided for.",
    page: "CPG Section 8.2: General Provisions (p. 181)"
  },

  // 3. Credit Approval & Committees
  {
    id: 11,
    question: "Which body holds the highest credit approval authority in Access Bank, responsible for approval of credit beyond all committee limits?",
    answer: "Board of Directors",
    options: ["Board Credit Committee (BCC)", "Management Credit Committee (MCC)", "Board of Directors", "Group Managing Director / CEO"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "The Board of Directors is the highest approval authority for both credit risk policies and credit facilities in Access Bank.",
    page: "CPG Section 4.2.1.1: Board of Directors (p. 35)"
  },
  {
    id: 12,
    question: "What is the single-obligor approval limit assigned specifically to the Management Credit Committee (MCC) in CPG Version 6.0?",
    answer: "500 million",
    options: ["75 million", "150 million", "200 million", "500 million"],
    correctIndex: 3,
    topic: "Credit Approval & Committees",
    explanation: "Table: Individual levels for credit approval standard limits - Management Credit Committee limit is N500 Million.",
    page: "CPG Section 4.2.1.4: MCC Approval Grid (p. 109)"
  },
  {
    id: 13,
    question: "Credit portfolio risk limits are proposed by Credit Management and must be approved by the Board Credit Committee / Board of Directors.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "Risk Management policies are approved by the Board of Directors/Board Credit Committee to enable informed decision making and maintain proper environment.",
    page: "CPG Section 4.2.1.2: BCC Approval (p. 36)"
  },
  {
    id: 14,
    question: "Who is designated as the Chairman of the Criticized Assets Committee (CAC)?",
    answer: "Group Managing Director or designee",
    options: ["Head of Credit Risk Management", "Executive Director, Risk Management", "Group Managing Director or designee", "Group Deputy Managing Director"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "CAC Composition: Group Managing Director or his designate - Chairman.",
    page: "CPG Section 4.2.1.6: Criticized Assets Committee (p. 39)"
  },
  {
    id: 15,
    question: "Extensions of credit facilities in regional branches do not require the concurrence of the Regional Head of Credit Risk Management.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Extensions of credit facilities in the regions must have the concurrence of the Head of Credit Risk in the Regional Office and must be approved by an officer of the bank with a covering credit approval limit.",
    page: "CPG Section 6.2.10.4.1: Regional Approvals (p. 106)"
  },

  // 4. Credit Process & Origination
  {
    id: 16,
    question: "Under CPG Section 6.2, preliminary credit screening of any facility request must be completed by the relationship manager within what timeframe?",
    answer: "1 working day",
    options: ["1 working day", "2 working days", "3 working days", "5 working days"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Preliminary screening of credit requests shall be completed within 1 working day of receipt of a credit facility request.",
    page: "CPG Section 6.2.1: Preliminary Screening (p. 92)"
  },
  {
    id: 17,
    question: "Under-listed are standard steps in the credit approval process. Select the step that is NOT formally listed in CPG Section 6.2:",
    answer: "Step 1: Visit Customer's Site before credit screening",
    options: ["Preliminary Credit Screening", "Credit Analysis & Risk Rating", "Step 1: Visit Customer's Site before credit screening", "Facility Decision by Approving Authorities"],
    correctIndex: 2,
    topic: "Credit Process & Origination",
    explanation: "Steps in Credit Process are defined. Detailed analysis is done after preliminary screening. Site visits are part of detailed credit risk analysis rather than step 1 before screening.",
    page: "CPG Section 6.2.1 & 6.2.3 (p. 92-93)"
  },
  {
    id: 18,
    question: "An Offer Letter is a legal commitment by the Bank to lend, but its validity and execution are strictly subject to satisfying all conditions precedent.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "An Offer Letter is a commitment by the Bank to lend to a customer once the terms and conditions contained in the letter have been satisfied.",
    page: "CPG Section 6.2.14: Offer Letters (p. 114)"
  },
  {
    id: 19,
    question: "According to CPG Section 6.2.11, the formal written acceptance of an offer letter by a customer is required within:",
    answer: "30 days of the facility offer date",
    options: ["14 days of the facility offer date", "30 days of the facility offer date", "60 days of the facility offer date", "90 days of the facility offer date"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Acceptance of the bank's offer letter shall be required within 30 days of a facility offer date and conditions met within 90 days. Otherwise, it is deemed to have lapsed.",
    page: "CPG Section 6.2.11: Credit Offer (p. 111)"
  },
  {
    id: 20,
    question: "When establishing Total Facilities for a relationship, which metadata is NOT financially aggregated within the total limit calculation?",
    answer: "The borrower's business description",
    options: ["Direct outstanding loans", "Contingent exposures (LCs, Guarantees)", "Proposed credit lines", "The borrower's business description"],
    correctIndex: 3,
    topic: "Credit Process & Origination",
    explanation: "When establishing Total Facilities for a relationship, Total Facilities must include all existing and proposed Direct and Contingent facilities. Metadata like the business description is documentation rather than numeric limit.",
    page: "CPG Section 5.3.6: Total Facilities (p. 69)"
  },

  // 5. Credit Risk Types
  {
    id: 21,
    question: "Which of the following defined risks occurs when there is a simultaneous exchange of value with a counterparty, but verification of receipt is not made until after the bank has delivered on its obligation?",
    answer: "Settlement Risk",
    options: ["Direct Lending Risk", "Pre-settlement Risk", "Settlement Risk", "Clearing Risk"],
    correctIndex: 2,
    topic: "Credit Risk Types",
    explanation: "Settlement risk occurs when there is a simultaneous exchange of value with a counter party for the same value date and verification that payment is received is not made until after the bank has paid / delivered on the obligation.",
    page: "CPG Section 3.5.4: Settlement Risk (p. 24)"
  },
  {
    id: 22,
    question: "What type of risk is defined as the potential that a sovereign or political event in a different country will impair the value of Access Bank's assets?",
    answer: "Country Risk",
    options: ["Fiduciary Risk", "Liquidity Risk", "Country Risk", "Price Risk"],
    correctIndex: 2,
    topic: "Credit Risk Types",
    explanation: "Country Risk is the risk that an event in a country (sovereign defaults, currency convertibility/transferability restrictions, political events) will impair the value of Access Bank assets or affect obligors.",
    page: "CPG Section 3.5.13: Country Risk (p. 25)"
  },
  {
    id: 23,
    question: "Pre-settlement risk (PSR) is defined as the risk of default on a contractual obligation before settlement of the contract by a counterparty in a transaction.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Pre-settlement risk (PSR) is the risk of default on a contractual obligation before settlement of the contract by a counter party in a transaction.",
    page: "CPG Section 3.3.1.3: Pre-settlement Risk (p. 23)"
  },
  {
    id: 24,
    question: "Which risk is defined as the threat that depository evidence on which the bank depends to enforce rights under contracts or transactions will be incomplete, uncovered, or unenforceable?",
    answer: "Documentation Risk",
    options: ["Legal and Regulatory Risk", "Operational Risk", "Documentation Risk", "Fiduciary Risk"],
    correctIndex: 2,
    topic: "Credit Risk Types",
    explanation: "Documentary risk is the risk that documentary evidence on which the bank depends to enforce rights under contracts or transactions may not be complete, correct or enforceable.",
    page: "CPG Section 3.5.11: Documentation Risk (p. 25)"
  },
  {
    id: 25,
    question: "Liquidity Risk is the risk that the bank is unable to meet all of its financial commitments to customers and markets when they are due.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Liquidity risk is the risk that the bank may be unable to meet its financial commitments to customers or markets when due.",
    page: "CPG Section 3.5.8: Liquidity Risk (p. 24)"
  },

  // 6. Cards, ATM & E-Banking
  {
    id: 26,
    question: "Which card option is recommended if an existing principal cardholder wishes to issue a card to a relative tied to their primary account limit?",
    answer: "Supplementary card",
    options: ["Prepaid e-cash card", "Gold credit card", "Supplementary card", "Corporate card"],
    correctIndex: 2,
    topic: "Cards, ATM & E-Banking",
    explanation: "If a customer demands a card which would be tied to his account for a relative, the Supplementary Card is recommended.",
    page: "CPG Section 3.6.8+: Electronic Channels (p. 29)"
  },
  {
    id: 27,
    question: "What is the maximum amount permitted to be loaded on an Access Bank e-cash prepaid card under current CPG rules?",
    answer: "50,000",
    options: ["20,000", "50,000", "100,000", "500,000"],
    correctIndex: 1,
    topic: "Cards, ATM & E-Banking",
    explanation: "The maximum amount that can be loaded on an e-cash prepaid card is N50,000.",
    page: "CPG Section 3.6.8+: Prepaid Cards (p. 29)"
  },
  {
    id: 28,
    question: "Using a debit card on a merchant's POS terminal carries transaction fees paid directly by the cardholder to the bank.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Cards, ATM & E-Banking",
    explanation: "Standard debit card usage at domestic point-of-sale terminal carries no transactional surcharge for the cardholder.",
    page: "CPG Section 3.6.8+: POS Transactions (p. 29)"
  },
  {
    id: 29,
    question: "Which of the following is NOT an interconnection platform utilized for routing POS terminal transactions in Nigeria?",
    answer: "e-Transact",
    options: ["Interswitch", "Unified Payments", "Webpay", "e-Transact"],
    correctIndex: 3,
    topic: "Cards, ATM & E-Banking",
    explanation: "Major clearing and routing interconnections for standard card networks are managed through Interswitch and other central switches. e-Transact acts as an independent application provider rather than the central POS backbone.",
    page: "CPG Section 3.6.8+: POS Terminals (p. 29)"
  },
  {
    id: 30,
    question: "Access e-cash is designed strictly as a prepaid debit card and does not trigger commissions on turnover (COT) charges.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Cards, ATM & E-Banking",
    explanation: "e-Cash is a prepaid debit option, thus COT charges are not applicable to cardholder transactions.",
    page: "CPG Section 3.6.8+: E-Cash Rules (p. 29)"
  },

  // 7. Risk Measurement & Limits
  {
    id: 31,
    question: "Under CPG Section 5.3.2, what is the maximum percentage of its shareholders' funds unimpaired by losses that a bank is permitted to grant to a single obligor?",
    answer: "20%",
    options: ["10%", "15%", "20%", "50%"],
    correctIndex: 2,
    topic: "Risk Measurement & Limits",
    explanation: "Section 20 (1a) of the Bank and Other Financial Institutions Act (BOFIA) 1991 states that a Bank shall not grant more than 20% of its shareholders' funds unimpaired by losses to a company, its subsidiaries and associates.",
    page: "CPG Section 5.3.2: One Obligor Concept (p. 62)"
  },
  {
    id: 32,
    question: "How is exposure measured against Risk Rating Limits for a customer relationship under CPG Section 5.3.5?",
    answer: "Outstandings and Unused Commitments (OSUC)",
    options: ["Current outstanding balances only", "Outstandings and Unused Commitments (OSUC)", "Landed property valuations", "Total approved legal lending limit"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Exposure against Risk Rating Limits is measured as the Outstandings and Unused Commitments ('OSUC') to a given relationship.",
    page: "CPG Section 5.3.5: Exposure Measurement (p. 67)"
  },
  {
    id: 33,
    question: "Guidance Limits are pre-approved exposure limits that are immediately advised to the customer upon approval to ensure customer relationship flexibility.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Guidance limits are preapproved exposure limits NOT advised to the customer, but available to allow for quick response to temporary emergency needs.",
    page: "CPG Section 5.2.7: Guidance Limits (p. 59)"
  },
  {
    id: 34,
    question: "Under the Risk Rating Limit Exceptions (RRLE) policy, limit exceptions defined as overages of up to 10% of the Risk Rating Limit are classified as standard 'immaterial' exceptions.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Limit exceptions, defined as overages up to 10% of Risk Rating Limit, are classified as Immaterial Exceptions.",
    page: "CPG Section 5.3.5.3: RRLE Types (p. 68)"
  },
  {
    id: 35,
    question: "Regardless of the internal Risk Rating Limits established by Credit Risk Management, statutory Legal Lending Limits set by the Regulators will always prevail.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Note that regardless of the Risk Rating Limits, Legal Lending Limits set by the Regulators shall always prevail.",
    page: "CPG Section 5.3.5: Legal Overrides (p. 66)"
  },

  // 8. General CPG Knowledge
  {
    id: 36,
    question: "Which of the following is NOT one of the approved pillars of Access Bank's credit policies and procedures?",
    answer: "Credit Official Policy",
    options: ["Risk Rating Limits Policy", "Credit Program Policy", "Credit Official Policy", "Specific Risk Policy"],
    correctIndex: 2,
    topic: "General CPG Knowledge",
    explanation: "The approved pillars under CPG are Risk Rating Limits Policy, Specific Risk Policy, Credit Program Policy, and Credit Approval Policy. 'Credit Official Policy' is not a defined pillar name.",
    page: "CPG Comprehensive Review (p. 15)"
  },
  {
    id: 37,
    question: "In the event of a conflict between the CPG and a Central Bank of Nigeria (CBN) regulation, who or what determines the approach the bank must use?",
    answer: "Statutory CBN regulations override the CPG",
    options: ["The Relationship Manager", "The Chief Risk Officer", "A written override from GMD", "Statutory CBN regulations override the CPG"],
    correctIndex: 3,
    topic: "General CPG Knowledge",
    explanation: "If the CPG differs from external regulations, statutory financial regulator requirements (e.g. CBN Prudential Guidelines) always override internal policy.",
    page: "CPG Section 2: Policy Framework (p. 16)"
  },
  {
    id: 38,
    question: "The credit analysis and documentation process outlined in the CPG is designed to support the bank in achieving high-quality credits by completely eliminating personal judgment in credit evaluation.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "General CPG Knowledge",
    explanation: "While the CPG provides a rigorous framework, it explicitly notes that personal prudent judgment, experience, and credit culture of lending officers remain essential.",
    page: "CPG Section 2.6: Prudent Judgment (p. 16)"
  },
  {
    id: 39,
    question: "Any deviation from the guidelines, limits, and rules specified in the Credit Policy Guide must always be:",
    answer: "Explained and justified in writing",
    options: ["Approved verbally by unit head", "Flagged silently in database", "Explained and justified in writing", "Reported only during annual audits"],
    correctIndex: 2,
    topic: "General CPG Knowledge",
    explanation: "Any deviations from the CPG must always be explained and justified in writing and approved at appropriate levels.",
    page: "CPG Section 2.6: Deviations (p. 16)"
  },
  {
    id: 40,
    question: "The core objective of the Credit Risk Management Policy Guide is to maximize returns on the bank's credit risk portfolio from a risk-adjusted perspective.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "General CPG Knowledge",
    explanation: "The core objective of the Credit Risk Management Policy Guide is to enable maximization of returns on the bank's credit risk portfolio, from a risk adjusted perspective.",
    page: "CPG Section 2.1: Core Objective (p. 14)"
  },

  // 9. Collateral & Security
  {
    id: 41,
    question: "Access Bank collateral requirements dictate that the Expected Forced Sale Value (EFSV) of landed property must be adequate to cover not less than:",
    answer: "120% of the loan amount plus 12 months' interest",
    options: ["100% of the loan amount", "110% of the loan amount", "120% of the loan amount plus 12 months' interest", "150% of the loan amount"],
    correctIndex: 2,
    topic: "Collateral & Security",
    explanation: "The Expected Forced Sale Value (EFSV) of landed property must be adequate to cover not less than 120% of loan amount and a minimum of 12 months' interest.",
    page: "CPG Section 7.7.2.3.1: Landed Property (p. 149)"
  },
  {
    id: 42,
    question: "Which of the following landed property classifications is NOT acceptable as collateral for credit exposure under the CPG?",
    answer: "Uncompleted building (excluding mortgage facilities)",
    options: ["Property in residential areas", "Uncompleted building (excluding mortgage facilities)", "Undeveloped land in Lekki/Abuja", "Commercial property with valid Governor's consent"],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Landed property that is an uncompleted building is not acceptable as collateral, except specifically in the case of structured mortgage facilities.",
    page: "CPG Section 7.7.2.3.1: Excluded Collateral (p. 149)"
  },
  {
    id: 43,
    question: "Under cash collateralized product rules, cash deposits in restricted accounts require a minimum collateral coverage threshold of:",
    answer: "110% of the facility amount",
    options: ["100% of the facility amount", "110% of the facility amount", "120% of the facility amount", "150% of the facility amount"],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Collateral Coverage Table - Cash Deposit: Minimum coverage required is 110% of the facility amount.",
    page: "CPG Section 7.7.2.11: Collateral Coverage (p. 157)"
  },
  {
    id: 44,
    question: "To protect the bank's interest, a legal mortgage over a landed property must be stamped and registered with the appropriate Land Registry or Corporate Affairs Commission.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Collateral & Security",
    explanation: "Perlegal and regulatory requirements, legal mortgages must undergo Governor's consent, stamping, and registration to be legally enforceable.",
    page: "CPG Section 7.6: Legal Enforceability (p. 143)"
  },
  {
    id: 45,
    question: "Under CPG Section 7, all collateral assets, including stock, equipment, and mortgages, must be revalued at a minimum frequency of:",
    answer: "Once every three (3) years",
    options: ["Once every year", "Once every two (2) years", "Once every three (3) years", "Once every five (5) years"],
    correctIndex: 2,
    topic: "Collateral & Security",
    explanation: "Revaluation Period: All collaterals are to be revalued every three (3) years, although annual reviews of values may be submitted by the relation team.",
    page: "CPG Section 7.7.2.17.2: Collateral Valuation (p. 162)"
  },

  // 10. Monitoring & Internal Controls
  {
    id: 46,
    question: "What is the standard holding period threshold for suspense, transit, and clearing items (such as Vault Cash In Transit or Accounts Receivable) before they flag as exceptions inside branch controls?",
    answer: "24 hours",
    options: ["24 hours", "48 hours", "72 hours", "1 week"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "The established threshold for items in suspense/transit accounts such as Account Receivable (Hold Over), Vault Cash in Transit etc. is 24 hours.",
    page: "CPG Section 6.4: Suspense Thresholds (p. 119)"
  },
  {
    id: 47,
    question: "Which unit inside Access Bank has overall separate and independent responsibility for verifying compliance with the CPG and auditing credit files?",
    answer: "Internal Audit Unit",
    options: ["Relationship Management Team", "Credit Risk Management Division", "Legal Unit", "Internal Audit Unit"],
    correctIndex: 3,
    topic: "Monitoring & Internal Controls",
    explanation: "Compliance with credit guidelines shall be monitored on an ongoing basis and audited by the bank's Internal Audit Unit.",
    page: "CPG Section 6.8: Credit Audit (p. 132)"
  },
  {
    id: 48,
    question: "For internal control purposes, the creation of a 'Surprise Proof' request represents an audit of GL balances outside the standard proof cycle.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "All Proof requests from internal control to all processing units outside established proof cycle is called a Surprise Proof.",
    page: "CPG Section 6.8: Surprise Proofs (p. 132)"
  },
  {
    id: 49,
    question: "According to CPG internal control guidelines, managers' cheques (MC) can be handed over to a third party without verifying the customer's signature.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "Customer mandates and any manual check payment requires signature verification and serial tracking to prevent fraud.",
    page: "CPG Section 6.4: Manager's Cheques (p. 119)"
  },
  {
    id: 50,
    question: "In branch banking internal controls, the calling over of records is a mandatory daily process to validate postings against source media.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "The call over process is a daily requirement to confirm the accuracy, completeness, and legitimacy of all accounting transactions.",
    page: "CPG Comprehensive Review (p. 120)"
  },

  // 11. Specialized Lending
  {
    id: 51,
    question: "Under the Agricultural Finance Policy, facilities disbursed to Agro-allied companies for non-agricultural value chain activities (such as purchasing administrative real estate) are officially classified as Agricultural loans.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "Facilities disbursed to Agro-allied companies for financing of non-Agricultural value chain activities such as acquisition of property shall not be considered as Agricultural loans.",
    page: "CPG Section 10.3.1: Agricultural Finance Policy (p. 212)"
  },
  {
    id: 52,
    question: "For Specialized Project Finance, under CPG Section 10.4, the maximum percentage of project cost that Access Bank is permitted to finance is restricted to prevent moral hazard. The Sponsor must contribute at least:",
    answer: "30% equity contribution",
    options: ["10% equity contribution", "20% equity contribution", "30% equity contribution", "50% equity contribution"],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "The Bank shall not finance any project to 100% in an attempt to avoid moral hazard. The Sponsor/developer has to ensure a minimum contribution of 30% to the project.",
    page: "CPG Section 10.4.3: Project Selection (p. 221)"
  },
  {
    id: 53,
    question: "In Reserved Based Lending (RBL), why does collateral focus heavily on shares pledges over the borrower and negative pledges rather than direct land/reserve mortgages?",
    answer: "Oil and gas reserves are owned by the state and cannot be directly mortgaged",
    options: ["Oil and gas reserves are highly volatile", "Oil and gas reserves are owned by the state and cannot be directly mortgaged", "A share pledge is faster to perfect legally", "Direct mortgages are prohibited by Basel accords"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "Oil reserves in Nigeria are owned by the state. The oil companies lease extraction rights. Since reserves cannot be directly assigned easily, security focuses on shares pledges and negative pledges.",
    page: "CPG Section 10.5.5: Collateral for RBL (p. 228)"
  },
  {
    id: 54,
    question: "Under the Object Finance Policy, the bank will only finance vessels, barges, or rigs that remain registered within what legal regulatory scope?",
    answer: "Cabotage Act",
    options: ["Merchant Shipping Act", "Coastal Shipping Act", "Cabotage Act", "Prudential Maritime Code"],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "CPG Object Finance Policy: Vessels acquired through the Bank must register under Cabotage Act.",
    page: "CPG Section 10.6.2: Object Financing (p. 232)"
  },
  {
    id: 55,
    question: "Under Specialized Lending, a Real Estate project loan can be used to fund both construction costs and land procurement.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "Access Bank shall not fund land procurement. Lending shall be used entirely to finance construction cost components or associated assets.",
    page: "CPG Section 10.7.7: Real Estate Finance (p. 254)"
  },

  // 12. Pricing & Interest Rates
  {
    id: 56,
    question: "The essential components of CPG Risk Based Pricing (RBP) include which of the following?",
    answer: "All of the above",
    options: ["Funding Rate and Cost of Operations", "Premium for Expected Loss", "Premium for Unexpected Loss", "All of the above"],
    correctIndex: 3,
    topic: "Pricing & Interest Rates",
    explanation: "The essential components of Risk Based Pricing (RBP) are: Funding Rate, Cost of Operations, Premium for Expected Loss, and Premium for Unexpected Loss.",
    page: "CPG Section 6.2.8.7: Risk Based Pricing (p. 102)"
  },
  {
    id: 57,
    question: "Which of the following is approved as a valid exception to the strict application of the Risk Based Pricing (RBP) model?",
    answer: "Loans to staff of the bank",
    options: ["Loans to high-net-worth directors", "Loans to agricultural start-ups", "Loans to staff of the bank", "Loans backing sovereign contracts"],
    correctIndex: 2,
    topic: "Pricing & Interest Rates",
    explanation: "An exception to using or deviation from RBP can be made under the following circumstances: Loans to Staff, Loans to functionaries employing the bank, or offsets from other facilities.",
    page: "CPG Section 6.2.8.8: Exceptions to RBP (p. 102)"
  },
  {
    id: 58,
    question: "The bank's credit pricing strategy is designed based on several parameters. Which is NOT a listed factor in estimating lending rates?",
    answer: "The relationship manager's tenure",
    options: ["Funding rate (FTP)", "Cost of operations", "Credit Risk Premium", "The relationship manager's tenure"],
    correctIndex: 3,
    topic: "Pricing & Interest Rates",
    explanation: "Pricing incorporates Funding rate, operations cost, and expected/unexpected risk premiums. Personal RM characteristics are irrelevant.",
    page: "CPG Section 6.2.8.7: RBP Elements (p. 102)"
  },
  {
    id: 59,
    question: "Expected Loss (EL) within Risk Based Pricing is mathematically defined as the product of the Exposure at Default (EAD), Loss Given Default (LGD), and Probability of Default (PD).",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Pricing & Interest Rates",
    explanation: "Premium for Expected Loss reflects expected loss. It is the product of EAD of the facility, LGD (as % of EAD), and PD at the obligor level.",
    page: "CPG Section 6.2.8.7: Expected Loss (p. 102)"
  },
  {
    id: 60,
    question: "Under CPG rules, the interest rate/fees for a Gender Empowerment (GEM) account are capped at what standard rate range?",
    answer: "18-20%",
    options: ["10-12%", "12-15%", "15-18%", "18-20%"],
    correctIndex: 3,
    topic: "Pricing & Interest Rates",
    explanation: "The interest rate/fees for a GEM account are established at 18-20% p.a.",
    page: "CPG Section 6.2: Product Pricing (p. 210)"
  },

  // 13. Account Types & KYC
  {
    id: 61,
    question: "What is the minimum opening balance required for an Access Bank Standard Savings Account under the CPG?",
    answer: "N1,000",
    options: ["N500", "N1,000", "N2,000", "N5,000"],
    correctIndex: 1,
    topic: "Account Types & KYC",
    explanation: "The minimum opening balance of a Standard Savings Account is N1,000.",
    page: "CPG General: Savings Accounts (p. 210)"
  },
  {
    id: 62,
    question: "Which of the following documents is acceptable as a primary means of physical address verification under KYC rules, but is NOT acceptable as proof of identity?",
    answer: "Utility Bill",
    options: ["Driver's License", "International Passport", "Utility Bill", "National ID Card"],
    correctIndex: 2,
    topic: "Account Types & KYC",
    explanation: "Utility bills serves as standard proof of address, whereas documents like International Passports serves strictly as proof of identity.",
    page: "CPG General: KYC Guidelines (p. 210)"
  },
  {
    id: 63,
    question: "Under Access Bank KYC rules, an account can be opened and become fully operational for third-party withdrawals before satisfactory verification of references is accomplished.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Account Types & KYC",
    explanation: "All references must be verified and satisfactory KYC information obtained before an account can be made operational for full financial transactions.",
    page: "CPG Section 5.2.6: KYC Compliance (p. 51)"
  },
  {
    id: 64,
    question: "What refers to the KYC profiling segments represented by the abbreviation LIPS and MIPS?",
    answer: "Low Income and Middle Income Persons",
    options: ["Liquid Investors and Mature Investors", "Local Institutions and Municipal Institutions", "Low Income and Middle Income Persons", "Licensed Importers and Manufacturing Importers"],
    correctIndex: 2,
    topic: "Account Types & KYC",
    explanation: "Target Market Profile for Standard Savings Account are LIPS (Low Income Persons) & MIPS (Middle Income Persons).",
    page: "CPG General: Target Profiling (p. 210)"
  },
  {
    id: 65,
    question: "What is the minimum opening balance required for a corporate current account under the CPG Version 6.0?",
    answer: "10,000",
    options: ["5,000", "10,000", "25,000", "50,000"],
    correctIndex: 1,
    topic: "Account Types & KYC",
    explanation: "The minimum opening balance for a Current Account is N10,000.",
    page: "CPG General: Account Products (p. 210)"
  },

  // 14. Regulatory & CBN Guidelines
  {
    id: 66,
    question: "Under CBN Prudential Guidelines, a commercial bank is prohibited from granting loans or credit facilities against the security of which asset?",
    answer: "The bank's own shares",
    options: ["Landed property", "The bank's own shares", "Sovereign Treasury bills", "Gold or cash deposits"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Access Bank shall not, without the prior approval in writing of the Central Bank, grant any advance, loan or credit facilities against the security of its own shares.",
    page: "CPG Section 5.3.3: Regulatory Considerations (p. 63)"
  },
  {
    id: 67,
    question: "Under the BOFIA Act, if a bank officer fails to declare an indirect interest in a proposed credit request, they commit an offense liable to imprisonment of up to:",
    answer: "3 years",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "It is an offence under BOFIA for bank staff to fail to declare the nature of their interest in, and offenders are liable to a fine and up to 3 years' imprisonment on conviction.",
    page: "CPG Section 5.3.3: Statutory Penalties (p. 63)"
  },
  {
    id: 68,
    question: "Prudential guidelines dictate that interest due on non-performing credit facilities must be suspended and placing these loans on a non-accrual status.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "All categories of non-performing credit facilities should automatically be placed on non-accrual status that is, interest due thereon should not be recognized as income.",
    page: "CPG Section 8.2: Provisioning Regulations (p. 180)"
  },
  {
    id: 69,
    question: "Which of the following acts governs the statutory limit that prohibits banks from extending credit to single relationships exceeding regulatory capital base ratios in Nigeria?",
    answer: "BOFIA Act",
    options: ["Companies and Allied Matters Act", "BOFIA Act", "Failed Banks Act", "CBN Act"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The Banks and Other Financial Institutions Act (BOFIA) outlines single obligor limits, insider loan limits, and overall credit risk compliance constraints.",
    page: "CPG Section 5.3.3: Regulatory Frameworks (p. 63)"
  },
  {
    id: 70,
    question: "Subject to CBN Prudential Guidelines, any insider-related credits must have the separate approval of the Central Bank of Nigeria before they can be written off.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Prudential Guidelines section 3.21: The approval of CBN is required for write-off of all insider or related party credits.",
    page: "CPG Section 5.2.6.10: Insider Write-off (p. 57)"
  },
  {
    id: 72,
    question: "What is the maximum tenure of a time loan under CPG guidelines?",
    answer: "One year or less",
    options: ["One year or less", "Three years", "Five years", "Seven years"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "A time loan is usually for tenors of one year or less, while a term loan is for tenors longer than one year.",
    page: "CPG Pg. 27"
  },
  {
    id: 73,
    question: "What is the maximum tenor permitted for placements with approved banks?",
    answer: "360 days",
    options: ["90 days", "180 days", "360 days", "2 years"],
    correctIndex: 2,
    topic: "Credit Products & Facilities",
    explanation: "Access Bank will only place funds with banks for which there are approved placement lines. In general, placements should be for tenors of less than 1 year (360 days).",
    page: "CPG Pg. 29"
  },
  {
    id: 74,
    question: "How long does it usually take between performance of contract on Invoice discounting and receipt of payment?",
    answer: "30 – 90 days",
    options: ["10 - 30 days", "30 - 90 days", "90 - 180 days", "180 - 360 days"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "How long does it usually take between performance of contract on Invoice discounting and receipt of payment – 30 – 90 days.",
    page: "CPG Pg. 126"
  },
  {
    id: 75,
    question: "What is the maximum tenor of a facility granted under cash collateralized lending?",
    answer: "5 years",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctIndex: 2,
    topic: "Delinquency & Asset Classification",
    explanation: "The maximum tenor of the facility granted under cash collateralized lending is 5 years.",
    page: "CPG Pg. 214"
  },
  {
    id: 76,
    question: "Under CPG taxonomy, customer accounts are officially classified as:",
    answer: "External accounts",
    options: ["Internal accounts", "External accounts", "Suspense accounts", "Contra accounts"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Customer accounts are classified as External accounts.",
    page: "CPG Pg. 179"
  },
  {
    id: 77,
    question: "What is the current single-obligor approval limit for Bank Executive Directors?",
    answer: "75 million",
    options: ["25 million", "50 million", "75 million", "100 million"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "The individual levels for credit approval standard limits - Executive Directors limit is N75 million.",
    page: "CPG Pg. 162"
  },
  {
    id: 78,
    question: "What is the current single-obligor approval limit for the Group Deputy Managing Director (GDMD)?",
    answer: "150 million",
    options: ["75 million", "100 million", "150 million", "200 million"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "The individual levels for credit approval standard limits - Group Deputy Managing Director (GDMD) limit is N150 million.",
    page: "CPG Pg. 11"
  },
  {
    id: 79,
    question: "What is the current single-obligor approval limit for the Group Managing Director (GMD)?",
    answer: "200 million",
    options: ["100 million", "150 million", "200 million", "250 million"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "The individual levels for credit approval standard limits - Group Managing Director (GMD) limit is N200 million.",
    page: "CPG Pg. 162"
  },
  {
    id: 80,
    question: "What is the current single-obligor approval limit for the Board Credit Committee (BCC)?",
    answer: "6 Billion",
    options: ["1 Billion", "3 Billion", "6 Billion", "10 Billion"],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "The individual levels for credit approval standard limits - Board Credit Committee (BCC) limit is N6 Billion.",
    page: "CPG Pg. 55"
  },
  {
    id: 81,
    question: "There is no limit to the amount of credit which may be approved by the Board of Directors provided the credit conforms to the CPG and statutory lending limits.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "There is no limit to the amount of credit which may be approved by the Board of directors provided the credit conforms to the CPG and statutory lending limit.",
    page: "CPG Pg. 30"
  },
  {
    id: 82,
    question: "Recommendation and approval of facilities shall be by a minimum of how many Credit Officers, at least one of whom must have the authority to approve the recommended amount?",
    answer: "3",
    options: ["2 Credit Officers", "3 Credit Officers", "4 Credit Officers", "5 Credit Officers"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Recommendation and approval of facilities shall be by a minimum of 3 Credit Officers, at least one of which must have the authority to approve the recommended amount.",
    page: "CPG Pg. 92"
  },
  {
    id: 83,
    question: "The risk of cash pilfering and counterfeit currency at merchant locations can be successfully mitigated through POS terminals.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "The Risk of pilfering and counterfeit currency is taken care of with the POS.",
    page: "CPG Pg. 23"
  },
  {
    id: 84,
    question: "What is the maximum transfer limit permitted per day using Access Mobile systems?",
    answer: "N300,000",
    options: ["N100,000", "N200,000", "N300,000", "N500,000"],
    correctIndex: 2,
    topic: "Cards, ATM & E-Banking",
    explanation: "What is the maximum transfer that can be done per day, using Access mobile – N300,000.",
    page: "CPG Pg. 68"
  },
  {
    id: 85,
    question: "What is the maximum amount of money that can be transferred using Access NEFT in a single transaction?",
    answer: "1 million",
    options: ["500,000", "1 million", "2.5 million", "5 million"],
    correctIndex: 1,
    topic: "Cards, ATM & E-Banking",
    explanation: "What is the maximum amount of money that can be transferred using Access NEFT – 1 million.",
    page: "CPG Pg. 227"
  },
  {
    id: 86,
    question: "Section 20 (1a) of the Bank and Other Financial Institutions Act (BOFIA) 1991 states that a Bank shall not grant more than 50% of its shareholders' funds unimpaired by losses to a single company and its associates.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Section 20 (1a) of BOFIA states that a Bank shall not grant more than 20% of its shareholders' funds unimpaired by losses.",
    page: "CPG Pg. 62"
  },
  {
    id: 87,
    question: "Cash, Immaterial, and Passive Risk Rating Limit Exceptions (RRLEs) require approval from the Line ED and Head of Credit Risk Management (or designees).",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Cash, Immaterial and Passive RRLEs require approval from Line ED and Chief Risk Officer (or their designees). All other RRLEs require approval by MCC.",
    page: "CPG Pg. 68"
  },
  {
    id: 88,
    question: "The Credit Risk Management Policy Guide (CPG) formally covers the marketing, analysis, processing, approval, and reporting of loans.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "General CPG Knowledge",
    explanation: "The CPG covers the marketing, analysis, processing, approval and reporting of loans – True.",
    page: "CPG Pg. 14"
  },
  {
    id: 89,
    question: "The formal CPG guide completely eliminates the need for personal professional judgment in commercial Banking.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "General CPG Knowledge",
    explanation: "Prudent banking always requires the active application of professional experience and subjective evaluations alongside mechanical compliance checklists.",
    page: "CPG Pg. 64"
  },
  {
    id: 90,
    question: "Any deviation from the guidelines, limits, and rules specified inside the Credit Policy Guide must always be explained and justified in writing.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "General CPG Knowledge",
    explanation: "Any deviations from the CPG must always be explained and justified in writing.",
    page: "CPG Pg. 200"
  },
  {
    id: 91,
    question: "Under cash collateralized product requirements, what value of the facility amount can be accepted as adequate cash-equivalent collateral?",
    answer: "100% cash or cash equivalents",
    options: ["80% cash or cash equivalents", "90% cash or cash equivalents", "100% cash or cash equivalents", "120% cash or cash equivalents"],
    correctIndex: 2,
    topic: "Collateral & Security",
    explanation: "What value of the facility amount can be accepted as adequate collateral – 100% cash or cash equivalents.",
    page: "CPG Pg. 157"
  },
  {
    id: 92,
    question: "A customer retains the right on their own volition to withdraw or access their cash collateral while their facility is still running.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "A customer may on his volition have access to his cash collateral while his facility is still running – False.",
    page: "CPG Pg. 20"
  },
  {
    id: 93,
    question: "The responsibility of ensuring the ongoing effectiveness of the internal control system lies with the Board of Directors.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "The responsibility of ensuring the effectiveness of internal control system lies with the Board of Directors.",
    page: "CPG Pg. 118"
  },
  {
    id: 94,
    question: "At the branches, the standard internal control proof cycle is to be done on what frequency?",
    answer: "Weekly",
    options: ["Daily", "Weekly", "Bi-weekly", "Monthly"],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "At the branches the proof cycle is to be done – Weekly.",
    page: "CPG Pg. 31"
  },
  {
    id: 95,
    question: "What is the full meaning of FUSS in the context of Access Bank specialized credit programs?",
    answer: "Facility Upgrade and Support Schemes",
    options: ["Facility Upgrade and Support Schemes", "Fund Utilization Support Standards", "Financial Underwriting Sovereign System", "Forex Utility Swap Syndicate"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "What is the full meaning of FUSS – Facility Upgrade and Support Schemes.",
    page: "CPG Pg. 82"
  },
  {
    id: 96,
    question: "The major source of repayment of school funds advanced under the FUSS credit program is school fees payments.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Specialized Lending",
    explanation: "The major source of repayment of funds on FUSS is – School fees payment.",
    page: "CPG Pg. 94"
  },
  {
    id: 97,
    question: "Which of the following is true in respect of the interest spread on cash collateralized lending transactions?",
    answer: "Not less than 4% between deposit rate and facility rate",
    options: ["Not less than 1%", "Not less than 2%", "Not less than 3%", "Not less than 4% between deposit rate and facility rate"],
    correctIndex: 3,
    topic: "Pricing & Interest Rates",
    explanation: "Which of these is true in respect of the spread on cash collateralized lending transactions – Not less than 4% between deposit rate and facility rate.",
    page: "CPG Pg. 130"
  },
  {
    id: 98,
    question: "The cost of switching is charged to every account credited via the collections solution, and must not be less than:",
    answer: "N100.00",
    options: ["N50.00", "N100.00", "N200.00", "N500.00"],
    correctIndex: 1,
    topic: "Pricing & Interest Rates",
    explanation: "The cost of switching is charged to every account credited via the solution, and must not be less that N100.00.",
    page: "CPG Pg. 102"
  },
  {
    id: 99,
    question: "What is the minimum opening balance of a Standard Savings Account under CPG guidelines?",
    answer: "N1,000",
    options: ["N500", "N1,000", "N2,000", "N5,000"],
    correctIndex: 1,
    topic: "Account Types & KYC",
    explanation: "The minimum opening balance of Standard Savings Account is – N1000.",
    page: "CPG Pg. 210"
  },
  {
    id: 100,
    question: "The minimum daily balance required for a Solo Account is N1,000.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Account Types & KYC",
    explanation: "The minimum daily balance for Solo Account N1000 – True.",
    page: "CPG Pg. 150"
  },
  {
    id: 101,
    question: "What is the minimum opening balance of the mpower Biz Account of the bank?",
    answer: "N150,000",
    options: ["N50,000", "N100,000", "N150,000", "N250,000"],
    correctIndex: 2,
    topic: "Account Types & KYC",
    explanation: "The opening balance of the mpower Biz Account is – N150,000.",
    page: "CPG Pg. 186"
  },
  {
    id: 102,
    question: "What is the monthly maintenance charge on an mpower Biz Account?",
    answer: "N1,500",
    options: ["N500", "N1,000", "N1,500", "N2,500"],
    correctIndex: 2,
    topic: "Account Types & KYC",
    explanation: "The monthly maintenance charge on an mpower Biz Account is – N1500.",
    page: "CPG Pg. 242"
  },
  {
    id: 103,
    question: "Section 20 (1a) of the Banks and Other Financial Institutions Decree (BOFID) 1991 states that a Bank shall not grant more than unimpaired losses to a company, its subsidiaries and associates exceeding what ratio of shareholders' funds?",
    answer: "0.2 (20%)",
    options: ["0.1 (10%)", "0.2 (20%)", "0.25 (25%)", "0.35 (35%)"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Section 20 (1a) of the Banks and Other Financial Institutions Decree (BOFID) 1991 states that a Bank shall not grant more than 20% (0.2) of its shareholders' funds unimpaired by losses to a company, its subsidiaries and associates.",
    page: "CPG Pg. 62"
  },
  {
    id: 104,
    question: "Which of the following regulatory framework acts establishes single obligor limits, insider loan limits, and overall credit risk compliance constraints in Nigeria?",
    answer: "BOFIA",
    options: ["BOFIA", "BCP", "FUSS", "GEM"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "BOFIA (Banks and Other Financial Institutions Act) outlines the critical requirements and restrictions concerning extensions of credit by banks to direct or related party accounts.",
    page: "CPG Pg. 28"
  },
  {
    id: 105,
    question: "Where a temporary overdraft accommodation remains outstanding for longer than 30 days, how shall it be classified?",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Any temporary overdraft accommodation that remains outstanding for longer than 30 days shall be classified as a past due loan.",
    page: "Past Due Obligations / Overdrafts Section"
  },
  {
    id: 106,
    question: "According to the CPG, problem recognition, problem exposure classification, and remedial actions require decentralized approvals across the bank.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Problem recognition and classification follow a specific reporting line to ensure timely remedial action, rather than relying on decentralized approvals across the bank.",
    page: "Problem Loan Recognition Section"
  },
  {
    id: 107,
    question: "Credit portfolio risk limits may be proposed by Credit Risk Management and approved by the Management Credit Committee.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Credit portfolio risk limits are approved by the Board Risk Management Committee or the Board of Directors, rather than just the Management Credit Committee.",
    page: "Credit Portfolio Risk Limits Section"
  },
  {
    id: 108,
    question: "Relationship Management is responsible for accurately and completely reporting the comprehensive set of credit risk data into the independent risk reporting system.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "It is the responsibility of the Credit Risk Management function, not Relationship Management, to report the comprehensive set of credit risk data into the independent risk reporting system.",
    page: "Risk Reporting Responsibilities Section"
  },
  {
    id: 109,
    question: "Settlement risk occurs when there is a simultaneous exchange of value with a counterparty for the same value date and verification that payment is received is not made until after the bank has paid.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Settlement risk occurs when there is a simultaneous exchange of value with a counterparty for the same value date, and verification that payment is received is not made until after the bank has paid or delivered on the obligation.",
    page: "Risk Definitions Section"
  },
  {
    id: 110,
    question: "Under settlement risk, there is also a risk that the counterparty does not deliver at all, resulting in exposure of the bank to direct lending risk.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "If a counterparty fails to deliver entirely during a settlement process, it exposes the bank to direct lending risk for the full amount transferred.",
    page: "Risk Definitions Section"
  },
  {
    id: 111,
    question: "Clearing risk is the risk that the bank may be reimbursed on another value date for payments made on behalf of customers.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Clearing risk specifically refers to the possibility that the bank is reimbursed on a different value date for payments it has already made on behalf of its customers.",
    page: "Risk Definitions Section"
  },
  {
    id: 112,
    question: "Documentation risk is the risk that documentary evidence on which the bank depends to enforce rights under contracts will not be complete, covered, and enforceable.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Documentation risk is the risk that documentary evidence on which the bank depends to enforce rights under contracts or transactions will not be complete, covered and enforceable.",
    page: "Risk Definitions Section"
  },
  {
    id: 113,
    question: "Legal and regulatory risks may occur when the Bank, a related corporate entity, a transaction or a customer is subject to a change in exposure resulting from legal or criminal sanctions or litigations.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Legal and regulatory risks occur when the Bank, a related corporate entity, a transaction or a customer is subject to a change in exposure resulting from legal or criminal sanctions or litigations.",
    page: "Risk Definitions Section"
  },
  {
    id: 114,
    question: "Liquidity risk is the risk that the bank will be able to meet all of its financial commitments to customers and markets when due.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Risk Types",
    explanation: "Liquidity risk is the risk that the bank will NOT be able to meet all of its financial commitments to customers and markets when due. The statement in the question incorrectly removes the negative.",
    page: "Risk Definitions Section"
  },
  {
    id: 115,
    question: "Under the CPG, it is the sole responsibility of Management and the Board of Directors to ensure the integrity of the credit process.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "It is the responsibility of all lending and credit officers, not just Management and the Board of Directors, to ensure the integrity of the credit process and the proper documentation of credit decisions.",
    page: "Credit Principles Section"
  },
  {
    id: 116,
    question: "The level of authority required to approve credit will decrease as amounts and transaction risks decrease and as risk ratings improve.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "The level of authority required to approve credit decreases as amounts and transaction risks decrease and as risk ratings improve, allowing lower-level management to approve safer, smaller loans.",
    page: "Credit Approval Authority Section"
  },
  {
    id: 117,
    question: "The CPG proposes a system of multiple different standards for the measurement of credit risk to ensure consistency across business lines.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "The CPG proposes a system of uniform, single standards for the measurement of credit risk to ensure consistency across the business, stability in methodologies, and transparency of risk, rather than multiple conflicting standards.",
    page: "Risk Measurement Section"
  },
  {
    id: 118,
    question: "Contingent lending risks may occur in products ranging from letters of credit to guarantees to unusual commitments.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Contingent lending risks occur in products where the bank's funds are only at risk if a specific event happens, ranging from letters of credit to guarantees to unusual commitments.",
    page: "Types of Credit Risk Section"
  },
  {
    id: 119,
    question: "Direct lending risk exists for the entire life of a credit transaction.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Direct lending risk exists for the entire life of a transaction, from the moment funds are disbursed until they are fully repaid.",
    page: "Types of Credit Risk Section"
  },
  {
    id: 120,
    question: "Contingent lending risk exists for the entire life of the transaction.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Similar to direct lending risk, contingent lending risk exists for the entire life of the transaction, as the triggering event could happen at any time before maturity.",
    page: "Types of Credit Risk Section"
  },
  {
    id: 121,
    question: "Country risk events may include political events.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "Country risk events encompass a broad range of macroeconomic issues, which definitely include political events, economic instability, or social unrest.",
    page: "Country Risk Section"
  },
  {
    id: 122,
    question: "Tentative action shall be taken on a reactive basis to minimize the bank's loss on a non-performing asset.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Proactive, rather than tentative and reactive, action must be taken immediately to minimize the bank's loss on a non-performing asset.",
    page: "Problem Loan Management Section"
  },
  {
    id: 123,
    question: "Under the CPG, approved credit product programs shall demonstrate that the behavior of the portfolio will not be predictable.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Approved credit product programs must demonstrate that the behavior of the portfolio WILL be predictable, allowing the bank to properly model and manage the associated risks.",
    page: "Credit Product Programs Section"
  },
  {
    id: 124,
    question: "Individual credits are applicable in respect of facility requests and credit approvals for customers who do not fit into credit product programmes.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Individual credits are designed to handle specific facility requests and credit approvals for customers whose unique needs do not fit neatly into standardized credit product programs.",
    page: "Individual Credit Approval Section"
  },
  {
    id: 125,
    question: "Individuals/business credits are suitable for which, if any, of the under listed?",
    answer: "Any of above",
    options: ["Standard Corporate clients", "Approved SMEs", "Interbank placements", "Any of above"],
    correctIndex: 3,
    topic: "Credit Process & Origination",
    explanation: "Individual and business credits are structured to accommodate standard client profiles who fit specific criteria.",
    page: "Credit Category Definitions"
  },
  {
    id: 126,
    question: "Is it right to state that some credit activities in the Retail Banking business unit may be categorized as individual/business credits?",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Credit activities in the Retail Banking unit are typically managed under standardized credit product programs rather than separate individual business credits.",
    page: "Retail Banking Credit Policy"
  },
  {
    id: 127,
    question: "The Board Credit Committee is the highest credit approval body in the bank and is responsible for approval of credit beyond the authorized approval limit.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "The Board of Directors, not the Board Credit Committee, is the highest credit approval body in the bank for credits exceeding all committee limits.",
    page: "Credit Approval Governance"
  },
  {
    id: 128,
    question: "The Board Credit Committee is headed by the GMD and by the GDMD in his absence.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "The Board Credit Committee is a committee of the Board and is headed by a non-executive Director, not the GMD or GDMD.",
    page: "Board Committee Structure"
  },
  {
    id: 129,
    question: "The Criticized Assets Committee is headed by the GDMD and is convened once every month to review qualifying assets.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "The Criticized Assets Committee structure and frequency follow specific risk governance rules where executive leadership roles are explicitly defined, making this statement false.",
    page: "Criticized Assets Committee Guidelines"
  },
  {
    id: 130,
    question: "Loans that show little or no movement during their tenor or which fail to be liquidated on due date are to be regarded as delinquent.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Loans that show little or no movement or fail to be liquidated at maturity are classified under specific problem loan classifications (like past due or non-performing) rather than just being called delinquent.",
    page: "Asset Classification Standards"
  },
  {
    id: 131,
    question: "The decision to transfer a non-performing facility to the remedial assets management unit is normally taken at Management Credit Committee meetings.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "The transfer of a non-performing asset to the remedial management unit happens automatically based on days past due and policy triggers, rather than waiting for a Management Credit Committee decision.",
    page: "Remedial Asset Transfer Policy"
  },
  {
    id: 132,
    question: "In some instances where it is determined that the probability of turnaround of a facility performance is remote, such facility may be immediately classified as lost.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Asset classification follows specific timelines and criteria set by the regulator and internal policy. A facility cannot be immediately classified as lost solely based on an early remote turnaround assumption without meeting the required criteria.",
    page: "Loan Classification Criteria"
  },
  {
    id: 133,
    question: "Under which of the under listed instances will a facility be classified as lost?",
    answer: "death/disappearance of obligor",
    options: ["Temporary cash flow constraint", "death/disappearance of obligor", "30 days past due status", "Change in management"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "A facility is classified as lost when there is no tangible expectation of recovery, such as the death or permanent disappearance of the obligor without traceable assets or collateral.",
    page: "Criteria for Lost Classification"
  },
  {
    id: 134,
    question: "Generally, recovery action may be instigated at any point in time in the life of a credit exposure.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Recovery actions follow a structured legal and operational process that is triggered by specific delinquency thresholds and default events, rather than being instigated randomly at any time.",
    page: "Credit Recovery Guidelines"
  },
  {
    id: 135,
    question: "In the event of recovery, the bank's entitlement shall be limited to the full amount of principal and interest unpaid to date of recovery.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "The bank's entitlement includes the full outstanding principal, accrued interest, plus any legal fees, penalty charges, and enforcement expenses incurred during the recovery process.",
    page: "Recovery and Enforcement Entitlements"
  },
  {
    id: 136,
    question: "Where sale proceeds from realizing a collateral security falls short of the bank's entitlement, the difference may be forgiven the customer.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "If the sale of collateral does not cover the total debt, the remaining balance remains a personal liability of the borrower, and the bank will pursue further recovery actions unless an official write-off or settlement is formally approved.",
    page: "Collateral Realization Policy"
  },
  {
    id: 137,
    question: "The Relationship Manager is responsible for bringing in industry, prudent and other specialists (e.g., Legal, Tax) when required.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "The Relationship Manager acts as the primary coordinator for the client's account and must loop in specialized internal functions like legal, tax, or industry experts to evaluate complex transactions properly.",
    page: "Relationship Management Responsibilities"
  },
  {
    id: 138,
    question: "Risk Management policies are approved by the Board Credit Committee to enable informed decision making and approval.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "Risk management policies must be approved by the full Board of Directors to establish the overall risk governance environment, not just by the Board Credit Committee.",
    page: "Risk Policy Governance"
  },
  {
    id: 139,
    question: "Compliance with the CPG shall be monitored on an ongoing basis by Credit Risk Management and reported on a quarterly basis to the MCC.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "Credit Risk Management is tasked with continuous oversight of compliance with the Credit Policy Guide, and must present regular quarterly reports to the Management Credit Committee.",
    page: "CPG Compliance Monitoring"
  },
  {
    id: 140,
    question: "Regardless of Risk Rating Limits, Legal Lending Limits will always prevail.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Statutory and legal lending limits set by the regulatory authorities are absolute boundaries that always override internal bank risk rating limits.",
    page: "Legal and Regulatory Limits"
  },
  {
    id: 141,
    question: "Exposure against Risk Rating Limits may be measured as the outstanding and unused commitments (OSUC) to a relationship.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Outstandings and Unused Commitments (OSUC) is the primary metric used to measure total credit exposure against established risk rating limits for a customer relationship.",
    page: "Exposure Measurement Metrics"
  },
  {
    id: 142,
    question: "OSUC to a given relationship does not include settlement and clearing exposure unless the position becomes aged beyond the extension period.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Settlement risks, clearing exposures, and active underwriting positions are tracked under separate risk frameworks and are excluded from the core OSUC calculation unless they become aged inventory.",
    page: "OSUC Scope and Exclusions"
  },
  {
    id: 143,
    question: "What level of approval is required for a Cash Exception?",
    answer: "Line ED/Head CRM",
    options: ["Line ED/Head CRM", "Board Credit Committee", "GMD", "Branch Manager"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Standard operational policy designates the Line Executive Director and the Head of Credit Risk Management as the approving authorities for cash-related limit exceptions.",
    page: "Risk Rating Limit Exceptions Approval Matrix"
  },
  {
    id: 144,
    question: "What level of approval is required for Immaterial Exceptions?",
    answer: "Line ED/Head CRM",
    options: ["Branch Manager", "Line ED/Head CRM", "GMD", "Board of Directors"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Immaterial exceptions to credit limits fall under the jurisdiction of the Line Executive Director and the Head of Credit Risk Management for quick resolution.",
    page: "Risk Rating Limit Exceptions Approval Matrix"
  },
  {
    id: 145,
    question: "What level of approval is required for a Passive Exception?",
    answer: "Line ED/Head CRM",
    options: ["Branch Manager", "Board Credit Committee", "Line ED/Head CRM", "GMD"],
    correctIndex: 2,
    topic: "Risk Measurement & Limits",
    explanation: "Cash, immaterial, and passive Risk Rating Limit Exceptions require approval from the Line Executive Director and the Head of Credit Risk Management or their designees.",
    page: "Risk Rating Limit Exceptions Approval Matrix"
  },
  {
    id: 146,
    question: "What level of approval is required for Long-term conditioning?",
    answer: "MCC",
    options: ["Branch Manager", "MCC", "Line ED/Head CRM", "Board Credit Committee"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "All other Risk Rating Limit Exceptions that are not cash, immaterial, or passive are considered 'Long Term and Continuing' and require approval by the Management Credit Committee.",
    page: "Risk Rating Limit Exceptions Approval Matrix"
  },
  {
    id: 147,
    question: "An approved Risk Rating Limit exception does not need to be re-approved during the annual review process.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "An approved exception does not need to be re-approved during the Annual Review process. However, it must continue to be noted on the Facility Approval Memo.",
    page: "Risk Rating Limit Exceptions Administrative Issues"
  },
  {
    id: 148,
    question: "Risk management policies shall be approved by the Board of Directors to enable informed decision making and approval.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "The Board of Directors is explicitly responsible for approving the risk management policies to set the standards and environment for credit risk management throughout the bank.",
    page: "Roles and Responsibilities of the Board of Directors"
  },
  {
    id: 149,
    question: "The Management Credit Committee (MCC) shall consider facility proposals in excess of the highest individual credit authority limit.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "The Management Credit Committee considers proposals above individual limits. If the proposal exceeds the MCC's own limits, it is escalated to the Board Credit Committee which approves it on behalf of the Board of Directors.",
    page: "Group Limits Section"
  },
  {
    id: 150,
    question: "All appointments and designations for credit risk approval must be reviewed and re-approved by the Chief Risk Officer at least twice a year.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "These appointments, designations, and credit limits must be reviewed and re-approved by the Chief Risk Officer at least once a year, not twice.",
    page: "Review and Re-appointment Section"
  },
  {
    id: 151,
    question: "Each customer facing business unit need not maintain up to date records of credit approval authority delegated to approving officers.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Each customer facing business unit is strictly required to maintain up-to-date records of the credit approval authorities delegated to its officers.",
    page: "Review and Re-appointment Section"
  },
  {
    id: 152,
    question: "Credit programs shall be primarily defined to accommodate credit offerings where there are business opportunities for groups of customers with homogenous business profiles.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Credit programs are specifically designed to target groups of customers with similar profiles and business fundamentals, allowing the bank to meet their needs using a standardized, common approach.",
    page: "Credit Program Approval Section"
  },
  {
    id: 153,
    question: "Approvals under credit programs need not be within approved global exposure and maximum individual exposure limits and shall be exercised within the market facing business units, subject to approval limits as may be set by the bank for each product program.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Although the test question bank lists this as True, note that CPG policy Section 6.2.10.6.2(A) stipulates that approvals under credit programs SHALL be within approved global exposure and maximum individual exposure limits.",
    page: "CPG Section 6.2.10.6.2(A) (p. 64-65 / 108-109)"
  },
  {
    id: 154,
    question: "To provide flexibility in managing valued relationships, the bank shall advice customers immediately of their pre-approved standard 'guidance limits'.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Guidance limits are pre-approved exposure limits that are expressly NOT advised to the customer. They are kept internal to allow the bank to respond quickly to emergency requests.",
    page: "Guidance Limits Section"
  },
  {
    id: 155,
    question: "Unusual risk policies approved by the MCC are limited to: Exposure to director related accounts; Exposure to politically exposed entities and Exposure to gambling entities.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "The bank maintains broader negative lists, restricted lists, and policy loans covering many more categories than just those three. For instance, it includes defence procurements and hostile acquisitions.",
    page: "Negative List and Restricted List Sections"
  },
  {
    id: 156,
    question: "All unusual/special risks shall require approval at Management Credit Committee / Board Credit Committee or Board of Directors subject to applicable limits.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Certain policy loans, such as unsecured credits to executives of client companies, require the approval of the Group Managing Director irrespective of the amount involved, before going to the committees.",
    page: "Policy Loans Section"
  },
  {
    id: 157,
    question: "Any increases to Total Facilities, whether caused by new facilities or increases to existing facilities, must be approved based on the new Total Facilities amount.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "When a facility is increased, the approval must be based on the new, higher Total Facilities amount, ensuring it goes to the correct authority level on the approval grid.",
    page: "New or Increased Facilities Section"
  },
  {
    id: 158,
    question: "Availments under approved credit facilities shall be through a drawdown memorandum approved by an officer in Credit Risk Management only.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "A drawdown memorandum must be approved by an officer in Credit Risk Management AND an officer in the Legal Department, who verifies all conditions precedent are met.",
    page: "Drawdown of Approved Facilities Section"
  },
  {
    id: 159,
    question: "Availments under approved credit facilities shall be through drawdown memorandum approved by an officer in Credit Risk Management and an officer in the Legal Department.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Both Credit Risk Management and the Legal Department must sign off on the drawdown memorandum to confirm all conditions have been met.",
    page: "Drawdown of Approved Facilities Section"
  },
  {
    id: 160,
    question: "Drawdown on facilities classified as substandard shall be through drawdown memorandum approved by an officer in Credit Risk Management and an officer in the Legal Department.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Facilities classified as 'substandard' follow the same drawdown approval process as regular facilities, requiring both CRM and Legal sign-off.",
    page: "Drawdown of Approved Facilities Section"
  },
  {
    id: 161,
    question: "Drawdown of facilities classified doubtful and worse need not be approved by the Head of Credit Risk Management at a minimum.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Drawdown on facilities classified as 'doubtful' or worse strictly requires the approval of the Chief Risk Officer.",
    page: "Drawdown of Approved Facilities Section"
  },
  {
    id: 162,
    question: "When an established credit facility undergoes a material change in terms, tenor, or conditions, Total Facilities must be re-approved.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Any material change to an established credit facility triggers a requirement for the Total Facilities to be completely re-approved according to the authority grid.",
    page: "Material Change Section"
  },
  {
    id: 163,
    question: "When the amount of a credit facility is reduced or cancelled, or the tenor is shortened, the Relationship Manager must promptly advise the applicable credit administration area in writing to update credit systems.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "To properly track exposure and maintain accurate system balances, the Relationship Manager must immediately inform the credit administration area in writing whenever a facility is reduced, cancelled, or its tenor is shortened.",
    page: "CPG Risk Reductions Section"
  },
  {
    id: 164,
    question: "Four officers from the business unit may approve any reallocation or sub-allocation from an approved facility, where the obligor, Exposure Type, and tenor are pre-established.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "The policy states that only TWO officers from the business unit are required to approve a reallocation or sub-allocation, provided certain conditions regarding the obligor, exposure type, and tenor are met.",
    page: "Reallocations and Sub-allocations of Approved Facilities Section"
  },
  {
    id: 165,
    question: "If a reallocation is for a related obligor of equivalent or better risk rating within the same relationship, two business credit officers may approve, including the Group Head.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "If the sub-allocation meets the criteria of being for a related obligor with an equal or better risk rating, two business credit officers can approve it, provided one of them is the responsible Group Head.",
    page: "Reallocations and Sub-allocations of Approved Facilities Section"
  },
  {
    id: 166,
    question: "Upon confirmation of full repayment of the credit facility and liquidation of bank's exposure, all collateral shall be released to the customer in accordance with agreed terms.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Collateral & Security",
    explanation: "Once a facility is completely paid off and the bank's exposure is liquidated, the bank is obligated to release all linked collateral and guarantees back to the customer.",
    page: "Release of Collateral, Guarantees and Support Section"
  },
  {
    id: 167,
    question: "The release of collateral, guarantees, or support requires the Managing Director's decision to determine if it constitutes a material change in risk.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "It is the respective Head of Risks, not the Managing Director, who must determine if releasing the collateral constitutes a material change in the risk of the transaction before the commitment is repaid.",
    page: "Release of Collateral, Guarantees and Support Section"
  },
  {
    id: 168,
    question: "Requests to waive or amend provisions in existing credit agreements must be approved in accordance with the Credit Approval Grid up to the Group MD limit.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Waivers or amendments follow a strict escalation matrix. They must be approved by the responsible business Executive Director up to the CEO limit, and anything beyond requires the GMD's specific approval.",
    page: "Waivers or Amendments to Existing Legal Documentation Section"
  },
  {
    id: 169,
    question: "Amendments to credit agreements, such as lengthening of tenor, do not require full credit approval of Total Facilities.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Any material changes, including lengthening the tenor, increasing the amount, or relaxing the collateral, absolutely require full credit re-approval of the Total Facilities based on the approval grid.",
    page: "Material Change Section"
  },
  {
    id: 170,
    question: "Under no circumstance can the periodic annual review of a credit facility be temporarily extended.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "A periodic annual review can be temporarily extended for up to 30 days if approved by the Business Executive Director and the Head of Risk.",
    page: "Temporary Extensions Section"
  },
  {
    id: 171,
    question: "All credit facilities must be reviewed at least once every 12 months.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Standard credit risk management policy dictates that all active credit facilities must undergo a full review at least once every 12 months.",
    page: "Temporary Extensions Section"
  },
  {
    id: 172,
    question: "A periodic review may be extended up to 60 days with approval of the Business ED and GMD.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "The CPG states that periodic reviews may be temporarily extended for up to 30 days, not 60 days. Extensions beyond 30 days require GMD's approval.",
    page: "Temporary Extensions Section"
  },
  {
    id: 173,
    question: "In cases where there has been a review extension, the annual review date may then be reset as one year from the approved extension date.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "If an extension is formally approved, the new annual review cycle is reset to start one year from that newly approved extension date.",
    page: "Temporary Extensions Section"
  },
  {
    id: 174,
    question: "Under no circumstance are unaudited financial statements acceptable in the annual review process.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "While strongly discouraged, unaudited or management financials may be used for information purposes only if the audited financials are outdated.",
    page: "Financial Criteria Section"
  },
  {
    id: 175,
    question: "When the bank underwrites and distributes loans or debt instruments, the 'Hold Position' is the amount that Access Bank intends to retain.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "In an underwriting scenario, the 'Hold Position' refers specifically to the portion of the loan or debt that the bank plans to keep on its own books permanently.",
    page: "Aged Inventory Management"
  },
  {
    id: 176,
    question: "Credit Approval Policy: Access Bank shall utilize Risk Rating Limits to maintain a diversified portfolio of risk assets.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "This statement describes the Risk Rating Limits Policy, not the Credit Approval Policy.",
    page: "Risk Rating Limits Policy Section"
  },
  {
    id: 177,
    question: "Specific Risk Policy: Certain extensions of credit have incremental or unique approval and risk management requirements or may be prohibited altogether.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "The Specific Risk Policy dictates that certain extensions of credit carry unique approval requirements, and some highly specific risks might be prohibited entirely.",
    page: "Specific Risk Policy Section"
  },
  {
    id: 178,
    question: "Credit Program Policy: Credit programs will be used to document business specific credit approval requirements, and are approved identically to extensions of credit.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "Credit programs are standardized frameworks used to document specific business requirements, and they go through the same rigorous approval process as individual extensions of credit.",
    page: "Credit Program Policy Section"
  },
  {
    id: 179,
    question: "Annual Review Policy: There will be consistent credit analysis standards across Access Bank for the approval of credit facilities.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "The requirement for consistent credit analysis standards across the bank falls under the Credit Analysis Policy, not the Annual Review Policy.",
    page: "Credit Analysis Policy Section"
  },
  {
    id: 180,
    question: "Credit Analysis Policy: All credit files must be maintained and reviewed at least once every 12 months.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "The mandate that all active credit files must be reviewed at least once every 12 months is part of the Annual Review Policy, not the Credit Analysis Policy.",
    page: "Annual Review Policy Section"
  },
  {
    id: 181,
    question: "The following are the rules governing the extension of credit, EXCEPT:",
    answer: "official Credit Policy",
    options: ["Single Obligor Limits", "Legal Lending Limits", "official Credit Policy", "Delegated Approvals"],
    correctIndex: 2,
    topic: "Credit Process & Origination",
    explanation: "An arbitrary 'official Credit Policy' is not listed among the designated core rules governing the extension of credit in the policy guide.",
    page: "Rules Governing the Extension of Credit"
  },
  {
    id: 182,
    question: "At Access Bank, the concept of one obligor is extended to include any company belong to a group whose management are strongly linked.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Access Bank aggregates exposures across related companies that share strong management or ownership links to assess the total risk exposure under the One Obligor Concept.",
    page: "One Obligor Concept"
  },
  {
    id: 183,
    question: "With regards to the one obligor limit, it shall be the responsibility of the Board of Directors to determine whether related company obligations shall be aggregated.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "It is the direct responsibility of the Approving Officers, not the Board of Directors, to identify and determine whether related company obligations must be aggregated.",
    page: "One Obligor Concept"
  },
  {
    id: 184,
    question: "As a guide to determining One Obligor connections, which of the following is inappropriate and should be excluded?",
    answer: "All sub at least 80%",
    options: ["All subsidiaries owned at least 50%", "All sub at least 80%", "Shared common management control", "Cross-guarantees or similar supports"],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The actual ownership threshold used as a guide to determine a related subsidiary for the One Obligor limit is 50%, not 80%.",
    page: "One Obligor Concept Guidelines"
  },
  {
    id: 185,
    question: "Outstandings and Unused Commitments (OSUC) are the sum of all outstandings against Total Facilities, as well as the unused portion of committed facilities.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "OSUC correctly aggregates all utilized direct and contingent exposures along with any remaining unused portions of committed facilities.",
    page: "Measuring Exposure against Risk Rating Limits"
  },
  {
    id: 186,
    question: "Risk Rating Limit Exceptions are encouraged but must be approved in advance at the appropriate committee level.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Risk Rating Limit Exceptions are explicitly discouraged by the bank, though they can be permitted if approved in advance.",
    page: "Risk Rating Limit Exceptions"
  },
  {
    id: 187,
    question: "Which of the following is NOT classified under standard Risk Rating Limit Exceptions?",
    answer: "Long Term & Continuing Limit exceptions, defined as overages up to 10% of Risk Rating Limit.",
    options: ["Cash collateralized limit exceptions", "Immaterial exceptions", "Passive exceptions", "Long Term & Continuing Limit exceptions, defined as overages up to 10% of Risk Rating Limit."],
    correctIndex: 3,
    topic: "Risk Measurement & Limits",
    explanation: "Overages up to 10% are defined as 'Immaterial Exceptions', not 'Long Term and Continuing' exceptions.",
    page: "RRLE Types"
  },
  {
    id: 188,
    question: "Passive exceptions may be caused by which of the following triggers?",
    answer: "A valuation change on an existing transaction",
    options: ["An active delegation change", "A valuation change on an existing transaction", "A request by the Relationship Manager", "A new loan facility disbursement"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Passive exceptions happen without active lending decisions, such as a drop in collateral valuation or an automatic downgrade in the obligor's risk rating.",
    page: "Passive Exceptions"
  },
  {
    id: 189,
    question: "Passive exceptions must be pre-approved before they can map into regular reporting logs.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Risk Measurement & Limits",
    explanation: "Because passive exceptions occur outside of the bank's direct control, they cannot be pre-approved. They are flagged during reporting and must be reviewed promptly.",
    page: "Passive Exceptions"
  },
  {
    id: 190,
    question: "Cash, Immaterial and Passive Risk Rating Limit Exceptions (RRLEs) require approval from the Line ED and Head of Credit Risk Management.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Lower-risk limit exceptions like cash, immaterial, and passive breaches can be cleared efficiently by the Line ED and the Head of Credit Risk Management.",
    page: "Required Approvals for RRLEs"
  },
  {
    id: 191,
    question: "All Risk Rating Limit Exceptions apart from Cash, Immaterial, and Passive exceptions require approval by the Management Credit Committee.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Risk Measurement & Limits",
    explanation: "Any exception that does not fall into the cash, immaterial, or passive categories is considered Long Term and Continuing, requiring full Management Credit Committee approval.",
    page: "Required Approvals for RRLEs"
  },
  {
    id: 192,
    question: "A proposal or marketing letter requires credit approval even though it disclaims any binding commitment of the bank.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "As long as a marketing letter clearly disclaims any binding commitment and does not obligate the bank, it does not require formal credit approval.",
    page: "Establish Total Facilities Section"
  },
  {
    id: 193,
    question: "To ensure they do not create binding obligations, non-committal marketing letters must be jointly cleared by the Business Head/ED and the Head of CRM.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "To ensure they do not accidentally create binding obligations, non-committal marketing letters must be jointly cleared by the Business Head/ED and the Head of Credit Risk Management.",
    page: "Establish Total Facilities Section"
  },
  {
    id: 194,
    question: "When establishing Total Facilities for a relationship, which of the following is inappropriate to include in the calculation?",
    answer: "The borrowers business description",
    options: ["Direct outstanding exposures", "Contingent outstanding exposures", "The borrowers business description", "Unused portions of committed facilities"],
    correctIndex: 2,
    topic: "Credit Process & Origination",
    explanation: "The borrower's business description is part of the credit analysis narrative, but it is not a numerical value included in the calculation of Total Facilities.",
    page: "Establish Total Facilities Section"
  },
  {
    id: 195,
    question: "Extensions of credit facilities in the regions need not have the concurrence of the Head of Credit Risk in the Regional Office.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Regional credit extensions strictly require the concurrence of the Head of Credit Risk in the Regional Office, in addition to an officer with a covering limit.",
    page: "Determine the Required Approvals"
  },
  {
    id: 196,
    question: "No credit exposure shall be created on the judgment or at the discretion of a single bank officer acting independently.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "The bank enforces a dual-control or multi-officer system. A single officer cannot independently create a credit exposure.",
    page: "Guidelines for Determining Approval Authority"
  },
  {
    id: 197,
    question: "Relationship Managers do not hold independent delegated credit approval authority in the bank.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Approval & Committees",
    explanation: "Relationship Managers originate credit proposals but do not make final approval decisions independently.",
    page: "Approval Authority Framework"
  },
  {
    id: 198,
    question: "Unsecured loans to individuals or organizations (other than staff members) require what level of approval?",
    answer: "GMD/GDMD's approval irrespective of the amount involve (in addition to other approvals that may be required)",
    options: ["Group Head approval only", "GMD/GDMD's approval irrespective of the amount involve (in addition to other approvals that may be required)", "Branch Manager local sign-off", "Board of Directors approval strictly"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Unsecured lending is highly restricted and requires top executive sign-off.",
    page: "Unsecured Credits Policy"
  },
  {
    id: 199,
    question: "Which of the following is NOT classified under standard credit exposure categories?",
    answer: "Legal Commitments",
    options: ["Direct loans", "Contingent letters of credit", "Interbank placements", "Legal Commitments"],
    correctIndex: 3,
    topic: "Risk Measurement & Limits",
    explanation: "Legal commitments denote binding agreements rather than standalone exposure types.",
    page: "Exposure Definitions"
  },
  {
    id: 200,
    question: "Acceptance of an advised credit facility by a corporate client must be supported by which of the following?",
    answer: "Board Resolution",
    options: ["Board Resolution", "Verbal client agreement", "RM email confirmation", "Purchase order slip"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Corporate clients must provide a Board Resolution to legally accept credit terms.",
    page: "Documentation Requirements"
  },
  {
    id: 201,
    question: "Ideally, overdraft lines of credit (OD) should be restricted to what purpose?",
    answer: "Working capital requirements",
    options: ["Acquisition of fixed assets", "Working capital requirements", "Long term real estate finance", "Staff training funding"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Overdrafts are short-term solutions strictly meant to bridge working capital gaps.",
    page: "Overdrafts Section"
  },
  {
    id: 203,
    question: "Access Bank policy prohibits financing of Armament or Gambling loans unless there is GMD approval.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Any exception to prohibited lending categories requires direct Board of Directors approval.",
    page: "Prohibited Lending"
  },
  {
    id: 204,
    question: "The GMD/GDMD automatic limits assume GMD authority in the GMD's physical absence.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Credit authority limits are individually delegated. The Group Deputy Managing Director does not automatically assume the GMD's limit unless a formal, temporary delegation of authority is documented.",
    page: "Delegation of Authority"
  },
  {
    id: 205,
    question: "The bank's credit pricing strategy is determined by the customer's ability to pay.",
    answer: "False",
    options: ["True", "False"],
    correctIndex: 1,
    topic: "Pricing & Interest Rates",
    explanation: "The bank pricing strategy is determined by cost of funds, risk premium, and competitive market rates, rather than ability to pay alone which is a credit assessment factor.",
    page: "Credit Pricing Strategy"
  },
  {
    id: 206,
    question: "When underwriting debt fails to distribute, it becomes Aged Inventory requiring an action memo with CRM/ED sign-off.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Products & Facilities",
    explanation: "When underwritten debt fails to sell, the Investment Banking Division must draft a formal memorandum outlining how they plan to sell it and how it will be valued in the current market.",
    page: "Aged Inventory Management"
  },
  {
    id: 207,
    question: "Access Bank adheres strictly to the Equator Principles as part of environmental and social risk management.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "General CPG Knowledge",
    explanation: "Access Bank strictly adheres to the Equator Principles as part of its core environmental and social risk management framework.",
    page: "Environmental and Social Risk Management"
  },
  {
    id: 208,
    question: "What is the primary purpose of the Invoice Discounting program?",
    answer: "Provide liquidity to customers during the period between performance of contract and receipt of cash",
    options: ["Fund pre-award material acquisition", "Provide liquidity to customers during the period between performance of contract and receipt of cash", "Bypass standard KYC compliance processes", "Secure long-term real estate investments"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "It bridges the working capital gap, giving the customer immediate cash while they wait for the principal to process the invoice.",
    page: "Invoice Discounting Program"
  },
  {
    id: 210,
    question: "The Principal in an invoice discounting transaction must hold a risk rating of what tier or better?",
    answer: "2 or better",
    options: ["1 only", "2 or better", "3 or better", "4 or better"],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "To mitigate default risk, the corporate principal owing the money must hold a high-tier risk rating of 2 or better.",
    page: "Invoice Discounting Program"
  },
  {
    id: 211,
    question: "The vendor under the Invoice Discounting program must demonstrate what minimum acceptable annual turnover?",
    answer: "300 million naira",
    options: ["50 million naira", "100 million naira", "200 million naira", "300 million naira"],
    correctIndex: 3,
    topic: "Specialized Lending",
    explanation: "To ensure the program targets sufficiently large commercial clients, the vendor must demonstrate an annual turnover of at least 300 million Naira.",
    page: "Invoice Discounting Program"
  },
  {
    id: 212,
    question: "What does LGD stand for in credit risk management terminology?",
    answer: "Loss Given Default",
    options: ["Loss Given Default", "Lease Grant Date", "Liquidity Gap Duration", "Lender Governance Directive"],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "LGD measures the proportion of an exposure that the bank expects to lose if the borrower defaults.",
    page: "Risk Definitions"
  },
  {
    id: 213,
    question: "What does PD stand for in credit risk management terminology?",
    answer: "Probability of Default",
    options: ["Payment Due Date", "Portfolio Diversification Limit", "Probability of Default", "Principal Drawdown Authority"],
    correctIndex: 2,
    topic: "Credit Risk Types",
    explanation: "PD is the likelihood that a borrower will be unable to make their required payments.",
    page: "Risk Definitions"
  },
  {
    id: 214,
    question: "The roll of the Internal Audit function in credit risk involves providing independent validation of policy compliance.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Monitoring & Internal Controls",
    explanation: "Internal Audit provides the third line of defense by checking that the actual credit process matches the documented policy.",
    page: "Roles and Responsibilities"
  },
  {
    id: 215,
    question: "A negative pledge clause prevents a borrower from pledging their assets to other lenders.",
    answer: "True",
    options: ["True", "False"],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "A negative pledge clause protects the bank's position by ensuring assets remain unencumbered for potential future claims.",
    page: "Loan Covenants"
  },
  ...BANK_B_QUESTIONS,
  ...BANK_C_QUESTIONS,
  ...BANK_D_QUESTIONS,
  ...BANK_E_QUESTIONS,
  ...BANK_F_QUESTIONS,
  ...BANK_G_QUESTIONS,
  ...BANK_H_QUESTIONS,
  ...BANK_I_QUESTIONS,
  ...BANKJ_QUESTIONS,
  ...BANKK_QUESTIONS,
  ...BANKL_QUESTIONS,
  ...BANKM_QUESTIONS,
  ...BANKN_QUESTIONS,
  ...BANKO_QUESTIONS
];

