import Image from "next/image";
import { Globe2 } from "lucide-react";
import type { Country } from "@/types";
import { featuredCountryImageAlt } from "@/config/featured-countries";
import styles from "./Countries.module.css";

export default function CountryVisual({ country, hero = false }: { country: Country; hero?: boolean }) {
  const imageAlt = featuredCountryImageAlt[country.slug];
  return (
    <div className={hero ? styles.heroVisual : styles.cardVisual}>
      {imageAlt ? (
        <Image src={country.image} alt={imageAlt} fill
          sizes={hero ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw"} />
      ) : (
        <div className={styles.fallback}>
          <Globe2 size={hero ? 90 : 64} strokeWidth={.8} aria-hidden="true" />
          <span>{country.region}</span>
          <small>International recruitment market</small>
        </div>
      )}
      <span className={styles.visualCaption}>{imageAlt ? "Generated destination illustration" : "Geographic illustration"}</span>
    </div>
  );
}
