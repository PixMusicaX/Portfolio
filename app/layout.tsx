import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { AudioProvider } from "@/components/AudioProvider";

export const metadata: Metadata = {
  title: "Pinaki P Singha | Developer & Producer",
  description: "Portfolio showcasing software engineering and music production.",
  icons: {
    icon: "/logo/icon.png",
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col m-0 p-0 overflow-x-hidden">
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
