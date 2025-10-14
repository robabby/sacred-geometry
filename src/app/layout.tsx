import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import { type Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Header } from "@/components/header";
import { SkipToContent } from "@/components/skip-to-content";

export const metadata: Metadata = {
  title: "Sacred Geometry",
  description: "Learn about sacred geometry and its significance.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SkipToContent />
        <Theme appearance="dark">
          <Header />
          <main id="main-content">{children}</main>
        </Theme>
      </body>
      <Analytics />
    </html>
  );
}
