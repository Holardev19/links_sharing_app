import React from "react";
import CreateAccount from "@/app/create_account/component/CreateAccount";
import { AuthProvider } from "../context/AuthContext";

export default function CreateAccountPage() {
  return (
    <AuthProvider>
      <CreateAccount />
    </AuthProvider>
  );
}
