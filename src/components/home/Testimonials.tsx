import { Star } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonials } from "@/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-slate-50" aria-labelledby="testimonials-heading">
      <div className="container-padded">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <SectionHeading
            label="What Candidates Say"
            title="Recruitment Experiences"
            subtitle="The following are sample testimonials. We share genuine candidate feedback once real placements are confirmed."
            centered
          />
          {/* Demo notice */}
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md px-3 py-1.5">
            <span className="text-xs text-amber-700">
              ℹ️ These are illustrative examples, not verified testimonials.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col"
              aria-label={`Testimonial from ${t.name}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f1f3d] text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">
                      {t.role} · {t.country}
                    </div>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
              <blockquote className="text-sm text-slate-600 leading-relaxed italic flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
