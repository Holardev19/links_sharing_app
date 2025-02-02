import React from "react";
import placeholder_image from "@/app/assets/placeholder_image_preview.jpeg";
import Image from "next/image";
import github from "@/app/assets/github_preview.svg";
import arrow from "@/app/assets/arrow_right.svg";
import youtube from "@/app/assets/youtube_preview.svg";
import linkedin from "@/app/assets/linkedin_preview.svg";
import Link from "next/link";

export default function Preview() {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-[60px] bg-[#FFF] md:h-[357px] md:shrink-0 md:rounded-[0px_0px_32px_32px] md:bg-[#633cff]">
        <header className="flex w-full flex-col items-start gap-2 self-stretch rounded-xl bg-[#fff] p-[16px_16px_16px_24px] md:mt-6">
          <div className="flex w-full items-center justify-between gap-4 self-stretch md:flex md:h-auto md:w-full md:items-center md:justify-between md:gap-8">
            <Link
              href="/dashboard"
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-[#633cff] px-7 py-3 md:w-[130px] md:px-4"
            >
              <p className="text-nowrap font-Instrument_Sans text-base font-semibold leading-6 text-[#633cff]">
                Back to Editor
              </p>
            </Link>

            <button className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-black px-7 py-3 md:w-[130px] md:px-4">
              <p className="text-nowrap font-Instrument_Sans text-base font-semibold leading-6 text-[#fff]">
                Share Link
              </p>
            </button>
          </div>
        </header>

        <section className="flex w-[237px] flex-1 shrink-0 basis-0 flex-col items-start gap-14 shadow-[0px_0px_10px_0px] md:mt-[4rem] md:w-[349px] md:gap-2 md:rounded-3xl md:bg-[#fff] md:px-14 md:py-12">
          <div className="flex flex-col items-center gap-6 self-stretch">
            {/* The image uploaded */}
            <Image
              src={placeholder_image}
              width={110}
              height={103}
              alt="Placeholder image"
              className="h-[104px] w-[104px] rounded-[104px] border-[4px] border-[#633cff]"
            />

            <div className="flex flex-col items-center gap-2">
              {/* Placeholder name */}

              <p className="font-Instrument_Sans text-[32px] font-bold leading-[48px] text-[#333]">
                Ben Wright
              </p>

              {/* Placeholder email */}
              <p className="font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                ben@example.com
              </p>
            </div>
          </div>

          {/* The links display */}
          <div className="flex flex-col items-start gap-5 self-stretch">
            <button className="flex items-center gap-2 self-stretch rounded-lg bg-[#1a1a1a] p-4">
              <Image src={github} width={20} height={20} alt="github" />

              <p className="w-[153px] flex-1 shrink-0 basis-0 text-left font-Instrument_Sans text-base font-normal leading-6 text-[#fff]">
                Github
              </p>

              <Image src={arrow} width={16} height={16} alt="arrow" />
            </button>

            <button className="flex items-center gap-2 self-stretch rounded-lg bg-[#ee3939] p-4">
              <Image src={youtube} width={20} height={20} alt="github" />

              <p className="w-[153px] flex-1 shrink-0 basis-0 text-left font-Instrument_Sans text-base font-normal leading-6 text-[#fff]">
                Youtube
              </p>

              <Image src={arrow} width={16} height={16} alt="arrow" />
            </button>

            <button className="flex items-center gap-2 self-stretch rounded-lg bg-[#2d68ff] p-4">
              <Image src={linkedin} width={20} height={20} alt="github" />

              <p className="w-[153px] flex-1 shrink-0 basis-0 text-left font-Instrument_Sans text-base font-normal leading-6 text-[#fff]">
                LinkedIn
              </p>

              <Image src={arrow} width={16} height={16} alt="arrow" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
