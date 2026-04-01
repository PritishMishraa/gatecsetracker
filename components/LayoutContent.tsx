"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Announcment from "@/components/Announcment";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNewPage = pathname?.startsWith("/new");
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <div className="flex min-h-screen flex-col">
      {!isNewPage && !isAuthPage && <Announcment />}
      {!isNewPage && !isAuthPage && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isNewPage && !isAuthPage && <Footer />}
    </div>
  );
}
