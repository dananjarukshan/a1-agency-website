import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label && (
        <div className={cn("section-label", centered && "justify-center")}>
          {label}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1f3d] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
