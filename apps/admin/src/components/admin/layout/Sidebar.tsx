"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Globe,
  Tag,
  Star,
  Image,
  Bell,
  Calendar,
  HelpCircle,
  UserCircle,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { href: "/jobs", label: "Job Vacancies", icon: Briefcase },
      { href: "/applicants", label: "Applicants", icon: Users },
      { href: "/employer-requests", label: "Employer Requests", icon: Building2 },
    ],
  },
  {
    label: "Taxonomy",
    items: [
      { href: "/taxonomy/countries", label: "Countries", icon: Globe },
      { href: "/taxonomy/categories", label: "Job Categories", icon: Tag },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/reviews", label: "Reviews", icon: Star },
      { href: "/media", label: "Media Gallery", icon: Image },
      { href: "/announcements", label: "Announcements", icon: Bell },
      { href: "/events", label: "Events", icon: Calendar },
      { href: "/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/team", label: "Team Members", icon: UserCircle },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/contact-messages", label: "Contact Messages", icon: MessageSquare },
    ],
  },
];

function NavItem({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-brand-gold text-brand-black shadow-sm"
          : "text-navy-200 hover:bg-navy-800 hover:text-white",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("shrink-0", isActive ? "size-4" : "size-4")} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(navGroups.map((g) => [g.label, true]))
  );
  const router = useRouter();

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-navy-800 bg-navy-950 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-navy-800 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-brand-gold" />
            <span className="text-sm font-bold text-white">A-One Admin</span>
          </div>
        )}
        {collapsed && <Shield className="mx-auto size-5 text-brand-gold" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-md p-1.5 text-navy-400 transition hover:bg-navy-800 hover:text-white",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu className="size-4" /> : <X className="size-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between px-3 pb-1"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-navy-500">
                  {group.label}
                </span>
                {expandedGroups[group.label] ? (
                  <ChevronDown className="size-3 text-navy-500" />
                ) : (
                  <ChevronRight className="size-3 text-navy-500" />
                )}
              </button>
            )}
            {(collapsed || expandedGroups[group.label]) && (
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem key={item.href} {...item} collapsed={collapsed} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-navy-800 p-2">
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-300 transition hover:bg-red-500/10 hover:text-red-400",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
