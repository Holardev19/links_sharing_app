"use client";
import React, { useState } from "react";
import logo from "@/app/assets/devlink_logo.svg";
import Image from "next/image";
import devlinks from "@/app/assets/devlinks_image.svg";
import mail from "@/app/assets/mail.svg";
import lock from "@/app/assets/lock.svg";
import Link from "next/link";
import { z } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const createAccountSchema = z
  .object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export default function CreateAccount() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = createAccountSchema.safeParse(formData);

    if (result.success) {
      try {
        await signUp(formData.email, formData.password);
        toast.success("Account created! Please confirm your email to log in.", {
          position: "top-center",
        });
        setTimeout(() => {
          handleNavigation("/dashboard");
        }, 3000);
      } catch (error: unknown) {
        const authError = error as AuthError;

        setErrors({ EMAIL: authError.message || "Something went wrong" });

        if (authError.message.includes("already exists")) {
          toast.error("An account with this email already exists.", {
            position: "top-center",
          });
        } else {
          toast.error("Something went wrong. Please try again.", {
            position: "top-center",
          });
        }
        setErrors({ general: authError.message || "Something went wrong." });
      }
    } else {
      const errorMap: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
    setLoading(false);
  };

  return (
    <>
      <section className="flex h-screen w-full items-center justify-center">
        <div className="flex h-screen w-full flex-1 shrink-0 basis-0 flex-col items-center justify-start gap-16 self-stretch p-8 md:justify-center md:gap-[51px]">
          <div className="flex w-[311px] items-center justify-start gap-2 md:w-[476px] md:justify-center">
            <Image src={logo} width={40} height={40} alt="logo" />

            <Image src={devlinks} width={135} height={26} alt="devlinks" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-[311px] flex-1 shrink-0 basis-0 flex-col items-start justify-start gap-10 md:w-[476px]"
          >
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <p className="font-Instrument_Sans text-2xl font-bold leading-9 text-[#333]">
                Create Account
              </p>

              <p className="self-stretch font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Let&apos;s get you started sharing your links!
              </p>
            </div>

            {/* The form */}
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start justify-center">
                <label
                  htmlFor="email"
                  className={`font-Instrument_Sans text-xs font-normal leading-[18px] ${errors.email ? "text-red-500" : "text-[#333]"} `}
                >
                  Email Address
                </label>

                <div
                  className={`flex h-12 items-center gap-3 self-stretch rounded-lg border ${errors.email ? "border-[#ff3939]" : "border-[#d9d9d9]"} bg-[#fff] px-4 py-3`}
                >
                  <Image src={mail} width={16} height={16} alt="mail" />

                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-Instrument_Sans font-normal leading-6 text-[#333] outline-none"
                    placeholder="e.g alex@email.com"
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col items-start justify-center">
                <label
                  htmlFor="password"
                  className={`font-Instrument_Sans text-xs font-normal leading-[18px] ${errors.password ? "text-red-500" : "text-[#333]"} `}
                >
                  Create Password
                </label>

                <div
                  className={`flex h-12 items-center gap-3 self-stretch rounded-lg border ${errors.password ? "border-[#ff3939]" : "border-[#d9d9d9]"} py-3} bg-[#fff] px-4`}
                >
                  <Image src={lock} width={16} height={16} alt="lock" />

                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="font-Instrument_Sans font-normal leading-6 text-[#333] outline-none"
                    placeholder="At least 8 characters"
                  />

                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col items-start justify-center">
                <label
                  htmlFor="confirmPassword"
                  className={`font-Instrument_Sans text-xs font-normal leading-[18px] ${errors.confirmPassword ? "text-red-500" : "text-[#333]"} text-[#333]`}
                >
                  Confirm Password
                </label>

                <div
                  className={`flex h-12 items-center gap-3 self-stretch rounded-lg border ${errors.password ? "border-[#ff3939]" : "border-[#d9d9d9]"} bg-[#fff] px-4 py-3`}
                >
                  <Image src={lock} width={16} height={16} alt="lock" />

                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="font-Instrument_Sans font-normal leading-6 text-[#333] outline-none"
                    placeholder="At least 8 characters"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <p className="font-Instrument_Sans text-xs font-normal leading-[18px] text-[#737373]">
                Password must contain at least 8 characters
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex flex-col items-center justify-center gap-2 self-stretch rounded-lg bg-[#633cff] px-[27px] py-[11px]"
              >
                <p className="font-Instrument_Sans text-base font-semibold leading-6 text-[#fff]">
                  {loading ? "Creating account..." : "Create new account"}
                </p>
              </button>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
              <p className="text-center font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Already have an account?
              </p>

              <Link href="/login">
                <button className="font-Instrument_Sans text-base font-normal leading-6 text-[#633cff]">
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
