import React from "react";
import Login from "@/app/login/component/LoginForm";
import { AuthProvider } from "../context/AuthContext";

export default function page() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
