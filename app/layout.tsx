import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { DATASET_META } from "@/data/_meta";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATASET_META.publisherUrl),
  title: {
    default: "Etica ESG · Regulatory Atlas",
    template: "%s | Etica ESG"
  },
  description: "Etica ESG · Independent ESG regulatory radar across 15 jurisdictions, 80+ regulations, with source citations and a published review cadence.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Etica ESG · Regulatory Atlas",
    description: "Independent ESG regulatory radar across 15 jurisdictions, 80+ source-linked records and edition-tracked review notes.",
    images: ["/og-image.svg"],
    siteName: DATASET_META.publisher,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Etica ESG · Regulatory Atlas",
    description: "Independent ESG regulatory radar across 15 jurisdictions and 80+ source-linked records.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeScript = `
    (function () {
      try {
        var saved = window.localStorage.getItem("etica-theme");
        var theme = saved === "light" || saved === "dark" ? saved : "light";
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.dataset.theme = theme;
      } catch (error) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
