import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = "Voyara Travels — Visas, Flights, Hotels & Car Rental";
const description =
  "Your journey, planned with care. Voyara handles visas, flight tickets, hotels and car rental so you can focus on the trip itself.";

export const metadata: Metadata = {
  metadataBase: new URL("https://voyara-travels.vercel.app"),
  title: { default: title, template: "%s | Voyara Travels" },
  description,
  keywords: [
    "travel agency",
    "visa services",
    "flight booking",
    "hotel booking",
    "car rental",
    "Pakistan",
  ],
  openGraph: {
    type: "website",
    siteName: "Voyara Travels",
    title,
    description,
    locale: "en_PK",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0c2431",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
