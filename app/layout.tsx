import type { Metadata } from "next";
import { Cinzel, Crimson_Pro, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const shareTech = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Forge RPG — Fichas de Personagem",
  description: "Gerencie fichas de RPG de múltiplos sistemas localmente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${crimson.variable} ${shareTech.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
