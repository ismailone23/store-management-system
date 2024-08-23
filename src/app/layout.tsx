import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { MessageContextProvider } from "@/context/useMessage";
import { Metadata } from "next";
import Loading from "@/components/shared/Loading";
import { TrpcProvider } from "@/context/trpc-provider";
import { auth } from "@/server/auth/auth";
import { SessionProvider } from 'next-auth/react'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: '/favicon.ico',
  description: "Shop Management System, Invoices , Users for controlling app, Shop to manage products and their stocks,POS System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <MessageContextProvider>
          <TrpcProvider>
            <SessionProvider session={session}>
              <Loading />
              {children}
            </SessionProvider>
          </TrpcProvider>
        </MessageContextProvider>
      </body>
    </html>
  );
}
