import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PictoPicto",
  description: "Accueil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`min-h-screen bg-pbg md:pt-10 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
