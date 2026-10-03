import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Programa de Bautismo - Dariana de la Rocha Martinez",
  description: "Folleto de bautismo para Dariana de la Rocha Martinez - La Iglesia de Jesucristo de los Santos de los Ultimos Dias",
  keywords: ["bautismo", " LDS", "Dariana de la Rocha Martinez", "programa de bautismo"],
  authors: [{ name: "La Iglesia de Jesucristo de los Santos de los Ultimos Dias" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
