import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hybridhydrocarbons.com"),
  title: {
    default: "Hybrid Hydrocarbons Limited | Powering Tomorrow with Hybrid Innovation",
    template: "%s | Hybrid Hydrocarbons Limited",
  },
  description:
    "Hybrid Hydrocarbons Limited bridges traditional energy production and sustainable innovation, delivering reliable exploration, renewable integration, and carbon management for a lower-carbon future.",
  keywords: [
    "Hybrid Hydrocarbons",
    "energy company",
    "oil and gas",
    "renewable integration",
    "carbon management",
    "energy consulting",
  ],
  openGraph: {
    title: "Hybrid Hydrocarbons Limited | Powering Tomorrow with Hybrid Innovation",
    description:
      "Bridging traditional and sustainable energy through disciplined production, renewable integration, and carbon management.",
    url: "https://www.hybridhydrocarbons.com",
    siteName: "Hybrid Hydrocarbons Limited",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hybrid Hydrocarbons Limited",
    description:
      "Powering tomorrow with hybrid innovation — bridging traditional and sustainable energy.",
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
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased selection:bg-red/30">
        {children}
      </body>
    </html>
  );
}
