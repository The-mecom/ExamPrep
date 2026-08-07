import { Question } from "../questions";

export const BANK_H_QUESTIONS: Question[] = [
  {
    id: 721,
    question: "Why is it critical for Relationship Managers (RMs) to maintain direct contact with borrowing customers through periodic credit calls after extending credit?",
    answer: "To monitor borrower performance, track early warning signals, and observe business operations",
    options: [
      "To sell non-credit products only",
      "To monitor borrower performance, track early warning signals, and observe business operations",
      "To re-negotiate loan interest rates monthly",
      "To take custody of daily cash receipts"
    ],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "Post-disbursement credit calls allow relationship officers to observe business activities, monitor cash flows, detect early warning signals of distress, and ensure compliance with credit covenants.",
    page: "CPG Section 5.1.8.1 (p. 146)"
  },
  {
    id: 722,
    question: "Where is a credit call meeting between the Relationship Manager and the borrowing customer most suitable to take place?",
    answer: "At the customer's principal place of business / operational site",
    options: [
      "At a public restaurant",
      "At the customer's principal place of business / operational site",
      "At the bank's head office executive suite",
      "Via telephone or email only"
    ],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "Conducting credit calls at the borrower's operational site provides first-hand observation of factory operations, inventory levels, staff morale, and overall business health.",
    page: "CPG Section 5.1.8.1 (p. 146)"
  },
  {
    id: 723,
    question: "Information gathered from credit calls must be properly documented and officially circulated via:",
    answer: "Call memo to Business Head and Credit Risk Management (CRM)",
    options: [
      "Text message to Group Head and Credit Risk Management",
      "Call memo to Business Head and Credit Risk Management (CRM)",
      "Verbal report at weekly management meetings",
      "Email broadcast to all branch staff"
    ],
    correctIndex: 1,
    topic: "Monitoring & Internal Controls",
    explanation: "A formal Call Memo ensures that critical intelligence obtained during customer visits is recorded in the credit file and shared with CRM for risk monitoring.",
    page: "CPG Section 5.1.8.1 (p. 146)"
  },
  {
    id: 724,
    question: "Why is conducting independent Bank and Trade checks an essential component of the credit analysis process under CPG guidelines?",
    answer: "It independently verifies the customer's payment history, credit reputation, and relationship with suppliers and peer banks",
    options: [
      "It is required only for public limited companies",
      "It independently verifies the customer's payment history, credit reputation, and relationship with suppliers and peer banks",
      "It guarantees that the bank will receive 100% collateral coverage",
      "It eliminates the need to review audited financial statements"
    ],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Bank and trade checks provide unbiased external confirmation of the obligor's integrity, payment promptness with trade creditors, and banking conduct across the financial sector.",
    page: "CPG Section 5.1.4 (p. 146)"
  },
  {
    id: 725,
    question: "Under CPG regulations, the Relationship Manager must conduct and document a site visit prior to disbursement of funds under which of the following facility types?",
    answer: "All of the above",
    options: [
      "Overdraft facility",
      "Revolving credit facility",
      "Import and export finance",
      "All of the above"
    ],
    correctIndex: 3,
    topic: "Credit Process & Origination",
    explanation: "Mandatory pre-disbursement site visits apply across all risk asset types (OD, revolving lines, trade finance, term loans) to verify operational legitimacy before releasing funds.",
    page: "CPG Section 4.2.1 (p. 79)"
  },
  {
    id: 726,
    question: "Why must collateral pledged to the bank be revalued periodically throughout the lifecycle of a credit facility?",
    answer: "To account for market price fluctuations, physical deterioration, and ensure forced sale value (FSV) remains adequate",
    options: [
      "To increase credit facility management fees",
      "To account for market price fluctuations, physical deterioration, and ensure forced sale value (FSV) remains adequate",
      "To satisfy tax reporting requirements only",
      "To allow the customer to withdraw excess funds"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Periodic revaluations ensure that security margins are maintained despite real estate market shifts, asset wear, or price volatility, keeping the bank adequately protected.",
    page: "CPG Section 4.2.3 (p. 79)"
  },
  {
    id: 727,
    question: "Where credit exposures are secured by marketable securities prone to price volatility (e.g. quoted shares), what protective measure ensures the bank's exposure remains covered?",
    answer: "Applying a discount margin (haircut) and enforcing top-up cash/security margin calls if prices decline",
    options: [
      "Converting the loan into an equity stake",
      "Applying a discount margin (haircut) and enforcing top-up cash/security margin calls if prices decline",
      "Increasing the interest rate automatically by 5%",
      "Waiving annual review requirements"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Discounting market value protects against equity market drops, while contractual margin calls require borrowers to lodge additional cash or shares if security falls below required thresholds.",
    page: "CPG Section 4.2.5 (p. 51, 79)"
  },
  {
    id: 728,
    question: "Under the CPG, collateral valuation for credit facilities is conducted by:",
    answer: "Relationship Manager, CRM, and professional independent appraisers/valuers",
    options: [
      "Relationship Manager and CRM only",
      "Relationship Manager, CRM, and professional independent appraisers/valuers",
      "Local government law enforcement agencies",
      "The customer's internal finance team"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Appraisals involve joint internal evaluation by RM and CRM alongside independent professional estate valuers to establish realistic Market Value and Forced Sale Value (FSV).",
    page: "CPG Section 4.2.2 (p. 79)"
  },
  {
    id: 729,
    question: "Where must all original legal documentation in respect of approved credit exposures be kept for security and safety?",
    answer: "Bank vault or a location of equivalent security and safety",
    options: [
      "Relationship Manager's locked office drawer",
      "Standard filing cabinet in the branch secretary's office",
      "Fireproof cabinet in Group Head's office",
      "Bank vault or a location of equivalent security and safety"
    ],
    correctIndex: 3,
    topic: "Monitoring & Internal Controls",
    explanation: "Original security instruments (Title Deeds, Mortgages, Debentures, Guarantees) represent enforceable claims and must be safely locked in bank vaults.",
    page: "CPG Section 5.2.1 (p. 147)"
  },
  {
    id: 730,
    question: "What is the mandatory frequency for conducting physical verification audits of all original credit and security documentation in custody?",
    answer: "Annually",
    options: [
      "Monthly",
      "Quarterly",
      "Semi-annually",
      "Annually"
    ],
    correctIndex: 3,
    topic: "Monitoring & Internal Controls",
    explanation: "Annual physical audits ensure all pledged documents are present, unencumbered, validly executed, and safely stored in the vault without unauthorized removal.",
    page: "CPG Section 5.2.3 (p. 147)"
  },
  {
    id: 731,
    question: "Under what specific condition will pledged collateral be officially released back to a borrowing customer?",
    answer: "Upon complete liquidation of the bank's exposure and written sign-off from designated credit approval authorities",
    options: [
      "When the customer requests it for another bank",
      "Upon complete liquidation of the bank's exposure and written sign-off from designated credit approval authorities",
      "When the facility tenor reaches 50% completion",
      "When the customer provides an unverified letter of comfort"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Collateral can only be discharged after all principal, interest, and associated fees are fully repaid and verified by Credit Risk Management and Legal.",
    page: "CPG Section 3.7.4 (p. 67)"
  },
  {
    id: 732,
    question: "How many primary structured components comprise each comprehensive customer credit file in Credit Administration?",
    answer: "4 components (Legal/Security, Credit Analysis, Correspondence, Financials)",
    options: [
      "2 components",
      "3 components",
      "4 components (Legal/Security, Credit Analysis, Correspondence, Financials)",
      "6 components"
    ],
    correctIndex: 2,
    topic: "Monitoring & Internal Controls",
    explanation: "A standard customer credit file is organized into 4 distinct sections: Legal/Security Documents, Credit Memos & Approvals, Correspondence, and Financial Statements/Reports.",
    page: "CPG Section 5.3.1 (p. 148)"
  },
  {
    id: 733,
    question: "How must information of an unfavourable nature (e.g. significant operational distress) be handled in a customer's credit file?",
    answer: "Documented immediately and escalated to Head of CRM and Criticized Assets Committee (CAC)",
    options: [
      "Excluded from the file to prevent panic",
      "Documented immediately and escalated to Head of CRM and Criticized Assets Committee (CAC)",
      "Held back until the annual facility renewal",
      "Shared verbally without written records"
    ],
    correctIndex: 1,
    topic: "Delinquency & Asset Classification",
    explanation: "Adverse information must never be concealed; prompt documentation and escalation enable early problem recognition and corrective action.",
    page: "CPG Section 5.1.7 (p. 138, 148)"
  },
  {
    id: 734,
    question: "Under what circumstance is an unadvised credit facility appropriate under CPG guidelines?",
    answer: "To control customer overtrading and restrict drawdown to verified collateral/operational needs without creating a legal commitment",
    options: [
      "To hide credit exposure from regulatory authorities",
      "To control customer overtrading and restrict drawdown to verified collateral/operational needs without creating a legal commitment",
      "To charge higher unauthorized fees",
      "To bypass internal approval grids"
    ],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Unadvised facilities allow the bank to approve internal lines for operational flexibility while withholding a formal offer letter to prevent the borrower from over-leveraging.",
    page: "CPG Section 3.6.4 (p. 136)"
  },
  {
    id: 735,
    question: "A customer's request for withdrawal against uncleared drafts (DAUD/DAUE) will NOT be approved for which of the following reasons?",
    answer: "All of the above",
    options: [
      "Drawings against the borrowing company's own cheque",
      "Drawings in excess of approved DAUE/DAUD limit",
      "Cheques drawn on entities rated as high risk",
      "All of the above"
    ],
    correctIndex: 3,
    topic: "Credit Products & Facilities",
    explanation: "DAUD/DAUE is strictly restricted to low-risk third-party instruments within approved limits. Own-cheque drawings or high-risk drawers present immediate clearing risk.",
    page: "CPG Section 3.6.5 (p. 43)"
  },
  {
    id: 736,
    question: "Unsecured credit extensions granted to the bank's Directors or related entities must be:",
    answer: "Approved by the Board of Directors prior to drawdown and reported at the next Board meeting for ratification",
    options: [
      "Approved by the Relationship Manager only",
      "Approved by Executive Directors without escalation",
      "Approved by the Board of Directors prior to drawdown and reported at the next Board meeting for ratification",
      "Prohibited under all circumstances without exception"
    ],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "Regulatory and CPG governance requires full Board pre-approval and formal minute ratification for director-related insider credit exposures.",
    page: "CPG Section 3.6.9 (p. 46)"
  },
  {
    id: 737,
    question: "What is the minimum collateral requirement for all credit facilities extended to corporate obligors under CPG guidelines?",
    answer: "Charge on fixed and floating assets of the company (All-Assets Debenture)",
    options: [
      "Personal guarantee of the finance manager",
      "Charge on fixed and floating assets of the company (All-Assets Debenture)",
      "Oral commitment from major shareholders",
      "Letter of awareness from a parent company"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Corporate exposures require a comprehensive debenture over all company assets to secure the bank's claim above unsecured general creditors.",
    page: "CPG Section 4.1.2 (p. 50)"
  },
  {
    id: 738,
    question: "Which of the following is NOT an acceptable form of primary collateral under Access Bank CPG guidelines?",
    answer: "Letter of Comfort",
    options: [
      "First legal mortgage on commercial property",
      "Lien on cash deposits in the bank",
      "Letter of Comfort",
      "Charge on equipment and machinery"
    ],
    correctIndex: 2,
    topic: "Collateral & Security",
    explanation: "A Letter of Comfort is legally unenforceable and creates no binding financial guarantee or charge on assets, making it unacceptable as primary collateral.",
    page: "CPG Section 4.1.3 (p. 50)"
  },
  {
    id: 739,
    question: "The CPG stipulates that the Expected Forced Sale Value (EFSV) of landed property collateral must be determined by a certified professional estate valuer for facilities exceeding:",
    answer: "N50 million",
    options: [
      "N10 million",
      "N20 million",
      "N50 million",
      "N100 million"
    ],
    correctIndex: 2,
    topic: "Collateral & Security",
    explanation: "Facilities above N50 Million require independent professional valuation reports from estate surveyors registered with NIESV to validate EFSV.",
    page: "CPG Section 4.1.5 (p. 50)"
  },
  {
    id: 740,
    question: "According to the CPG, the acceptability of stocks and shares as collateral is strictly limited to:",
    answer: "Selected blue-chip companies quoted on the Nigerian Exchange (NGX) / recognized exchange",
    options: [
      "Any unquoted private company with good revenue",
      "Selected blue-chip companies quoted on the Nigerian Exchange (NGX) / recognized exchange",
      "Foreign penny stocks",
      "Shares of start-up tech firms"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "Only liquid, high-volume blue-chip equities listed on recognized exchanges qualify so the bank can easily dispose of shares if liquidation becomes necessary.",
    page: "CPG Section 4.1.8 (p. 51)"
  },
  {
    id: 741,
    question: "When considering a Life Assurance policy as collateral for credit, what is the most compelling requirement under the CPG?",
    answer: "The Surrender Value of the policy must be easily ascertainable, assigned to the bank, and adequate to cover exposure",
    options: [
      "The policyholder must be over 50 years old",
      "The Surrender Value of the policy must be easily ascertainable, assigned to the bank, and adequate to cover exposure",
      "The insurance premium is paid semi-annually",
      "The policy was issued within the last 30 days"
    ],
    correctIndex: 1,
    topic: "Collateral & Security",
    explanation: "The bank relies on the immediate cash Surrender Value guaranteed by the insurance firm, which must be legally reassigned to the bank.",
    page: "CPG Section 4.1.11 (p. 52)"
  },
  {
    id: 742,
    question: "What timeframe does the CPG prescribe for completing the preliminary screening of a credit facility request?",
    answer: "48 hours",
    options: [
      "24 hours",
      "48 hours",
      "5 working days",
      "10 working days"
    ],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Preliminary screening must be concluded within 48 hours of receiving complete customer information to determine target market fit before in-depth packaging.",
    page: "CPG Section 5.1.1 (p. 131)"
  },
  {
    id: 743,
    question: "The CPG provides that all recommendations for the denial/rejection of a credit facility request require the formal endorsement of:",
    answer: "Group Head",
    options: [
      "Relationship Officer only",
      "Group Head",
      "Executive Director",
      "GMD / CEO"
    ],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "Credit denials must be endorsed by the Business Group Head to ensure consistent commercial evaluation across market-facing units.",
    page: "CPG Section 5.1.2 (p. 131)"
  },
  {
    id: 744,
    question: "The deferral of any required security documentation for credit facilities under N1 Billion requires the formal approval of:",
    answer: "The GDMD",
    options: [
      "The Board of Directors",
      "Board Credit Committee",
      "The GMD / CEO",
      "The GDMD"
    ],
    correctIndex: 3,
    topic: "Credit Approval & Committees",
    explanation: "Security document deferrals carry elevated legal risk and require senior executive authorization from the Group Deputy Managing Director (GDMD) for lines < N1Bn.",
    page: "CPG Section 5.1.5 (p. 134)"
  },
  {
    id: 745,
    question: "In the event of borrower default, a first formal notice must be issued to the customer within ___ working days, and a second notice after ___ working days of the first notice:",
    answer: "10 working days & 20 working days",
    options: [
      "3 days & 7 days",
      "7 days & 14 days",
      "10 working days & 20 working days",
      "14 days & 28 days"
    ],
    correctIndex: 2,
    topic: "Delinquency & Asset Classification",
    explanation: "CPG delinquency management stipulates a 10-day window for initial default notification, followed by a second demand notice 20 days later if unpaid.",
    page: "CPG Section 5.4.2 (p. 139)"
  },
  {
    id: 746,
    question: "Consideration of interest and fee waivers is strictly limited to non-performing credit exposures classified as:",
    answer: "Lost",
    options: [
      "Watchlist",
      "Substandard",
      "Doubtful",
      "Lost"
    ],
    correctIndex: 3,
    topic: "Delinquency & Asset Classification",
    explanation: "Waivers of accrued interest or charges are exceptional concessions granted only on fully provisioned 'Lost' assets to incentivize principal recovery.",
    page: "CPG Section 5.5.1 (p. 141)"
  },
  {
    id: 747,
    question: "Discussions and negotiations regarding debt waivers, concessions, or write-offs fall under the direct responsibility of:",
    answer: "Remedial Assets Unit",
    options: [
      "Relationship Manager",
      "Credit Risk Management",
      "Remedial Assets Unit",
      "Internal Audit"
    ],
    correctIndex: 2,
    topic: "Delinquency & Asset Classification",
    explanation: "To prevent compromise, negotiations for non-performing asset recoveries and waivers are transferred from RMs to specialized Remedial Asset officers.",
    page: "CPG Section 5.5.2 (p. 141)"
  },
  {
    id: 748,
    question: "Under CPG regulations, all waivers of interest and bank charges require the approval of:",
    answer: "The GMD / CEO",
    options: [
      "Branch Operations Manager",
      "Group Head",
      "The GMD / CEO",
      "Central Bank of Nigeria"
    ],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "All concessions involving interest or fee waivers must be submitted for final executive approval by the Group Managing Director / CEO.",
    page: "CPG Section 5.5.4 (p. 141)"
  },
  {
    id: 749,
    question: "The Access Bank Credit Policy Guide (CPG) manual is derived from:",
    answer: "The Bank's Enterprise Risk Management Framework, international best practices, and regulatory guidelines",
    options: [
      "Commercial advertising agency templates",
      "The Bank's Enterprise Risk Management Framework, international best practices, and regulatory guidelines",
      "Local branch custom practices",
      "Annual tax returns"
    ],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The CPG policy foundation builds upon the Bank's ERM framework, CBN circulars, BOFIA statutory provisions, and global banking standards.",
    page: "CPG Section 1.1 (p. 8-9)"
  },
  {
    id: 750,
    question: "Proposals for additions, modifications, or amendments to any section of the CPG manual must be presented to:",
    answer: "Head of Credit Risk Management (CRM)",
    options: [
      "Head of Human Capital",
      "Head of Credit Risk Management (CRM)",
      "Marketing Operations Desk",
      "External Auditors"
    ],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Policy maintenance is centralized under the Head of CRM, who reviews proposed changes before escalating to MCC and the Board.",
    page: "CPG Section 1.4 (p. 11)"
  },
  {
    id: 751,
    question: "Access Bank's Risk Management Philosophy states that a ________ and ________ risk attitude will ensure sustainable growth in shareholder value and reputation.",
    answer: "Moderate and guarded",
    options: [
      "Aggressive and speculative",
      "Moderate and guarded",
      "Restrained and passive",
      "High-yield and unhedged"
    ],
    correctIndex: 1,
    topic: "Credit Risk Types",
    explanation: "The bank adopts a 'moderate and guarded' risk posture to balance business growth with capital protection and long-term franchise value.",
    page: "CPG Section 1.6 (p. 13)"
  },
  {
    id: 752,
    question: "Under the CPG, risk management is the operational responsibility of:",
    answer: "All personnel involved in the creation, processing, and management of credit exposures",
    options: [
      "Credit Risk Officers only",
      "Management Credit Committee only",
      "All personnel involved in the creation, processing, and management of credit exposures",
      "The Legal Department exclusively"
    ],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Risk ownership starts at the first line of defense; every employee originating or managing risk assets shares responsibility for compliance.",
    page: "CPG Section 1.7 (p. 14)"
  },
  {
    id: 753,
    question: "The CPG specifies that in decision-making, ________ attention shall be paid to quantifiable and non-quantifiable risks.",
    answer: "Equal",
    options: [
      "Primary attention to quantifiable and minimal to non-quantifiable",
      "Equal",
      "Exclusive attention to financial metrics",
      "Secondary"
    ],
    correctIndex: 1,
    topic: "Credit Risk Types",
    explanation: "Non-quantifiable risks (management capability, reputational risk, ESG factors) must receive equal rigor alongside financial ratio calculations.",
    page: "CPG Section 1.8 (p. 14)"
  },
  {
    id: 754,
    question: "Acceptance of an advised credit facility by a corporate client must be formally supported by a:",
    answer: "Duly executed Board Resolution of the company",
    options: [
      "Duly executed Board Resolution of the company",
      "Verbal confirmation from the CFO",
      "Informal email from the managing director",
      "Promissory note without signatures"
    ],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "Corporate acceptance requires corporate legal binding via an official Board Resolution authorizing borrowing and signing officers.",
    page: "CPG Section 3.6.1 (p. 136)"
  },
  {
    id: 755,
    question: "Due to the long maturation period of tree crops and hazards of the environment, what is the maximum tenor the bank may consider for an Agricultural Loan?",
    answer: "5 years (with appropriate moratorium)",
    options: [
      "1 year",
      "3 years",
      "5 years (with appropriate moratorium)",
      "10 years"
    ],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "Agricultural credit recognizes gestation periods for tree crops/cash crops, capping tenors at 5 years with structured grace periods.",
    page: "CPG Section 3.6.10 (p. 47)"
  },
  {
    id: 756,
    question: "Access Bank policy strictly prohibits financing armament or gambling ventures. What exception exists under the CPG?",
    answer: "Approval by the full Board of Directors",
    options: [
      "Approval by the Relationship Manager",
      "Approval by Management Credit Committee",
      "Approval by the full Board of Directors",
      "No exception exists under any circumstance"
    ],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "Excluded sectors (armaments, gambling) can only be considered under rare national interest exceptions requiring full Board of Directors approval.",
    page: "CPG Section 3.4 (p. 35)"
  },
  {
    id: 757,
    question: "Section 20 (1a) of BOFIA 1991 (as amended) dictates that a bank shall not grant credit facilities exceeding ___ of its unimpaired shareholders' funds to a single company or group of related companies:",
    answer: "20%",
    options: [
      "5%",
      "10%",
      "20%",
      "50%"
    ],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "BOFIA sets the statutory Single Obligor Limit at 20% of unimpaired shareholders' funds for non-bank borrowers.",
    page: "CPG Section 5.1.2.4 (p. 70)"
  },
  {
    id: 758,
    question: "Under the CPG, each underwriting and distribution transaction must have a Defined Distribution Period that cannot exceed:",
    answer: "90 days",
    options: [
      "30 days",
      "60 days",
      "90 days",
      "180 days"
    ],
    correctIndex: 2,
    topic: "Specialized Lending",
    explanation: "Underwriting commitments must be distributed to secondary investors within 90 days; undistributed balances become Aged Inventory.",
    page: "CPG Section 3.7.1 (p. 135)"
  },
  {
    id: 759,
    question: "Which of the following is NOT one of the core pillars of Access Bank's credit policy framework?",
    answer: "Credit Official Policy",
    options: [
      "Credit Approval Policy",
      "Risk Rating Limits Policy",
      "Credit Official Policy",
      "Specific Risk Policy",
      "Credit Program Policy"
    ],
    correctIndex: 2,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The policy framework rests on 6 recognized pillars: Credit Approval, Risk Rating Limits, Specific Risk, Credit Program, Annual Review, and Credit Analysis.",
    page: "CPG Section 2.1 (p. 15)"
  },
  {
    id: 760,
    question: "Which of the following lists the 3 primary types of Risk Rating Limit Exceptions (RRLEs) recognized under the CPG?",
    answer: "Cash Exceptions, Immaterial Exceptions, and Passive Exceptions",
    options: [
      "Cash Exceptions, Immaterial Exceptions, and Passive Exceptions",
      "Executive Exceptions, Board Exceptions, and Regional Exceptions",
      "Temporary Exceptions, Permanent Exceptions, and Waiver Exceptions",
      "Overdraft Exceptions, Term Loan Exceptions, and Contingent Exceptions"
    ],
    correctIndex: 0,
    topic: "Credit Risk Types",
    explanation: "RRLEs are categorized into Cash (fully backed), Immaterial (minor overage <10%), and Passive (caused by rating changes or market valuations).",
    page: "CPG Section 5.1.3 (p. 75)"
  },
  {
    id: 761,
    question: "Availments and drawdowns under approved credit facilities require a Drawdown Memorandum jointly verified and approved by:",
    answer: "An officer in Credit Risk Management and an officer in the Legal Department",
    options: [
      "Relationship Manager and Branch Operations Manager",
      "An officer in Credit Risk Management and an officer in the Legal Department",
      "Group Head and Internal Audit Officer",
      "Executive Director and Managing Director"
    ],
    correctIndex: 1,
    topic: "Credit Process & Origination",
    explanation: "Drawdowns require dual validation: Legal confirms perfection of security documents, and CRM verifies compliance with all approval conditions.",
    page: "CPG Section 3.7.2 (p. 66)"
  },
  {
    id: 762,
    question: "If a credit facility annual review is delayed, an extension beyond 60 days up to 90 days must be approved by:",
    answer: "The GDMD (or designee)",
    options: [
      "The Relationship Manager",
      "Business ED and Head of CRM",
      "The GDMD (or designee)",
      "The GMD / CEO"
    ],
    correctIndex: 2,
    topic: "Credit Approval & Committees",
    explanation: "Annual review extensions: up to 60 days (Business ED & Head CRM), 61-90 days (GDMD), and >90 days (GMD / CEO).",
    page: "CPG Section 3.7.5 (p. 68)"
  },
  {
    id: 763,
    question: "Access Bank is committed to social and environmental risk management in project financing by adhering to which international guidelines?",
    answer: "Equator Principles",
    options: [
      "Basel III Accord",
      "Equator Principles",
      "Sarbanes-Oxley Act",
      "FATF 40 Recommendations"
    ],
    correctIndex: 1,
    topic: "Regulatory & CBN Guidelines",
    explanation: "The bank adopts the Equator Principles framework to assess and manage environmental and social risks in major project finance activities.",
    page: "CPG Section 2.5 (p. 70)"
  },
  {
    id: 764,
    question: "What primary risk is the bank exposed to on Commercial Papers (CPs) that it intermediates or issues without a direct bank guarantee?",
    answer: "Franchise and Reputational risk",
    options: [
      "Direct balance sheet credit default risk",
      "Franchise and Reputational risk",
      "Currency conversion risk",
      "Fiduciary interest rate swap risk"
    ],
    correctIndex: 1,
    topic: "Credit Risk Types",
    explanation: "Even though unguaranteed CPs carry no direct credit risk on the bank's balance sheet, default by the issuer damages the bank's franchise and market reputation.",
    page: "CPG Section 3.6.7 (p. 44)"
  },
  {
    id: 765,
    question: "In a finance lease arrangement structured by the bank, where does the legal title of the asset reside during the lease tenor?",
    answer: "With Access Bank until the final installment is paid and purchase option exercised",
    options: [
      "With the lessee / borrowing client",
      "With Access Bank until the final installment is paid and purchase option exercised",
      "With the equipment manufacturer",
      "With the Ministry of Finance"
    ],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "Title remains with the bank as lessor throughout the lease period, transferring to the lessee only after full rental payments and nominal purchase option execution.",
    page: "CPG Section 3.6.8 (p. 44)"
  },
  {
    id: 766,
    question: "In warehouse financing, stock released to the borrower from the controlled warehouse must be executed on what inventory basis?",
    answer: "FIFO (First-In, First-Out)",
    options: [
      "LIFO (Last-In, First-Out)",
      "FIFO (First-In, First-Out)",
      "Highest Value First",
      "Random Selection"
    ],
    correctIndex: 1,
    topic: "Credit Products & Facilities",
    explanation: "FIFO inventory management prevents spoilage, obsolescence, or aging of stored commodities during release under warehouse financing arrangements.",
    page: "CPG Section 3.6.6 (p. 45)"
  },
  {
    id: 767,
    question: "For a Management Credit Committee (MCC) meeting to be validly constituted, the quorum must consist at a minimum of:",
    answer: "The Chairman or Vice Chairman, the Secretary, and at least 2 other members",
    options: [
      "Any 2 Relationship Managers",
      "The Chairman or Vice Chairman, the Secretary, and at least 2 other members",
      "The GMD and all Executive Directors",
      "The Head of Audit and 3 Branch Managers"
    ],
    correctIndex: 1,
    topic: "Credit Approval & Committees",
    explanation: "MCC governance requires mandatory presence of the Chairman/Vice Chairman, Committee Secretary, and 2 additional voting members.",
    page: "CPG Section 2.4 (p. 25)"
  },
  {
    id: 768,
    question: "The discovery of any declining risk exposure or material credit deterioration must be reported to the Chairman of the Criticized Assets Committee (CAC) within:",
    answer: "7 days",
    options: [
      "24 hours",
      "48 hours",
      "7 days",
      "30 days"
    ],
    correctIndex: 2,
    topic: "Delinquency & Asset Classification",
    explanation: "CPG guidelines require prompt escalation of declining credits to the CAC Chairman within 7 days of discovery to initiate early workout strategies.",
    page: "CPG Section 5.1.6 (p. 138)"
  },
  {
    id: 769,
    question: "If an underwritten debt/loan position is not completely distributed within the 90-day Defined Distribution Period, the remaining unsold balance is classified as:",
    answer: "Aged Inventory (must be marked to market)",
    options: [
      "Written-off exposure",
      "Aged Inventory (must be marked to market)",
      "Substandard loan",
      "Unadvised facility"
    ],
    correctIndex: 1,
    topic: "Specialized Lending",
    explanation: "Undistributed underwriting past 90 days is designated Aged Inventory, triggering mandatory mark-to-market valuation and executive reporting.",
    page: "CPG Section 3.7.1 (p. 58, 135)"
  },
  {
    id: 770,
    question: "Which of the following lists the 5 distinct phases of the Credit Management Cycle in Access Bank?",
    answer: "Marketing, Analysis & Packaging, Relationship Management, Credit Admin & Control, Credit Audit/Review",
    options: [
      "Marketing, Analysis & Packaging, Relationship Management, Credit Admin & Control, Credit Audit/Review",
      "Origination, Legal Search, Approval, Disbursement, Foreclosure",
      "Deposit Taking, Loan Generation, Interest Billing, Liquidation, Recovery",
      "Risk Rating, Pricing, Collateralization, Documentation, Write-Off"
    ],
    correctIndex: 0,
    topic: "Credit Process & Origination",
    explanation: "The 5 lifecycle phases of credit management are Marketing, Credit Analysis & Packaging, Relationship Management, Credit Admin & Control, and Credit Audit/Review.",
    page: "CPG Section 3.1 (p. 117-119)"
  }
];
