// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl">Redirecting to login...</h1>
    </div>
  );
};

export default HomePage;
