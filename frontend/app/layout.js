import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css"; // 👈 Added Toastify CSS
import ThemeProvider from "./components/ThemeProvider";
import { ToastContainer } from "react-toastify";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans`}
      >
        {/* ThemeProvider syncs localStorage and system preferences */}
        <ThemeProvider>
          {children}
          {/* Toast Container rendered at root */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
