export const featuredCountrySlugs = [
  "saudi-arabia",
  "united-arab-emirates",
  "qatar",
  "kuwait",
  "oman",
  "bahrain",
] as const;

// Keep descriptions in sync when replacing the temporary generated assets.
export const featuredCountryImageAlt: Record<string, string> = {
  "saudi-arabia": "Generated view of Riyadh's modern skyline in warm desert light",
  "united-arab-emirates": "Generated view of Dubai's modern business district and skyline",
  qatar: "Generated view of Doha's skyline across the Gulf waterfront",
  kuwait: "Generated view of Kuwait City's waterfront and Kuwait Towers",
  oman: "Generated view of Muscat architecture framed by rocky mountains",
  bahrain: "Generated view of Manama's skyline along the Gulf waterfront",
};
