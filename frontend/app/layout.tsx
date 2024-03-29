import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen bg-[url('/image.webp')] bg-cover bg-top bg-no-repeat text-white antialiased ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
