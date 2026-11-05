import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Actionpackd Boutique Agents – Demo Kit",
  description:
    "See how Actionpackd agents answer boutique customers. Try the Aavarna demo and talk to the team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/kit/hero-phone.webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
