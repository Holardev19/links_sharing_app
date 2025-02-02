import React from "react";
import Profile from "@/app/profile/component/Profile";
import Mockup from "@/app/profile/component/MockUp";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-1 shrink-0 basis-0 items-start gap-6 self-stretch bg-[#efebff] p-[0px_24px_24px_24px]">
        <Mockup />
        <Profile />
      </div>
    </>
  );
}
