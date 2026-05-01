import type { Metadata } from "next";
import { DATASET_META } from "@/data/_meta";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATASET_META.publisherUrl),
  title: {
    default: "Etica ESG · Regulatory Atlas",
    template: "%s | Etica ESG"
  },
  description: "Etica ESG · Independent ESG regulatory radar across 15 jurisdictions, 36+ regulations, with primary-source citations and a published review cadence.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Etica ESG · Regulatory Atlas",
    description: "Independent ESG regulatory radar across 15 jurisdictions, source-linked and edition-tracked.",
    images: ["/og-image.svg"],
    siteName: DATASET_META.publisher,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Etica ESG · Regulatory Atlas",
    description: "Independent ESG regulatory radar across 15 jurisdictions.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeScript = `
    (function () {
      try {
        var saved = window.localStorage.getItem("etica-theme");
        var theme = saved === "light" || saved === "dark" ? saved : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
        {children}
      </body>
    </html>
  );
}
