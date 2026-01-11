export type NavSubItem = { href: string; label: string };

export type NavItem = {
  href: string;
  label: string;
  subItems?: NavSubItem[];
};

export const INDUSTRIES_ITEMS: NavSubItem[] = [
  { href: "/industries/mining", label: "Mining" },
  { href: "/industries/automotive", label: "Automotive" },
  { href: "/industries/healthcare", label: "Healthcare" },
  { href: "/industries/oil-gas", label: "Oil & Gas" },
  { href: "/industries/education", label: "Education" },
  { href: "/industries/defense-security", label: "Defense & Security" },
  { href: "/industries/supply-chain", label: "Supply Chain" },
  { href: "/industries/mobility", label: "Mobility" },
];

export const NAV_ITEMS: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/why-fusion-ai", label: "Why Fusion AI?" },
  { href: "/industries", label: "Industries", subItems: INDUSTRIES_ITEMS },
  { href: "/company", label: "Company" },
];
