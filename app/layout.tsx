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
  description: "Etica ESG · Source-linked ESG regulatory orientation across tracked markets, sectors, value chains and reporting years.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Etica ESG · Regulatory Atlas",
    description: "Source-linked ESG regulatory orientation across tracked markets, sectors, value chains and reporting years.",
    images: ["/og-image.svg"],
    siteName: DATASET_META.publisher,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Etica ESG · Regulatory Atlas",
    description: "Source-linked ESG regulatory orientation across tracked markets, sectors, value chains and reporting years.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const printTitle = `Etica ESG · Regulatory Atlas · ${DATASET_META.edition}`;
  const printSubtitle = `Seed regulatory intelligence · Dataset last reviewed ${DATASET_META.lastReviewed}`;
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
      <body data-print-title={printTitle} data-print-subtitle={printSubtitle}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
