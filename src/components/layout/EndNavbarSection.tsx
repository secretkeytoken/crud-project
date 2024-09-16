import React from "react";
import ThemeToogle from "./ThemeToogle";
import AuthButton from "../auth/AuthButton";

export default function EndNavbarSection() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToogle />
      <AuthButton />
    </div>
  );
}
