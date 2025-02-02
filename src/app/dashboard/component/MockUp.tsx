"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import preview from "@/app/assets/preview-section.svg";
import github from "@/app/assets/github_preview.svg";
import arrow from "@/app/assets/arrow_right.svg";
import youtube from "@/app/assets/youtube_preview.svg";
import linkedin from "@/app/assets/linkedin_preview.svg";
import placeholder_image from "@/app/assets/placeholder_image_preview.jpeg";
import { supabase } from "@/app/lib/supabaseClient";

interface UserLink {
  platform: string;
  link: string;
}

export default function MockUp() {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<{
    first_name: string;
    last_name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Fetch user details
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }

      const userId = user.id;
      console.log("User ID:", userId); // Log user.id to verify it's correct

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("id", userId);

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        console.log("Fetched profile data:", data); // Add this to check the response

        if (data && data.length > 0) {
          setProfile(data[0]);
        } else {
          setProfile(null); // No profile found
        }
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      const user = supabase.auth.getUser();
      if (!user) {
        console.error("No user is logged in");
        return;
      }

      const { data, error } = await supabase
        .from("user_links")
        .select("platform, link")
        .eq("user_id", user);

      if (error) {
        console.error("Error fetching links:", error.message);
      } else {
        setLinks(data || []);
      }
    };
    fetchLinks();
  }, []);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setMessage("Link copied successfully!");

    setTimeout(() => setMessage(null), 2000);
  };

  const renderButton = (platform: string, icon: string, color: string) => {
    const userLink = links.find((link) => link.platform === platform);
    return (
      <button
        key={platform}
        className={`flex h-[44px] items-center gap-2 self-stretch rounded-lg ${color} p-4`}
        onDoubleClick={() => userLink && handleCopy(userLink.link)}
      >
        <Image src={icon} width={20} height={20} alt={platform} />
        <p className="w-[153px] flex-1 shrink-0 basis-0 text-left font-Instrument_Sans text-base font-normal leading-6 text-[#fff]">
          {platform}
        </p>
        <Image src={arrow} width={16} height={16} alt="arrow" />
      </button>
    );
  };

  return (
    <div className="mt-6 hidden h-[600px] w-[560px] lg:flex">
      <div className="flex w-full shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-[#fff] p-6">
        <div className="relative flex h-full w-full items-center justify-center">
          <Image src={preview} width={250} height={550} alt="preview" />

          <section className="absolute flex w-[200px] flex-1 shrink-0 basis-0 flex-col items-start gap-8 bg-[#fff]">
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
                  {profile
                    ? `${profile.first_name} ${profile.last_name}`
                    : "John Doe"}{" "}
                </p>

                {/* Placeholder email */}
                <p className="font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                  {profile?.email || "placeholder@example.com"}
                </p>
              </div>
            </div>

            {/* The links display */}
            <div className="flex w-full flex-col items-center justify-center gap-5 self-stretch bg-[#fff] py-2">
              {renderButton("Github", github, "bg-[#1a1a1a]")}
              {renderButton("Youtube", youtube, "bg-[#ee3939]")}
              {renderButton("LinkedIn", linkedin, "bg-[#2d68ff]")}
            </div>
          </section>
        </div>
      </div>

      {message && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-md bg-green-500 px-4 py-2 text-white">
          {message}
        </div>
      )}
    </div>
  );
}
