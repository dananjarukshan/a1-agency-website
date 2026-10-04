import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "@/components/admin/layout/Sidebar";
import { AdminTopbar } from "@/components/admin/layout/Topbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin — A-One Agency",
    default: "Admin Dashboard — A-One Agency",
  },
  description: "Administrative control center for A-One Agency operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <div className="flex min-h-screen bg-slate-50">
          <AdminSidebar />
          <div className="ml-64 flex flex-1 flex-col transition-all">
            <AdminTopbar />
            <main id="admin-main" className="flex-1 p-6 pt-20">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
