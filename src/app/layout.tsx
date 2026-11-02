import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/constants";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.FULL_NAME} · ${PERSONAL_INFO.ROLE}`,
  description: PERSONAL_INFO.TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, mono.variable)}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
