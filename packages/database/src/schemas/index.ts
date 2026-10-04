import { z } from "zod";

export const contactMessageSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const applicantSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  nicOrPassport: z.string().min(6, "NIC or Passport number is required"),
  jobId: z.string().optional(),
  jobTitle: z.string().optional(),
  countryPreference: z.string().optional(),
  experienceYears: z.number().nonnegative().optional(),
  cvUrl: z.string().url().optional(),
});

export type ApplicantInput = z.infer<typeof applicantSchema>;
