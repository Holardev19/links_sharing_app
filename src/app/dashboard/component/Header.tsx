import React from "react";
import logo from "@/app/assets/devlink_logo.svg";
import Image from "next/image";
import link from "@/app/assets/link.svg";
import profile from "@/app/assets/profile.svg";
import eye from "@/app/assets/eye.svg";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex h-[74px] w-full items-center justify-center self-stretch bg-[#efebff] p-[16px_16px_16px_24px]">
        <div className="flex h-[46px] w-full items-center justify-between self-stretch rounded-xl bg-[#fff] md:justify-center md:gap-[41px]">
          <div className="flex w-[80px] items-center justify-start md:w-[250px] md:gap-2">
            <Image src={logo} width={32} height={32} alt="logo" />

            <p className="hidden h-[30px] font-Instrument_Sans text-xl font-bold text-[#333] md:block">
              devlinks
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-0">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 rounded-lg bg-[#efebff] px-7 py-[11px]">
                <Image src={link} width={20} height={20} alt="link" />

                <p className="hidden font-Instrument_Sans text-base font-semibold leading-6 text-[#633cff] md:block">
                  Links
                </p>
              </button>
            </Link>

            <Link href="/profile">
              <button className="flex items-center gap-2 rounded-lg px-7 py-3">
                <Image src={profile} width={20} height={20} alt="profile" />

                <p className="hidden font-Instrument_Sans text-base font-semibold leading-6 text-[#737373] md:block">
                  Profile Details
                </p>
              </button>
            </Link>
          </div>

          <Link
            href="/preview"
            className="flex h-[45px] items-center justify-center rounded-lg border border-[#633cff] px-4 py-3"
          >
            <Image
              src={eye}
              width={20}
              height={20}
              alt="eye"
              className="md:hidden"
            />

            <p className="hidden font-Instrument_Sans text-base font-semibold leading-6 text-[#633cff] md:block">
              Preview
            </p>
          </Link>
        </div>
      </header>
    </>
  );
}
