import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lively Events – Auth",
  description: "Sign in or create an account to start creating events.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
