import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { business, siteUrl } from "@/lib/constants";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const title = "Classic Cut Barber Shop | Barbershop in Seattle, WA";
const description =
  "Classic Cut Barber Shop is a neighborhood barbershop in Seattle, Washington, offering men's haircuts, kids cuts, beard trims, skin fades, and straight-razor shaves at 9455 35th Ave SW. Message on Facebook or call (206) 945-0834.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  keywords: [
    "barbershop Seattle WA",
    "barber Seattle",
    "men's haircut Seattle",
    "skin fade Seattle",
    "kids haircut Seattle",
    "beard trim Seattle WA",
    "West Seattle barbershop",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink text-bone antialiased selection:bg-brass selection:text-ink">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-brass focus:px-4 focus:py-2 focus:text-ink focus:font-medium"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
