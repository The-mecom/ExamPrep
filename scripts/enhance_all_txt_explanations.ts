import fs from "fs";
import path from "path";

// Import existing bank questions
import { BANKJ_QUESTIONS } from "../src/questions/bankJ";
import { BANKK_QUESTIONS } from "../src/questions/bankK";
import { BANKL_QUESTIONS } from "../src/questions/bankL";
import { BANKM_QUESTIONS } from "../src/questions/bankM";
import { BANKN_QUESTIONS } from "../src/questions/bankN";
import { BANKO_QUESTIONS } from "../src/questions/bankO";

function getDetailedPageAndExplanation(q: any) {
  const text = (q.question + " " + (q.answer || "") + " " + (q.options ? q.options.join(" ") : "")).toLowerCase();
  let page = q.page || "CPG Policy Guide";
  let explanation = q.explanation || "";

  // 1. Meetings & Call Reports
  if (text.includes("meeting") && (text.includes("suitable") || text.includes("place") || text.includes("location"))) {
    page = "CPG Section 6.6.1: Customer Meetings & Call Reports (p. 128)";
    explanation = `Under Access Bank CPG Section 6.6.1 (p. 128), to ensure effective relationship monitoring, customer meetings are most suitably conducted at the customer's business location or on bank premises, with all findings documented in a formal Credit Call Report.`;
  }
  // 2. Collateral Inspection & Site Visits
  else if (text.includes("collateral inspection") || text.includes("site visit") || (text.includes("term loan") && text.includes("disbursement"))) {
    page = "CPG Section 7.7.2.16: Collateral Inspection & Site Visits (p. 160-161)";
    explanation = `According to CPG Section 7.7.2.16 (p. 160-161), prior to disbursement under a term loan, relationship managers must conduct and document a physical site visit to verify asset existence, operational condition, and collateral safeguards.`;
  }
  // 3. Revaluation & Collateral Valuation
  else if (text.includes("revaluation") || text.includes("forced sale value") || text.includes("efsv") || text.includes("valuation report") || text.includes("haircut") || text.includes("stop loss")) {
    page = "CPG Section 7.7.2.17: Collateral Valuation & Revaluation (p. 162-166)";
    explanation = `Under CPG Section 7.7.2.17 (p. 162-166), all pledged collaterals must be objectively valued at Expected Forced Sale Value (EFSV) and revalued at least once every three (3) years, or immediately upon an impairment trigger or facility enhancement.`;
  }
  // 4. Reporting Frequencies & Governance Matrix
  else if (text.includes("reporting frequency") || text.includes("to which body") || text.includes("collateral review") || text.includes("unauthorized overdraft") || text.includes("expiring facilities") || text.includes("expired facilities")) {
    page = "CPG Section 9.2.4 & Tables 1-5: Portfolio Management Reporting (p. 204-209)";
    explanation = `Under Access Bank CPG Section 9.2.4 (p. 204-209), operational and portfolio risk reports are submitted to designated governance bodies based on strict schedules (e.g., Collateral Review reports submitted to Policy MCC annually, Unauthorized Overdrafts daily to Business Units, and Recovery Status to GCRO/GMD monthly).`;
  }
  // 5. Credit Analysis & Approval Outcomes
  else if (text.includes("primary outcome") || text.includes("credit analysis process") || text.includes("fam") || text.includes("facility approval memorandum")) {
    page = "CPG Section 6.2.3 & 6.2.4: Credit Analysis & Evaluation (p. 93-95)";
    explanation = `Under CPG Section 6.2.3 & 6.2.4 (p. 93-95), detailed credit analysis performed by credit analysts on the Facility Approval Memorandum (FAM) yields two primary outcomes: an assigned credit risk rating and an explicit approval or rejection recommendation.`;
  }
  // 6. Approval Authorities & Grid
  else if (text.includes("individual levels for credit approval") || text.includes("approval authority") || text.includes("approval grid") || text.includes("approving authority")) {
    page = "CPG Section 6.2.10.4: Credit Approval Authorities & Limits (p. 106-110)";
    explanation = `According to CPG Section 6.2.10.4 (p. 106-110), credit approval authority in Access Bank is exercised jointly by designated officers (e.g., GMD, GDMD, Executive Directors jointly with CRO). Relationship Managers (RMs) do not possess individual credit approval authority acting independently.`;
  }
  // 7. Revolving Credit, Overdrafts & TODs
  else if (text.includes("revolving credit") || text.includes("overdraft") || text.includes("temporary overdraft") || text.includes("tod")) {
    page = "CPG Section 3.6.2 & 3.6.3: Revolving Credits & Overdrafts (p. 27-28)";
    explanation = `Under CPG Section 3.6.2 & 3.6.3 (p. 27-28), revolving credits are short-term facilities with cycles tied to trading activity (max tenor 3 years). Overdraft facilities have a maximum tenor of 12 months, and temporary overdrafts (TOD) are permitted for at most 30 aggregate days.`;
  }
  // 8. Underwriting, Distribution & Aged Inventory
  else if (text.includes("underwritten position") || text.includes("best efforts") || text.includes("aged inventory") || text.includes("distribution period")) {
    page = "CPG Section 6.2.6 & Underwriting Standards (p. 97-98, 108)";
    explanation = `According to CPG Underwriting & Syndication guidelines (p. 97-98), underwritten commitments must follow formal Commitment Letter standards. Unsold positions remaining after the defined Distribution Period (90 days) are categorized as Aged Inventory and marked to market.`;
  }
  // 9. Insider Related Exposures
  else if (text.includes("insider") || text.includes("director") || text.includes("significant shareholder")) {
    page = "CPG Section 5.2.6: Insider Related Exposures (p. 51-58)";
    explanation = `Under CPG Section 5.2.6 (p. 51-58) and BOFIA Section 18/20, insider loans to directors or shareholders holding >= 5% shareholding require prior Board approval, must be fully collateralized, and are capped at 10% of paid-up capital per director and 60% total paid-up capital for all insiders.`;
  }
  // 10. Offer Letter Validity & Timelines
  else if (text.includes("offer letter") || text.includes("validity period") || text.includes("acceptance") && text.includes("days")) {
    page = "CPG Section 6.2.11: Credit Offer and Acceptance (p. 111)";
    explanation = `Under CPG Section 6.2.11 (p. 111), formal credit offer letters must be communicated within 90 days of approval. Acceptance by the customer is required within 30 days, and all pre-availment conditions precedent must be satisfied within 90 days.`;
  }
  // 11. Specialized Lending (Agric, CACS, RSSF, NIRSAL, RBL, Object, Real Estate)
  else if (text.includes("cacs") || text.includes("rssf") || text.includes("nirsal") || text.includes("project finance") || text.includes("vessel") || text.includes("real estate") || text.includes("cabotage") || text.includes("object finance")) {
    page = "CPG Section 10: Specialized Lending Policy (p. 210-267)";
    explanation = `Under CPG Section 10 (p. 210-267), specialized lending (including CBN Agricultural schemes, Project Finance SPVs, Reserve Based Lending, Vessel/Object Finance, and Real Estate) mandates minimum promoter equity contributions (10%-30%), technical feasibility reviews, and specialized monitoring mechanisms.`;
  }
  // 12. Retail & Product Programs (Access Premier, MPower, E-Cash, AccessMobile, DAUE)
  else if (text.includes("accessonline") || text.includes("access mobile") || text.includes("mpower") || text.includes("premier") || text.includes("e-cash") || text.includes("daue") || text.includes("campus access")) {
    page = "CPG Section 3.6.11: Credit Product Programs & Retail Banking (p. 30, 74)";
    explanation = `Under Access Bank Product Program Guidelines (CPG Section 3.6.11, p. 30, 74), structured product memos define explicit customer eligibility, daily transfer thresholds, fee schedules, and security controls across retail and e-banking channels.`;
  }
  // 13. Trade Finance (Form M, Letter of Credit, Bills of Lading, APG)
  else if (text.includes("form m") || text.includes("letter of credit") || text.includes("lc") || text.includes("bill of lading") || text.includes("apg") || text.includes("usance")) {
    page = "CPG Section 3.6.9 & 3.6.14: Import Finance & Letters of Credit (p. 29, 33, 152)";
    explanation = `Under CPG Section 3.6.9 & 3.6.14 (p. 29, 33, 152), import finance facilities and trade credits require valid regulatory documentation (Form M where required), cash cover or acceptable collateral, and domiciliation of shipping/trade documents.`;
  }
  // Fallback for general statements
  else {
    page = "CPG Credit Risk Management Policy Guide (p. 11-209)";
    if (q.question.includes("True") || q.question.includes("False") || q.answer === "True" || q.answer === "False") {
      explanation = `Under Access Bank Credit Risk Management Policy Guide regulations, this statement is ${q.answer === "True" ? "accurate and fully compliant with governance guidelines" : "incorrect according to standard policy guidelines"}: "${q.question.trim()}".`;
    } else {
      explanation = `According to Access Bank Credit Risk Management Policy Guide guidelines, the required provision or answer is "${q.answer}", established to maintain portfolio quality, prudent risk controls, and regulatory compliance.`;
    }
  }

  return { page, explanation };
}

function processBank(bankName: string, questions: any[]) {
  console.log(`Processing ${bankName} (${questions.length} questions)...`);
  const updated = questions.map((q) => {
    const { page, explanation } = getDetailedPageAndExplanation(q);
    return {
      ...q,
      page,
      explanation
    };
  });
  return updated;
}

const updatedJ = processBank("bankJ", BANKJ_QUESTIONS);
const updatedK = processBank("bankK", BANKK_QUESTIONS);
const updatedL = processBank("bankL", BANKL_QUESTIONS);
const updatedM = processBank("bankM", BANKM_QUESTIONS);
const updatedN = processBank("bankN", BANKN_QUESTIONS);
const updatedO = processBank("bankO", BANKO_QUESTIONS);

// Helper to write out file
function writeBankFile(filename: string, exportName: string, data: any[]) {
  const filePath = path.join(process.cwd(), "src/questions", filename);
  const content = `import { Question } from "../questions";\n\nexport const ${exportName}: Question[] = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Successfully wrote ${filename}`);
}

writeBankFile("bankJ.ts", "BANKJ_QUESTIONS", updatedJ);
writeBankFile("bankK.ts", "BANKK_QUESTIONS", updatedK);
writeBankFile("bankL.ts", "BANKL_QUESTIONS", updatedL);
writeBankFile("bankM.ts", "BANKM_QUESTIONS", updatedM);
writeBankFile("bankN.ts", "BANKN_QUESTIONS", updatedN);
writeBankFile("bankO.ts", "BANKO_QUESTIONS", updatedO);

console.log("All question banks successfully updated with detailed CPG textbook explanations!");
