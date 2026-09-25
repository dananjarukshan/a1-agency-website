import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldAlert, MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.shortName}`,
  description:
    `Contact ${siteConfig.name} by office visit, phone, or email.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phoneConfigured = Boolean(siteConfig.phone);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-12">
          <Breadcrumbs items={[{ label: "Contact Us" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Contact Our Recruitment Office
          </h1>
          <p className="text-slate-300 text-base max-w-2xl">
            Have questions about overseas vacancies or manpower recruitment? Reach out to our recruitment team.
          </p>
        </div>
      </div>

      <div className="container-padded py-12">
        {/* Scam Warning Alert */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-10 flex items-start gap-3.5">
          <ShieldAlert size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-amber-900 text-sm">Official Communication Channels Only</h2>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              Before launch, replace every placeholder below with confirmed agency details. Candidates should communicate only through contact channels the agency has formally published.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h2 className="font-bold text-[#0f1f3d] text-lg mb-2">Office Information</h2>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0f1f3d] flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Main Office Address</p>
                  <p className="font-semibold text-[#0f1f3d] leading-snug">
                    {siteConfig.address.line1}<br />
                    {siteConfig.address.line2}<br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0f1f3d] flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Telephone & Mobile</p>
                  {phoneConfigured ? (
                    <a href={siteConfig.phoneHref} className="font-semibold text-[#0f1f3d] hover:text-blue-700 block">
                      {siteConfig.phoneDisplay}
                    </a>
                  ) : (
                    <p className="font-semibold text-slate-500">Official number to be provided</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">WhatsApp Inquiry</p>
                  {siteConfig.whatsapp ? (
                    <a
                      href={whatsappUrl(siteConfig.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal-700 hover:underline block"
                    >
                      {siteConfig.whatsappDisplay} (Chat Now)
                    </a>
                  ) : (
                    <p className="font-semibold text-slate-500">Official number to be provided</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0f1f3d] flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email Support</p>
                  <a href={siteConfig.emailHref} className="font-semibold text-[#0f1f3d] hover:text-blue-700 block">
                    {siteConfig.email}
                  </a>
                  <a href={`mailto:${siteConfig.emailEmployers}`} className="text-xs text-slate-500 hover:underline block mt-0.5">
                    Employers: {siteConfig.emailEmployers}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0f1f3d] flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Office Hours</p>
                  <p className="font-semibold text-[#0f1f3d]">{siteConfig.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
              <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm font-medium mb-3">
                📍 Interactive Google Map Embed Area
              </div>
              <p className="text-xs text-slate-500">
                Replace this area with the confirmed office map before launch.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <h2 className="font-bold text-[#0f1f3d] text-xl mb-2">Send Us a Message</h2>
            <p className="text-sm text-slate-600 mb-6">
              Fill out the form below and our recruitment coordinator will respond to you promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
