import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESG Regulatory Atlas",
  description: "Interactive sustainability and ESG regulatory tracker"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
