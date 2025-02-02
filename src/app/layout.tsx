import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/app/components/StructuredData";
import { Nav } from "@/app/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Free Proxy Checker Online - Validate Proxy Servers Instantly | ProxyCheck",
  description:
    "Check proxy server status, latency and validity in real-time. Free online tool to verify HTTP/SOCKS proxies with batch checking and detailed results. Supports concurrent proxy validation.",
  keywords:
    "proxy checker, free proxy validator, check proxy status, proxy latency test, validate proxy list, online proxy checker",
  openGraph: {
    title: "Free Online Proxy Checker - Instant Proxy Validation Tool",
    description:
      "Real-time proxy checking tool with concurrent verification. Test proxy servers for anonymity, speed and reliability.",
    url: "https://proxy-checker-next.vercel.app",
    siteName: "ProxyCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Proxy Checker Online - Validate Proxy Servers Instantly",
    description:
      "Real-time proxy checking tool with concurrent verification. Test proxy servers for anonymity, speed and reliability.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
