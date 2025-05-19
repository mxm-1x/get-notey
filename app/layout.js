import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: 'Get Notey',
  description: 'Take notes with AI assistance',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico', // You can also use favicon.ico for Apple devices
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Provider>
            {children}
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
