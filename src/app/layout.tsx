import type { Metadata } from "next";
import { Toaster } from 'sonner';
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EarnVerse - Earn Rewards",
  description: "EarnVerse platform for earning rewards through various activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="abyss">
      <body
        className={`${SpaceGrotesk.className} antialiased bg-base-200 w-screen overflow-x-hidden`}
      >
        {children}
        <Toaster
        />
      </body>
    </html>
  );
}
