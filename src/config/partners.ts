export type Partner = {
  id: string;
  name: string;
  logo: string;
  alt: string;
  isDemo: boolean;
  website?: string;
  country?: string;
};

export const partners: Partner[] = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: `demo-partner-${number}`,
    name: `Demo Partner ${number}`,
    logo: `/images/partners/demo-partner-${number}.png`,
    alt: `Demo Partner ${number} placeholder logo`,
    isDemo: true,
  };
});
