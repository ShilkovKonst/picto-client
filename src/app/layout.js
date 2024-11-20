import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PictoPicto",
  description: "Accueil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`flex md:justify-center md:items-center min-h-screen bg-pbg ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
