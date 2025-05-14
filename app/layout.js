import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: 'Get Notey',
  description: 'Organize your PDF notes with AI assistance',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
