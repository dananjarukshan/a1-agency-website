import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Overseas Jobs for Sri Lankans`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "overseas jobs Sri Lanka",
    "foreign employment Sri Lanka",
    "manpower recruitment agency Sri Lanka",
    "Middle East jobs",
    "Saudi Arabia jobs Sri Lankans",
    "UAE jobs Sri Lanka",
    "Qatar jobs Sri Lanka",
    "overseas employment",
    "Sri Lankan workers abroad",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/images/recruitment-consultation.png",
        width: 1728,
        height: 920,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/recruitment-consultation.png"],
  },
  robots: {
    index: siteConfig.contentMode !== "demo",
    follow: siteConfig.contentMode !== "demo",
    googleBot: {
      index: siteConfig.contentMode !== "demo",
      follow: siteConfig.contentMode !== "demo",
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 scroll-mt-20 xl:scroll-mt-28" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
