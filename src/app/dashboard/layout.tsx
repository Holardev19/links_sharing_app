// app/dashboard/layout.tsx

import React from "react";
import Header from "@/app/dashboard/component/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
}
