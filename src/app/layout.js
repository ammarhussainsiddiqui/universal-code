"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "..//components/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${raleway.className} antialiased`}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
