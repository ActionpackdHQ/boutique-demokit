import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dream it. Bot it. Live. · Actionpackd",
  description:
    "One Sunday. One idea. Your first bot. Sunday, 29 November 2026. Live online. ₹99. 2 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
