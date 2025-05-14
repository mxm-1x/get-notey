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

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body>
          <Provider>
            {children}
          </Provider>

        </body>
      </html>
    </ClerkProvider>
  );
}
