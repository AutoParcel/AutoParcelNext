import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"
export const metadata: Metadata = {
  title: "AutoParcel",
  description: "Created with love",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "64x64",
      url: "favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <html lang="en">
        <body className={cn(inter.className, "text-primary_black")}>
          {children}
          <Toaster />
        <Analytics/>
        </body>
      </html>
  );
}
