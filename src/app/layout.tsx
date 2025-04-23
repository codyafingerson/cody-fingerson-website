import type { Metadata } from "next";
import { Open_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CodeEditorThemeContext, CodeEditorThemeProvider } from "./provider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cody A. Fingerson | Software Developer",
  description: "Cody Fingerson is a software developer specializing in full-stack web applications. Explore his portfolio, technical skills, and featured projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${sourceCodePro.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-10">
          <CodeEditorThemeProvider>
            {children}
          </CodeEditorThemeProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
