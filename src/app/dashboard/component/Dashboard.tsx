"use client";
import React, { useState } from "react";
import image from "@/app/assets/landing_page_image.svg";
import Image from "next/image";
import PlatformSelector from "./PlatformSelector";
import link from "@/app/assets/link.svg";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [formFields, setFormFields] = useState<
    { platform: string; link: string }[]
  >([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const updateSaveButtonState = (
    fields: { platform: string; link: string }[],
  ) => {
    const hasNonEmptyLink = fields.some((field) => field.link.trim() !== "");
    setIsSaveButtonDisabled(!hasNonEmptyLink);
  };

  const handleAddLinkClick = () => {
    const newFields = [...formFields, { platform: "", link: "" }];

    setFormFields([...formFields, { platform: "", link: "" }]);
    setFormFields(newFields);

    setShowForm(true);
    updateSaveButtonState(newFields);
  };

  const handlePlatformChange = (index: number, platform: string) => {
    const updatedFields = [...formFields];
    updatedFields[index].platform = platform;
    setFormFields(updatedFields);
  };

  const handleLinkChange = (index: number, link: string) => {
    const updatedFields = [...formFields];
    updatedFields[index].link = link;
    setFormFields(updatedFields);
    updateSaveButtonState(updatedFields);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
    updateSaveButtonState(updatedFields);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error retrieving user:", authError);
        setIsSaving(false);
        return;
      }

      if (!user) {
        console.error("User not authenticated");
        setIsSaving(false);
        return;
      }

      const userId = user.id;

      const fieldsToSave = formFields.map((field) => ({
        user_id: userId,
        platform: field.platform,
        link: field.link,
      }));

      const { error: deleteError } = await supabase
        .from("user_links")
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting links:", deleteError);
        setIsSaving(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("user_links")
        .insert(fieldsToSave);

      if (insertError) {
        console.error("Error saving links:", insertError);
      } else {
        console.log("Links saved successfully");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="h-full w-full bg-[#efebff] p-4 md:p-6">
        {/* Main content */}
        <div className="flex w-full flex-col items-start self-stretch rounded-xl bg-[#fff]">
          {/* The links */}
          <div className="flex flex-1 shrink-0 basis-0 flex-col items-start gap-10 self-stretch p-6 md:p-10">
            {/* Heading text */}
            <div className="flex flex-col items-start gap-2 self-stretch">
              <p className="self-stretch font-Instrument_Sans text-2xl font-bold leading-9 text-[#333]">
                Customize your links
              </p>
              <p className="self-stretch font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
            </div>

            <div className="flex flex-1 shrink-0 basis-0 flex-col items-start gap-6 self-stretch">
              <button
                onClick={handleAddLinkClick}
                className="flex flex-col items-center justify-center gap-2 self-stretch rounded-lg border border-[#633cff] px-7 py-3"
              >
                <p className="font-Instrument_Sans text-base font-semibold leading-6 text-[#633cff]">
                  + Add new link
                </p>
              </button>

              {/* Initial content to be replaced by formfield */}

              <div className="flex max-h-[calc(100vh-180px)] flex-col items-start gap-6 self-stretch overflow-auto">
                {showForm ? (
                  formFields.map((field, index) => (
                    <div
                      key={index}
                      className="z-0 flex flex-col items-center justify-center gap-3 self-stretch rounded-xl bg-[#fafafa] p-5"
                    >
                      <div className="flex w-full items-start justify-between self-start">
                        <div className="flex items-center justify-center gap-2">
                          <button className="flex flex-col items-center justify-center gap-1">
                            <div className="h-1 w-3 bg-[#737373]" />
                            <div className="h-1 w-3 bg-[#737373]" />
                          </button>
                          <p className="font-Instrument_Sans text-base font-bold leading-6 text-[#737373]">
                            Link &#35;{index + 1}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemoveField(index)}
                          className="font-Instrument_Sans text-base font-normal leading-6 text-[#737373]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex flex-col items-start gap-1 self-stretch">
                        <label className="font-Instrument_Sans text-xs font-semibold leading-[18px] text-[#333]">
                          Platform
                        </label>

                        <div className="flex items-center gap-3 self-stretch rounded-lg border border-[#d9d9d9] bg-[#fff] px-4 py-3">
                          {/* Options and dropdown */}
                          <div className="flex w-full items-center justify-between gap-3">
                            <PlatformSelector
                              onChange={(platform) =>
                                handlePlatformChange(index, platform)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-1 self-stretch">
                        <label className="font-Instrument_Sans text-xs font-semibold leading-[18px] text-[#333]">
                          Link
                        </label>

                        <div className="flex items-center gap-3 self-stretch rounded-lg border border-[#d9d9d9] bg-[#fff] px-4 py-3">
                          {/* Link input */}
                          <div className="flex w-full items-center justify-start gap-2 outline-none">
                            <Image
                              src={link}
                              width={16}
                              height={16}
                              alt="link"
                            />

                            <input
                              type="text"
                              value={field.link}
                              onChange={(e) =>
                                handleLinkChange(index, e.target.value)
                              }
                              className="w-full font-Instrument_Sans text-base font-normal leading-6 text-[#333] opacity-50 outline-none"
                              placeholder="e.g. https://www.github.com/johnappleseed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-1 shrink-0 basis-0 flex-col items-center justify-center gap-3 self-stretch rounded-xl bg-[#fafafa] p-5">
                    <div className="flex flex-col items-center gap-6 self-stretch">
                      <Image src={image} width={124} height={80} alt="image" />

                      <p className="self-stretch text-center font-Instrument_Sans text-2xl font-bold leading-9 text-[#333]">
                        Let&apos;s get you started
                      </p>

                      <p className="self-stretch text-center font-Instrument_Sans font-normal leading-6 text-[#737373]">
                        Use the “Add new link” button to get started. Once you
                        have more than one link, you can reorder and edit them.
                        We&apos;re here to help you share your profiles with
                        everyone!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* The save button */}
          <div
            className="sticky bottom-0 flex flex-col items-end gap-2 self-stretch border border-t-[#d9d9d9] p-4 md:flex-row md:items-center md:justify-end md:px-10 md:py-6"
            style={{
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <button
              onClick={handleSave}
              disabled={isSaveButtonDisabled || isSaving}
              className={`flex flex-col items-center justify-center gap-2 self-stretch rounded-lg px-7 py-3 md:w-[91px] ${isSaveButtonDisabled || isSaving ? "bg-[#633cff] opacity-25" : "bg-[#633cff]"}`}
            >
              <p className="font-Instrument_Sans text-base font-semibold leading-6 text-[#fff]">
                {isSaving ? "Saving..." : "Save"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
