import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Using more reliable Google Fonts as alternatives
const inter = Inter({
  variable: "--font-geist-sans", // Keep the same CSS variable name
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono", // Keep the same CSS variable name
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A modern todo application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}