"use client";
import logo from "@/app/assets/devlink_logo.svg";
import Image from "next/image";
import devlinks from "@/app/assets/devlinks_image.svg";
import mail from "@/app/assets/mail.svg";
import lock from "@/app/assets/lock.svg";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password should be at least 8 characters."),
});

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (result.success) {
      try {
        await signIn(formData.email, formData.password);
        handleNavigation("/dashboard");
      } catch (error) {
        console.error(error);
      }
    } else {
      const errorMap: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
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
                Login
              </p>

              <p className="self-stretch font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Add your details below to get back into the app
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="font-Instrument_Sans font-normal leading-6 text-[#333] outline-none"
                    placeholder="e.g alex@email.com"
                  />

                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col items-start justify-center">
                <label
                  htmlFor="email"
                  className={`font-Instrument_Sans text-xs font-normal leading-[18px] ${errors.password ? "text-red-500" : "text-[#333]"} `}
                >
                  Password
                </label>

                <div
                  className={`flex h-12 items-center gap-3 self-stretch rounded-lg border ${errors.password ? "border-[#ff3939]" : "border-[#d9d9d9]"} border-[#d9d9d9] bg-[#fff] px-4 py-3`}
                >
                  <Image src={lock} width={16} height={16} alt="lock" />

                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="font-Instrument_Sans font-normal leading-6 text-[#333] outline-none"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full flex-col items-center justify-center gap-2 self-stretch rounded-lg bg-[#633cff] px-[27px] py-[11px]"
              >
                <p className="font-Instrument_Sans text-base font-semibold leading-6 text-[#fff]">
                  Login
                </p>
              </button>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
              <p className="text-center font-Instrument_Sans text-base font-normal leading-6 text-[#737373]">
                Don&apos;t have an account?
              </p>

              <Link href="/create_account">
                <button className="font-Instrument_Sans text-base font-normal leading-6 text-[#633cff]">
                  Create account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
