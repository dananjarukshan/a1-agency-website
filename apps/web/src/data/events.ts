import type { RecruitmentEvent } from "@/types/events";

// Development previews only. Reuse existing local illustrative assets; these
// are not photographs or records of A-One events. Replace with approved records
// when the Events backend is available. No dates or locations are invented.
export const recruitmentEvents: readonly RecruitmentEvent[] = [
  {
    id: "sample-candidate-preparation",
    slug: "sample-candidate-preparation",
    title: "Candidate preparation",
    summary: "An illustrative look at the conversations and guidance that can support a candidate’s recruitment journey.",
    category: "Candidate guidance",
    coverImage: {
      src: "/images/recruitment-consultation.png",
      alt: "Illustrative candidate and adviser in conversation; a development sample, not an actual A-One event.",
      position: "70% center",
    },
    status: "published",
    isFeatured: true,
    isDemo: true,
  },
  {
    id: "sample-employer-engagement",
    slug: "sample-employer-engagement",
    title: "Employer engagement",
    summary: "A sample view of a professional discussion about workforce planning and recruitment needs.",
    category: "Employer connections",
    coverImage: {
      src: "/images/employer-planning.png",
      alt: "Illustrative professionals discussing recruitment plans; a development sample with no real employer affiliation.",
      position: "30% center",
    },
    status: "published",
    isFeatured: false,
    isDemo: true,
  },
  {
    id: "sample-departure-preparation",
    slug: "sample-departure-preparation",
    title: "Preparing for the next chapter",
    summary: "An illustrative overseas-career scene representing the theme of pre-departure preparation.",
    category: "Pre-departure guidance",
    coverImage: {
      src: "/images/recruitment-experiences-background.png",
      alt: "Illustration of workers, an adviser and an aircraft at an airport; not a photograph of an A-One deployment.",
      position: "75% center",
    },
    status: "published",
    isFeatured: false,
    isDemo: true,
  },
];
