import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jai Kansal - 3D Interactive Portfolio",
  description: "Full-Stack & Cloud Engineer - Interactive 3D portfolio showcasing modern web development with React Three Fiber, Next.js, and TypeScript",
  keywords: "Jai Kansal, Full Stack Developer, React, Next.js, TypeScript, 3D Portfolio, Web Development",
  authors: [{ name: "Jai Kansal" }],
  openGraph: {
    title: "Jai Kansal - 3D Interactive Portfolio",
    description: "Experience my interactive 3D portfolio with cosmic crystal navigation",
    url: "https://cosmic-crystal-portfolio.vercel.app",
    siteName: "Jai Kansal Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
