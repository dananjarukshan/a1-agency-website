import {
  BriefcaseBusiness, Car, Coffee, Cog, Cpu, HardHat, HeartPulse, Hotel,
  House, Landmark, Package, Scissors, Shield, Shirt, Sparkles, Sprout,
  Users, Wrench, Zap, type LucideIcon, type LucideProps,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Car, Coffee, Cog, Cpu, HardHat, HeartPulse, Hotel, House, Landmark,
  Package, Scissors, Shield, Shirt, Sparkles, Sprout, Users, Wrench, Zap,
};

/** Explicit imports only; unknown and inherited object keys get a safe fallback. */
export function CategoryIcon({ name, ...props }: LucideProps & { name: string }) {
  const Icon = Object.hasOwn(categoryIcons, name) ? categoryIcons[name] : BriefcaseBusiness;
  return <Icon {...props} />;
}
