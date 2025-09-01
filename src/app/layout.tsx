import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmic Trading Preferences Questionnaire",
  description: "Complete our comprehensive trading preferences questionnaire to help us understand your investment strategy and provide personalized insights.",
  keywords: "trading, questionnaire, crypto, stocks, investment, preferences, cosmic",
  authors: [{ name: "Cosmic Trading" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Cosmic Trading Preferences Questionnaire",
    description: "Complete our comprehensive trading preferences questionnaire for personalized insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Trading Preferences Questionnaire",
    description: "Complete our comprehensive trading preferences questionnaire for personalized insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
