"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Announcment from "@/components/Announcment";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNewPage = pathname?.startsWith("/new");

  return (
    <div className="flex min-h-screen flex-col">
      {!isNewPage && <Announcment />}
      {!isNewPage && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isNewPage && <Footer />}
    </div>
  );
}
