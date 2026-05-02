export type LanguageCode = "en" | "es" | "nl" | "fr" | "de" | "pt";

export const languages: Array<{ code: LanguageCode; label: string; shortLabel: string }> = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "nl", label: "Nederlands", shortLabel: "NL" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "de", label: "Deutsch", shortLabel: "DE" },
  { code: "pt", label: "Português", shortLabel: "PT" }
];

export type TranslationKey =
  | "nav.map"
  | "nav.regulations"
  | "nav.assessment"
  | "nav.timeline"
  | "nav.briefing"
  | "nav.dataQuality"
  | "header.legalPill"
  | "language.label"
  | "disclaimer.short"
  | "disclaimer.fullLabel"
  | "disclaimer.full"
  | "home.heroTitle"
  | "home.heroBody"
  | "home.currentView"
  | "home.highImpact"
  | "home.sources"
  | "home.whatsNew"
  | "home.viewChangelog"
  | "home.tableTitle"
  | "home.tableBody"
  | "home.viewAll"
  | "home.assessmentTitle"
  | "home.assessmentBody"
  | "home.startAssessment"
  | "home.languageCaveat"
  | "share.copyView"
  | "share.copied"
  | "export.csv"
  | "export.json";

type Dictionary = Record<LanguageCode, Record<TranslationKey, string>>;

export const dictionary: Dictionary = {
  en: {
    "nav.map": "Map",
    "nav.regulations": "Regulations",
    "nav.assessment": "Assessment",
    "nav.timeline": "Timeline",
    "nav.briefing": "Briefing",
    "nav.dataQuality": "Data Quality",
    "header.legalPill": "Intelligence tool, not legal advice",
    "language.label": "Language",
    "disclaimer.short": "Indicative regulatory intelligence for orientation and planning. Validate against primary sources before reliance.",
    "disclaimer.fullLabel": "Legal and data disclaimer:",
    "disclaimer.full":
      "This site provides structured ESG and sustainability regulatory intelligence for orientation and planning purposes only. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.",
    "home.currentView": "Current view",
    "home.highImpact": "High impact",
    "home.sources": "Sources",
    "home.whatsNew": "What's new",
    "home.viewChangelog": "View changelog",
    "home.tableTitle": "Regulation table preview",
    "home.tableBody": "Open the full Regulations workspace for deep review and filtering.",
    "home.viewAll": "View all",
    "home.assessmentTitle": "Not sure what applies?",
    "home.assessmentBody":
      "Answer a few questions to generate an indicative shortlist by jurisdiction, company type, sector and value-chain exposure.",
    "home.startAssessment": "Start assessment",
    "home.languageCaveat": "Language toggle translates product guidance; regulatory records remain source-linked seed intelligence.",
    "share.copyView": "Copy view link",
    "share.copied": "Copied",
    "export.csv": "Export CSV",
    "export.json": "Export JSON"
  },
  es: {
    "nav.map": "Mapa",
    "nav.regulations": "Regulaciones",
    "nav.assessment": "Evaluación",
    "nav.timeline": "Cronograma",
    "nav.briefing": "Informe",
    "nav.dataQuality": "Calidad de datos",
    "header.legalPill": "Inteligencia regulatoria, no asesoría legal",
    "language.label": "Idioma",
    "disclaimer.short": "Inteligencia regulatoria indicativa para orientación y planificación. Valide con fuentes primarias antes de confiar en ella.",
    "disclaimer.fullLabel": "Aviso legal y de datos:",
    "disclaimer.full":
      "Este sitio ofrece inteligencia regulatoria estructurada sobre ESG y sostenibilidad solo para orientación y planificación. No constituye asesoría legal, fiscal, de inversión ni de aseguramiento. La aplicabilidad depende de hechos específicos de la entidad, implementación jurisdiccional, reglas sectoriales e interpretación legal. Los usuarios deben validar los requisitos con asesores cualificados antes de usarlos para decisiones de cumplimiento.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Inteligencia regulatoria de sostenibilidad por jurisdicción, sector, cadena de valor y año de reporte.",
    "home.currentView": "Vista actual",
    "home.highImpact": "Alto impacto",
    "home.sources": "Fuentes",
    "home.whatsNew": "Novedades",
    "home.viewChangelog": "Ver cambios",
    "home.tableTitle": "Vista previa de regulaciones",
    "home.tableBody": "Abra el espacio de Regulaciones para una revisión y filtrado más profundos.",
    "home.viewAll": "Ver todo",
    "home.assessmentTitle": "¿No sabe qué aplica?",
    "home.assessmentBody": "Responda unas preguntas para generar una lista indicativa por jurisdicción, tipo de empresa, sector y cadena de valor.",
    "home.startAssessment": "Iniciar evaluación",
    "home.languageCaveat": "El selector traduce la guía del producto; los registros regulatorios siguen siendo datos semilla con fuentes.",
    "share.copyView": "Copiar enlace",
    "share.copied": "Copiado",
    "export.csv": "Exportar CSV",
    "export.json": "Exportar JSON"
  },
  nl: {
    "nav.map": "Kaart",
    "nav.regulations": "Regelgeving",
    "nav.assessment": "Beoordeling",
    "nav.timeline": "Tijdlijn",
    "nav.briefing": "Briefing",
    "nav.dataQuality": "Datakwaliteit",
    "header.legalPill": "Regelgevingsinformatie, geen juridisch advies",
    "language.label": "Taal",
    "disclaimer.short": "Indicatieve regelgevingsinformatie voor oriëntatie en planning. Valideer primaire bronnen vóór gebruik.",
    "disclaimer.fullLabel": "Juridische en data-disclaimer:",
    "disclaimer.full":
      "Deze site biedt gestructureerde ESG- en duurzaamheidsinformatie voor oriëntatie en planning. Dit is geen juridisch, fiscaal, investerings- of assurance-advies. Toepasselijkheid hangt af van entiteitsspecifieke feiten, nationale implementatie, sectorregels en juridische interpretatie. Gebruikers moeten vereisten valideren met gekwalificeerde adviseurs voordat zij hierop vertrouwen voor compliancebeslissingen.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Interactieve duurzaamheidsregelgeving per jurisdictie, sector, waardeketen en verslagjaar.",
    "home.currentView": "Huidige weergave",
    "home.highImpact": "Hoge impact",
    "home.sources": "Bronnen",
    "home.whatsNew": "Nieuw",
    "home.viewChangelog": "Wijzigingen bekijken",
    "home.tableTitle": "Voorbeeld regelgevingstabel",
    "home.tableBody": "Open de volledige Regelgeving-werkruimte voor diepere analyse en filtering.",
    "home.viewAll": "Alles bekijken",
    "home.assessmentTitle": "Niet zeker wat relevant is?",
    "home.assessmentBody": "Beantwoord enkele vragen voor een indicatieve shortlist per jurisdictie, bedrijfstype, sector en waardeketen.",
    "home.startAssessment": "Start beoordeling",
    "home.languageCaveat": "De taalschakelaar vertaalt productbegeleiding; regelgevingsrecords blijven brongekoppelde seed intelligence.",
    "share.copyView": "Link kopiëren",
    "share.copied": "Gekopieerd",
    "export.csv": "CSV exporteren",
    "export.json": "JSON exporteren"
  },
  fr: {
    "nav.map": "Carte",
    "nav.regulations": "Réglementations",
    "nav.assessment": "Évaluation",
    "nav.timeline": "Calendrier",
    "nav.briefing": "Briefing",
    "nav.dataQuality": "Qualité des données",
    "header.legalPill": "Veille réglementaire, pas un avis juridique",
    "language.label": "Langue",
    "disclaimer.short": "Veille réglementaire indicative pour l'orientation et la planification. Vérifiez les sources primaires avant toute utilisation.",
    "disclaimer.fullLabel": "Avertissement juridique et données :",
    "disclaimer.full":
      "Ce site fournit une veille réglementaire ESG et durabilité structurée uniquement à des fins d'orientation et de planification. Il ne constitue pas un avis juridique, fiscal, d'investissement ou d'assurance. L'applicabilité dépend des faits propres à l'entité, de la mise en œuvre locale, des règles sectorielles et de l'interprétation juridique. Les utilisateurs doivent valider les exigences avec des conseils qualifiés avant toute décision de conformité.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Veille réglementaire durabilité par juridiction, secteur, chaîne de valeur et année de reporting.",
    "home.currentView": "Vue active",
    "home.highImpact": "Fort impact",
    "home.sources": "Sources",
    "home.whatsNew": "Nouveautés",
    "home.viewChangelog": "Voir les changements",
    "home.tableTitle": "Aperçu de la table réglementaire",
    "home.tableBody": "Ouvrez l'espace Réglementations pour une revue et un filtrage approfondis.",
    "home.viewAll": "Tout voir",
    "home.assessmentTitle": "Vous ne savez pas ce qui est pertinent ?",
    "home.assessmentBody": "Répondez à quelques questions pour générer une liste indicative par juridiction, type d'entreprise, secteur et chaîne de valeur.",
    "home.startAssessment": "Démarrer l'évaluation",
    "home.languageCaveat": "Le sélecteur traduit l'interface; les fiches réglementaires restent des données seed avec sources.",
    "share.copyView": "Copier le lien",
    "share.copied": "Copié",
    "export.csv": "Exporter CSV",
    "export.json": "Exporter JSON"
  },
  de: {
    "nav.map": "Karte",
    "nav.regulations": "Regulierung",
    "nav.assessment": "Bewertung",
    "nav.timeline": "Zeitplan",
    "nav.briefing": "Briefing",
    "nav.dataQuality": "Datenqualität",
    "header.legalPill": "Regulatorische Orientierung, keine Rechtsberatung",
    "language.label": "Sprache",
    "disclaimer.short": "Indikative regulatorische Informationen zur Orientierung und Planung. Vor Nutzung anhand von Primärquellen validieren.",
    "disclaimer.fullLabel": "Rechts- und Datenhinweis:",
    "disclaimer.full":
      "Diese Website bietet strukturierte ESG- und Nachhaltigkeitsregulierung nur zur Orientierung und Planung. Sie ist keine Rechts-, Steuer-, Anlage- oder Prüfungsberatung. Die Anwendbarkeit hängt von unternehmensspezifischen Fakten, nationaler Umsetzung, Branchenregeln und rechtlicher Auslegung ab. Nutzer sollten Anforderungen mit qualifizierten Beratern validieren, bevor sie diese für Compliance-Entscheidungen verwenden.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Interaktive Nachhaltigkeitsregulierung nach Jurisdiktion, Sektor, Wertschöpfungskette und Berichtsjahr.",
    "home.currentView": "Aktuelle Ansicht",
    "home.highImpact": "Hohe Wirkung",
    "home.sources": "Quellen",
    "home.whatsNew": "Neuigkeiten",
    "home.viewChangelog": "Änderungen anzeigen",
    "home.tableTitle": "Vorschau der Regulierungstabelle",
    "home.tableBody": "Öffnen Sie den Regulierung-Arbeitsbereich für vertiefte Prüfung und Filterung.",
    "home.viewAll": "Alles anzeigen",
    "home.assessmentTitle": "Nicht sicher, was relevant ist?",
    "home.assessmentBody": "Beantworten Sie wenige Fragen für eine indikative Auswahl nach Jurisdiktion, Unternehmenstyp, Sektor und Wertschöpfungskette.",
    "home.startAssessment": "Bewertung starten",
    "home.languageCaveat": "Der Sprachschalter übersetzt Produktführung; Regulierungsdaten bleiben quellverlinkte Seed Intelligence.",
    "share.copyView": "Ansichtslink kopieren",
    "share.copied": "Kopiert",
    "export.csv": "CSV exportieren",
    "export.json": "JSON exportieren"
  },
  pt: {
    "nav.map": "Mapa",
    "nav.regulations": "Regulações",
    "nav.assessment": "Avaliação",
    "nav.timeline": "Cronograma",
    "nav.briefing": "Briefing",
    "nav.dataQuality": "Qualidade dos dados",
    "header.legalPill": "Inteligência regulatória, não aconselhamento jurídico",
    "language.label": "Idioma",
    "disclaimer.short": "Inteligência regulatória indicativa para orientação e planejamento. Valide fontes primárias antes de confiar.",
    "disclaimer.fullLabel": "Aviso jurídico e de dados:",
    "disclaimer.full":
      "Este site fornece inteligência regulatória estruturada de ESG e sustentabilidade apenas para orientação e planejamento. Não constitui aconselhamento jurídico, fiscal, de investimento ou asseguração. A aplicabilidade depende de fatos específicos da entidade, implementação jurisdicional, regras setoriais e interpretação jurídica. Usuários devem validar requisitos com assessores qualificados antes de usar as informações para decisões de conformidade.",
    "home.heroTitle": "Etica ESG · Regulatory Atlas",
    "home.heroBody": "Inteligência regulatória de sustentabilidade por jurisdição, setor, cadeia de valor e ano de reporte.",
    "home.currentView": "Vista atual",
    "home.highImpact": "Alto impacto",
    "home.sources": "Fontes",
    "home.whatsNew": "Novidades",
    "home.viewChangelog": "Ver alterações",
    "home.tableTitle": "Prévia da tabela regulatória",
    "home.tableBody": "Abra o espaço Regulações para revisão e filtros mais profundos.",
    "home.viewAll": "Ver tudo",
    "home.assessmentTitle": "Não sabe o que é relevante?",
    "home.assessmentBody": "Responda a algumas perguntas para gerar uma lista indicativa por jurisdição, tipo de empresa, setor e cadeia de valor.",
    "home.startAssessment": "Iniciar avaliação",
    "home.languageCaveat": "O seletor traduz a orientação do produto; os registros regulatórios continuam como seed intelligence com fontes.",
    "share.copyView": "Copiar link",
    "share.copied": "Copiado",
    "export.csv": "Exportar CSV",
    "export.json": "Exportar JSON"
  }
};

export function translate(language: LanguageCode, key: TranslationKey) {
  return dictionary[language]?.[key] || dictionary.en[key];
}
