"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface SidebarWrapperProps {
    locale: any, 
    children: any,
}

export default function SidebarWrapper({ locale, children }: SidebarWrapperProps) {
  const pathname = usePathname();

  return <>
    <Sidebar locale={locale} />
    <main
        className={`flex-1 p-6
            mt-14 md:ml-56 md:mt-0
        `}
    >{children}</main>
  </>;
}
