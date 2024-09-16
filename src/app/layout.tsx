import type { Metadata } from "next";

import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import appConfig from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.appTitle,
  description: appConfig.appDescription,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: appConfig.appBaseUrl,
  twitter: {
    card: "summary_large_image",
    title: appConfig.appTitle,
    description: appConfig.appDescription,
    creator: appConfig.appCreator,
    images: [
      {
        url: `${appConfig.appBaseUrl}/twitter-image`,
        width: 800,
        height: 418,
      },
    ],
  },
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
