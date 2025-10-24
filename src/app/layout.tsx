import "./globals.css";
import { Urbanist, Fraunces } from "next/font/google";
import type { Metadata } from "next";
import ConditionalLayout from "./components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Lively Events",
  description: "Your event platform",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${fraunces.variable}`}>
      <body className="font-urbanist">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}