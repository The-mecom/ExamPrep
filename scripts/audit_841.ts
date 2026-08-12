import { CPG_QUESTIONS } from "../src/questions";

const promptQuestions = [
  { "number": 1, "question": "Why is it critical for Marketing/relationship management officers to maintain direct contact with customers through periodic visits after extending credit?" },
  { "number": 2, "question": "Where is this meeting most suitable to take place?" },
  { "number": 3, "question": "What determines the frequency of credit calls?" },
  { "number": 4, "question": "Information gathered from credit calls are properly documented and circulated via:" },
  { "number": 5, "question": "Why is Bank and trade check an important component of the credit process?" },
  { "number": 6, "question": "The ongoing administration of the quality and performance of loans depends on:" },
  { "number": 7, "question": "What is the objective of collateral inspection?" },
  { "number": 8, "question": "Under the CRG RM must conduct and document site visit prior to disbursement of funds under:" },
  { "number": 9, "question": "Depending on the nature of collateral, any collateral held must be revalued periodically. Why?" },
  { "number": 10, "question": "Where obligations are secured by marketable securities which are prone to price fluctuation e.g. shares, what can you do to ensure that your exposure to the customer is always covered no matter what happens?" },
  { "number": 11, "question": "Collateral valuation is usually conducted by" },
  { "number": 12, "question": "All legal documentation in respect of approved credit exposure are kept in:" },
  { "number": 13, "question": "What is the frequency of the conduct of physical verification of all credit documentation" },
  { "number": 14, "question": "How often does CRM and relevant approval authority review all outstanding credit transactions and commitments?" },
  { "number": 15, "question": "Under what circumstances will collateral be released to a customer?" },
  { "number": 16, "question": "How often must obligor and facility exposure quality and performance grades be reviewed?" },
  { "number": 17, "question": "What is the primary information source for decision -making on credits and customer relationships?" },
  { "number": 18, "question": "Credit files must contain at a minimum:" },
  { "number": 19, "question": "How often must credit files be reviewed?" },
  { "number": 20, "question": "How do you treat information of an unfavourable nature in the credit file e.g. a significant problem in the relationship?" },
  { "number": 21, "question": "How many components are there to each customer credit file?" },
  { "number": 22, "question": "Unauthorized overdraft report Dly Weekly Monthly Qtly Annually 23. Excess over approved limit Dly Weekly Monthly Qtly Annually 24. Expiring facilities Dly Weekly Monthly Qtly Annually 25. Expired facilities Dly Weekly Monthly Qtly Annually 26. Central Liability report Dly Weekly Monthly Qtly Annually 27. Maturing obligations report Dly Weekly Monthly Qtly Annually 28. Review of security documentation Dly Weekly Monthly Qtly Annually 29. Portfolio review report Dly Weekly Monthly Qtly Annually 30. Collateral review Dly Weekly Monthly Qtly Annually 31. Recovery status report Dly Weekly Monthly Qtly Annually 32. Recoveries made report Dly Weekly Monthly Qtly Annually Acess Bank Plc - CPM Test Questions The KRC Limited tthe {?? PA GE 33. Reserves and write offs Dly Weekly Monthly Qtly Annually 34. Account throughput reporting Dly Weekly Monthly Qtly Annually A B C D 35. Portfolio Review report Biz.Units MCC Biz.Units /MCC CAC 36. Collateral Review \u201c \u201c \u201c \u201c 37. Recovery Status Report \u201c \u201c \u201c \u201c 38. Recoveries Made \u201c \u201c \u201c \u201c 39. Account throughput reporting \u201c \u201c \u201c \u201c 40. Reserves and write offs \u201c \u201c \u201c \u201c 41. Review of security documentation \u201c \u201c \u201c \u201c 42. Excess over approval limits \u201c \u201c \u201c \u201c 43. Unauthorized O/D report \u201c \u201c \u201c \u201c 44. Central liability report \u201c \u201c \u201c \u201c 45. Maturing obligation report \u201c \u201c \u201c \u201c 46. Expiring and expired facilities \u201c \u201c \u201c \u201c 47. On what basis does the bank extend credit facilities?" },
  { "number": 48, "question": "Under what circumstances will an unadvised facility be appropriate" },
  { "number": 49, "question": "Which one of the under listed will not be suitably structured as a term loan? Pg42" },
  { "number": 50, "question": "On repayment, a customer may re-borrow under the same condition provided that:" },
  { "number": 51, "question": "In the event that a temporary overdraft accommodation remains outstanding for a period longer term 30 days, what prudent step should be taken? Pg 38" },
  { "number": 52, "question": "Customers request for withdrawal against uncleared effects or drafts will not be approved for one of the following reasons:" },
  { "number": 53, "question": "How many parties are there to a typical transaction involving the issuance of a bond by the bank?" },
  { "number": 54, "question": "In what instance(s) will a bond /guarantee be issued on a clean basis to a client?" },
  { "number": 55, "question": "Which of the following statement is true concerning the issuance of bonds/guarantees?" },
  { "number": 56, "question": "Which of the following statement is false with regards to the issuance of bond/guarantees?" },
  { "number": 57, "question": "What kind of risk is the bank exposed to on ALL commercial papers it intermediates?" },
  { "number": 58, "question": "When the Bank does not guarantee the CP\u2019s it issues, what role does the bank play?" },
  { "number": 59, "question": "In a lease facility, what is the most important consideration?" },
  { "number": 60, "question": "How many parties are there in a lease arrangement?" },
  { "number": 61, "question": "What is the most important consideration for the bank when undertaking warehouse financing?" },
  { "number": 62, "question": "In general, warehouse financing should NOT be considered where:" },
  { "number": 63, "question": "Under what condition will Access Bank take a lead role in loan syndication?" },
  { "number": 64, "question": "Unsecured credit to bank\u2019s directors must be:" },
  { "number": 65, "question": "What is the maximum tenure that the Bank can allow for agricultural loans?" },
  { "number": 66, "question": "Which one of the following consideration is not important in establishing the bank\u2019s lending rate?" },
  { "number": 67, "question": "What is the minimum requirement for all items pledged as security for credit facilities?" },
  { "number": 68, "question": "What is the minimum collateral requirement for all credit extensive to corporate obligors:" },
  { "number": 69, "question": "Which one(s) of the under listed is not accepted collateral based on the CPG." },
  { "number": 70, "question": "What is the minimum percentage of expected forced sale value (EFSV) of loan acceptable to Access Bank?" },
  { "number": 71, "question": "Which one of the following landed property may be acceptable under the CPG?" },
  { "number": 72, "question": "The CPL requires that EFSV (expected force sale value) be dete rmined by a professional estate valuer for facilities in excess of:" },
  { "number": 73, "question": "In what type of account will cash deposited as collateral in respect of a credit be placed?" },
  { "number": 74, "question": "In what instance will Access Bank allow another bank to share/participate in its lien over cash collateral?" },
  { "number": 75, "question": "According to the CPG, acceptability of stoc ks & shares of companies as collateral shall be limited to" },
  { "number": 76, "question": "The assessed market value of such shares is based on average value of such shares over a period of time. What is this period of time under the CPG?" },
  { "number": 77, "question": "What resource material will be most appropriate to find the average value of a share?" },
  { "number": 78, "question": "As a guideline, the CPG recommends that a minimum Shrinkage, or discount margin be applied on the MKT value of collateral shares. What is the recommended percentage?" },
  { "number": 79, "question": "Under what Circumstance(s) will the personal, joint and several guarantees of Directors be acceptable as sole security for credit to a company?" },
  { "number": 80, "question": "Under the CPG, Corporate guarantees may not be acceptable under which one of the following instances." },
  { "number": 81, "question": "Which one of the under listed reasons will be the most compelling consideration for accepting a life assurance policy as collateral for credit" },
  { "number": 82, "question": "All assets and items pledged to the Bank as credit collateral must be appropriately covered by a valid insurance policy throughout the duration of the credit. Which one of the under listed is exempted?" },
  { "number": 83, "question": "What time frame does the CPG prescribe for the completion of preliminary screening of all credit facility requests?" },
  { "number": 84, "question": "What is the purpose of the preliminary credit screening?" },
  { "number": 85, "question": "The CPG provides that all recommendation for denial of credit facility shall require the endorsement of" },
  { "number": 86, "question": "What is the primary outcome of the credit analysis process?" },
  { "number": 87, "question": "Which one of the following components must be included in a full credit review?" },
  { "number": 88, "question": "Which one of the following is an important consideration for renewal of approved facilities?" },
  { "number": 89, "question": "Why does the CPG direct that risk ratings be assigned to each facility?" },
  { "number": 90, "question": "Under the CPG, how long does the credit analyst have to do his work upon receipt of the credit request and complete information required for detailed analysis?" },
  { "number": 91, "question": "How long does a customer have to accept a credit offer before it lapses?" },
  { "number": 92, "question": "How long does a customer have to meet all the conditions precedent to drawdown as contained in the facility offer letter?" },
  { "number": 93, "question": "What mode(s) of acceptance of facility offer is / are required by the CPG? Acess Bank Plc - CPM Test Questions The KRC Limited tthe {?? PA GE" },
  { "number": 94, "question": "In the event that a single bank customer has multiple exposures and facilities with more than one Market facing unit, how many credit files should be maintained?" },
  { "number": 95, "question": "Who is responsible for the establishment of the customer\u2019s credit file?" },
  { "number": 96, "question": "Whose responsibility shall it be to ensure complete and legally enforceable documentation of credit?" },
  { "number": 97, "question": "What time frame does the CPG stipulate for the completion of credit documentation?" },
  { "number": 98, "question": "The CPG stipulates the minimum number of years that must be remaining or subsisting on a lease on a property for it to be acceptable in security for a credit facility. What is this figure?" },
  { "number": 99, "question": "Deferral of any security document for facility under N1bn will require the approval of:" },
  { "number": 100, "question": "The CPG provides for the preparation of a report on deferrals by CAD. How often must they do this?" },
  { "number": 667, "question": "Approvals under credit programs need not be within approved global exposure and maximum individual exposure limits and shall be exercised within the market facing business units, subject to approval limits as may be set by the bank for each product program. True False" }
];

console.log("Checking prompt questions vs existing bank questions...");

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

promptQuestions.forEach(item => {
  const n = norm(item.question);
  const match = CPG_QUESTIONS.find(q => norm(q.question).includes(n.slice(0, 35)) || n.includes(norm(q.question).slice(0, 35)));
  if (match) {
    console.log(`Prompt #${item.number} MATCHES Question #${match.id}: "${match.question.slice(0, 60)}..."`);
  } else {
    console.log(`Prompt #${item.number} NO MATCH: "${item.question.slice(0, 60)}..."`);
  }
});
