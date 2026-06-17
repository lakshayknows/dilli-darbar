import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Black } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import StickyBar from "@/components/layout/StickyBar";
import SplashScreen from "@/components/layout/SplashScreen";
import RouteLoader from "@/components/layout/RouteLoader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedillidarbar.com"),
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivoBlack.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gajraj+One&family=Khand:wght@500;600&family=Noto+Nastaliq+Urdu:wght@500;700&family=Noto+Sans+Gurmukhi:wght@500;600&family=Noto+Sans+Bengali:wght@500;600&family=Noto+Sans+Tamil:wght@500;600&family=Noto+Sans+Telugu:wght@500;600&family=Noto+Sans+Gujarati:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-maroon text-cream antialiased">
        <Providers>
          <SplashScreen />
          <RouteLoader />
          <Nav />
          {children}
          <Footer />
          <StickyBar />
        </Providers>
      </body>
    </html>
  );
}
