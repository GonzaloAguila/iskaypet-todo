import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "To-Do Iskaypet",
    template: "%s | To-Do Iskaypet",
  },
  description: "Aplicación de gestión de tareas desarrollada para Iskaypet como parte de un challenge.",
  keywords: ["todo", "tareas", "gestion", "productividad", "iskaypet"],
  authors: [{ name: "Gonzalo Aguila", url: "https://github.com/GonzaloAguila" }],
  creator: "Gonzalo Aguila",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "To-Do Iskaypet",
    title: "To-Do Iskaypet",
    description: "Aplicación de gestión de tareas desarrollada para Iskaypet. Organiza tus tareas diarias de manera eficiente.",
  },
  twitter: {
    card: "summary",
    title: "To-Do Iskaypet",
    description: "Aplicación de gestión de tareas desarrollada para Iskaypet. Organiza tus tareas diarias de manera eficiente.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#639605" },
    { media: "(prefers-color-scheme: dark)", color: "#639605" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
