import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AlphaMeet X",
  description: "Modern, simple and secure video meetings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[var(--background)]">
      <body className={`min-h-full flex flex-col font-sans`}>
        {/* ThemeProvider is a client component that syncs localStorage and system preference */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
