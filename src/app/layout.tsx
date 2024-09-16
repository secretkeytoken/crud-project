import type { Metadata } from "next";

import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroTree Ledger",
  description:
    "Central hub for maintaining consistency and keeping the team aligned on technical aspects of AgroTree Ledger.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <body className={cn(inter.className, manrope.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
