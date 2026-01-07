import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { VisitorTracker } from "@/components/VisitorTracker";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mulky Malikul Dhaher",
  description: "Building systems, not noise. Personal workspace of Mulky Malikul Dhaher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen relative overflow-x-hidden bg-background">
        <VisitorTracker />
        
        {/* Background Atmosphere */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[120px] animate-float" />
          <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[150px] animate-float" style={{ animationDelay: '-5s' }} />
        </div>

        <Navbar />
        
        <main className="relative pt-20">
          {children}
        </main>

        <footer className="py-12 px-6 text-center border-t border-white/5 bg-black/20">
          <p className="text-subtle text-sm">
            © {new Date().getFullYear()} Mulky Malikul Dhaher. Solo. Deliberate. Long-term.
          </p>
        </footer>

        <VisualEditsMessenger />
      </body>
    </html>
  );
}
