import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroSplash from "./components/IntroSplash";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Sibanye Centre For Special Needs",
  description: "Empowering lives and supporting unique abilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} antialiased`}>
      <body className={`${fredoka.className} min-h-screen w-full flex flex-col m-0 p-0 bg-gray-50 text-gray-900`}>
        <Navbar />

        <main className="grow pt-16">{children}</main>

        <Footer />

        <IntroSplash />
      </body>
    </html>
  );
}
