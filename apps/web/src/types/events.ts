/** Public event presentation model. No existing shared/admin Event model exists.
 * A future database adapter can supply these records without changing the gallery.
 * Keep sample metadata absent: illustrative entries are not historical events.
 */
export type RecruitmentEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  coverImage: { src: string; alt: string; position?: string };
  status: "draft" | "published";
  isFeatured: boolean;
} & (
  | { isDemo: true; date?: never; location?: never }
  | { isDemo: false; date?: string; location?: string }
);
