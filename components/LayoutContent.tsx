"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Announcment from "@/components/Announcment";

export function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isNewPage = pathname?.startsWith("/new");

  return (
    <div className="flex min-h-screen flex-col">
      {!isNewPage && <Announcment />}
      <div className="flex-1">{children}</div>
      {!isNewPage && (
        <>
          <div className="h-px bg-secondary w-full mt-20"></div>
          <Footer />
        </>
      )}
    </div>
  );
}
