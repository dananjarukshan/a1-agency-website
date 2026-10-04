import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
}

export function FormSection({
  title,
  description,
  children,
  className,
  columns = 2,
}: FormSectionProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-card", className)}>
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
        {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
      </div>
      <div className={cn("grid gap-4", gridClass)}>{children}</div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  fullWidth,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "col-span-full", className)}>
      <label htmlFor={id} className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-slate-400">{hint}</p>}
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition",
        "placeholder:text-slate-400 focus:ring-2 focus:ring-navy-500/20",
        error
          ? "border-red-300 focus:border-red-400"
          : "border-slate-300 focus:border-navy-400",
        className
      )}
      {...props}
    />
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition",
        "placeholder:text-slate-400 focus:ring-2 focus:ring-navy-500/20 resize-none",
        error
          ? "border-red-300 focus:border-red-400"
          : "border-slate-300 focus:border-navy-400",
        className
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ error, options, placeholder, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition bg-white",
        "focus:ring-2 focus:ring-navy-500/20",
        error
          ? "border-red-300 focus:border-red-400"
          : "border-slate-300 focus:border-navy-400",
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "yellow" | "red" | "blue" | "slate" | "amber" | "orange";
  className?: string;
}

const badgeVariants = {
  green: "bg-teal-100 text-teal-700",
  yellow: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-700",
  slate: "bg-slate-100 text-slate-600",
  amber: "bg-amber-100 text-amber-800",
  orange: "bg-orange-100 text-orange-700",
};

export function Badge({ children, variant = "slate", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ label, value, icon: Icon, iconColor = "text-navy-600", trend, trendUp }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-navy-900">{value}</p>
          {trend && (
            <p className={cn("mt-1 text-[11px] font-medium", trendUp ? "text-teal-600" : "text-red-500")}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg bg-slate-50 p-2.5", iconColor)}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold text-navy-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}

export function ActionButton({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-navy-800 text-white hover:bg-navy-700 focus:ring-navy-600",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  if (href) {
    const Link = require("next/link").default;
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </button>
  );
}
