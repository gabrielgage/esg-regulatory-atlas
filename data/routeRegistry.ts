import type { LanguageCode, TranslationKey } from "../lib/i18n";

export type RoutePlacement = "primary" | "more" | "contextual" | "internal";
export type RouteVisibility = "public" | "internal" | "template";
export type RouteRobots = "index" | "noindex";
export type RouteGroupId = "planning" | "trust" | "commercial";

export type RouteLabelSet = Record<LanguageCode, string>;

export type RouteRegistryItem = {
  href: string;
  labelKey?: TranslationKey;
  labels?: RouteLabelSet;
  placement: RoutePlacement;
  visibility: RouteVisibility;
  robots: RouteRobots;
  group?: RouteGroupId;
  template?: boolean;
  description: string;
  primaryUserDecision: string;
};

export const moreNavigationGroups = [
  {
    id: "planning",
    labels: {
      en: "Planning views",
      es: "Vistas de planificación",
      nl: "Planningsweergaven",
      fr: "Vues de planification",
      de: "Planungsansichten",
      pt: "Visões de planejamento"
    }
  },
  {
    id: "trust",
    labels: {
      en: "Trust and methodology",
      es: "Confianza y metodología",
      nl: "Vertrouwen en methodologie",
      fr: "Confiance et méthodologie",
      de: "Vertrauen und Methodik",
      pt: "Confiança e metodologia"
    }
  },
  {
    id: "commercial",
    labels: {
      en: "Commercial previews",
      es: "Vistas comerciales",
      nl: "Commerciële previews",
      fr: "Aperçus commerciaux",
      de: "Kommerzielle Vorschauen",
      pt: "Prévias comerciais"
    }
  }
] as const satisfies Array<{ id: RouteGroupId; labels: RouteLabelSet }>;

export const routeRegistry = [
  route("/", "nav.map", "primary", "public", "index", "Map-first product workspace.", "Start from a market, map view or priority record."),
  route("/assessment", "nav.assessment", "primary", "public", "index", "Indicative applicability assessment.", "Answer profile questions and get a cautious shortlist."),
  route("/markets", "nav.markets", "primary", "public", "index", "Market and jurisdiction profile index.", "Choose a market before opening deeper records."),
  route("/regulations", "nav.regulations", "primary", "public", "index", "Search-first regulation database.", "Search and filter source-linked regulatory records."),
  route("/advisory", "nav.advisory", "primary", "public", "index", "Manual advisory-scan service surface.", "Request source-linked planning support."),
  route("/sectors", "nav.sectors", "more", "public", "index", "Searchable sector finder.", "Start from a sector and inspect likely trigger records.", "planning"),
  route("/timeline", "nav.timeline", "more", "public", "index", "Date-driven regulatory planning view.", "Review near-term milestones and reporting years.", "planning"),
  route("/briefing", "nav.briefing", "more", "public", "index", "Scenario-led executive briefing workspace.", "Choose a scenario before copying client-ready planning text.", "planning"),
  route(
    "/value-chain",
    undefined,
    "more",
    "public",
    "index",
    "Six-lane value-chain exposure workspace.",
    "Start from suppliers, trade, products, portfolio, operations or customer pressure.",
    "planning",
    { en: "Value chain", es: "Cadena de valor", nl: "Waardeketen", fr: "Chaîne de valeur", de: "Wertschöpfung", pt: "Cadeia de valor" }
  ),
  route(
    "/functions",
    undefined,
    "more",
    "public",
    "index",
    "Internal owner workbench for likely business functions.",
    "Start from sustainability, finance, legal, procurement, risk or board ownership needs.",
    "planning",
    { en: "Functions", es: "Funciones", nl: "Functies", fr: "Fonctions", de: "Funktionen", pt: "Funções" }
  ),
  route(
    "/thresholds",
    undefined,
    "more",
    "public",
    "index",
    "High-value threshold matrix.",
    "Review facts to confirm before treating a record as decision-ready.",
    "planning",
    { en: "Thresholds", es: "Umbrales", nl: "Drempels", fr: "Seuils", de: "Schwellen", pt: "Limiares" }
  ),
  route(
    "/methodology",
    undefined,
    "more",
    "public",
    "index",
    "Public methodology and source approach.",
    "Understand how seed intelligence, sources and caveats are handled.",
    "trust",
    { en: "Methodology", es: "Metodología", nl: "Methodologie", fr: "Méthodologie", de: "Methodik", pt: "Metodologia" }
  ),
  route("/data-quality", "nav.dataQuality", "more", "public", "index", "Data-quality and source-governance dashboard.", "Inspect coverage, source posture and review risk.", "trust"),
  route(
    "/glossary",
    undefined,
    "more",
    "public",
    "index",
    "Plain-English glossary for Atlas labels.",
    "Clarify regulatory and product terminology.",
    "trust",
    { en: "Glossary", es: "Glosario", nl: "Woordenlijst", fr: "Glossaire", de: "Glossar", pt: "Glossário" }
  ),
  route(
    "/changelog",
    undefined,
    "more",
    "public",
    "index",
    "Public edition and change history.",
    "Check what changed in the current seed release.",
    "trust",
    { en: "Changelog", es: "Cambios", nl: "Wijzigingslog", fr: "Journal des changements", de: "Änderungsprotokoll", pt: "Registro de alterações" }
  ),
  route("/plans", "nav.plans", "more", "public", "index", "Free/advisory/premium/future path overview.", "Choose between the live free Atlas and manual advisory path.", "commercial"),
  route("/alerts", "nav.alerts", "more", "public", "index", "Static premium alert preview.", "Preview watchlist and digest concepts without live automation.", "commercial"),
  route(
    "/premium-roadmap",
    undefined,
    "more",
    "public",
    "index",
    "Static premium-market-pack roadmap.",
    "Inspect future premium concepts before infrastructure is approved.",
    "commercial",
    { en: "Premium roadmap", es: "Hoja de ruta premium", nl: "Premium roadmap", fr: "Feuille de route premium", de: "Premium-Roadmap", pt: "Roadmap premium" }
  ),
  route(
    "/about",
    undefined,
    "more",
    "public",
    "index",
    "Etica ESG publisher and product context.",
    "Understand who publishes the Atlas and how to contact Etica ESG.",
    "commercial",
    { en: "About Etica ESG", es: "Acerca de Etica ESG", nl: "Over Etica ESG", fr: "À propos d'Etica ESG", de: "Über Etica ESG", pt: "Sobre a Etica ESG" }
  ),
  route("/compare", undefined, "contextual", "public", "index", "Side-by-side jurisdiction or regulation comparison.", "Compare two markets or two records from contextual links."),
  route("/launch", undefined, "internal", "internal", "noindex", "Internal launch and outreach asset workspace.", "Copy launch assets for operator use; keep out of public navigation."),
  route("/jurisdiction/[code]", undefined, "contextual", "template", "index", "Dynamic market profile template.", "Open a selected jurisdiction profile.", undefined, undefined, true),
  route("/jurisdiction/[code]/brief", undefined, "contextual", "template", "index", "Printable dynamic jurisdiction brief template.", "Copy or print a selected jurisdiction brief.", undefined, undefined, true),
  route("/regulations/[slug]", undefined, "contextual", "template", "index", "Dynamic regulation detail template.", "Inspect a selected regulation record.", undefined, undefined, true),
  route("/edition/[edition]/regulations/[slug]", undefined, "contextual", "template", "index", "Edition snapshot regulation detail template.", "Review a regulation record in edition context.", undefined, undefined, true),
  route("/premium-packs/[id]", undefined, "contextual", "template", "index", "Static premium pack sample template.", "Inspect a sample premium pack scope.", undefined, undefined, true),
  route("/sectors/[slug]", undefined, "contextual", "template", "index", "Dynamic sector profile template.", "Inspect one sector's tracked seed signals.", undefined, undefined, true)
] as const satisfies RouteRegistryItem[];

export const primaryNavItems = routeRegistry.filter((item) => item.placement === "primary");

export const secondaryNavGroups = moreNavigationGroups.map((group) => ({
  ...group,
  items: routeRegistry.filter((item) => item.placement === "more" && item.group === group.id)
}));

export function routeByHref(href: string) {
  return routeRegistry.find((item) => item.href === href);
}

export function routeLabel(item: Pick<RouteRegistryItem, "href" | "labelKey" | "labels">, language: LanguageCode, t: (key: TranslationKey) => string) {
  if (item.labelKey) return t(item.labelKey);
  return item.labels?.[language] || item.labels?.en || item.href;
}

function route(
  href: string,
  labelKey: TranslationKey | undefined,
  placement: RoutePlacement,
  visibility: RouteVisibility,
  robots: RouteRobots,
  description: string,
  primaryUserDecision: string,
  group?: RouteGroupId,
  labels?: RouteLabelSet,
  template?: boolean
): RouteRegistryItem {
  return {
    href,
    labelKey,
    labels,
    placement,
    visibility,
    robots,
    group,
    template,
    description,
    primaryUserDecision
  };
}
