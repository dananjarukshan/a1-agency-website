import type { FAQ } from "@/types";

export type PublicFAQ = FAQ & { links?: { label: string; href: string }[] };

/** Canonical public answers. Keep existing IDs stable for previews and references. */
export const faqs: PublicFAQ[] = [
  { id: "faq-1", category: "Applying for Jobs", order: 1,
    question: "How can I apply for an overseas job?",
    answer: "Explore roles and review their requirements, then contact A-One to confirm how to apply for a current vacancy. Jobs on this development website are sample listings. The demo application form does not send or store applications or CVs.",
    links: [{ label: "Explore Jobs", href: "/jobs" }, { label: "Contact A-One", href: "/contact" }] },
  { id: "faq-2", category: "Applying for Jobs", order: 2,
    question: "Do I need previous overseas experience to apply?",
    answer: "Experience requirements depend on the vacancy and employer. Review the role’s stated qualifications and experience criteria, and ask A-One to clarify whether your background matches the confirmed requirements.",
    links: [{ label: "Explore Recruitment Fields", href: "/job-categories" }] },
  { id: "faq-3", category: "Applying for Jobs", order: 3,
    question: "Can I apply for multiple jobs at the same time?",
    answer: "You can explore more than one role, but confirm the arrangements for multiple applications with A-One. Focus on vacancies that match your skills and qualifications; employer acceptance is not guaranteed." },
  { id: "faq-4", category: "Documents", order: 4,
    question: "What documents are normally required for overseas employment?",
    answer: "Requirements depend on the vacancy and destination. Examples may include identification, a passport where applicable, a CV, qualifications, experience records and a driving licence for driving roles. Confirm the exact list, including any vacancy-specific documents, before arranging them." },
  { id: "faq-5", category: "Documents", order: 5,
    question: "Do I need to obtain a passport before applying?",
    answer: "Passport requirements and when details are needed depend on the vacancy and applicable travel or entry processes. Ask A-One what is needed at the application stage and verify current official requirements before making travel plans." },
  { id: "faq-6", category: "Recruitment Process", order: 6,
    question: "How will I know whether I have been shortlisted?",
    answer: "For a confirmed application, ask A-One how updates will be communicated and keep your contact details current. Shortlisting depends on the vacancy and employer. The website’s demo application does not trigger recruitment follow-up." },
  { id: "faq-7", category: "Recruitment Process", order: 7,
    question: "How long does the recruitment process take?",
    answer: "Timing varies with employer selection, documents, vacancy requirements, medical or official checks where applicable, and visa or entry processes. Destination requirements can also affect timing. Confirm the current steps with A-One; no processing time or departure date is guaranteed.",
    links: [{ label: "Explore the Recruitment Journey", href: "/how-it-works" }] },
  { id: "faq-8", category: "Recruitment Process", order: 8,
    question: "Will I need to attend an interview?",
    answer: "Depending on the vacancy, shortlisted candidates may be invited to an in-person or online interview, practical assessment or skills test. Confirm the format and preparation needed for the specific role; an interview or selection is not guaranteed." },
  { id: "faq-9", category: "Overseas Employment", order: 9,
    question: "What regulatory approvals are required before departure?",
    answer: "Candidates should follow the current requirements published by the Sri Lanka Bureau of Foreign Employment (SLBFE) and other relevant authorities. Requirements vary by destination and vacancy; ask the recruitment team to explain the applicable steps and official channels.",
    links: [{ label: "Review the Recruitment Journey", href: "/how-it-works" }] },
  { id: "faq-10", category: "Overseas Employment", order: 10,
    question: "Are job offers guaranteed?",
    answer: "No. Final selection depends on the employer’s requirements and assessment. An application or interview does not guarantee a job offer, visa approval or overseas placement. Review confirmed employment terms before proceeding." },
  { id: "faq-11", category: "Employer Services", order: 11,
    question: "How can an overseas company recruit Sri Lankan workers through your agency?",
    answer: "Explore the For Employers page and contact A-One to discuss your roles, workforce needs and proposed employment terms. The Request Manpower form currently provides a demonstration only; it does not transmit or store an enquiry.",
    links: [{ label: "For Employers", href: "/employers" }, { label: "Request Manpower", href: "/employers/request-manpower" }] },
  { id: "faq-12", category: "Contact & Support", order: 12,
    question: "How can I contact the recruitment team?",
    answer: "Use A-One’s published phone number or email to discuss current recruitment information. The Contact page lists the office address and opening hours. Confirm the contact channel before sharing documents or making payments.",
    links: [{ label: "Contact A-One", href: "/contact" }] },
];

// A balanced candidate preview: applying, documents, timing, interviews and offers.
const previewIds = new Set(["faq-1", "faq-4", "faq-7", "faq-8", "faq-10"]);
export const homepageFaqs = faqs.filter((faq) => previewIds.has(faq.id));
