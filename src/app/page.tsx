import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import HeroSection from "@/components/home/HeroSection";
import MissionVision from "@/components/home/MissionVision";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import PopularDestinations from "@/components/home/PopularDestinations";
import JobCategories from "@/components/home/JobCategories";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import EmployerCTA from "@/components/home/EmployerCTA";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: `Overseas Jobs for Sri Lankans | ${siteConfig.name}`,
  description:
    "Browse overseas job opportunities for Sri Lankans in Saudi Arabia, UAE, Qatar, Kuwait, Oman and more. Search roles and explore the application journey.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionVision />
      <FeaturedJobs />
      <PopularDestinations />
      <JobCategories />
      <HowItWorks />
      <WhyChooseUs />
      <EmployerCTA />
      <Testimonials />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}
