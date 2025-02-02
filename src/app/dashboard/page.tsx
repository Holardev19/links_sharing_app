import React from "react";
import Dashboard from "@/app/dashboard/component/Dashboard";
import MockUp from "@/app/dashboard/component/MockUp";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-1 shrink-0 basis-0 items-start gap-6 self-stretch bg-[#efebff] p-[0px_24px_24px_24px]">
        <MockUp />
        <Dashboard />
      </div>
    </>
  );
}
