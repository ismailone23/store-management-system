import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { MessageContextProvider } from "@/context/useMessage";
import { Metadata } from "next";
import Loading from "@/components/shared/Loading";
import { TrpcProvider } from "@/context/trpc-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: '/static/favicon.ico',
  // manifest: '/static/site.webmanifest',
  title: "Shop Management System",
  description: "Shop Management System, Invoices , Users for controlling app, Shop to manage products and their stocks,POS System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MessageContextProvider>
          <TrpcProvider>
            <Loading />
            {children}
          </TrpcProvider>
        </MessageContextProvider>
      </body>
    </html>
  );
}
