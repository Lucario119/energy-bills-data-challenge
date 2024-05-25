import '@/app/globals.css';
import Header from '@/components/Header';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from './providers';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bills Frontend Lumi",
  description: "Lumi Fullstack Evaluaation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Header/>
            {children}
          </Providers>
        </body>
      </html>

  );
}
