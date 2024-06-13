import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/ui/header";
import { auth } from "@clerk/nextjs/server";
import Footer from "@/components/ui/footer";
import ToastProvider from "@/providers/toast-provider";

const roboto = Roboto({subsets: ["latin"], variable: "--font-roboto", weight: "100"});

export const metadata: Metadata = {
  title: "BugCar",
  description: "Car Selling Webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {userId} = auth()
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background initialized", roboto.variable)}>
          <ToastProvider/>
          <img src="/img/graphic.svg" className ="absolute -z-10 top-0 right-0 w-full md:w-[60%]"alt="" />

          <Header userId={userId}></Header>

          {children}

          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
