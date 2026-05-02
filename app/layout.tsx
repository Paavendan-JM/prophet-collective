import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Prophet Collective | We Engineer Growth Systems",
  description:
    "Performance marketing infrastructure for brands that refuse to be ordinary. Data-driven growth systems, automation funnels, SEO, and paid media — engineered for scale.",
  keywords: [
    "digital marketing agency",
    "performance marketing",
    "growth systems",
    "SEO",
    "automation funnels",
    "paid media",
    "ROAS optimization",
    "Shopify automation",
  ],
  openGraph: {
    title: "Prophet Collective | We Engineer Growth Systems",
    description:
      "Performance marketing infrastructure for brands that refuse to be ordinary.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prophet Collective | We Engineer Growth Systems",
    description:
      "Performance marketing infrastructure for brands that refuse to be ordinary.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-gray-300 scanline-overlay">
        {children}
      </body>
    </html>
  );
}
