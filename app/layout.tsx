import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import StickyBar from "@/components/layout/StickyBar";
import SplashScreen from "@/components/layout/SplashScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delhi Darbar — Delhi ka khana, ghar se",
  description:
    "Home cloud kitchen in Amar Colony, New Delhi. Fresh breakfast, lunch and dinner, home cooked and delivered to your door.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gajraj+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-maroon text-cream antialiased">
        <Providers>
          <SplashScreen />
          <Nav />
          {children}
          <Footer />
          <StickyBar />
        </Providers>
      </body>
    </html>
  );
}
