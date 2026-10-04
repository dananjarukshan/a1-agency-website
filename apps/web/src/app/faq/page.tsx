import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HelpCircle, Phone } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { faqs } from "@/data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | ${siteConfig.shortName}`,
  description:
    "Find answers to common questions about applying for overseas jobs, required documents, medicals, visa processing, and employer recruitment services.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-brand-black">
        <div className="container-padded py-12">
          <Breadcrumbs items={[{ label: "FAQ" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-base max-w-2xl">
            Everything you need to know about overseas job applications, legal requirements, candidate processing, and employer services.
          </p>
        </div>
      </div>

      <div className="container-padded py-12 max-w-4xl">
        {categories.map((cat) => {
          const categoryFaqs = faqs.filter((f) => f.category === cat);
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-xl font-bold text-[#0f1f3d] mb-4 pb-2 border-b border-slate-200">
                {cat}
              </h2>
              <div className="space-y-3">
                {categoryFaqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                  >
                    <summary className="flex items-start justify-between gap-3 px-6 py-4 cursor-pointer list-none font-semibold text-[#0f1f3d] text-base hover:bg-slate-50 transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight
                        size={18}
                        className="text-slate-400 group-open:rotate-90 transition-transform duration-200 flex-shrink-0 mt-1"
                      />
                    </summary>
                    <div className="px-6 pb-5 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}

        {/* Still have questions? */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center mt-12">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-[#0f1f3d]">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-[#0f1f3d] mb-2">Still Have Questions?</h3>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
            Our recruitment officers are available during office hours to answer your questions and guide you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary">
              <Phone size={16} /> Contact Us
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}




