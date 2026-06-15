import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Spotlight } from "@/components/layout/Spotlight";
import { Footer } from "@/components/layout/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya Thakur - Full-Stack Developer",
  description: "Advanced Full-Stack Development & Modern Architectures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.className} relative z-0 flex h-screen overflow-hidden`}>
        <Spotlight />
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-[300px] h-full overflow-y-auto overflow-x-hidden relative">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-bento-gap relative z-10 mb-16 md:mb-0">
            
            {children}

            {/* Shared Footer */}
            <Footer />
          </div>
        </main>

        <MobileNav />
      </body>
    </html>
  );
}