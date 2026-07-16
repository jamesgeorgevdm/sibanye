// Root layout — wraps every page on the site.
//
// Structure:
//   <html>
//     <body>
//       <SiteShell>          ← hides Navbar+main+Footer until intro finishes
//         <Navbar />
//         <main>{page}</main>
//         <Footer />
//       </SiteShell>
//       <IntroSplash />      ← first-visit logo splash, lives outside SiteShell
//       <ChatbotWidget />    ← floating chat button, always visible once page loads
//     </body>
//   </html>
//
// The Fredoka font is loaded via next/font so it never causes layout shift.

import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroSplash from "./components/IntroSplash";
import SiteShell from "./components/SiteShell";
import ChatbotWidget from "./components/ChatbotWidget";
import StructuredData from "./components/StructuredData";

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
        <SiteShell>
          <Navbar />
          <main className="grow pt-16">{children}</main>
          <Footer />
        </SiteShell>

        <IntroSplash />
        <ChatbotWidget />
        <StructuredData />
      </body>
    </html>
  );
}
