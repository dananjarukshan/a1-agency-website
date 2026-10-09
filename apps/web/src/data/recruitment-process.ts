import {
  Search, FileSearch, Send, ClipboardCheck, Users, FileCheck2,
  Files, Plane, Luggage, MapPin, type LucideIcon,
} from "lucide-react";

type RecruitmentStage = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Eight concise homepage stages; omitted stages are covered by nearby summaries. */
  homepage?: { title: string; description: string };
};

export const recruitmentJourneyOverview = "A general guide to overseas recruitment. Exact steps and their order vary by vacancy, employer, destination and applicable official requirements.";

/** Canonical order and wording for the full journey and its homepage preview. */
export const recruitmentProcess: readonly RecruitmentStage[] = [
  {
    id: "explore", title: "Explore Opportunities", icon: Search,
    description: "Start with your skills and experience. Explore jobs, countries and recruitment fields to understand the kinds of roles that may suit you.",
    homepage: { title: "Explore Opportunities", description: "Explore roles by country or field. Review the requirements carefully; current website vacancies are sample listings." },
  },
  {
    id: "requirements", title: "Review Job Requirements", icon: FileSearch,
    description: "Check the destination, salary, age criteria, experience, qualifications, vacancy information and closing date. Confirm the actual role and terms with A-One before proceeding.",
  },
  {
    id: "application", title: "Submit Application", icon: Send,
    description: "Contact A-One to confirm how to apply for a current vacancy. You can explore the website’s demo application form, but it does not send or store an application or CV.",
    homepage: { title: "Submit Application", description: "Contact A-One about current application arrangements. The website’s demo form does not send or store applications or CVs." },
  },
  {
    id: "screening", title: "Initial Screening", icon: ClipboardCheck,
    description: "For a confirmed vacancy, candidate information may be reviewed against eligibility, experience and document requirements. Initial contact may help clarify details; screening does not promise selection.",
    homepage: { title: "Initial Screening", description: "Candidate information may be reviewed against a confirmed vacancy’s eligibility, experience and document requirements." },
  },
  {
    id: "selection", title: "Employer Selection / Interview", icon: Users,
    description: "Where applicable, shortlisted candidates may take part in an interview, practical assessment or skills test. The employer’s selection process depends on the vacancy.",
    homepage: { title: "Employer Selection / Interview", description: "Interviews or assessments may apply. If selected, review the offer, contract and confirmed employment terms before proceeding." },
  },
  {
    id: "offer", title: "Offer & Employment Details", icon: FileCheck2,
    description: "If selected, review the confirmed salary, working conditions, benefits, location and contract. Verify the employment documents and ask about any unclear terms before agreeing to proceed.",
  },
  {
    id: "documents", title: "Documents, Medical & Official Requirements", icon: Files,
    description: "Selected candidates may need further documentation, medical checks, official registrations or clearances. Confirm which requirements apply to the vacancy and destination through the relevant official channels.",
    homepage: { title: "Documents & Official Requirements", description: "Confirm applicable documents, medical checks, registrations or clearances. Requirements vary by country and vacancy." },
  },
  {
    id: "travel", title: "Visa / Travel Preparation", icon: Plane,
    description: "Where required, complete the applicable visa, entry-permit and travel preparation steps. Confirm the arrangements and required approvals before booking or travelling; visa approval is not guaranteed.",
    homepage: { title: "Visa / Travel Preparation", description: "Complete applicable visa, entry-permit and travel preparation steps. Confirm the required approvals; visa approval is not guaranteed." },
  },
  {
    id: "pre-departure", title: "Pre-Departure Guidance", icon: Luggage,
    description: "Verify travel information, employer contacts and employment documents. Confirm any required orientation or official instructions, and keep relevant emergency and contact information accessible.",
    homepage: { title: "Pre-Departure Guidance", description: "Verify travel details, employment documents, employer contacts and any required orientation or official instructions." },
  },
  {
    id: "departure", title: "Departure & Overseas Employment", icon: MapPin,
    description: "Travel once the required approvals and arrangements are confirmed. Verify arrival and reporting instructions with the employer, including any agreed reception arrangements and whom to contact if plans change.",
    homepage: { title: "Departure & Overseas Employment", description: "Travel once approvals and arrangements are confirmed. Verify arrival instructions and agreed employer contacts before departure." },
  },
];

export const homepageRecruitmentProcess = recruitmentProcess.flatMap((stage) =>
  stage.homepage ? [{ id: stage.id, ...stage.homepage }] : []);

export const candidatePreparation = [
  "Identification and travel documents, where applicable",
  "Your CV, employment history and experience records",
  "Qualification certificates relevant to the role, where applicable",
  "A driving licence for driving roles, where applicable",
  "Current phone number, email and other contact details",
  "Any additional vacancy-specific documentation requested through verified channels",
] as const;

export const candidateVerification = [
  "Confirm the exact vacancy, employer and destination.",
  "Review the contract, salary, benefits and working conditions.",
  "Confirm A-One’s published contact channel before sharing information.",
  "Ask for clarification before providing documents or making payments.",
  "Verify applicable foreign-employment requirements through official channels.",
] as const;
