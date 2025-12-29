import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Crimson_Pro,
} from "next/font/google";
import { type Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { SkipToContent } from "@/components/skip-to-content";

export const metadata: Metadata = {
  title: "Sacred Geometry",
  description: "Learn about sacred geometry and its significance.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Display font for hero titles and page headings
const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

// Heading font for section headings and card titles
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

// Body font for text and descriptions
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${cormorantGaramond.variable} ${crimsonPro.variable}`}
    >
      <body>
        <SkipToContent />
        <Theme appearance="dark">
          <MotionProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </MotionProvider>
        </Theme>
      </body>
      <Analytics />
    </html>
  );
}
