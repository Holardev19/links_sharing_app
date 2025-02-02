"use client";

import React, { useState, useEffect } from "react";
import image_plh from "@/app/assets/image_placeholder.svg";
import Image from "next/image";
import { supabase } from "@/app/lib/supabaseClient";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Profile() {
  const [ProfileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data } = await supabase.from("profiles").select("*").single();

      if (data) {
        setProfileData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
        });
        if (data.profile_picture) setImagePreview(data.profile_picture);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageUpload = async (file: File) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("Please upload a PNG or JPG image");
      return;
    }
    const img = new (window.Image as typeof HTMLImageElement)();
    img.onload = async () => {
      if (img.width > 1024 || img.height > 1024) {
        alert("Image dimensions must not exceed 1024x1024px.");
        return;
      }

      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        alert("Failed to upload image");
        return;
      }

      const publicUrl = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(data.path).data.publicUrl;

      setImagePreview(publicUrl);
      setProfileData((prev) => ({ ...prev, profilePicture: publicUrl }));
    };
    img.src = URL.createObjectURL(file);
  };

  const handleSave = async () => {
    const errors: Partial<ProfileData> = {};

    if (!ProfileData.firstName) errors.firstName = "First name is required.";
    if (!ProfileData.lastName) errors.lastName = "Last name is required.";
    if (!ProfileData.email || !/^\S+@\S+\.\S+$/.test(ProfileData.email))
      errors.email = "A valid email is required.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("profiles").upsert({
      first_name: ProfileData.firstName,
      last_name: ProfileData.lastName,
      email: ProfileData.email,
    });

    setLoading(false);

    if (error) {
      alert("Failed to save profile. Please try again.");
    } else {
      alert("Profile saved successfully");
    }
  };

  return (
    <>
      <div className="h-auto w-full bg-[#efebff] p-6">
        <div className="flex w-full flex-1 shrink-0 basis-0 flex-col items-start rounded-xl bg-[#fff]">
          <div className="flex flex-1 shrink-0 basis-0 flex-col items-start gap-10 self-stretch p-10">
            <header className="flex w-full flex-col items-start justify-center gap-2">
              <p className="self-stretch font-Instrument_Sans text-[32px] font-bold leading-[48px] text-[#333]">
                Profile Details
              </p>

              <p className="font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Add your details to create a personal touch to your profile.
              </p>
            </header>

            <div className="flex flex-col items-start gap-6 self-stretch">
              <div className="flex w-full flex-col items-center justify-center gap-3 self-stretch rounded-xl bg-[#fafafa] p-5">
                <div className="flex flex-col items-center gap-4 self-stretch sm:flex-row">
                  <p className="w-[240px] text-left font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                    Profile picture
                  </p>

                  <div className="flex w-full flex-col items-start justify-center gap-6 self-stretch md:flex-row md:items-center md:justify-center">
                    <div className="flex items-center justify-center rounded-xl bg-[#efebff] p-[61px_38px_60px_39px]">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files &&
                            handleImageUpload(e.target.files[0])
                          }
                        />
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Profile"
                            className="h-[100px] w-[100px] rounded-full"
                          />
                        ) : (
                          <Image
                            src={image_plh}
                            width={40}
                            height={40}
                            alt="Image placeholder"
                          />
                        )}
                        <p className="font-semibold text-[#633cff]">
                          + Upload Image
                        </p>
                      </label>
                    </div>

                    <p className="w-[150px] self-stretch font-Instrument_Sans text-xs font-normal leading-[18px] text-[#737373]">
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile info form */}
              <div className="flex w-full flex-col gap-3 bg-[#fafafa] p-5">
                {[
                  {
                    label: "First Name*",
                    field: "firstName",
                    placeholder: "John",
                  },
                  {
                    label: "Last Name*",
                    field: "lastName",
                    placeholder: "Doe",
                  },
                  {
                    label: "Email*",
                    field: "email",
                    placeholder: "johndoe@gmail.com",
                  },
                ].map(({ label, field, placeholder }) => (
                  <div
                    key={field}
                    className="flex flex-col items-center gap-4 sm:flex-row"
                  >
                    <label className="w-[240px] text-xs">{label}</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={ProfileData[field as keyof ProfileData]}
                        onChange={(e) =>
                          handleChange(
                            field as keyof ProfileData,
                            e.target.value,
                          )
                        }
                        className="w-full rounded-lg border px-4 py-3"
                      />
                      {errors[field as keyof ProfileData] && (
                        <p className="text-xs text-red-500">
                          {errors[field as keyof ProfileData]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The save button */}
          <div className="flex w-full justify-end border-t border-[#d9d9d9] p-4">
            <button
              onClick={handleSave}
              className="flex w-full items-center justify-center rounded-lg bg-[#633cff] px-7 py-3 text-white sm:w-[80px]"
            >
              <p>{loading ? "Saving" : "Save"}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
