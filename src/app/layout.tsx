import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { VisitorTracker } from "@/components/VisitorTracker";
import { Navbar } from "@/components/Navbar";
import { ClientProviders } from "@/components/ClientProviders";

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
        <ClientProviders>
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

            <footer className="py-12 sm:py-20 px-6 border-t border-white/5 bg-black/20">
              <div className="container mx-auto flex flex-col items-center gap-8 sm:gap-12">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                  <a href="mailto:mulkymalikuldhr@mail.com" className="group flex items-center gap-2 sm:gap-3 glass px-4 sm:px-6 py-2 sm:py-3 rounded-2xl hover:bg-white/5 transition-all text-xs sm:text-sm">
                    <div className="p-1.5 sm:p-2 glass-dark rounded-xl group-hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail sm:w-4 sm:h-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <span className="font-light text-white/40 group-hover:text-white transition-colors">Email</span>
                  </a>
                  <a href="https://instagram.com/mulkymalikuldhr" target="_blank" className="group flex items-center gap-2 sm:gap-3 glass px-4 sm:px-6 py-2 sm:py-3 rounded-2xl hover:bg-white/5 transition-all text-xs sm:text-sm">
                    <div className="p-1.5 sm:p-2 glass-dark rounded-xl group-hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram sm:w-4 sm:h-4"><rect width="20" height="16" x="2" y="4" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </div>
                    <span className="font-light text-white/40 group-hover:text-white transition-colors">Instagram</span>
                  </a>
                  <a href="https://github.com/mulkymalikuldhrs" target="_blank" className="group flex items-center gap-2 sm:gap-3 glass px-4 sm:px-6 py-2 sm:py-3 rounded-2xl hover:bg-white/5 transition-all text-xs sm:text-sm">
                    <div className="p-1.5 sm:p-2 glass-dark rounded-xl group-hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github sm:w-4 sm:h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                    <span className="font-light text-white/40 group-hover:text-white transition-colors">GitHub</span>
                  </a>
                </div>
                <p className="text-subtle text-[10px] sm:text-xs tracking-widest uppercase text-center px-6">
                © {new Date().getFullYear()} Mulky Malikul Dhaher · Building Systems, Not Noise
              </p>
            </div>
          </footer>

          <VisualEditsMessenger />
        </ClientProviders>
      </body>
    </html>
  );
}
