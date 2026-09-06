"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(9, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-teal-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0f1f3d] mb-2">Demo Form Validated</h3>
        <p className="text-sm text-slate-600 mb-6">
          Your message passed validation. This frontend demo did not transmit or store the data.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-900">
        Demo mode: this form validates locally only. Connect a protected server endpoint before
        accepting live enquiries.
      </div>
      <div>
        <label htmlFor="fullName" className="form-label">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input id="fullName" autoComplete="name" {...register("fullName")} className="form-input" placeholder="Your name" />
        {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className="form-input" placeholder="+94 7X XXX XXXX" />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input id="email" type="email" autoComplete="email" {...register("email")} className="form-input" placeholder="your@email.com" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="form-label">
          Subject <span className="text-red-500">*</span>
        </label>
        <input id="subject" {...register("subject")} className="form-input" placeholder="Inquiry subject" />
        {errors.subject && <p className="form-error">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea id="message" {...register("message")} className="form-input resize-none" rows={4} placeholder="How can we assist you?" />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary justify-center disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
