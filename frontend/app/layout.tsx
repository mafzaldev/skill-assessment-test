import { TodoStoreProvider } from "@/providers/todo-state-provider";
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
        className={`bg-[url('/image.webp')] bg-cover bg-fixed bg-center bg-no-repeat antialiased ${inter.className}`}
      >
        <TodoStoreProvider>{children}</TodoStoreProvider>
      </body>
    </html>
  );
}
