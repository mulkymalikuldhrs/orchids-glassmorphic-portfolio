import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { VisitorTracker } from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: "Glassmorphic Portfolio | Creative Developer",
  description: "A stunning glassmorphic portfolio built with Next.js and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen relative overflow-x-hidden">
        <VisitorTracker />
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px] animate-blob animation-delay-4000" />
        </div>
        
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
