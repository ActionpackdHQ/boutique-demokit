import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Actionpackd Boutique Agents — Demo Kit",
  description:
    "Actionpackd provides agents, bots, shops, and sites. Try the Aavarna boutique demo, qualify a lead, and talk to the team in Chennai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preload" as="image" href="/brand/mascot.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/samples/sample-silk-saree.webp" fetchPriority="high" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
