import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CodeEditorThemeProvider } from "./provider";

export const metadata: Metadata = {
  title: "Cody A. Fingerson | Software Developer",
  description: "Cody Fingerson is a software developer specializing in full-stack web applications. Explore his portfolio, technical skills, and featured projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
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
