import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";
import { MessageContextProvider } from "@/context/useMessage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="256x256" href="/static/favicon.ico" />
        <link rel="icon" sizes="256x256" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={inter.className}>
        <MessageContextProvider>
          {children}
        </MessageContextProvider>
      </body>
    </html>
  );
}
