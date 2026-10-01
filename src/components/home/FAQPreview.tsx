import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { faqs } from "@/data";

export default function FAQPreview() {
  const preview = faqs.slice(0, 5);

  return (
    <section className="section-padding bg-white" aria-labelledby="faq-preview-heading">
      <div className="container-padded">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <SectionHeading
              label="Common Questions"
              title="Questions"
              subtitle="Answers to the questions we hear most from job seekers and employers."
            />
            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 btn btn-primary"
              aria-label="View all frequently asked questions"
            >
              View All FAQs
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Right – FAQ list */}
          <div className="lg:col-span-3 space-y-3">
            {preview.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-lg border border-slate-200 bg-white"
              >
                <summary
                  className="flex items-start justify-between gap-3 px-5 py-4 cursor-pointer list-none"
                  aria-label={faq.question}
                >
                  <span className="font-semibold text-[#0f1f3d] text-sm leading-relaxed">
                    {faq.question}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-slate-400 group-open:rotate-90 transition-transform duration-200 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
